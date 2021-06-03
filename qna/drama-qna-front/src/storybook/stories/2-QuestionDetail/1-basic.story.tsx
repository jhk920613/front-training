
import React from 'react';
import { observer } from 'mobx-react';
import { withStory } from '@nara.platform/storybook';
import { QuestionDetail, QuestionStateKeeper } from '@nara.drama/qna';
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


    render() {
      //
      const { question } = this.injected.questionStateKeeper;

      if (!question) {
        return null;
      }

      return (
        <QuestionDetail question={question}>
          <QuestionDetail.Header />
          <QuestionDetail.Content />
          <QuestionDetail.AnswerSummary />
        </QuestionDetail>
      );
    }
  }

  return ServiceInjector.withContext(QuestionStateKeeper)(Story);
});

basic.storyName = 'basic';
basic.parameters = {};
