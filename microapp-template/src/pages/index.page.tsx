import React from 'react';
import { NextRouter, withRouter } from 'next/router';
import { autobind, ReactComponent } from '@nara.drama/prologue';

interface Props {
  router: NextRouter;
}

@autobind
class IndexPage extends ReactComponent<Props> {
  //
  componentDidMount() {
    //
    setTimeout(() => this.goToQuestion(), 2000);
  }

  goToQuestion() {
    //
    const { router } = this.props;

    router.push('/question');
  }

  render() {
    //
    return (
      <div>
        Hello, World!
      </div>
    );
  }
}


export default withRouter(IndexPage);
