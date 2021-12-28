import { toast } from 'react-toastify';

const notify = {
  error: (message: string) => toast.error(message),
  warn: (message: string) => toast.warn(message),
  success: (message: string) => toast.success(message),
  info: (message: string) => toast.info(message),
};

export default notify;
