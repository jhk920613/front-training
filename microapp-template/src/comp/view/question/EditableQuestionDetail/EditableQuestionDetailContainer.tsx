import React from 'react';
import { inject, observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import MyQuestionDetail from '../MyQuestionDetail';
import { QuestionStateKeeper } from '../../../state';

interface Props {
  questionId: string;
  onSuccessEdit: () => void;
  onSuccessRemove: () => void;
}

interface State {

}

interface InjectedProps {
  questionStateKeeper: QuestionStateKeeper;
}

@inject(QuestionStateKeeper.instanceName)
@autobind
@observer
class EditableQuestionDetailContainer extends ReactComponent<Props, State, InjectedProps> {
  //
  componentDidMount() {
    //
    const { questionId } = this.props;

    const { questionStateKeeper } = this.injected;
    questionStateKeeper.findQuestionById(questionId);
  }

  onEdit() {
    //
    const { setQuestionProp } = this.injected.questionStateKeeper;
    setQuestionProp('editing', true);
  }

  async onRemove() {
    //
    const { onSuccessRemove } = this.props;
    const { questionStateKeeper } = this.injected;
    const { question } = questionStateKeeper;

    // const response = await questionStateKeeper.remove(question.id);

    onSuccessRemove();
  }

  render() {
    //
    const { onSuccessEdit } = this.props;
    const { question } = this.injected.questionStateKeeper;

    if (!question) {
      return null;
    }

    return (
      <MyQuestionDetail question={question}>
        <MyQuestionDetail.Header
          onEdit={this.onEdit}
          onRemove={this.onRemove}
        />
        <MyQuestionDetail.Content
          onSuccessSave={onSuccessEdit}
        />
        <MyQuestionDetail.AnswerSummary />
      </MyQuestionDetail>
    );
  }
}

export default EditableQuestionDetailContainer;
