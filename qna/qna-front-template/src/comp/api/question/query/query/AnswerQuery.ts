import { CqrsBaseQuery, fromDomain } from '@nara.drama/prologue';
import { Answer } from '../../api-model';


@fromDomain
class AnswerQuery extends CqrsBaseQuery<Answer> {
  answerId: string;

  constructor(answerId: string) {
    super(Answer);
    this.answerId = answerId;
  }

  static fromDomain(domain: AnswerQuery): AnswerQuery {
    const query = new AnswerQuery(domain.answerId);

    query.setResponse(domain);
    return query;
  }

  static by(answerId: string) {
    const query = new AnswerQuery(answerId);
    return query;
  }

}

export default AnswerQuery;
