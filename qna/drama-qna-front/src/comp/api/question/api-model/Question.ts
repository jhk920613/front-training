import {
  NameValueList,
  DomainEntity,
  NameValue,
  makeExtendedObservable,
} from '@nara.drama/prologue';
import moment from 'moment';

import { Writer, AnswerSummary } from './vo';


class Question extends DomainEntity {
  groupId: string;
  title: string;
  sentences: string;
  writerId: string;
  writer: Writer | null = null;
  answered: boolean;
  edited: boolean;
  secret: boolean;
  password: string;
  updateTime: number;
  creationTime: number;
  answerSummary: AnswerSummary | null = null;
  hashtags: string[] = [];

  /* for ui */
  editing: boolean = false;

  constructor(
    groupId: string,
    title: string,
    sentences: string,
    writerId: string,
    answered: boolean,
    edited: boolean,
    secret: boolean,
    password: string,
    updateTime: number,
    creationTime: number,
  ) {
    super();
    this.groupId = groupId;
    this.title = title;
    this.sentences = sentences;
    this.writerId = writerId;
    this.answered = answered;
    this.edited = edited;
    this.secret = secret;
    this.password = password;
    this.updateTime = updateTime;
    this.creationTime = creationTime;

    makeExtendedObservable(this);
  }

  static fromDomain(domain: Question): Question {
    const question = new Question(
      domain.groupId,
      domain.title,
      domain.sentences,
      domain.writerId,
      domain.answered,
      domain.edited,
      domain.secret,
      domain.password,
      domain.updateTime,
      domain.creationTime,
    );

    question.setDomainEntity(domain);
    question.writer = domain.writer ? Writer.fromDomain(domain.writer) : null;
    question.answerSummary = domain.answerSummary ? AnswerSummary.fromDomain(domain.answerSummary) : null;
    question.hashtags = domain.hashtags;
    return question;
  }

  static fromDomains(domains: Question[]): Question[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static asNameValues(question: Question) {
    return new NameValueList(
      new NameValue('title', question.title),
      new NameValue('sentences', question.sentences),
      new NameValue('secret', `${question.secret}`),
      new NameValue('answerSummary', JSON.stringify(question.answerSummary)),
      new NameValue('hashtags', JSON.stringify(question.hashtags)),
    );
  }

  static new(groupId: string, writerId: string, writer?: Writer, audienceKey?: string): Question {
    const question = new Question(groupId, '', '', writerId, false, false, false, '', 0, 0);

    question.writer = writer || null;
    return question;
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
    const timeFormat = 'YYYY.MM.DD hh:mm';

    return this.updateTime ? `${moment(this.updateTime).format(timeFormat)} 수정됨` : moment(this.creationTime).format(timeFormat);
  }

  get answerMessage() {
    //
    return this.answerSummary ? this.answerSummary.message : '';
  }
}

export default Question;
