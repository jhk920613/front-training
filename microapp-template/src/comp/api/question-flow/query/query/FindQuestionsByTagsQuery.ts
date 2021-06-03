import { CqrsUserQuery, Offset, fromDomain } from '@nara.drama/prologue';
import { Question } from '../../../question';


@fromDomain
class FindQuestionsByTagsQuery extends CqrsUserQuery<Question> {
  groupId: string;
  tags: string[] = [];
  offset: Offset | null = null;

  constructor(groupId: string) {
    super(Question);
    this.groupId = groupId;
  }

  static fromDomain(domain: FindQuestionsByTagsQuery): FindQuestionsByTagsQuery {
    const query = new FindQuestionsByTagsQuery(domain.groupId);

    query.tags = domain.tags;
    query.offset = domain.offset;
    query.setResponse(domain);
    return query;
  }

  static byQuery(groupId: string, tags: string[], offset: Offset) {
    const query = new FindQuestionsByTagsQuery(groupId);

    query.tags = tags;
    query.offset = offset;

    return query;
  }

}

export default FindQuestionsByTagsQuery;
