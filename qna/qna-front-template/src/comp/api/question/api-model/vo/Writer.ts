import { makeExtendedObservable, CodeName } from '@nara.drama/prologue';


class Writer {
  name: string;
  title: CodeName | null = null;
  anonymous: boolean;

  constructor(name: string, anonymous: boolean) {
    this.name = name;
    this.anonymous = anonymous;

    makeExtendedObservable(this);
  }

  static fromDomains(domains: Writer[]): Writer[] {
    return domains.map(domain => this.fromDomain(domain));
  }

  static fromDomain(domain: Writer): Writer {
    const writer = new Writer(
      domain.name,
      domain.anonymous,
    );

    writer.title = domain.title;
    return writer;
  }

}

export default Writer;
