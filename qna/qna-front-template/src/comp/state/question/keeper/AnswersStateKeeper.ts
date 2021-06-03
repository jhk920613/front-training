import {
  NotInstantiatedException,
  Offset,
  OffsetElementList,
  Operator,
  QueryParam,
} from '@nara.drama/prologue';

import { makeAutoObservable, runInAction } from 'mobx';
import { Answer, AnswerQueryApiStub, AnswersDynamicQuery } from 'comp/api';


class AnswersStateKeeper {
  static readonly instanceName: string = 'answersStateKeeper';
  static readonly serviceName: string = 'qna.question.answersStateKeeper';
  static instance: AnswersStateKeeper;

  private readonly answerQueryApi: AnswerQueryApiStub;

  answers: Answer[] = [];

  constructor(
    answerQueryApi: AnswerQueryApiStub = AnswerQueryApiStub.instance
  ) {
    this.answerQueryApi = answerQueryApi;

    makeAutoObservable(this);
  }

  setAnswerProp(index: number, name: keyof Answer, value: any) {
    if (!this.answers || this.answers[index]) {
      throw new NotInstantiatedException('AnswersStateKeeper.setAnswerProp', `answers[${index}] is null`);
    }
    (this.answers[index] as any)[name] = value;
  }

  clear() {
    this.answers = [];
  }

  async findAnswers(offset: number, limit: number): Promise<OffsetElementList<Answer>> {
    const answersDynamicQuery = AnswersDynamicQuery.multiParams<Answer[]>(
      QueryParam.endParam('id', Operator.Equal, '*')
    );

    answersDynamicQuery.offset = Offset.newAscending(offset, limit);
    answersDynamicQuery.offset.sortingField = 'id';

    const offsetElementList = await this.answerQueryApi.executeAnswersPagingDynamicQuery(answersDynamicQuery);

    runInAction(() =>
      this.answers = offsetElementList.results
    );
    return offsetElementList;
  }

  async findAnswersByIds(ids: string[], offset: Offset): Promise<OffsetElementList<Answer>> {
    const answersDynamicQuery = AnswersDynamicQuery.multiParams<Answer[]>(
      QueryParam.endParam('id', Operator.In, this.arrayToString(ids))
    );

    answersDynamicQuery.offset = offset;

    const offsetElementList = await this.answerQueryApi.executeAnswersPagingDynamicQuery(answersDynamicQuery);

    runInAction(() =>
      this.answers = offsetElementList.results
    );
    return offsetElementList;
  }

  async findAnswersByQuestionId(questionId: string, offset: Offset): Promise<OffsetElementList<Answer>> {
    //
    const query = AnswersDynamicQuery.oneParam<Answer[]>(
      QueryParam.endParam('questionId', Operator.Equal, questionId)
    );

    query.offset = offset;

    const offsetElementList = await this.answerQueryApi.executeAnswersPagingDynamicQuery(query);

    runInAction(() =>
      this.answers = offsetElementList.results
    );
    return offsetElementList;
  }

  private arrayToString(values: string[]): string {
    const valuesString = values.map(value => `\\"${value}\\"`).toString();
    return `[${valuesString}]`;
  }

}

AnswersStateKeeper.instance = new AnswersStateKeeper();

export default AnswersStateKeeper;
