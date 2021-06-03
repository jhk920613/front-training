
import React from 'react';
import { StoryComponent, withStory } from '@nara.platform/storybook';
import { Card } from '@nara.platform/react-ui';
import { CoachQuestionList } from '@nara.drama/qna';


export const basic = withStory(
  //
  class Story extends StoryComponent {
    //
    render() {
      //
      return (
        <CoachQuestionList
          groupId="testGroup"
        >
          <CoachQuestionList.Header />
          <Card>
            <Card.Content>
              <CoachQuestionList.Content />
              <CoachQuestionList.Pagination />
            </Card.Content>
          </Card>
        </CoachQuestionList>
      );
    }
  },
);

basic.storyName = 'basic';
basic.parameters = {};
