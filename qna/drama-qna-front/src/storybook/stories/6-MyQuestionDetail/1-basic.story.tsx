
import React from 'react';
import { observer } from 'mobx-react';
import { withStory } from '@nara.platform/storybook';
import { MyQuestionDetail, QuestionStateKeeper } from '@nara.drama/qna';
import { autobind, ReactComponent, ServiceInjector } from '@nara.drama/prologue';


interface InjectedProps {
  //
  questionStateKeeper: QuestionStateKeeper;
}

export const basic = withStory(() => {
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

    editQuestion() {
      //
      const { questionStateKeeper } = this.injected;

      questionStateKeeper.setQuestionProp('editing', true);
    }

    render() {
      //
      const { question } = this.injected.questionStateKeeper;

      if (!question) {
        return null;
      }

      return (
        <MyQuestionDetail question={question}>
          <MyQuestionDetail.Header
            onEdit={this.editQuestion}
          />
          <MyQuestionDetail.Content />
          <MyQuestionDetail.AnswerSummary />
        </MyQuestionDetail>
      );
    }
  }

  return ServiceInjector.withContext(QuestionStateKeeper)(Story);
});

basic.storyName = 'basic';
basic.parameters = {};
