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
  AnswerQueryApiStub,
  Answer,
  AnswerCdo,
  AnswerQuery, QuestionFlowApiStub, Writer,
} from '~/comp/api';


@mobxService
class AnswerStateKeeper {
  static readonly instanceName: string = 'answerStateKeeper';
  static readonly serviceName: string = 'qna.question.answerStateKeeper';
  static instance: AnswerStateKeeper;

  private readonly answerApi: QuestionApiStub;
  private readonly answerFlowApi: QuestionFlowApiStub;
  private readonly answerQueryApi: AnswerQueryApiStub;

  answer: Answer | null = null;

  audienceKey: string | null = null;

  constructor(
    answerApi: QuestionApiStub = QuestionApiStub.instance,
    answerFlowApi: QuestionFlowApiStub = QuestionFlowApiStub.instance,
    answerQueryApi: AnswerQueryApiStub = AnswerQueryApiStub.instance
  ) {
    this.answerApi = answerApi;
    this.answerFlowApi = answerFlowApi;
    this.answerQueryApi = answerQueryApi;

    makeExtendedObservable(this);
  }

  init(questionId: string, writerId: string, writer: Writer, audienceKey: string) {
    this.answer = Answer.new(questionId, writerId, writer);
    this.audienceKey = audienceKey;
  }

  setAnswerProp(name: keyof Answer, value: any) {
    if (!this.answer) {
      throw new NotInstantiatedException('AnswerStateKeeper.setAnswerProp', 'answer is null');
    }
    (this.answer as any)[name] = value;
  }

  clear() {
    this.answer = null;
  }

  async save(answer: Answer): Promise<CommandResponse> {
    //
    const isNew = !answer.id;
    let response;

    if (isNew && this.audienceKey) {
      response = await this.register(AnswerCdo.fromModel(answer, this.audienceKey));
    }
    else {
      response = await this.modify(answer.id, Answer.asNameValues(answer));
    }

    return response;
  }

  async register(answerCdo: AnswerCdo): Promise<CommandResponse> {
    return this.answerFlowApi.postAnswer(answerCdo);
  }

  async modify(answerId: string, nameValues: NameValueList): Promise<CommandResponse> {
    return this.answerApi.modifyAnswer(answerId, nameValues);
  }

  async remove(answerId: string): Promise<CommandResponse> {
    return this.answerFlowApi.removeAnswer(answerId);
  }

  async findAnswerById(answerId: string): Promise<Answer> {
    const answerQuery = AnswerQuery.by(answerId);
    const answer = await this.answerQueryApi.executeAnswerQuery(answerQuery);

    runInAction(() =>
      this.answer = answer
    );
    return answer;
  }

}

AnswerStateKeeper.instance = new AnswerStateKeeper();

export default AnswerStateKeeper;
