import { CqrsBaseCommandType, CqrsBaseCommand, NameValueList } from '@nara.drama/prologue';
import { AnswerCdo } from '../../api-model';


class AnswerCommand extends CqrsBaseCommand {
  answerCdo: AnswerCdo | null = null;
  answerCdos: AnswerCdo[] = [];
  answerId: string | null = null;
  nameValues: NameValueList | null = null;

  static newRegisterAnswerCommand(answerCdo: AnswerCdo): AnswerCommand {
    const command = new AnswerCommand(CqrsBaseCommandType.Register);

    command.answerCdo = answerCdo;
    return command;
  }

  static newRegisterAnswerCommands(answerCdos: AnswerCdo[]): AnswerCommand {
    const command = new AnswerCommand(CqrsBaseCommandType.Register);

    command.answerCdos = answerCdos;
    return command;
  }

  static newModifyAnswerCommand(answerId: string, nameValues: NameValueList): AnswerCommand {
    const command = new AnswerCommand(CqrsBaseCommandType.Modify);

    command.answerId = answerId;
    command.nameValues = nameValues;
    return command;
  }

  static newRemoveAnswerCommand(answerId: string): AnswerCommand {
    const command = new AnswerCommand(CqrsBaseCommandType.Remove);

    command.answerId = answerId;
    return command;
  }

}

export default AnswerCommand;
