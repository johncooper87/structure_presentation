import { Avatar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

interface WorkerAvatarProps {
  id: string;
}

function WorkerAvatar({ id }: WorkerAvatarProps) {
  if (!id)
    return (
      <Avatar>
        <PersonIcon />
      </Avatar>
    );
  return <Avatar src={`/api/kbi/workers/${id}/photo`} />;
}

export default React.memo(WorkerAvatar);
