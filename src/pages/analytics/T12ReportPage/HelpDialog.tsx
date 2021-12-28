import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Dialog, DialogButton } from 'components';
import { useDialogState } from 'hooks';
import { closeDialog } from 'utils';

function T12HelpDialog() {
  const { open } = useDialogState('ANALYTICS/T12HELP');

  return (
    <Dialog open={open}>
      <DialogTitle>Условные обозначения</DialogTitle>
      <DialogContent>
        <p>
          <strong>Я</strong> - продолжительность работы в дневное время с 6:00 до 22:00 часов
        </p>
        <p>
          <strong>Н</strong> - продолжительность работы в ночное время с 22:00 до 6:00 часов
        </p>
        <p>
          <strong>ЯН</strong> - дневная и ночная смены
        </p>
        <p>
          <strong>В</strong> - выходной день (суббота, воскресенье)
        </p>
        <p>
          <strong>РВ</strong> - рабочий выходной (продолжительность работы в суб. или воскр.)
        </p>
        <p>
          <strong>НН</strong> - неявка по невыясненным причинам (отстутствие регистрации в системе)
        </p>
      </DialogContent>
      <DialogActions>
        <DialogButton template="close" onClick={closeDialog} />
      </DialogActions>
    </Dialog>
  );
}

export default T12HelpDialog;
