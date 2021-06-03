
import React from 'react';
import { StoryComponent, withStory } from '@nara.platform/storybook';
import { HashtagList } from '@nara.drama/qna';


export const basic = withStory(
  //
  class Story extends StoryComponent {
    //
    render() {
      //
      return (
        <HashtagList />
      );
    }
  },
);

basic.storyName = 'basic';
basic.parameters = {};
