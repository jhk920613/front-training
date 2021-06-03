import { OffsetElementList, ApiClient } from '@nara.drama/prologue';

import { Question } from '../../api-model';
import { QuestionQuery, QuestionDynamicQuery, QuestionsDynamicQuery } from '../query';


class QuestionQueryApiStub {
  static instance: QuestionQueryApiStub;

  private readonly client = new ApiClient('/api/qna/secure/question/query', {
    resDataName: 'queryResult',
  });

  async executeQuestionQuery(query: QuestionQuery): Promise<Question> {
    return this.client.postNotNull<Question>(
      Question,
      '/',
      query
    );
  }

  async executeQuestionDynamicQuery(query: QuestionDynamicQuery): Promise<Question | null> {
    return this.client.postNullable<Question>(
      Question,
      '/dynamic-single',
      query
    );
  }

  async executeQuestionsDynamicQuery(query: QuestionsDynamicQuery): Promise<Question[]> {
    return this.client.postArray<Question>(
      Question,
      '/dynamic-multi',
      query
    );
  }

  async executeQuestionsPagingDynamicQuery(query: QuestionsDynamicQuery): Promise<OffsetElementList<Question>> {
    return this.client.postOffsetElementList<Question>(
      Question,
      '/dynamic-multi',
      query
    );
  }

}

QuestionQueryApiStub.instance = new QuestionQueryApiStub();

export default QuestionQueryApiStub;
