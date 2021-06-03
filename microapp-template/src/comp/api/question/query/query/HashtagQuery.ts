import { CqrsBaseQuery, fromDomain } from '@nara.drama/prologue';
import { Hashtag } from '../../api-model';


@fromDomain
class HashtagQuery extends CqrsBaseQuery<Hashtag> {
  hashtagId: string;

  constructor(hashtagId: string) {
    super(Hashtag);
    this.hashtagId = hashtagId;
  }

  static fromDomain(domain: HashtagQuery): HashtagQuery {
    const query = new HashtagQuery(domain.hashtagId);

    query.setResponse(domain);
    return query;
  }

  static by(hashtagId: string) {
    const query = new HashtagQuery(hashtagId);
    return query;
  }

}

export default HashtagQuery;
