import {
  NameValueList,
  DomainEntity,
  makeExtendedObservable,
  fromDomain,
} from '@nara.drama/prologue';
import moment from 'moment';
import { Writer } from './vo';


@fromDomain
class Answer extends DomainEntity {
  questionId: string;
  message: string;
  writerId: string;
  writer: Writer | null = null;
  edited: boolean;
  secret: boolean;
  password: string;
  updateTime: number;
  creationTime: number;

  /* for ui */
  editing: boolean = false;

  constructor(
    questionId: string,
    message: string,
    writerId: string,
    edited: boolean,
    secret: boolean,
    password: string,
    updateTime: number,
    creationTime: number,
  ) {
    super();
    this.questionId = questionId;
    this.message = message;
    this.writerId = writerId;
    this.edited = edited;
    this.secret = secret;
    this.password = password;
    this.updateTime = updateTime;
    this.creationTime = creationTime;

    makeExtendedObservable(this);
  }

  static fromDomain(domain: Answer): Answer {
    const answer = new Answer(
      domain.questionId,
      domain.message,
      domain.writerId,
      domain.edited,
      domain.secret,
      domain.password,
      domain.updateTime,
      domain.creationTime,
    );

    answer.setDomainEntity(domain);
    answer.writer = domain.writer ? Writer.fromDomain(domain.writer) : null;
    return answer;
  }

  static fromDomains(domains: Answer[]): Answer[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(answer: Answer) {
    return NameValueList.fromModel(Answer, answer, {
      message: String,
    });
  }

  static new(questionId: string, writerId: string, writer?: Writer): Answer {
    const answer = new Answer(questionId, '', writerId, false, false, '', 0, 0);

    answer.writer = writer || null;
    return answer;
  }

  get anonymous() {
    //
    return !!this.writer && this.writer.anonymous;
  }

  get writerName() {
    //
    return this.writer ? this.writer.name : '';
  }

  get displayTime() {
    //
    return this.updateTime ? `수정됨 ${moment(this.updateTime).fromNow()}` : moment(this.creationTime).fromNow();
  }
}

export default Answer;
