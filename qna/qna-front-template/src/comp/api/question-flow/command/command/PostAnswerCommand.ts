import { CqrsUserCommand } from '@nara.drama/prologue';
import { AnswerCdo } from '../../../question';


class PostAnswerCommand extends CqrsUserCommand {
  answerCdo: AnswerCdo;

  constructor(answerCdo: AnswerCdo) {
    super();
    this.answerCdo = answerCdo;
  }

  static new(answerCdo: AnswerCdo) {
    const command = new PostAnswerCommand(
      answerCdo,
    );
    return command;
  }

}

export default PostAnswerCommand;
