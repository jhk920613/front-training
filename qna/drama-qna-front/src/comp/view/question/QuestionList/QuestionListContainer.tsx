import React, { ContextType } from 'react';
import { observer } from 'mobx-react';
import { autobind, Offset, ReactComponent, ServiceInjector, SortDirection } from '@nara.drama/prologue';
import { AutoPagination, AutoPaginationTypes } from '@nara.platform/react-ui';
import { QuestionsStateKeeper } from '~/comp/state';
import QuestionListContext, { QuestionListContextModel } from './context/QuestionListContext';


interface Props {
  //
  readerId: string;
  groupId: string;
  groupTags?: string[];
  limit?: number;
  onInit?: (totalCount: number) => void;
  refreshTrigger?: boolean;
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
class QuestionListContainer extends ReactComponent<Props, State, InjectedProps> {
  //
  static defaultProps = {
    limit: 15,
    onInit: () => {},
    groupTags: [],
  };

  static contextType = AutoPagination.Context;

  context!: ContextType<typeof AutoPagination.Context>;

  state: State = {
    tags: [],
    sortDirection: SortDirection.Descending,
  };

  componentDidMount() {
    //
    const { groupId } = this.props;

    this.injected.questionsStateKeeper.setGroupId(groupId);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    //
    const { groupId, groupTags, refreshTrigger } = this.props;

    const willRefresh = prevProps.refreshTrigger !== refreshTrigger;

    if (groupId !== prevProps.groupId || groupTags !== prevProps.groupTags || willRefresh) {
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
    const { readerId, groupId } = this.props;
    const { groupTags } = this.propsWithDefault;
    const { sortDirection, tags } = this.state;

    return {
      questionList: {
        readerId,
        groupId,
        groupTags,
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
    this.setState({ sortDirection });
    const { limit } = this.propsWithDefault;
    const pagination = this.context;
    const { questionsStateKeeper } = this.injected;
    const targetOffset = new Offset(0, limit, sortDirection);

    targetOffset.sortingField = 'creationTime';

    await this.findQuestions(targetOffset);

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
    const { groupTags } = this.propsWithDefault;
    const { tags } = this.state;
    const { questionsStateKeeper } = this.injected;

    if (tags.length || groupTags.length) {
      const tagFilters = tags.concat(groupTags);

      await questionsStateKeeper.findQuestionsByTags(tagFilters, offset);
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
        <QuestionListContainer {...otherProps}>
          {children}
        </QuestionListContainer>
      </AutoPagination.Provider>
    );
  }
}

export { QuestionListContainer };
export default ServiceInjector.withContext(
  QuestionsStateKeeper
)(QuestionListWithPagination);
