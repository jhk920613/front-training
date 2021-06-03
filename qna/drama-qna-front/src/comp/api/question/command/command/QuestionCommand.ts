import { CqrsBaseCommandType, CqrsBaseCommand, NameValueList } from '@nara.drama/prologue';
import { QuestionCdo } from '../../api-model';


class QuestionCommand extends CqrsBaseCommand {
  questionCdo: QuestionCdo | null = null;
  questionCdos: QuestionCdo[] = [];
  questionId: string | null = null;
  nameValues: NameValueList | null = null;

  static newRegisterQuestionCommand(questionCdo: QuestionCdo): QuestionCommand {
    const command = new QuestionCommand(CqrsBaseCommandType.Register);

    command.questionCdo = questionCdo;
    return command;
  }

  static newRegisterQuestionCommands(questionCdos: QuestionCdo[]): QuestionCommand {
    const command = new QuestionCommand(CqrsBaseCommandType.Register);

    command.questionCdos = questionCdos;
    return command;
  }

  static newModifyQuestionCommand(questionId: string, nameValues: NameValueList): QuestionCommand {
    const command = new QuestionCommand(CqrsBaseCommandType.Modify);

    command.questionId = questionId;
    command.nameValues = nameValues;
    return command;
  }

  static newRemoveQuestionCommand(questionId: string): QuestionCommand {
    const command = new QuestionCommand(CqrsBaseCommandType.Remove);

    command.questionId = questionId;
    return command;
  }

}

export default QuestionCommand;
