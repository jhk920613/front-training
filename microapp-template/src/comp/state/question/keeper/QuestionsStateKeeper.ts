import {
  mobxService,
  NotInstantiatedException,
  Offset,
  OffsetElementList,
  Operator,
  QueryParam,
  makeExtendedObservable,
} from '@nara.drama/prologue';

import { runInAction } from 'mobx';
import {
  FindQuestionsByTagsQuery,
  Question,
  QuestionFlowQueryApiStub,
  QuestionQueryApiStub,
  QuestionsDynamicQuery,
} from '~/comp/api';


@mobxService
class QuestionsStateKeeper {
  static readonly instanceName: string = 'questionsStateKeeper';
  static readonly serviceName: string = 'qna.question.questionsStateKeeper';
  static instance: QuestionsStateKeeper;

  private readonly questionQueryApi: QuestionQueryApiStub;
  private readonly questionFlowQueryApi: QuestionFlowQueryApiStub;

  groupId: string = '';

  questions: Question[] = [];

  totalCount: number = 0;

  constructor(
    questionQueryApi: QuestionQueryApiStub = QuestionQueryApiStub.instance,
    questionFlowQueryApi: QuestionFlowQueryApiStub = QuestionFlowQueryApiStub.instance
  ) {
    this.questionQueryApi = questionQueryApi;
    this.questionFlowQueryApi = questionFlowQueryApi;

    makeExtendedObservable(this);
  }

  setQuestionProp(index: number, name: keyof Question, value: any) {
    if (!this.questions || this.questions[index]) {
      throw new NotInstantiatedException('QuestionsStateKeeper.setQuestionProp', `questions[${index}] is null`);
    }
    (this.questions[index] as any)[name] = value;
  }

  clear() {
    this.questions = [];
  }

  setGroupId(groupId: string) {
    this.groupId = groupId;
  }

  async findQuestions(offset: Offset): Promise<OffsetElementList<Question>> {
    const questionsDynamicQuery = QuestionsDynamicQuery.oneParam<Question[]>(
      QueryParam.endParam('groupId', Operator.Equal, this.groupId)
    );

    questionsDynamicQuery.offset = offset;

    const offsetElementList = await this.questionQueryApi.executeQuestionsPagingDynamicQuery(questionsDynamicQuery);

    runInAction(() => {
      this.questions = offsetElementList.results;
      this.totalCount = offsetElementList.totalCount;
    });
    return offsetElementList;
  }

  async findQuestionsByIds(ids: string[], offset: Offset): Promise<OffsetElementList<Question>> {
    const questionsDynamicQuery = QuestionsDynamicQuery.multiParams<Question[]>(
      QueryParam.endParam('id', Operator.In, this.arrayToString(ids))
    );

    questionsDynamicQuery.offset = offset;

    const offsetElementList = await this.questionQueryApi.executeQuestionsPagingDynamicQuery(questionsDynamicQuery);

    runInAction(() => {
      this.questions = offsetElementList.results;
      this.totalCount = offsetElementList.totalCount;
    });

    return offsetElementList;
  }

  async findQuestionsByTags(tags: string[], offset: Offset): Promise<OffsetElementList<Question>> {
    //
    const query = FindQuestionsByTagsQuery.byQuery(this.groupId, tags, offset);

    const offsetElementList = await this.questionFlowQueryApi.findQuestionsByTagsWithPaging(query);

    runInAction(() => {
      this.questions = offsetElementList.results;
      this.totalCount = offsetElementList.totalCount;
    });
    return offsetElementList;
  }

  private arrayToString(values: string[]): string {
    const valuesString = values.map(value => `\\"${value}\\"`).toString();
    return `[${valuesString}]`;
  }

}

QuestionsStateKeeper.instance = new QuestionsStateKeeper();

export default QuestionsStateKeeper;
