import { CqrsUserCommand } from '@nara.drama/prologue';


class RemoveHashtagCommand extends CqrsUserCommand {
  hashtagId: string;

  constructor(hashtagId: string) {
    super();
    this.hashtagId = hashtagId;
  }

  static new(hashtagId: string) {
    const command = new RemoveHashtagCommand(
      hashtagId,
    );
    return command;
  }

}

export default RemoveHashtagCommand;
