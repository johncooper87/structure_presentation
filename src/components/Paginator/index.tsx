// import { MenuItem, Select, SelectProps } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import styles from './index.module.scss';

interface PaginatorProps {
  total: number;
  limit: number;
  offset: number;
  // limitOptions?: number[];
  onChange: (offset: number, limit: number) => void;
}

function Paginator({
  total = 0,
  limit = 10,
  offset = 0,
  // limitOptions = [5, 10, 15, 25, 50],
  onChange,
}: PaginatorProps) {
  const nextOffset = offset + limit;
  const firstIndex = offset + 1;
  const lastIndex = nextOffset < total ? nextOffset : total;

  const previous = () => {
    let prevOffset = offset - limit;
    prevOffset = prevOffset > 0 ? prevOffset : 0;
    onChange?.(prevOffset, limit);
  };
  const next = () => onChange?.(nextOffset, limit);
  // const changeLimit: SelectProps['onChange'] = (event) =>
  //   onChange?.(offset, event.target.value as number);

  return (
    <div className={styles.root}>
      {/* <div>
        <Typography className={styles.title}>Элементов на странице</Typography>
        <Select className={styles.select} value={limit} onChange={changeLimit}>
          {limitOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div> */}
      <Typography className={styles.title}>
        Показано {firstIndex}-{lastIndex} элементов из {total}
      </Typography>

      {/* <Tooltip title={`Предыдущие ${limit} элементов`}>
      <span> */}
      <IconButton onClick={previous} disabled={offset === 0}>
        <ChevronLeft />
      </IconButton>
      {/* </span>
      </Tooltip> */}

      {/* <Tooltip title={`Следующие ${limit} элементов`}>
      <span> */}
      <IconButton onClick={next} disabled={offset + limit >= total}>
        <ChevronRight />
      </IconButton>
      {/* </span>
      </Tooltip> */}
      {/* </div> */}
    </div>
  );
}

export default React.memo(Paginator);
