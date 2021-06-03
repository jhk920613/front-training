import React from 'react';
import { observer } from 'mobx-react';
import { autobind, DramaException, ReactComponent, ServiceInjector } from '@nara.drama/prologue';

import { Answer, Writer } from '~/comp/api';
import { AnswerStateKeeper } from '~/comp/state';
import AnswerFormView from './view/AnswerFormView';


interface Props {
  writerId: string;
  writer?: Writer;
  questionId?: string;
  answerId?: string;
  onSuccess?: () => void;
  onFail?: () => void;
  maxLength?: number;
  audienceKey?: string;
}

interface InjectedProps {
  //
  answerStateKeeper: AnswerStateKeeper;
}

@autobind
@observer
class AnswerFormContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    questionId: '',
    answerId: '',
    onSuccess: () => {},
    onFail: () => {},
    maxLength: 500,
  };

  componentDidMount() {
    //
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any) {
    //
    const { answerId: prevAnswerId } = prevProps;
    const { answerId } = this.props;

    if (prevAnswerId !== answerId) {
      this.init();
    }
  }

  init() {
    //
    this.verifyProps();
    this.initAnswer();
  }

  verifyProps() {
    //
    const { questionId, answerId } = this.props;

    if (!questionId && !answerId) {
      throw new DramaException('AnswerForm', 'Either questionId or answerId should be defined.');
    }
  }

  async initAnswer() {
    //
    const { answerId, questionId, writerId, writer, audienceKey } = this.propsWithDefault;
    const { answerStateKeeper } = this.injected;

    if (answerId) {
      await answerStateKeeper.findAnswerById(answerId);
    }
    else {
      answerStateKeeper.init(questionId, writerId, writer, audienceKey);
    }
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    //
    const { answerStateKeeper } = this.injected;

    const name = event.target.name as keyof Answer;
    const value = event.target.value;

    answerStateKeeper.setAnswerProp(name, value);
  }

  async onSubmit() {
    //
    const { onSuccess, onFail } = this.propsWithDefault;
    const { answerStateKeeper } = this.injected;
    const { answer } = answerStateKeeper;

    if (!answer) {
      throw new DramaException('AnswerForm', 'Answer should not be null.');
    }

    const commandResponse = await answerStateKeeper.save(answer);

    if (commandResponse.entityIds.length) {
      onSuccess();
    }
    else {
      onFail();
    }

    this.initAnswer();
  }

  render() {
    const { maxLength } = this.propsWithDefault;
    const { answerStateKeeper } = this.injected;
    const { answer } = answerStateKeeper;

    if (!answer) {
      return null;
    }

    return (
      <AnswerFormView
        answer={answer}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        maxLength={maxLength}
      />
    );
  }
}

export { AnswerFormContainer };
export default ServiceInjector.withContext(
  AnswerStateKeeper
)(AnswerFormContainer);
