
import { createStyles, Theme, WithStyles as MuiWithStyles, withStyles as muiWithStyles } from '@material-ui/core/styles';


const style = (theme: Theme) => createStyles({
  action: {
    backgroundColor: '#F0F8FF',
    width: '100%',
    borderRadius: '4px',
  },
});

export default style;
export type WithStyles = MuiWithStyles<typeof style>;
export const withStyles = muiWithStyles(style);
