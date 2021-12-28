import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    '& div': {
      paddingTop: '6px !important',
      paddingBottom: '5px !important',
      backgroundColor: '#ffffff',
      '&:hover': {
        backgroundColor: '#ffffff',
      },
      '& input': {
        paddingLeft: '5px !important',
      },
      '& div': {
        paddingTop: '0px !important',
        paddingBottom: '1px !important',
      },
    },
  },
}));

export default useStyles;
