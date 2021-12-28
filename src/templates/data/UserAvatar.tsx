import { Avatar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { http } from 'utils';
import styles from './styles.module.scss';

interface UserAvatarProps {
  id: string;
}

async function fetchUserPicture(id: string) {
  const response: Response = await http.get(`/api/kbi/users/${id}/photo`);
  if (!response?.ok) return;
  const blob = await response.blob();
  const source = URL.createObjectURL(blob);
  return source;
}

function UserAvatar({ id }: UserAvatarProps) {
  const { data: localSource } = useQuery(['USER/PICTURE', id], () => fetchUserPicture(id));

  return (
    // <div className={styles.userAvatar}>
    //   <Avatar src={`/api/kbi/users/${id}/photo`}>
    //     <PersonIcon />
    //   </Avatar>
    //   <Avatar className={styles.placeholder}>
    //     <PersonIcon />
    //   </Avatar>
    // </div>
    <div className={styles.userAvatar}>
      <Avatar src={localSource}>{localSource || <PersonIcon />}</Avatar>
    </div>
  );
}

export default React.memo(UserAvatar);
