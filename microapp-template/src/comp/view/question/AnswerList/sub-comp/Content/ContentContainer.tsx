import React, { ContextType } from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.drama/prologue';
import { dialog } from '@nara.platform/react-ui';

import { Answer } from '~/comp/api';
import { AnswersStateKeeper, AnswerStateKeeper } from '~/comp/state';
import AnswerListContext from '../../context/AnswerListContext';
import AnswerListView from './view/AnswerListView';


interface Props {
  //
  onClick?: (event: React.MouseEvent, answer: Answer) => void;
  onSuccess?: () => void;
  onFail?: () => void;
}

interface InjectedProps {
  //
  answersStateKeeper: AnswersStateKeeper;
  answerStateKeeper: AnswerStateKeeper;
}


@autobind
@observer
class ContentContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    onClick: () => {},
    onSuccess: () => {},
    onFail: () => {},
  };

  static contextType = AnswerListContext;

  context!: ContextType<typeof AnswerListContext>;


  onClickEdit(index: number) {
    //
    const { answersStateKeeper } = this.injected;

    answersStateKeeper.setAnswerProp(index, 'editing', true);
  }

  async onClickRemove(id: string) {
    //
    const { onSuccess, onFail } = this.propsWithDefault;
    const { answerList } = this.context;
    const { answerStateKeeper } = this.injected;

    const confirmed = await dialog.confirm({ title: '삭제', message: '답변을 삭제 하시겠습니까?' });

    if (!confirmed) {
      return;
    }

    const response = await answerStateKeeper.remove(id);

    if (response.entityIds.length) {
      onSuccess();
    }
    else {
      onFail();
    }

    answerList.init();
  }

  render() {
    //
    const { answerList } = this.context;
    const { onClick } = this.propsWithDefault;
    const { answersStateKeeper } = this.injected;
    const { answers } = answersStateKeeper;

    return (
      <AnswerListView
        userId={answerList.userId}
        answers={answers}
        onClick={onClick}
        onClickEdit={this.onClickEdit}
        onClickRemove={this.onClickRemove}
      />
    );
  }
}

export { ContentContainer };
export default ServiceInjector.useContext(
  AnswersStateKeeper,
  AnswerStateKeeper
)(ContentContainer);
