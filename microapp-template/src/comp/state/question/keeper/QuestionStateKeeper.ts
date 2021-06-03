
import {
  mobxService,
  NotInstantiatedException,
  CommandResponse,
  NameValueList,
  makeExtendedObservable,
} from '@nara.drama/prologue';

import { runInAction } from 'mobx';
import {
  QuestionApiStub,
  QuestionQueryApiStub,
  Question,
  QuestionCdo,
  QuestionQuery, QuestionFlowApiStub, Writer,
} from '~/comp/api';


@mobxService
class QuestionStateKeeper {
  static readonly instanceName: string = 'questionStateKeeper';
  static readonly serviceName: string = 'qna.question.questionStateKeeper';
  static instance: QuestionStateKeeper;

  private readonly questionApi: QuestionApiStub;
  private readonly questionFlowApi: QuestionFlowApiStub;
  private readonly questionQueryApi: QuestionQueryApiStub;

  question: Question | null = null;

  audienceKey: string | null = null;

  constructor(
    questionApi: QuestionApiStub = QuestionApiStub.instance,
    questionFlowApi: QuestionFlowApiStub = QuestionFlowApiStub.instance,
    questionQueryApi: QuestionQueryApiStub = QuestionQueryApiStub.instance
  ) {
    this.questionApi = questionApi;
    this.questionFlowApi = questionFlowApi;
    this.questionQueryApi = questionQueryApi;

    makeExtendedObservable(this);
  }

  init(groupId: string, writerId: string, writer?: Writer, audienceKey?: string, groupTags?: string[]) {
    this.question = Question.new(groupId, writerId, writer);
    this.question.hashtags = groupTags || [];
    this.audienceKey = audienceKey || null;
  }

  setQuestionProp(name: keyof Question, value: any) {
    if (!this.question) {
      throw new NotInstantiatedException('QuestionStateKeeper.setQuestionProp', 'question is null');
    }
    (this.question as any)[name] = value;
  }

  clear() {
    this.question = null;
  }

  async save(question: Question): Promise<CommandResponse> {
    //
    const isNew = !question.id;
    let response;

    if (isNew && this.audienceKey) {
      response = await this.register(QuestionCdo.fromModel(question, this.audienceKey));
    }
    else {
      response = await this.modify(question.id, Question.asNameValues(question));
    }

    return response;
  }

  async register(questionCdo: QuestionCdo): Promise<CommandResponse> {
    //
    return this.questionFlowApi.postQuestion(questionCdo);
  }

  async modify(questionId: string, nameValues: NameValueList): Promise<CommandResponse> {
    return this.questionFlowApi.modifyQuestion(questionId, nameValues);
  }

  async remove(questionId: string): Promise<CommandResponse> {
    return this.questionFlowApi.removeQuestion(questionId);
  }

  async findQuestionById(questionId: string): Promise<Question> {
    const questionQuery = QuestionQuery.by(questionId);
    const question = await this.questionQueryApi.executeQuestionQuery(questionQuery);

    runInAction(() =>
      this.question = question
    );
    return question;
  }

}

QuestionStateKeeper.instance = new QuestionStateKeeper();

export default QuestionStateKeeper;
