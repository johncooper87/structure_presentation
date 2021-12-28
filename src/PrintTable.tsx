/* eslint-disable react/no-array-index-key */
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

const printTableSelector = (state: AppState) => state.print;

function PrintTable() {
  const { head, body } = useSelector(printTableSelector, shallowEqual);

  // useEffect(() => {
  //   if (head.length > 0 && body.length > 0) print();
  // }, [head, body]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {head.map((cell, index) => (
            <TableCell key={index}>{cell}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {body.map((row, index) => (
          <TableRow key={index}>
            {row.map((cell, index) => (
              <TableCell key={index}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PrintTable;
