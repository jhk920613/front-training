import { CqrsUserQuery, fromDomain } from '@nara.drama/prologue';


@fromDomain
class FindAllTagsQuery extends CqrsUserQuery<String> {
  constructor() {
    super(String);
  }

  static fromDomain(domain: FindAllTagsQuery): FindAllTagsQuery {
    const query = new FindAllTagsQuery();

    query.setResponse(domain);
    return query;
  }

  static byQuery() {
    const query = new FindAllTagsQuery();

    return query;
  }

}

export default FindAllTagsQuery;
