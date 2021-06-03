
import { createStyles, Theme, WithStyles as MuiWithStyles, withStyles as muiWithStyles } from '@material-ui/core/styles';


const style = (theme: Theme) => createStyles({
  imgWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    '& > img': {
      width: '200px',
      maxHeight: '300px',
    },
  },
});

export default style;
export type WithStyles = MuiWithStyles<typeof style>;
export const withStyles = muiWithStyles(style);
