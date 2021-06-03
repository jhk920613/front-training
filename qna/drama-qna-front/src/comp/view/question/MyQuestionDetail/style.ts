
import { createStyles, Theme, WithStyles as MuiWithStyles, withStyles as muiWithStyles } from '@material-ui/core/styles';


const style = (theme: Theme) => createStyles({
  action: {
    backgroundColor: '#ebf5ff',
    width: '100%',
  },
});

export default style;
export type WithStyles = MuiWithStyles<typeof style>;
export const withStyles = muiWithStyles(style);
