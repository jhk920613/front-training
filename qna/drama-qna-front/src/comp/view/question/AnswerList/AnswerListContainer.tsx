import React, { ContextType } from 'react';
import { observer } from 'mobx-react';
import { autobind, Offset, ReactComponent, ServiceInjector } from '@nara.drama/prologue';
import { AutoPagination, AutoPaginationTypes } from '@nara.platform/react-ui';

import { AnswersStateKeeper, AnswerStateKeeper } from '~/comp/state';
import AnswerListContext, { AnswerListContextModel } from './context/AnswerListContext';


interface Props {
  children: React.ReactNode;
  questionId: string;
  userId: string;
  limit?: number;
}

interface InjectedProps {
  //
  answersStateKeeper: AnswersStateKeeper;
  answerStateKeeper: AnswerStateKeeper;
}


@autobind
@observer
class AnswerListContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    limit: 15,
  };

  static contextType = AutoPagination.Context;

  context!: ContextType<typeof AutoPagination.Context>;

  async init() {
    //
    const pagination = this.context;
    const { questionId, limit } = this.propsWithDefault;
    const { answersStateKeeper } = this.injected;
    const offset = Offset.newDescending(0, limit, 'time');

    const answers = await answersStateKeeper.findAnswersByQuestionId(questionId, offset);

    pagination.setItemCount(answers.totalCount);
    pagination.setPage(1);
  }

  getContext(): AnswerListContextModel {
    //
    const { userId } = this.props;

    return {
      answerList: {
        userId,
        init: this.init,
      },
    };
  }

  async onChange(params: AutoPaginationTypes.AutoPaginationParams) {
    //
    const { offset, limit, setTotalCount } = params;
    const { questionId } = this.props;
    const { answersStateKeeper } = this.injected;
    const targetOffset = Offset.newDescending(offset, limit, 'time');

    const answers = await answersStateKeeper.findAnswersByQuestionId(questionId, targetOffset);

    setTotalCount(answers.totalCount);
  }

  render() {
    //
    const { children } = this.props;
    const { limit } = this.propsWithDefault;

    return (
      <AutoPagination
        defaultLimit={limit}
        onChange={this.onChange}
      >
        <AnswerListContext.Provider value={this.getContext()}>
          {children}
        </AnswerListContext.Provider>
      </AutoPagination>
    );
  }
}

class AnswerListWithPagination extends ReactComponent<Props> {
  //
  render() {
    //
    const { children, ...otherProps } = this.props;

    return (
      <AutoPagination.Provider>
        <AnswerListContainer {...otherProps}>
          {children}
        </AnswerListContainer>
      </AutoPagination.Provider>
    );
  }
}

export { AnswerListContainer };
export default ServiceInjector.withContext(
  AnswersStateKeeper,
  AnswerStateKeeper
)(AnswerListWithPagination);
