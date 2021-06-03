import { CqrsDynamicQuery, fromDomain } from '@nara.drama/prologue';
import { Question } from '../../api-model';


@fromDomain
class QuestionDynamicQuery extends CqrsDynamicQuery<Question> {
  static fromDomain(domain: QuestionDynamicQuery): QuestionDynamicQuery {
    const query = new QuestionDynamicQuery();

    query.setResponse(domain);
    return query;
  }

}

export default QuestionDynamicQuery;
