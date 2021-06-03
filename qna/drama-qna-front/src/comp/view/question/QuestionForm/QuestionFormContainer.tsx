import React from 'react';
import { observer } from 'mobx-react';
import { autobind, DramaException, ReactComponent, ServiceInjector } from '@nara.drama/prologue';

import {Question, Writer} from '~/comp/api';
import { QuestionStateKeeper } from '~/comp/state';
import QuestionFormView from './view/QuestionFormView';


interface Props {
  groupId: string;
  groupTags?: string[];
  writerId: string;
  writer?: Writer;
  audienceKey?: string;
  questionId?: string;
  onSuccess?: () => void;
  onFail?: () => void;
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
    groupTags: [],
    onSuccess: () => {},
    onFail: () => {},
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
    const { questionId } = prevProps;
    const { questionId: newQuestionId } = this.props;

    if (questionId !== newQuestionId) {
      this.init();
    }
  }


  async init() {
    //
    const { questionStateKeeper } = this.injected;

    const { groupId, writerId, writer, audienceKey, groupTags, questionId } = this.props;

    if (questionId) {
      questionStateKeeper.findQuestionById(questionId);
    } else {
      questionStateKeeper.init(groupId, writerId, writer, audienceKey, groupTags);
    }
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    //
    const { questionStateKeeper } = this.injected;
    const name = event.target.name as keyof Question;
    const value = event.target.value;

    questionStateKeeper.setQuestionProp(name, value);
  }

  onChangeSecret(event: React.ChangeEvent<HTMLInputElement>, secret: boolean) {
    // TODO event를 이용하여 question 객체의 secret 값을 변경하시오.
    const { questionStateKeeper } = this.injected;

    questionStateKeeper.setQuestionProp('secret', secret);
  }

  onChangeHashtag(event: React.ChangeEvent<HTMLInputElement>) {
    // TODO event를 이용하여 hashtag 값을 변경하시오(hashtag는 stateKeeper 가 아닌 본 컴포넌트의 state 로 관리되고있음)
    const value = event.target.value;

    this.setState({ hashtag: value });
  }

  onClickAddHashtag(event: React.MouseEvent) {
    //  TODO 사용자가 해쉬태그를 추가했을때
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
    //  TODO 관리하고 있는 해시태그 리스트에서 삭제한 해시태그를 제거하시오.
    const {questionStateKeeper} = this.injected;
    const { question } = questionStateKeeper;

    if (!question) {
      return;
    }

    const newHashtags = question
      .hashtags
      .filter(
        (hashtag: string, index: number) => index !== targetIndex
      )
    questionStateKeeper.setQuestionProp('hashtags', newHashtags);
  }

  async onSubmit() {
    // TODO 사용자가 작성한 question을 api를 통해 서버에 등록하시오.
    const { onSuccess, onFail } = this.propsWithDefault;
    const { questionStateKeeper } = this.injected;
    const { question } = questionStateKeeper;

    if (!question) {
      return;
    }

    const response = await questionStateKeeper.save(question);

    if (response.entityIds.length > 0) {
      onSuccess();
    } else {
      onFail();
    }
  }

  render() {
    const { groupTags } = this.propsWithDefault;
    const { hashtag } = this.state;
    const { question } = this.injected.questionStateKeeper;

    if (!question) {
      return null;
    }

    return (
      <QuestionFormView
        onChange={this.onChange}
        onChangeSecret={this.onChangeSecret}
        onChangeHashtag={this.onChangeHashtag}
        onKeyPress={this.onKeyPress}
        onClickAddHashtag={this.onClickAddHashtag}
        onDelete={this.onDelete}
        onSubmit={this.onSubmit}
        hashtag={hashtag}
        groupTags={groupTags}
        question={question}
      />
    );
  }
}

export { QuestionFormContainer };
export default ServiceInjector.withContext(
  QuestionStateKeeper
)(QuestionFormContainer);
