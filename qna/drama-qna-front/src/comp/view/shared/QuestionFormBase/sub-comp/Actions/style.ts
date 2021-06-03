
import { createStyles, Theme, WithStyles as MuiWithStyles, withStyles as muiWithStyles } from '@material-ui/core/styles';


const style = (theme: Theme) => createStyles({
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
});

export default style;
export type WithStyles = MuiWithStyles<typeof style>;
export const withStyles = muiWithStyles(style);
