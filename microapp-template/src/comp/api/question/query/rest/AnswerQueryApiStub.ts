import { OffsetElementList, ApiClient } from '@nara.drama/prologue';

import { Answer } from '../../api-model';
import { AnswerQuery, AnswerDynamicQuery, AnswersDynamicQuery } from '../query';


class AnswerQueryApiStub {
  static instance: AnswerQueryApiStub;

  private readonly client = new ApiClient('/api/qna/secure/answer/query', {
    resDataName: 'queryResult',
  });

  async executeAnswerQuery(query: AnswerQuery): Promise<Answer> {
    return this.client.postNotNull<Answer>(
      Answer,
      '/',
      query
    );
  }

  async executeAnswerDynamicQuery(query: AnswerDynamicQuery): Promise<Answer | null> {
    return this.client.postNullable<Answer>(
      Answer,
      '/dynamic-single',
      query
    );
  }

  async executeAnswersDynamicQuery(query: AnswersDynamicQuery): Promise<Answer[]> {
    return this.client.postArray<Answer>(
      Answer,
      '/dynamic-multi',
      query
    );
  }

  async executeAnswersPagingDynamicQuery(query: AnswersDynamicQuery): Promise<OffsetElementList<Answer>> {
    return this.client.postOffsetElementList<Answer>(
      Answer,
      '/dynamic-multi',
      query
    );
  }

}

AnswerQueryApiStub.instance = new AnswerQueryApiStub();

export default AnswerQueryApiStub;
