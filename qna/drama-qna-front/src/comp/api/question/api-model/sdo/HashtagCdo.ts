
import { autobind, validationUtils } from '@nara.drama/prologue';
import Hashtag from '../Hashtag';


@autobind
class HashtagCdo {
  questionId: string;
  tag: string;

  constructor(questionId: string, tag: string) {
    this.questionId = questionId;
    this.tag = tag;
  }

  static fromModel(domain: Hashtag) {
    const params = validationUtils.checkNullableParams<Hashtag, keyof Hashtag>(
      domain,
      [
        'questionId',
        'tag',
      ]
    );

    return new HashtagCdo(
      params.questionId,
      params.tag,
    );
  }

}

export default HashtagCdo;
