
import React from 'react';
import { StoryComponent, withStory } from '@nara.platform/storybook';
import { QuestionList } from '@nara.drama/qna';
import { Card } from '@nara.platform/react-ui';


export const basic = withStory(
  //
  class Story extends StoryComponent {
    //
    render() {
      //
      return (
        <QuestionList
          groupId="testGroup"
          readerId="testWriter"
        >
          <QuestionList.Header />
          <Card>
            <Card.Content>
              <QuestionList.Content />
              <QuestionList.Pagination />
            </Card.Content>
          </Card>
        </QuestionList>
      );
    }
  },
);

basic.storyName = 'basic';
basic.parameters = {};
