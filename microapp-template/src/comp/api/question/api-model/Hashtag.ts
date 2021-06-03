import {
  NameValueList,
  DomainEntity,
  makeExtendedObservable,
  fromDomain,
} from '@nara.drama/prologue';


@fromDomain
class Hashtag extends DomainEntity {
  questionId: string;
  tag: string;

  constructor(questionId: string, tag: string) {
    super();
    this.questionId = questionId;
    this.tag = tag;

    makeExtendedObservable(this);
  }

  static fromDomain(domain: Hashtag): Hashtag {
    const hashtag = new Hashtag(
      domain.questionId,
      domain.tag,
    );

    hashtag.setDomainEntity(domain);
    return hashtag;
  }

  static fromDomains(domains: Hashtag[]): Hashtag[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(hashtag: Hashtag) {
    return NameValueList.fromModel(Hashtag, hashtag, {

    });
  }

  static new(): Hashtag {
    return new Hashtag('', '');
  }

}

export default Hashtag;
