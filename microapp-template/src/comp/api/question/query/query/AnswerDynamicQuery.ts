import { CqrsDynamicQuery, fromDomain } from '@nara.drama/prologue';
import { Answer } from '../../api-model';


@fromDomain
class AnswerDynamicQuery extends CqrsDynamicQuery<Answer> {
  static fromDomain(domain: AnswerDynamicQuery): AnswerDynamicQuery {
    const query = new AnswerDynamicQuery();

    query.setResponse(domain);
    return query;
  }

}

export default AnswerDynamicQuery;
