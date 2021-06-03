import { CommandResponse, NameValueList, ApiClient } from '@nara.drama/prologue';

import { QuestionCdo, HashtagCdo, AnswerCdo } from '../../api-model';
import { QuestionCommand, HashtagCommand, AnswerCommand } from '../command';


class QuestionApiStub {
  static instance: QuestionApiStub;

  private readonly client = new ApiClient('/api/qna/secure/question', {
    resDataName: 'commandResponse',
  });

  async registerQuestion(questionCdo: QuestionCdo): Promise<CommandResponse> {
    const command = QuestionCommand.newRegisterQuestionCommand(questionCdo);
    return this.executeQuestion(command);
  }

  async registerHashtag(hashtagCdo: HashtagCdo): Promise<CommandResponse> {
    const command = HashtagCommand.newRegisterHashtagCommand(hashtagCdo);
    return this.executeHashtag(command);
  }

  async registerAnswer(answerCdo: AnswerCdo): Promise<CommandResponse> {
    const command = AnswerCommand.newRegisterAnswerCommand(answerCdo);
    return this.executeAnswer(command);
  }

  async registerQuestions(questionCdos: QuestionCdo[]): Promise<CommandResponse> {
    const command = QuestionCommand.newRegisterQuestionCommands(questionCdos);
    return this.executeQuestion(command);
  }

  async registerHashtags(hashtagCdos: HashtagCdo[]): Promise<CommandResponse> {
    const command = HashtagCommand.newRegisterHashtagCommands(hashtagCdos);
    return this.executeHashtag(command);
  }

  async registerAnswers(answerCdos: AnswerCdo[]): Promise<CommandResponse> {
    const command = AnswerCommand.newRegisterAnswerCommands(answerCdos);
    return this.executeAnswer(command);
  }

  async modifyQuestion(questionId: string, nameValues: NameValueList): Promise<CommandResponse> {
    const command = QuestionCommand.newModifyQuestionCommand(questionId, nameValues);
    return this.executeQuestion(command);
  }

  async modifyHashtag(hashtagId: string, nameValues: NameValueList): Promise<CommandResponse> {
    const command = HashtagCommand.newModifyHashtagCommand(hashtagId, nameValues);
    return this.executeHashtag(command);
  }

  async modifyAnswer(answerId: string, nameValues: NameValueList): Promise<CommandResponse> {
    const command = AnswerCommand.newModifyAnswerCommand(answerId, nameValues);
    return this.executeAnswer(command);
  }

  async removeQuestion(questionId: string): Promise<CommandResponse> {
    const command = QuestionCommand.newRemoveQuestionCommand(questionId);
    return this.executeQuestion(command);
  }

  async removeHashtag(hashtagId: string): Promise<CommandResponse> {
    const command = HashtagCommand.newRemoveHashtagCommand(hashtagId);
    return this.executeHashtag(command);
  }

  async removeAnswer(answerId: string): Promise<CommandResponse> {
    const command = AnswerCommand.newRemoveAnswerCommand(answerId);
    return this.executeAnswer(command);
  }

  async executeQuestion(questionCommand: QuestionCommand): Promise<CommandResponse> {
    return this.client.postNotNull<CommandResponse>(CommandResponse, '/question/command', questionCommand);
  }

  async executeHashtag(hashtagCommand: HashtagCommand): Promise<CommandResponse> {
    return this.client.postNotNull<CommandResponse>(CommandResponse, '/hashtag/command', hashtagCommand);
  }

  async executeAnswer(answerCommand: AnswerCommand): Promise<CommandResponse> {
    return this.client.postNotNull<CommandResponse>(CommandResponse, '/answer/command', answerCommand);
  }

}

QuestionApiStub.instance = new QuestionApiStub();

export default QuestionApiStub;
