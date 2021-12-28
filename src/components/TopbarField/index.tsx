import ReactDOM from 'react-dom';
import { getPortalContainer } from 'utils/contents';
import styles from './styles.module.scss';

const topbarFieldContainer = getPortalContainer('topbar-field');

interface TopbarFieldProps {
  children: ReactNode;
}

function TopbarField({ children }: TopbarFieldProps) {
  const content = <span className={styles.root}>{children}</span>;
  return ReactDOM.createPortal(content, topbarFieldContainer);
}

export default TopbarField;
