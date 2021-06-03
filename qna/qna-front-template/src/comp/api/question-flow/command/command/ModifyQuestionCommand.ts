import { CqrsUserCommand, NameValueList } from '@nara.drama/prologue';


class ModifyQuestionCommand extends CqrsUserCommand {
  questionId: string;
  nameValueList: NameValueList;

  constructor(questionId: string, nameValueList: NameValueList) {
    super();
    this.questionId = questionId;
    this.nameValueList = nameValueList;
  }

  static new(questionId: string, nameValueList: NameValueList) {
    const command = new ModifyQuestionCommand(
      questionId,
      nameValueList,
    );
    return command;
  }

}

export default ModifyQuestionCommand;
