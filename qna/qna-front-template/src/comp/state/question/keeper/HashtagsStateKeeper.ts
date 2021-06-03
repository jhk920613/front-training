import {
  mobxService,
  NotInstantiatedException,
  Offset,
  OffsetElementList,
  Operator,
  QueryParam,
  makeExtendedObservable,
} from '@nara.drama/prologue';

import { runInAction } from 'mobx';
import {
  FindAllTagsQuery,
  Hashtag,
  HashtagQueryApiStub,
  HashtagsDynamicQuery,
  QuestionFlowQueryApiStub,
} from 'comp/api';


@mobxService
class HashtagsStateKeeper {
  static readonly instanceName: string = 'hashtagsStateKeeper';
  static readonly serviceName: string = 'qna.question.hashtagsStateKeeper';
  static instance: HashtagsStateKeeper;

  private readonly hashtagQueryApi: HashtagQueryApiStub;
  private readonly hashtagFlowQueryApi: QuestionFlowQueryApiStub;

  hashtags: Hashtag[] = [];

  tags: string[] = [];

  constructor(
    hashtagQueryApi: HashtagQueryApiStub = HashtagQueryApiStub.instance,
    hashtagFlowQueryApi: QuestionFlowQueryApiStub = QuestionFlowQueryApiStub.instance
  ) {
    this.hashtagQueryApi = hashtagQueryApi;
    this.hashtagFlowQueryApi = hashtagFlowQueryApi;

    makeExtendedObservable(this);
  }

  setHashtagProp(index: number, name: keyof Hashtag, value: any) {
    if (!this.hashtags || this.hashtags[index]) {
      throw new NotInstantiatedException('HashtagsStateKeeper.setHashtagProp', `hashtags[${index}] is null`);
    }
    (this.hashtags[index] as any)[name] = value;
  }

  clear() {
    this.hashtags = [];
  }

  async findHashtags(offset: number, limit: number): Promise<OffsetElementList<Hashtag>> {
    const hashtagsDynamicQuery = HashtagsDynamicQuery.multiParams<Hashtag[]>(
      QueryParam.endParam('id', Operator.Equal, '*')
    );

    hashtagsDynamicQuery.offset = Offset.newAscending(offset, limit);
    hashtagsDynamicQuery.offset.sortingField = 'id';

    const offsetElementList = await this.hashtagQueryApi.executeHashtagsPagingDynamicQuery(hashtagsDynamicQuery);

    runInAction(() =>
      this.hashtags = offsetElementList.results
    );
    return offsetElementList;
  }

  async findHashtagsByIds(ids: string[], offset: Offset): Promise<OffsetElementList<Hashtag>> {
    const hashtagsDynamicQuery = HashtagsDynamicQuery.multiParams<Hashtag[]>(
      QueryParam.endParam('id', Operator.In, this.arrayToString(ids))
    );

    hashtagsDynamicQuery.offset = offset;

    const offsetElementList = await this.hashtagQueryApi.executeHashtagsPagingDynamicQuery(hashtagsDynamicQuery);

    runInAction(() =>
      this.hashtags = offsetElementList.results
    );
    return offsetElementList;
  }

  async findAllTags(): Promise<string[]> {
    //
    const query = FindAllTagsQuery.byQuery();

    const tags = await this.hashtagFlowQueryApi.findAllTags(query);

    runInAction(() =>
      this.tags = tags
    );
    return tags;
  }

  private arrayToString(values: string[]): string {
    const valuesString = values.map(value => `\\"${value}\\"`).toString();
    return `[${valuesString}]`;
  }

}

HashtagsStateKeeper.instance = new HashtagsStateKeeper();

export default HashtagsStateKeeper;
