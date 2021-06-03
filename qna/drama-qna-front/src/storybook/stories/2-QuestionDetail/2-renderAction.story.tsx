
import React from 'react';
import { observer } from 'mobx-react';
import { storyLogger, withStory } from '@nara.platform/storybook';
import { autobind, ReactComponent, ServiceInjector } from '@nara.drama/prologue';
import { Question, QuestionDetail, QuestionStateKeeper } from '@nara.drama/qna';
import { Bookmark } from '@material-ui/icons';


interface InjectedProps {
  //
  questionStateKeeper: QuestionStateKeeper;
}

export const renderAction = withStory(() => {
  //
  @autobind
  @observer
  class Story extends ReactComponent<{}, {}, InjectedProps> {
    //
    private questionId = '2af9e3da-f8df-413e-a8b0-b5b0d97dd76e';

    componentDidMount() {
      this.init();
    }

    init() {
      //
      const { questionStateKeeper } = this.injected;

      questionStateKeeper.findQuestionById(this.questionId);
    }

    onClickEdit(event: React.MouseEvent, question: Question) {
      //
      storyLogger(QuestionDetail, 'onClickEdit', {
        event,
        question,
      });
    }

    onClickRemove(event: React.MouseEvent, question: Question) {
      //
      storyLogger(QuestionDetail, 'onClickRemove', {
        event,
        question,
      });
    }

    renderAction(question: Question) {
      //
      return (
        <Bookmark />
      );
    }

    render() {
      //
      const { question } = this.injected.questionStateKeeper;

      if (!question) {
        return null;
      }

      return (
        <QuestionDetail question={question}>
          <QuestionDetail.Header renderAction={this.renderAction} />
          <QuestionDetail.Content />
          <QuestionDetail.AnswerSummary />
        </QuestionDetail>
      );
    }
  }

  return ServiceInjector.withContext(QuestionStateKeeper)(Story);
});

renderAction.storyName = 'renderAction';
renderAction.parameters = {};
