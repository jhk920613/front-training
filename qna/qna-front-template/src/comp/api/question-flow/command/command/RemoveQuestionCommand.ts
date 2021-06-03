import { CqrsUserCommand } from '@nara.drama/prologue';


class RemoveQuestionCommand extends CqrsUserCommand {
  questionId: string;

  constructor(questionId: string) {
    super();
    this.questionId = questionId;
  }

  static new(questionId: string) {
    const command = new RemoveQuestionCommand(
      questionId,
    );
    return command;
  }

}

export default RemoveQuestionCommand;
