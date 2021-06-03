
import React from 'react';
import { StoryComponent, storyLogger, withStory } from '@nara.platform/storybook';
import { Question, CoachQuestionList } from '@nara.drama/qna';


export const onClick = withStory(
  //
  class Story extends StoryComponent {
    //
    onClick(event: React.MouseEvent, question: Question) {
      //
      storyLogger(CoachQuestionList, 'onClick', {
        question,
      });
    }

    render() {
      //
      return (
        <CoachQuestionList
          groupId="posco"
        >
          <CoachQuestionList.Header />
          <CoachQuestionList.Content onClick={this.onClick} />
          <CoachQuestionList.Pagination />
        </CoachQuestionList>
      );
    }
  },
);

onClick.storyName = 'onClick';
onClick.parameters = {};
