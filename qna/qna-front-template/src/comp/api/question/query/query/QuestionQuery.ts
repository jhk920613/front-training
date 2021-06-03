import { CqrsBaseQuery, fromDomain } from '@nara.drama/prologue';
import { Question } from '../../api-model';


@fromDomain
class QuestionQuery extends CqrsBaseQuery<Question> {
  questionId: string;

  constructor(questionId: string) {
    super(Question);
    this.questionId = questionId;
  }

  static fromDomain(domain: QuestionQuery): QuestionQuery {
    const query = new QuestionQuery(domain.questionId);

    query.setResponse(domain);
    return query;
  }

  static by(questionId: string) {
    const query = new QuestionQuery(questionId);
    return query;
  }

}

export default QuestionQuery;
