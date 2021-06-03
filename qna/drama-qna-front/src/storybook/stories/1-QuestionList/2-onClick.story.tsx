
import React from 'react';
import { StoryComponent, storyLogger, withStory } from '@nara.platform/storybook';
import { Question, QuestionList } from '@nara.drama/qna';


export const onClick = withStory(
  //
  class Story extends StoryComponent {
    //
    onClick(event: React.MouseEvent, question: Question) {
      //
      storyLogger(QuestionList, 'onClick', {
        question,
      });
    }

    render() {
      //
      return (
        <QuestionList
          groupId="posco"
          readerId="testWriter"
        >
          <QuestionList.Header />
          <QuestionList.Content onClick={this.onClick} />
          <QuestionList.Pagination />
        </QuestionList>
      );
    }
  },
);

onClick.storyName = 'onClick';
onClick.parameters = {};
