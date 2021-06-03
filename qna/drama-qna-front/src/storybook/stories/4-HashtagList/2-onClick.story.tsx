import React from 'react';
import { StoryComponent, storyLogger, withStory } from '@nara.platform/storybook';
import { HashtagList } from '@nara.drama/qna';


export const onClick = withStory(
  //
  class Story extends StoryComponent {
    //
    onClick(event: React.MouseEvent, tag: string) {
      //
      storyLogger(HashtagList, 'onClick', {
        tag,
      });
    }

    render() {
      //
      return (
        <HashtagList
          onClick={this.onClick}
        />
      );
    }
  },
);

onClick.storyName = 'onClick';
onClick.parameters = {};
