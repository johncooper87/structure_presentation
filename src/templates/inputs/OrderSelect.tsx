import { IconButton } from '@material-ui/core';
import OrderIcon from '@material-ui/icons/ArrowUpward';

import { Select } from 'components';
import { useField, fieldSubscription } from 'components/Form';
import styles from './styles.module.scss';

interface OrderSelectProps {
  children: ReactNode;
}

function OrderSelect({ children }: OrderSelectProps) {
  const { value, change } = useField('order', { subscription: fieldSubscription });
  const desc = value === 'desc';
  const handleOrderButtonClick = () => {
    change(desc ? undefined : 'desc');
  };

  return (
    <div className={styles.orderSelectRoot}>
      <Select name="orderBy" label={'Упорядочить по ' + (desc ? 'убыванию' : 'возрастанию')}>
        {children}
      </Select>
      <span>
        <IconButton onClick={handleOrderButtonClick}>
          <OrderIcon className={desc ? styles.orderIconDesc : styles.orderIconAsc} />
        </IconButton>
      </span>
    </div>
  );
}

export default OrderSelect;
