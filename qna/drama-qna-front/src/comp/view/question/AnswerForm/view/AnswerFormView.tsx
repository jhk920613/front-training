
import React from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';

import { Answer } from '~/comp/api';
import { QuestionFormBase } from '~/comp/view/shared';


interface Props {
  answer: Answer;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.MouseEvent) => void;
  maxLength: number;
}


@autobind
@observer
class AnswerFormView extends ReactComponent<Props> {
  //
  render() {
    const { answer, onChange, onSubmit, maxLength } = this.props;

    return (
      <QuestionFormBase>
        <QuestionFormBase.Content
          name="message"
          value={answer.message}
          rows={3}
          onChange={onChange}
          placeholder="답변을 작성해 주세요."
        />
        <QuestionFormBase.Actions
          hideCamera
          valueLength={answer.message.length}
          maxLength={maxLength}
          onSubmit={onSubmit}
        />
        {/*<Box display="flex" alignItems="flex-end" justifyContent="space-between">*/}
        {/*</Box>*/}
      </QuestionFormBase>
    );
  }
}

export default AnswerFormView;
