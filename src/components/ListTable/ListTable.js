import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { QueryPaginator } from 'components';

const getValue = (data, columnName) => {
  const names = columnName.split('.');
  const value = names.reduce((acc, currName) => acc[currName] || '', data);
  return value;
};

const Row = ({ columns, data, options }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(prev => !prev);
  return (
    <>
      <TableRow>
        {options?.expandableRows && <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>}
        {columns.map(column => (
          <TableCell key={`data-cell-${column.name}`}>
            {column?.customBodyRender ? (
              // @ts-ignore
              column?.options?.customBodyRender(getValue(data, column.name), data)
            ) : (
              <Box>{getValue(data, column.name)}</Box>
            )}
          </TableCell>
        ))}
      </TableRow>
      {options?.expandableRows && open && options?.renderExpandableRow?.(data)}
    </>
  );
};

const ListTable = ({ data, columns, dataLength, options }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={`header-${column.name}`} align="left" padding="normal">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Row key={`data-row-${index}`} columns={columns} data={el} options={options} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <QueryPaginator total={dataLength} />
    </>
  );
};

export default ListTable;
