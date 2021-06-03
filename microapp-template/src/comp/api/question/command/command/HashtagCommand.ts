import { CqrsBaseCommandType, CqrsBaseCommand, NameValueList } from '@nara.drama/prologue';
import { HashtagCdo } from '../../api-model';


class HashtagCommand extends CqrsBaseCommand {
  hashtagCdo: HashtagCdo | null = null;
  hashtagCdos: HashtagCdo[] = [];
  hashtagId: string | null = null;
  nameValues: NameValueList | null = null;

  static newRegisterHashtagCommand(hashtagCdo: HashtagCdo): HashtagCommand {
    const command = new HashtagCommand(CqrsBaseCommandType.Register);

    command.hashtagCdo = hashtagCdo;
    return command;
  }

  static newRegisterHashtagCommands(hashtagCdos: HashtagCdo[]): HashtagCommand {
    const command = new HashtagCommand(CqrsBaseCommandType.Register);

    command.hashtagCdos = hashtagCdos;
    return command;
  }

  static newModifyHashtagCommand(hashtagId: string, nameValues: NameValueList): HashtagCommand {
    const command = new HashtagCommand(CqrsBaseCommandType.Modify);

    command.hashtagId = hashtagId;
    command.nameValues = nameValues;
    return command;
  }

  static newRemoveHashtagCommand(hashtagId: string): HashtagCommand {
    const command = new HashtagCommand(CqrsBaseCommandType.Remove);

    command.hashtagId = hashtagId;
    return command;
  }

}

export default HashtagCommand;
