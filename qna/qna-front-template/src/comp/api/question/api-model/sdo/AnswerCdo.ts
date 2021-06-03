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
    return new AnswerCdo(
      domain.questionId,
      domain.message,
      domain.writerId,
      domain.writer,
      audienceKey,
    );
  }

}

export default AnswerCdo;
