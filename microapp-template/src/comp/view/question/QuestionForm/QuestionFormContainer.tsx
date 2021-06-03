import React from 'react';
import { observer } from 'mobx-react';
import { autobind, DramaException, ReactComponent, ServiceInjector } from '@nara.drama/prologue';

import { Question, Writer } from '~/comp/api';
import { QuestionStateKeeper } from '~/comp/state';
import QuestionFormView from './view/QuestionFormView';


interface Props {
  groupId: string;
  groupTags?: string[];
  writerId: string;
  writer?: Writer;
  questionId?: string;
  rows?: number;
  maxLength?: number;
  onSuccess?: () => void;
  onFail?: () => void;
  audienceKey?: string;
}

interface State {
  hashtag: string;
}

interface InjectedProps {
  //
  questionStateKeeper: QuestionStateKeeper;
}

@autobind
@observer
class QuestionFormContainer extends ReactComponent<Props, State, InjectedProps> {
  //
  static defaultProps = {
    questionId: '',
    rows: 5,
    maxLength: 0,
    onSuccess: () => {},
    onFail: () => {},
    groupTags: [],
  };

  state: State = {
    hashtag: '',
  };

  componentDidMount() {
    //
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    //
    const { questionId: prevQuestionId } = prevProps;
    const { questionId } = this.props;

    if (prevQuestionId !== questionId) {
      this.init();
    }
  }

  async init() {
    //
    const { questionId } = this.propsWithDefault;
    const { questionStateKeeper } = this.injected;

    if (questionId) {
      await questionStateKeeper.findQuestionById(questionId);
    }
    else {
      const { groupId, writerId, writer, audienceKey, groupTags } = this.props;

      questionStateKeeper.init(groupId, writerId, writer, audienceKey, groupTags);
    }
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    //
    const name = event.target.name as keyof Question;
    const value = event.target.value;

    const { questionStateKeeper } = this.injected;

    questionStateKeeper.setQuestionProp(name, value);
  }

  onChangeSecret(event: React.ChangeEvent<HTMLInputElement>, secret: boolean) {
    //
    this.injected.questionStateKeeper.setQuestionProp('secret', secret);
  }

  onChangeHashtag(event: React.ChangeEvent<HTMLInputElement>) {
    //
    const value = event.target.value;

    this.setState({ hashtag: value });
  }

  onClickAddHashtag(event: React.MouseEvent) {
    //
    const { hashtag } = this.state;
    const { questionStateKeeper } = this.injected;
    const { question } = questionStateKeeper;

    if (!question) {
      throw new DramaException('QuestionForm', 'Question should not be null.');
    }

    questionStateKeeper.setQuestionProp('hashtags', [...new Set([...question.hashtags, hashtag])]);
    this.setState({ hashtag: '' });
  }

  onKeyPress(event: React.KeyboardEvent) {
    //
    if (event.key !== 'Enter') {
      return;
    }

    const { hashtag } = this.state;

    if (!hashtag.length) {
      return;
    }

    const { questionStateKeeper } = this.injected;
    const { question } = questionStateKeeper;

    if (!question) {
      throw new DramaException('QuestionForm', 'Question should not be null.');
    }

    questionStateKeeper.setQuestionProp('hashtags', [...new Set([...question.hashtags, hashtag])]);
    this.setState({ hashtag: '' });
  }

  onDelete(event: React.MouseEvent, targetIndex: number) {
    //
    const { questionStateKeeper } = this.injected;
    const { question } = questionStateKeeper;

    if (!question) {
      throw new DramaException('QuestionForm', 'Question should not be null.');
    }

    const newHashtags = question.hashtags.filter((hashtag, index) => index !== targetIndex);

    questionStateKeeper.setQuestionProp('hashtags', newHashtags);
  }

  async onSubmit() {
    //
    const { onSuccess, onFail } = this.propsWithDefault;
    const { questionStateKeeper } = this.injected;
    const { question } = questionStateKeeper;

    if (!question) {
      throw new DramaException('QuestionForm', 'Question should not be null.');
    }

    const commandResponse = await questionStateKeeper.save(question);

    if (commandResponse.entityIds.length) {
      onSuccess();
    } else {
      onFail();
    }

    this.init();
  }

  render() {
    const { rows, maxLength, groupTags } = this.propsWithDefault;
    const { hashtag } = this.state;
    const { question } = this.injected.questionStateKeeper;

    if (!question) {
      return null;
    }

    return (
      <QuestionFormView
        question={question}
        hashtag={hashtag}
        hiddenTags={groupTags}
        maxLength={maxLength}
        rows={rows}
        onChange={this.onChange}
        onChangeSecret={this.onChangeSecret}
        onChangeHashtag={this.onChangeHashtag}
        onClickAddHashtag={this.onClickAddHashtag}
        onKeyPress={this.onKeyPress}
        onDelete={this.onDelete}
        onSubmit={this.onSubmit}
      />
    );
  }
}

export { QuestionFormContainer };
export default ServiceInjector.withContext(
  QuestionStateKeeper
)(QuestionFormContainer);
