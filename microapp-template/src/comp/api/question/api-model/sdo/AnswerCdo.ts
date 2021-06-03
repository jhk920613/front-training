import { validationUtils } from '@nara.drama/prologue';
import { Writer } from '../vo';
import Answer from '../Answer';


class AnswerCdo {
  questionId: string;
  message: string;
  writerId: string;
  writer: Writer | null;
  audienceKey: string;

  constructor(questionId: string, message: string, writerId: string, writer: Writer | null, audienceKey: string) {
    this.questionId = questionId;
    this.message = message;
    this.writerId = writerId;
    this.writer = writer;
    this.audienceKey = audienceKey;
  }

  static fromModel(domain: Answer, audienceKey: string) {
    const params = validationUtils.checkNullableParams<Answer, keyof Answer>(
      domain,
      [
        'questionId',
        'message',
        'writerId',
      ]
    );

    return new AnswerCdo(
      params.questionId,
      params.message,
      params.writerId,
      domain.writer,
      audienceKey,
    );
  }

}

export default AnswerCdo;
