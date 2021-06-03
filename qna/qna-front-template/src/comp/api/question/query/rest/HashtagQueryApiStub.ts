import { OffsetElementList, ApiClient } from '@nara.drama/prologue';

import { Hashtag } from '../../api-model';
import { HashtagQuery, HashtagDynamicQuery, HashtagsDynamicQuery } from '../query';


class HashtagQueryApiStub {
  static instance: HashtagQueryApiStub;

  private readonly client = new ApiClient('/api/qna/secure/hashtag/query', {
    resDataName: 'queryResult',
  });

  async executeHashtagQuery(query: HashtagQuery): Promise<Hashtag> {
    return this.client.postNotNull<Hashtag>(
      Hashtag,
      '/',
      query
    );
  }

  async executeHashtagDynamicQuery(query: HashtagDynamicQuery): Promise<Hashtag | null> {
    return this.client.postNullable<Hashtag>(
      Hashtag,
      '/dynamic-single',
      query
    );
  }

  async executeHashtagsDynamicQuery(query: HashtagsDynamicQuery): Promise<Hashtag[]> {
    return this.client.postArray<Hashtag>(
      Hashtag,
      '/dynamic-multi',
      query
    );
  }

  async executeHashtagsPagingDynamicQuery(query: HashtagsDynamicQuery): Promise<OffsetElementList<Hashtag>> {
    return this.client.postOffsetElementList<Hashtag>(
      Hashtag,
      '/dynamic-multi',
      query
    );
  }

}

HashtagQueryApiStub.instance = new HashtagQueryApiStub();

export default HashtagQueryApiStub;
