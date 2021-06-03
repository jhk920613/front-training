import React from 'react';
import {StoryComponent, storyLogger, withStory} from '@nara.platform/storybook';
import { QuestionForm, Writer } from '@nara.drama/qna';
import {Typography} from '@nara.platform/react-ui';


export const basic = withStory(
  //
  class Story extends StoryComponent {
    //
    private groupId = 'testGroup';
    private writerId = 'testWriter';
    private writer = new Writer('Jang Mihyeon', false);
    private audienceKey = '1@1:1:1';
    private questionId = 'd8043624-99dd-4bae-a66e-a5453d99bb36';

    onSuccess() {
      //
      console.log('성공');
    }

    onFail() {
      //
      console.log('실패');
    }

    render() {
      //
      return (
        <>
          <Typography>
            questionId 가 없는 경우
          </Typography>
          <QuestionForm
            groupId={this.groupId}
            writerId={this.writerId}
            writer={this.writer}
            audienceKey={this.audienceKey}
            onSuccess={this.onSuccess}
            onFail={this.onFail}
          />
          <Typography>
            questionId 가 있는 경우
          </Typography>
          <QuestionForm
            groupId={this.groupId}
            writerId={this.writerId}
            writer={this.writer}
            audienceKey={this.audienceKey}
            questionId={this.questionId}
          />
        </>
      );
    }
  }
);

basic.storyName = 'basic';
basic.parameters = {};
