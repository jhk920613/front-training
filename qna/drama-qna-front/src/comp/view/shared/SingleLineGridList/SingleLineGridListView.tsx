import React from 'react';
import { autobind, ReactComponent } from '@nara.drama/prologue';

import { GridList } from '@nara.platform/react-ui';
import { WithStyles, withStyles } from './style';


interface Props extends WithStyles {
  children: React.ReactNode;
}

@autobind
class SingleLineGridListView extends ReactComponent<Props> {
  //
  render() {
    //
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          {children}
        </GridList>
      </div>
    );
  }
}

export default withStyles(SingleLineGridListView);
