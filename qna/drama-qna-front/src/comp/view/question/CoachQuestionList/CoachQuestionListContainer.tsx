import React, { ContextType } from 'react';
import { observer } from 'mobx-react';
import { autobind, Offset, ReactComponent, ServiceInjector, SortDirection } from '@nara.drama/prologue';
import { AutoPagination, AutoPaginationTypes } from '@nara.platform/react-ui';
import { QuestionsStateKeeper } from '~/comp/state';
import QuestionListContext, { QuestionListContextModel } from './context/QuestionListContext';


interface Props {
  //
  groupId: string;
  limit?: number;
  onInit?: (totalCount: number) => void;
}

interface State {
  tags: string[];
  sortDirection: SortDirection;
}

interface InjectedProps {
  //
  questionsStateKeeper: QuestionsStateKeeper;
}

@autobind
@observer
class CoachQuestionListContainer extends ReactComponent<Props, State, InjectedProps> {
  //
  static defaultProps = {
    limit: 15,
    onInit: () => {},
  };

  static contextType = AutoPagination.Context;

  context!: ContextType<typeof AutoPagination.Context>;

  state: State = {
    tags: [],
    sortDirection: SortDirection.Descending,
  };

  componentDidMount() {
    const { groupId } = this.props;

    this.injected.questionsStateKeeper.setGroupId(groupId);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    //
    const { groupId } = this.props;

    if (groupId !== prevProps.groupId) {
      this.injected.questionsStateKeeper.setGroupId(groupId);

      const { limit } = this.context;
      const { sortDirection } = this.state;
      const targetOffset = new Offset(0, limit, sortDirection);

      targetOffset.sortingField = 'creationTime';
      this.findQuestions(targetOffset);
    }
  }

  getContext(): QuestionListContextModel {
    //
    const { groupId } = this.props;
    const { sortDirection, tags } = this.state;

    return {
      questionList: {
        groupId,
        sortDirection,
        onChangeSortDirection: this.onChangeSortDirection,
        tags,
        onAddTag: this.onAddTag,
        onRemoveTag: this.onRemoveTag,
      },
    };
  }

  async onChange(params: AutoPaginationTypes.AutoPaginationParams) {
    //
    const { offset, limit, setTotalCount } = params;
    const { sortDirection } = this.state;
    const { questionsStateKeeper } = this.injected;
    const targetOffset = new Offset(offset, limit, sortDirection);

    targetOffset.sortingField = 'creationTime';

    await this.findQuestions(targetOffset);

    setTotalCount(questionsStateKeeper.totalCount);
  }

  async onChangeSortDirection(sortDirection: SortDirection) {
    //
    const { limit } = this.propsWithDefault;
    const pagination = this.context;
    const { questionsStateKeeper } = this.injected;
    const targetOffset = new Offset(0, limit, sortDirection);

    targetOffset.sortingField = 'creationTime';

    await this.findQuestions(targetOffset);

    this.setState({ sortDirection });
    pagination.setPage(1);
    pagination.setItemCount(questionsStateKeeper.totalCount);
  }

  async onAddTag(tag: string) {
    //
    const { tags } = this.state;
    const newTags = tags.includes(tag) ? tags : [...tags, tag];

    await this.findQuestionsByTags(newTags);
  }

  async onRemoveTag(tag: string) {
    //
    const { tags } = this.state;
    const newTags = [ ...tags.filter((item) => item !== tag) ];

    await this.findQuestionsByTags(newTags);
  }

  async findQuestionsByTags(tags: string[]) {
    //
    this.setState(() => ({
      tags,
    }));

    const { sortDirection } = this.state;
    const { limit } = this.propsWithDefault;
    const { questionsStateKeeper } = this.injected;
    const offset = new Offset(0, limit, sortDirection);

    offset.sortingField = 'creationTime';


    if (tags.length) {
      await questionsStateKeeper.findQuestionsByTags(tags, offset);
    }
    else {
      await questionsStateKeeper.findQuestions(offset);
    }
  }

  async findQuestions(offset: Offset) {
    //
    const { tags } = this.state;
    const { questionsStateKeeper } = this.injected;

    if (tags.length) {
      await questionsStateKeeper.findQuestionsByTags(tags, offset);
    }
    else {
      await questionsStateKeeper.findQuestions(offset);
    }
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
        <QuestionListContext.Provider value={this.getContext()}>
          {children}
        </QuestionListContext.Provider>
      </AutoPagination>
    );
  }
}

class QuestionListWithPagination extends ReactComponent<Props> {
  //
  render() {
    //
    const { children, ...otherProps } = this.props;

    return (
      <AutoPagination.Provider>
        <CoachQuestionListContainer {...otherProps}>
          {children}
        </CoachQuestionListContainer>
      </AutoPagination.Provider>
    );
  }
}

export { CoachQuestionListContainer };
export default ServiceInjector.withContext(
  QuestionsStateKeeper
)(QuestionListWithPagination);
