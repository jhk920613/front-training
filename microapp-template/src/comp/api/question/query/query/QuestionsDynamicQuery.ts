import { CqrsDynamicQuery, fromDomain } from '@nara.drama/prologue';
import { Question } from '../../api-model';


@fromDomain
class QuestionsDynamicQuery extends CqrsDynamicQuery<Question[]> {
  static fromDomain(domain: QuestionsDynamicQuery): QuestionsDynamicQuery {
    const query = new QuestionsDynamicQuery();

    query.setResponse(domain);
    return query;
  }

}

export default QuestionsDynamicQuery;
