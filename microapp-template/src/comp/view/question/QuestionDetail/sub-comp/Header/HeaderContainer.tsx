import React, { ContextType } from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.drama/prologue';

import { Question } from '~/comp/api';
import { QuestionStateKeeper } from '~/comp/state';
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

  onComplete(success: boolean) {
    //
    const { onRemove } = this.propsWithDefault;

    onRemove(success);
  }

  render() {
    //
    const { question } = this.context.questionDetail;

    return (
      <HeaderView
        question={question}
      />
    );
  }
}

export default ServiceInjector.useContext(
  QuestionStateKeeper
)(HeaderContainer);
