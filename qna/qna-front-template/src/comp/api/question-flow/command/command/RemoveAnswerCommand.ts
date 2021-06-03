import { CqrsUserCommand } from '@nara.drama/prologue';


class RemoveAnswerCommand extends CqrsUserCommand {
  answerId: string;

  constructor(answerId: string) {
    super();
    this.answerId = answerId;
  }

  static new(answerId: string) {
    const command = new RemoveAnswerCommand(
      answerId,
    );
    return command;
  }

}

export default RemoveAnswerCommand;
