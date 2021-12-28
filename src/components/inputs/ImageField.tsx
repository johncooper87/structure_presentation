/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Avatar, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AddPhotoIcon from '@material-ui/icons/AddAPhotoRounded';

import { openFileDialog } from 'app';
import { useField, shouldDisplayFieldError, fieldSubscription } from 'components/Form';
import useDerivedFieldProps from './useDerivedFieldProps';
import styles from './styles.module.scss';

const personIcon = <PersonIcon />;
const addPhotoIcon = <AddPhotoIcon />;

const localFileURLList = new Map<File, string>();
function getLocalFileURL(file: File) {
  let url = localFileURLList.get(file);
  if (url === undefined) {
    url = URL.createObjectURL(file);
    localFileURLList.set(file, url);
  }
  return url;
}

export type ImageFieldProps = {
  validate?: FieldValidator<File>;
  name: string;
  disabled?: boolean;
  readOnly?: boolean;
};

function ImageField({ name, validate, ...props }: ImageFieldProps) {

  const { readOnly, disabled, ...derivedProps } = useDerivedFieldProps(props);

  const field = useField<File>(name, { validate, subscription: fieldSubscription });
  const { value, change, blur, error } = field;

  const handleUploadPhoto = useCallback(() => {
    openFileDialog(([file]) => change(file), {
      accept: ['image/*'],
    });
  }, [name]);

  const displayError = shouldDisplayFieldError(field);

  const src = value instanceof File ? getLocalFileURL(value) : value;
  const children = readOnly ? personIcon : addPhotoIcon;
  return (
    <>
      <div className={styles.imageField}>
        <div className="wrapper" onClick={disabled ? undefined : handleUploadPhoto}>
          <Avatar tabIndex={disabled ? -1 : 0} {...(value ? { src } : { children })} {...derivedProps} />
          {value && !disabled && (
            <Avatar className="overlay" {...props}>
              {addPhotoIcon}
            </Avatar>
          )}
        </div>
        {displayError && <Typography color="error">{error}</Typography>}
      </div>
    </>
  );
}

export default React.memo(ImageField);
