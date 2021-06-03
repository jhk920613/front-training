import React from 'react';
import { NextRouter, withRouter } from 'next/router';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import {QuestionForm, Writer} from '@posco/qna';
import {Button} from '@nara.platform/react-ui';


interface Props {
  router: NextRouter;
}

interface State {
  showModal: boolean;
}

@autobind
class QuestionPage extends ReactComponent<Props, State> {
  //
  constructor(props: Props) {
    super(props);

    this.state = { showModal: false };
  }

  onSuccess() {
    //
    this.setState({ showModal: false });
  }

  onFail() {
    //
  }

  onClickButton() {
    //
    this.setState({ showModal: true });
  }

  goToRegisterPage() {
    //
    const { router } = this.props;

    router.push('/question/new');
  }

  render() {
    //
    const groupId = 'testGroup';
    const writerId = 'testWriter';
    const writer = new Writer('Jang Mihyeon', false);
    const audienceKey = '1@1:1:1';
    const { showModal } = this.state;

    return (
      <div>
        <Button onClick={this.onClickButton}>질문하기</Button>
        <Button onClick={this.goToRegisterPage}>질문하러 가기</Button>
        <Dialog open={showModal}>
          <DialogTitle>
            질문해주세요.
          </DialogTitle>
          <DialogContent>
            <QuestionForm
              groupId={groupId}
              writerId={writerId}
              writer={writer}
              audienceKey={audienceKey}
              onSuccess={this.onSuccess}
              onFail={this.onFail}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(QuestionPage);
