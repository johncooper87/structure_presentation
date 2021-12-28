/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Avatar, Box, Button, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import AddPhotoIcon from '@material-ui/icons/AddAPhoto';
import ClearIcon from '@material-ui/icons/Clear';
import PersonIcon from '@material-ui/icons/Person';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import { openCamera, openFileDialog } from 'app';
import { Dialog, DialogButton, Menu, MenuItem } from 'components';
import { fieldSubscription, shouldDisplayFieldError, useField } from 'components/Form';
import UploadIcon from 'components/icons/FileUpload';
import { isMobile } from 'utils';
import styles from './styles.module.scss';
import useDerivedFieldProps from './useDerivedFieldProps';

const personIcon = <PersonIcon />;
const uploadIcon = <UploadIcon />;
const cameraIcon = <CameraIcon />;
const addPhotoIcon = <AddPhotoIcon />;
const clearIcon = <ClearIcon />;

const localFileURLList = new Map<File, string>();
function getLocalFileURL(file: File) {
  let url = localFileURLList.get(file);
  if (url === undefined) {
    url = URL.createObjectURL(file);
    localFileURLList.set(file, url);
  }
  return url;
}

export type AvatarInputProps = {
  validate?: FieldValidator<File>;
  name: string;
  disabled?: boolean;
  readOnly?: boolean;
};

function AvatarInput({ name, validate, ...props }: AvatarInputProps) {

  const { readOnly, disabled, ...derivedProps } = useDerivedFieldProps(props);

  const field = useField<File>(name, { validate, subscription: fieldSubscription });
  const { value, change, blur, error } = field;

  const [captionDialogOpen, setCaptionDialogOpen] = useState(false);
  const closeCaptionDialog = useCallback(() => setCaptionDialogOpen(false), []);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const openMenu = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    event => setMenuAnchor(event.target),
    []
  );

  const closeMenu = useCallback(() => setMenuAnchor(null), []);

  const handleUploadPhoto = useCallback(() => {
    openFileDialog(([file]) => change(file), {
      accept: ['image/*'],
    });
    closeMenu();
  }, [name, change]);

  const handleTakePhoto = useCallback(() => {
    if (isMobile()) openCamera(([file]) => change(file));
    else setCaptionDialogOpen(true);
    closeMenu();
  }, [name]);

  const clear = useCallback(() => {
    change(null);
    closeMenu();
  }, [name]);

  const displayError = shouldDisplayFieldError(field);

  const videoRef = useRef<HTMLVideoElement>();
  const videoRefCallback = useCallback(async (videoEl: HTMLVideoElement) => {
    if (navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoEl.srcObject = stream;
        videoRef.current = videoEl;
      } catch (error) {
        //
      }
    }
  }, []);

  const handleCapture = useCallback(() => {
    const videoEl = videoRef.current;
    const canvasEl = document.createElement('canvas');
    canvasEl.width = videoEl.videoWidth;
    canvasEl.height = videoEl.videoHeight;
    const ctx = canvasEl.getContext('2d');
    ctx.drawImage(videoEl, 0, 0, videoEl.videoWidth, videoEl.videoHeight);
    canvasEl.toBlob(image => {
      const file = new File([image], 'new_photo');
      change(file);
      closeCaptionDialog();
    });
  }, [name]);

  const { isSuccess: hasCamera } = useQuery(['PHOTO_CAMERA'], async () => {
      await navigator.mediaDevices?.getUserMedia({ video: true });
  }, { retry: false });

  const src =
    value instanceof File ? getLocalFileURL(value) : value;
  const children = readOnly ? personIcon : addPhotoIcon;
  return (
    <>
      <div className={styles.avatarInput}>
        <div className="wrapper" onClick={disabled ? undefined : openMenu}>
          <Avatar tabIndex={disabled ? -1 : 0} {...(value ? { src } : { children })} {...derivedProps} />
          {value && !disabled && (
            <Avatar className="overlay" {...props}>
              {addPhotoIcon}
            </Avatar>
          )}
        </div>
        {displayError && <Typography color="error">{error}</Typography>}
      </div>

      <Menu open={Boolean(menuAnchor)} anchorEl={menuAnchor} onClose={closeMenu}>
        <MenuItem icon={uploadIcon} text="Загрузить" onClick={handleUploadPhoto} />
        <MenuItem icon={cameraIcon} text="Сделать фото" onClick={handleTakePhoto} />
        {value && <MenuItem icon={clearIcon} text="Очистить" onClick={clear} />}
      </Menu>

      <Dialog open={captionDialogOpen} onClose={closeCaptionDialog} maxWidth={false}>
        <DialogTitle>Камера</DialogTitle>
        <DialogContent>
          <video
            autoPlay
            ref={videoRefCallback}
            width="640px"
            height="480px"
            style={{ display: hasCamera ? undefined : 'none' }}
          />
          {!hasCamera && <Box width="640px" height="480px">Видео камера не найдена</Box>}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeCaptionDialog}>Отмена</Button>
          <DialogButton onClick={handleCapture}>
            <CameraIcon className="leading-icon" />
            Сделать фото
          </DialogButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default React.memo(AvatarInput);
