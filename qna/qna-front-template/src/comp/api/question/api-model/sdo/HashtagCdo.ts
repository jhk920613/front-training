
import Hashtag from '../Hashtag';


class HashtagCdo {
  questionId: string;
  tag: string;

  constructor(questionId: string, tag: string) {
    this.questionId = questionId;
    this.tag = tag;
  }

  static fromModel(domain: Hashtag) {
    return new HashtagCdo(
      domain.questionId,
      domain.tag,
    );
  }

}

export default HashtagCdo;
