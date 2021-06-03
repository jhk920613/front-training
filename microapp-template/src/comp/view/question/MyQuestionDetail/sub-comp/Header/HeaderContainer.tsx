import React, { ContextType } from 'react';
import { observer } from 'mobx-react';
import { autobind, DramaException, ReactComponent, ServiceInjector } from '@nara.drama/prologue';
import { dialog } from '@nara.platform/react-ui';

import { Question } from '~/comp/api';
import { QuestionStateKeeper } from '~/comp/state';
import { SubMenu } from '~/comp/view/shared';
import MyQuestionDetailContext from '../../context/MyQuestionDetailContext';
import HeaderView from './view/HeaderView';


interface Props {
  //
  onRemove?: () => void;
  onEdit?: () => void;
  renderAction?: ((question: Question) => React.ReactNode) | React.ReactNode;
}

@autobind
@observer
class HeaderContainer extends ReactComponent<Props> {
  //
  static defaultProps = {
    onRemove: () => {},
    onEdit: () => {},
    renderAction: undefined,
  };

  static contextType = MyQuestionDetailContext;

  context!: ContextType<typeof MyQuestionDetailContext>;

  onClickEdit(event: React.MouseEvent) {
    //
    this.propsWithDefault.onEdit();
  }

  onClickAnsweredQuestionEdit(event: React.MouseEvent) {
    //
    dialog.alert({
      title: '질문 수정 불가',
      noticeType: dialog.NoticeType.Info,
      message: '답변이 등록된 질문은 수정할 수 없습니다.',
    });
  }

  async onClickRemove(event: React.MouseEvent) {
    //
    const { question } = this.context.questionDetail;

    if (!question) {
      throw new DramaException('QuestionDetail - Header', 'Question should not be null.');
    }

    this.propsWithDefault.onRemove();
  }

  renderAction(question: Question) {
    //
    const { renderAction } = this.props;
    let action = renderAction;

    if (typeof renderAction === 'undefined') {
      action = (
        <SubMenu
          onClickEdit={!question.answerSummary ? this.onClickEdit : this.onClickAnsweredQuestionEdit}
          onClickRemove={this.onClickRemove}
        />
      );
    }
    else if (typeof renderAction === 'function') {
      action = renderAction(question);
    }

    return action;
  }

  render() {
    //
    const { question } = this.context.questionDetail;

    return (
      <HeaderView
        question={question}
        renderAction={this.renderAction}
      />
    );
  }
}

export default ServiceInjector.useContext(
  QuestionStateKeeper
)(HeaderContainer);
