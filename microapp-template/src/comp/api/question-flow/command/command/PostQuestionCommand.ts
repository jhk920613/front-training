import { CqrsUserCommand } from '@nara.drama/prologue';
import { QuestionCdo } from '../../../question';


class PostQuestionCommand extends CqrsUserCommand {
  questionCdo: QuestionCdo;

  constructor(questionCdo: QuestionCdo) {
    super();
    this.questionCdo = questionCdo;
  }

  static new(questionCdo: QuestionCdo) {
    const command = new PostQuestionCommand(
      questionCdo,
    );
    return command;
  }

}

export default PostQuestionCommand;
