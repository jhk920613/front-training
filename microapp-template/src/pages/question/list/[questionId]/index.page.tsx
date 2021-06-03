import React from 'react';
import { NextRouter, withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { autobind, ReactComponent } from '@nara.drama/prologue';

interface Props {
  router: NextRouter;
}

const EditableQuestionDetail = dynamic<any>(
  () => import('@posco/qna').then(module => module.EditableQuestionDetail),
  { ssr: false }
);


@autobind
class QuestionDetailPage extends ReactComponent<Props> {
  //
  componentDidMount() {
    //
    this.getQuestionId();
  }

  getQuestionId() {
    //
    const { router } = this.props;
    const questionId = router.query.questionId as string;

    return questionId;
  }

  onSuccessEdit() {
    //
    const { router } = this.props;

    router.push('/question/list');
  }

  onSuccessRemove() {
    //
    const { router } = this.props;

    router.push('/question/list');
  }

  render() {
    //
    const questionId = this.getQuestionId();

    return (
      <>
        Editable Question DetailPage
        Question ID: {questionId}

        <EditableQuestionDetail
          questionId={questionId}
          onSuccessEdit={this.onSuccessEdit}
          onSuccessRemove={this.onSuccessRemove}
        />
      </>
    );
  }
}

export default withRouter(QuestionDetailPage);
