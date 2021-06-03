import { ApiClient, OffsetElementList } from '@nara.drama/prologue';
import { Question } from '../../../question';
import { FindAllTagsQuery, FindQuestionsByTagsQuery } from '../query';


class QuestionFlowQueryApiStub {
  static instance: QuestionFlowQueryApiStub;

  private readonly client = new ApiClient('/api/qna/secure/question-flow/query', {
    resDataName: 'queryResult',
  });

  async findAllTags(query: FindAllTagsQuery): Promise<string[]> {
    return this.client.postArray<string>(
      String,
      '/find-all-tags',
      query
    );
  }

  async findQuestionsByTags(query: FindQuestionsByTagsQuery): Promise<Question[]> {
    return this.client.postArray<Question>(
      Question,
      '/find-questions-by-tags',
      query
    );
  }

  async findQuestionsByTagsWithPaging(query: FindQuestionsByTagsQuery): Promise<OffsetElementList<Question>> {
    return this.client.postOffsetElementList<Question>(
      Question,
      '/find-questions-by-tags',
      query
    );
  }
}

QuestionFlowQueryApiStub.instance = new QuestionFlowQueryApiStub();

export default QuestionFlowQueryApiStub;
