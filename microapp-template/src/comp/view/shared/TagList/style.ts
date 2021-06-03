
import { createStyles, Theme, WithStyles as MuiWithStyles, withStyles as muiWithStyles } from '@material-ui/core/styles';


const style = (theme: Theme) => createStyles({
  chips: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    minHeight: theme.spacing(6),
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '& > div': {
      backgroundColor: 'transparent',
    },
  },
});

export default style;
export type WithStyles = MuiWithStyles<typeof style>;
export const withStyles = muiWithStyles(style);
