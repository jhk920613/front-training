import {
  mobxService,
  NotInstantiatedException,
  CommandResponse,
  NameValueList,
  makeExtendedObservable,
} from '@nara.drama/prologue';

import { runInAction } from 'mobx';
import {
  QuestionApiStub,
  HashtagQueryApiStub,
  Hashtag,
  HashtagCdo,
  HashtagQuery, QuestionFlowApiStub,
} from 'comp/api';


@mobxService
class HashtagStateKeeper {
  static readonly instanceName: string = 'hashtagStateKeeper';
  static readonly serviceName: string = 'qna.question.hashtagStateKeeper';
  static instance: HashtagStateKeeper;

  private readonly hashtagApi: QuestionApiStub;
  private readonly hashtagFlowApi: QuestionFlowApiStub;
  private readonly hashtagQueryApi: HashtagQueryApiStub;

  hashtag: Hashtag | null = null;

  constructor(
    hashtagApi: QuestionApiStub = QuestionApiStub.instance,
    hashtagFlowApi: QuestionFlowApiStub = QuestionFlowApiStub.instance,
    hashtagQueryApi: HashtagQueryApiStub = HashtagQueryApiStub.instance
  ) {
    this.hashtagApi = hashtagApi;
    this.hashtagFlowApi = hashtagFlowApi;
    this.hashtagQueryApi = hashtagQueryApi;

    makeExtendedObservable(this);
  }

  init() {
    this.hashtag = Hashtag.new();
  }

  setHashtagProp(name: keyof Hashtag, value: any) {
    if (!this.hashtag) {
      throw new NotInstantiatedException('HashtagStateKeeper.setHashtagProp', 'hashtag is null');
    }
    (this.hashtag as any)[name] = value;
  }

  clear() {
    this.hashtag = null;
  }

  async register(hashtagCdo: HashtagCdo): Promise<CommandResponse> {
    return this.hashtagApi.registerHashtag(hashtagCdo);
  }

  async modify(hashtagId: string, nameValues: NameValueList): Promise<CommandResponse> {
    return this.hashtagApi.modifyHashtag(hashtagId, nameValues);
  }

  async remove(hashtagId: string): Promise<CommandResponse> {
    return this.hashtagFlowApi.removeHashtag(hashtagId);
  }

  async findHashtagById(hashtagId: string): Promise<Hashtag> {
    const hashtagQuery = HashtagQuery.by(hashtagId);
    const hashtag = await this.hashtagQueryApi.executeHashtagQuery(hashtagQuery);

    runInAction(() =>
      this.hashtag = hashtag
    );
    return hashtag;
  }

}

HashtagStateKeeper.instance = new HashtagStateKeeper();

export default HashtagStateKeeper;
