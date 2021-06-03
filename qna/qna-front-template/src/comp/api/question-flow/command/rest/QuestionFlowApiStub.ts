import axios from 'axios';
import { ApiClient, CommandResponse, NameValueList } from '@nara.drama/prologue';
import { QuestionCdo, AnswerCdo } from 'comp/api/question';
import {
  PostQuestionCommand,
  ModifyQuestionCommand,
  RemoveQuestionCommand,
  PostAnswerCommand,
  RemoveAnswerCommand,
  RemoveHashtagCommand,
} from '../command';


class QuestionFlowApiStub {
  static instance: QuestionFlowApiStub;

  private readonly client = new ApiClient('/api/qna/secure/question-flow', {
    resDataName: 'commandResponse',
  });

  async postQuestion(questionCdo: QuestionCdo): Promise<CommandResponse> {
    //
      const command = PostQuestionCommand.new(
        questionCdo,
      );

    const commandResponse = await axios.post('/api/qna/secure/question-flow/post-question', command)
        .then((axiosResponse) => axiosResponse.data.commandResponse as CommandResponse);

    return commandResponse;
  }

  // async postQuestion(questionCdo: QuestionCdo): Promise<CommandResponse> {
  //   const command = PostQuestionCommand.new(
  //     questionCdo,
  //   );
  //   return this.client.postNotNull<CommandResponse>(CommandResponse, '/post-question', command);
  // }

  async modifyQuestion(questionId: string, nameValueList: NameValueList): Promise<CommandResponse> {
    const command = ModifyQuestionCommand.new(
      questionId,
      nameValueList,
    );
    return this.client.postNotNull<CommandResponse>(CommandResponse, '/modify-question', command);
  }

  async removeQuestion(questionId: string): Promise<CommandResponse> {
    const command = RemoveQuestionCommand.new(
      questionId,
    );
    return this.client.postNotNull<CommandResponse>(CommandResponse, '/remove-question', command);
  }

  async postAnswer(answerCdo: AnswerCdo): Promise<CommandResponse> {
    const command = PostAnswerCommand.new(
      answerCdo,
    );
    return this.client.postNotNull<CommandResponse>(CommandResponse, '/post-answer', command);
  }

  async removeAnswer(answerId: string): Promise<CommandResponse> {
    const command = RemoveAnswerCommand.new(
      answerId,
    );
    return this.client.postNotNull<CommandResponse>(CommandResponse, '/remove-answer', command);
  }

  async removeHashtag(hashtagId: string): Promise<CommandResponse> {
    const command = RemoveHashtagCommand.new(
      hashtagId,
    );
    return this.client.postNotNull<CommandResponse>(CommandResponse, '/remove-hashtag', command);
  }

}

QuestionFlowApiStub.instance = new QuestionFlowApiStub();

export default QuestionFlowApiStub;
