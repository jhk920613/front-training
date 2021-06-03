import React, { ContextType } from 'react';
import { observer } from 'mobx-react';
import { autobind, DramaException, ReactComponent, ServiceInjector } from '@nara.drama/prologue';

import { Question } from '~/comp/api';
import { QuestionStateKeeper } from '~/comp/state';
import { SubMenu } from '~/comp/view/shared';
import QuestionDetailContext from '../../context/QuestionDetailContext';
import HeaderView from './view/HeaderView';


interface Props {
  //
  onRemove?: (success: boolean) => void;
  renderAction?: ((question: Question) => React.ReactNode) | React.ReactNode;
}

interface InjectedProps {
  //
  questionStateKeeper: QuestionStateKeeper;
}

@autobind
@observer
class HeaderContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    onRemove: () => {},
    renderAction: undefined,
  };

  static contextType = QuestionDetailContext;

  context!: ContextType<typeof QuestionDetailContext>;

  async onClickRemove(event: React.MouseEvent) {
    //
    const { questionStateKeeper } = this.injected;
    const { question } = this.context.questionDetail;

    if (!question) {
      throw new DramaException('QuestionDetail - Header', 'Question should not be null.');
    }

    const response = await questionStateKeeper.remove(question.id);

    this.onComplete(!!response.entityIds.length);
  }

  onComplete(success: boolean) {
    //
    const { onRemove } = this.propsWithDefault;

    onRemove(success);
  }

  renderAction(question: Question) {
    //
    const { renderAction } = this.props;
    let action = renderAction;

    if (typeof renderAction === 'undefined') {
      action = (
        <SubMenu
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
