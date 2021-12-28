import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  overrides: {
    MUIDataTableToolbar: {
      actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
    },
    MuiPaper: {
      elevation4: {
        background: 'none',
        boxShadow: 'none!important',
      },
      root: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
      },
    },
    MuiTab: {
      root: {
        backgroundColor: '#fff',
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: '#fff',
      },
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: '#fff',
        lineHeight: '1rem',
      },
    },
    MUIDataTableSelectCell: {
      headerCell: {
        backgroundColor: '#fff',
      },
    },
    MuiMenu: {
      paper: {
        boxShadow: 'none',
        background: '#ffffff',
      },
    },
    MUIDataTableBodyRow: {
      root: {
        background: '#ffffff',
        '& .row-actions': {
          visibility: 'hidden',
        },
        '&:hover': {
          '& .row-actions': {
            visibility: 'visible',
          },
        },
      },
    },
    MUIDataTableFilterList: {
      root: {
        marginBottom: '1rem',
      },
    },
    MUIDataTableBodyCell: {
      root: {
        /* maxWidth: '500px', */
        overflow: 'hidden',
      },
    },
    MuiPopover: {
      paper: {
        height: 'auto',
      },
    },
  },
});

export default theme;
