import React from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';

import { Answer } from '~/comp/api';
import AnswerDetailView from './AnswerDetailView';


interface Props {
  userId: string;
  answers: Answer[];
  onClick: (event: React.MouseEvent, answer: Answer) => void;
  onClickEdit: (index: number) => void;
  onClickRemove: (id: string) => void;
}

@autobind
@observer
class AnswerListView extends ReactComponent<Props> {
  //
  render() {
    const { userId, answers, onClick, onClickEdit, onClickRemove } = this.props;

    return answers.map((answer, index ) => (
      <AnswerDetailView
        key={index}
        index={index}
        userId={userId}
        answer={answer}
        onClick={onClick}
        onClickEdit={onClickEdit}
        onClickRemove={onClickRemove}
      />
    ));
  }
}

export default AnswerListView;
