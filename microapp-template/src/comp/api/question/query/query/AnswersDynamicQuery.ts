import { CqrsDynamicQuery, fromDomain } from '@nara.drama/prologue';
import { Answer } from '../../api-model';


@fromDomain
class AnswersDynamicQuery extends CqrsDynamicQuery<Answer[]> {
  static fromDomain(domain: AnswersDynamicQuery): AnswersDynamicQuery {
    const query = new AnswersDynamicQuery();

    query.setResponse(domain);
    return query;
  }

}

export default AnswersDynamicQuery;
