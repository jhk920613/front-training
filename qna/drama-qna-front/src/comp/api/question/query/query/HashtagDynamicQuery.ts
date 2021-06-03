import { CqrsDynamicQuery, fromDomain } from '@nara.drama/prologue';
import { Hashtag } from '../../api-model';


@fromDomain
class HashtagDynamicQuery extends CqrsDynamicQuery<Hashtag> {
  static fromDomain(domain: HashtagDynamicQuery): HashtagDynamicQuery {
    const query = new HashtagDynamicQuery();

    query.setResponse(domain);
    return query;
  }

}

export default HashtagDynamicQuery;
