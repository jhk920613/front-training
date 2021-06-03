import React from 'react';
import { NextRouter, withRouter } from 'next/router';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { QuestionForm, Writer } from '@posco/qna';
import {Typography} from '@nara.platform/react-ui';

interface Props {
  router: NextRouter;
  writer: Writer;
}

@autobind
class IndexPage extends ReactComponent<Props> {
  //
  onSuccess() {
    //
    const { router } = this.props;

    router.push('/question/list')
  }

  render() {
    //
    const groupId = 'testGroup';
    const writerId = 'testWriter';
    const writer = new Writer('Jang Mihyeon', false);
    const audienceKey = '1@1:1:1';

    return (
      <>
        <Typography>질문 등록 페이지입니다.</Typography>
        <QuestionForm
          groupId={groupId}
          writerId={writerId}
          writer={writer}
          audienceKey={audienceKey}
          onSuccess={this.onSuccess}
        />
      </>
    );
  }
}

@autobind
class TempPage extends ReactComponent<Props> {
  //
  onSuccess() {
    //
    const { router } = this.props;

    router.push('/question/list')
  }

  render() {
    //
    const groupId = 'testGroup';
    const writerId = 'testWriter';
    const writer = new Writer('Jang Mihyeon', false);
    const audienceKey = '1@1:1:1';

    return (
      <>
        <Typography>질문 등록 페이지입니다.</Typography>
      </>
    );
  }
}

export default withRouter(IndexPage);
