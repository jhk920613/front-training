import { Writer } from '../vo';
import Question from '../Question';


class QuestionCdo {
  groupId: string;
  title: string;
  sentences: string;
  hashtags: string[];
  writerId: string;
  writer: Writer | null;
  secret: boolean;
  audienceKey: string;

  constructor(
    groupId: string,
    title: string,
    sentences: string,
    hashtags: string[],
    writerId: string,
    writer: Writer | null,
    secret: boolean,
    audienceKey: string
  ) {
    this.groupId = groupId;
    this.title = title;
    this.sentences = sentences;
    this.hashtags = hashtags;
    this.writerId = writerId;
    this.writer = writer;
    this.secret = secret;
    this.audienceKey = audienceKey;
  }

  static fromModel(domain: Question, audienceKey: string) {

    return new QuestionCdo(
      domain.groupId,
      domain.title,
      domain.sentences,
      domain.hashtags,
      domain.writerId,
      domain.writer,
      domain.secret,
      audienceKey
    );
  }

}

export default QuestionCdo;
