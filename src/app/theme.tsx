import { createTheme } from '@material-ui/core/styles';
import TimePickerIcon from '@material-ui/icons/Schedule';
import {
  DatePicker,
  KeyboardDatePicker,
  KeyboardTimePicker,
  TimePicker,
} from '@material-ui/pickers';

KeyboardDatePicker.defaultProps = {
  ...KeyboardDatePicker.defaultProps,
  color: 'secondary',
  format: 'dd.MM.yyyy',
  variant: 'inline',
  disableToolbar: true,
  autoOk: true,
};

DatePicker.defaultProps = {
  ...DatePicker.defaultProps,
  color: 'secondary',
  format: 'dd.MM.yyyy',
  variant: 'inline',
  disableToolbar: true,
  autoOk: true,
};

KeyboardTimePicker.defaultProps = {
  ...KeyboardTimePicker.defaultProps,
  color: 'secondary',
  variant: 'inline',
  disableToolbar: true,
  autoOk: true,
  ampm: false,
  keyboardIcon: <TimePickerIcon />,
};

TimePicker.defaultProps = {
  ...TimePicker.defaultProps,
  color: 'secondary',
  variant: 'inline',
  disableToolbar: true,
  autoOk: true,
  ampm: false,
};

const theme = createTheme({
  palette: {
    primary: {
      // main: 'hsl(219deg 24% 12%)',
      // dark: '#00051d',
      // light: '#4e586f',
      main: 'hsl(222deg 27% 37%)',
      dark: 'hsl(222deg 37% 22%)',
      light: 'hsl(210deg 48% 67%)',
      contrastText: '#fff',
    },
    secondary: {
      main: 'hsl(222deg 27% 37%)',
      dark: 'hsl(222deg 37% 22%)',
      light: 'hsl(210deg 48% 67%)',
      // main: '#4e586f',
      // main: 'hsl(196deg 66% 36%)',
      // main: 'hsl(196deg 46% 36%)',
      // dark: 'hsl(196deg 52% 24%)',
      // light: 'hsl(196deg 46% 54%)',
      contrastText: '#fff',
    },
    // alert: '#f34151',
    // danfer: '#f34151',
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:hover:not(.Mui-disabled)::before': {
          borderBottomColor: 'hsl(222deg 27% 37%)',
        },
      },
    },
    MuiMenuItem: {
      root: {
        '& .MuiListItemIcon-root': {
          minWidth: '0px',
          marginRight: '20px',
        },
        '& .MuiListItem-gutters': {
          paddingRight: '8px',
        },
        alignItems: 'center',
      },
    },
    MuiListItem: {
      root: {
        alignItems: 'flex-start',
        '& .MuiGrid-container': {
          overflowX: 'hidden',
        },
        '& .MuiListItemText-primary': {
          padding: '2px',
        },
        '& .MuiListItemText-secondary': {
          padding: '2px',
        },
      },
    },
    MuiDrawer: {
      root: {
        '& .MuiListItem-root': {
          alignItems: 'center',
        },
      },
    },
    MuiListItemText: {
      root: {
        '& p': {
          display: 'block',
          whiteSpace: 'nowrap',
          overflowX: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
    },
  },

  props: {
    MuiTextField: {
      color: 'secondary',
      variant: 'filled',
      margin: 'dense',
      autoComplete: 'off',
    },
    MuiRadio: {
      color: 'secondary',
    },
    MuiCheckbox: {
      color: 'secondary',
    },
    MuiSelect: {
      color: 'secondary',
      variant: 'filled',
      margin: 'dense',
      MenuProps: {
        disableScrollLock: true,
      },
    },
    // MuiFormControlLabel: {
    //   labelPlacement: 'start',
    // },
    MuiTabs: {
      indicatorColor: 'secondary',
      textColor: 'secondary',
    },
    MuiTypography: {
      // @ts-expect-error
      component: 'span',
    },
    MuiButton: {
      color: 'secondary',
      variant: 'contained',
    },
    MuiLinearProgress: {
      color: 'secondary',
    },
    MuiMenu: {
      disableScrollLock: true,
    },
    MuiDialog: {
      disableScrollLock: true,
    },
  },
});

export default theme;
