/* eslint-disable react/no-array-index-key */
import { Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import styles from './styles.module.scss';

interface T12TableProps {
  data: T12ReportData;
  view: 'standart' | 'alternative';
  page: number;
  pageSize: number;
}

const Divider = () => <div className={styles.divider} />;

const emptyTableCells = (count: number) =>
  new Array(count).fill(0).map((_, index) => <TableCell key={index} />);

function T12Table({ data, view, page = 0, pageSize = 10 }: T12TableProps) {
  const pageData = useMemo(() => {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    return data?.slice(startIndex, endIndex);
  }, [data, page, pageSize]);

  if (!data || data.length === 0) return null;
  const firstAttendance = data[0].attendance ?? [];
  const attendanceColSpan = firstAttendance?.length + 2;
  const initialColSpan = view === 'alternative' ? 4 : 3;

  return (
    <>
      <div className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Номер по порядку</TableCell>
              {view === 'alternative' ? (
                <>
                  <TableCell>Фамилия, инициалы</TableCell>
                  <TableCell>Должность (специальность, профессия)</TableCell>
                </>
              ) : (
                <TableCell>Фамилия, инициалы, должность (специальность, профессия)</TableCell>
              )}
              <TableCell>Табельный номер</TableCell>
              <TableCell colSpan={attendanceColSpan}>
                Отметки о явках и неявках на работу по числам месяца
              </TableCell>
              <TableCell colSpan={5}>Итого отработано за месяц</TableCell>
              <TableCell colSpan={2}>Количество неявок</TableCell>
              <TableCell>Количество выходных</TableCell>
            </TableRow>
            <TableRow>
              {emptyTableCells(initialColSpan)}
              <TableCell colSpan={attendanceColSpan} />
              <TableCell>Дней</TableCell>
              <TableCell colSpan={4}>Часов</TableCell>
              <TableCell>Дней</TableCell>
              <TableCell>Часов</TableCell>
              <TableCell>Дней</TableCell>
            </TableRow>
            <TableRow>
              {emptyTableCells(initialColSpan)}
              <TableCell colSpan={attendanceColSpan} />
              <TableCell />
              <TableCell>Всего</TableCell>
              <TableCell colSpan={3}>Из них</TableCell>
              {emptyTableCells(3)}
            </TableRow>
            <TableRow>
              {emptyTableCells(initialColSpan)}

              {firstAttendance.slice(0, 15).map((item, index) => (
                <TableCell key={index}>{index + 1}</TableCell>
              ))}
              <TableCell>Итого отработано за I половину месяца</TableCell>
              {firstAttendance.slice(15).map((item, index) => (
                <TableCell key={index}>{index + 1}</TableCell>
              ))}
              <TableCell>Итого отработано за II половину месяца</TableCell>

              {emptyTableCells(2)}
              <TableCell>Дневных</TableCell>
              <TableCell>Ночных</TableCell>
              <TableCell>Выходных</TableCell>
              {emptyTableCells(3)}
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData.map(
              (
                {
                  worker,
                  attendance,
                  hoursInFirstHalf,
                  hoursInSecondHalf,
                  workedInTotal,
                  wasAbsent,
                  totalWeekend,
                },
                index
              ) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  {view === 'alternative' ? (
                    <>
                      <TableCell>{worker.fullname}</TableCell>
                      <TableCell>{worker.position}</TableCell>
                    </>
                  ) : (
                    <TableCell>
                      {worker.fullname} <br /> {worker.position}
                    </TableCell>
                  )}

                  <TableCell>{worker.personnelNumber}</TableCell>
                  {attendance.slice(0, 15).map(({ kind, duration, start, end }, _index) => (
                    <TableCell key={_index}>
                      {kind}
                      {view === 'alternative' && (
                        <>
                          <Divider /> {start} <Divider /> {end}
                        </>
                      )}
                      <Divider /> {duration}
                    </TableCell>
                  ))}
                  <TableCell>{hoursInFirstHalf}</TableCell>
                  {attendance.slice(15).map(({ kind, duration, start, end }, _index) => (
                    <TableCell key={_index}>
                      {kind}
                      {view === 'alternative' && (
                        <>
                          <Divider /> {start} <Divider /> {end}
                        </>
                      )}
                      <Divider /> {duration}
                    </TableCell>
                  ))}
                  <TableCell>{hoursInSecondHalf}</TableCell>
                  <TableCell>{workedInTotal.totalDays}</TableCell>
                  <TableCell>{workedInTotal.totalHours}</TableCell>
                  <TableCell>{workedInTotal.daytimeHours}</TableCell>
                  <TableCell>{workedInTotal.nightTimeHours}</TableCell>
                  <TableCell>{workedInTotal.weekendHours}</TableCell>
                  <TableCell>{wasAbsent.totalDays}</TableCell>
                  <TableCell>{wasAbsent.totalHours}</TableCell>
                  <TableCell>{totalWeekend}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default T12Table;
