import React, { ContextType } from 'react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { observer } from 'mobx-react';
import { AutoPagination } from '@nara.platform/react-ui';


@autobind
@observer
class PaginationContainer extends ReactComponent {
  //
  static contextType = AutoPagination.Context;

  context!: ContextType<typeof AutoPagination.Context>;


  render() {
    //
    const pagination = this.context;

    if (pagination.itemCount === 0) {
      return null;
    }

    return (
      <AutoPagination.Navigation
        color="primary"
        showFirstButton
        showLastButton
      />
    );
  }
}

export default PaginationContainer;
