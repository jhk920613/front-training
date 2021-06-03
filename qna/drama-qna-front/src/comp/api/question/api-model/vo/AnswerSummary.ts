import { makeExtendedObservable, fromDomain } from '@nara.drama/prologue';

import Writer from './Writer';


@fromDomain
class AnswerSummary {
  message: string;
  writer: Writer | null = null;

  constructor(message: string) {
    this.message = message;

    makeExtendedObservable(this);
  }

  static fromDomains(domains: AnswerSummary[]): AnswerSummary[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static fromDomain(domain: AnswerSummary): AnswerSummary {
    const answerSummary = new AnswerSummary(
      domain.message,
    );

    answerSummary.writer = domain.writer ? Writer.fromDomain(domain.writer) : null;
    return answerSummary;
  }

}

export default AnswerSummary;
