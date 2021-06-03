
import React from 'react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { observer } from 'mobx-react';

import { FormControl, Grid } from '@nara.platform/react-ui';
import { GridProps } from '@material-ui/core';


interface Props {
  //
  label: string;
  children: React.ReactNode;
  xs?: GridProps['xs'];
}

@autobind
@observer
class FormViewerView extends ReactComponent<Props> {
  //
  static defaultProps = {
    xs: 3,
  };

  render() {
    //
    const { label, children } = this.props;
    const { xs } = this.propsWithDefault;

    return (
      <>
        <Grid item xs={xs}>
          <FormControl.Label>{label}</FormControl.Label>
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </>
    );
  }
}

export default FormViewerView;
