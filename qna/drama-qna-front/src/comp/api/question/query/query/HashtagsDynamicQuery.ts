import { CqrsDynamicQuery, fromDomain } from '@nara.drama/prologue';
import { Hashtag } from '../../api-model';


@fromDomain
class HashtagsDynamicQuery extends CqrsDynamicQuery<Hashtag[]> {
  static fromDomain(domain: HashtagsDynamicQuery): HashtagsDynamicQuery {
    const query = new HashtagsDynamicQuery();

    query.setResponse(domain);
    return query;
  }

}

export default HashtagsDynamicQuery;
