import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.drama/prologue';
import { observer } from 'mobx-react';
import { Box, Divider } from '@nara.platform/react-ui';

import { Question } from '~/comp/api';
import { QuestionsStateKeeper } from '~/comp/state';
import QuestionListContext from '../../context/QuestionListContext';
import QuestionDetail from '../../../QuestionDetail';
import MyQuestionDetail from '../../../MyQuestionDetail';


interface Props {
  //
  onClick?: (event: React.MouseEvent, question: Question) => void;
  onEdit?: (question: Question) => void;
  onRemove?: (question: Question) => void;
  emptyList?: React.ReactNode;
}

interface InjectedProps {
  //
  questionsStateKeeper: QuestionsStateKeeper;
}

@autobind
@observer
class ContentContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    onClick: () => {},
    onClickTag: () => {},
    onEdit: () => {},
    onRemove: () => {},
  };

  static contextType = QuestionListContext;

  context!: ContextType<typeof QuestionListContext>;

  onClickTag(event: React.MouseEvent, tag: string) {
    //
    const { onAddTag } = this.context.questionList;

    onAddTag(tag);
  }

  onEdit(question: Question) {
    //
    this.propsWithDefault.onEdit(question);
  }

  onRemove(question: Question) {
    //
    this.propsWithDefault.onRemove(question);
  }

  render() {
    //
    const { emptyList } = this.props;
    const { onClick } = this.propsWithDefault;
    const { questionList } = this.context;
    const { questionsStateKeeper } = this.injected;
    const { questions } = questionsStateKeeper;
    const readerId = questionList.readerId;

    if (emptyList && !questions.length) {
      return emptyList;
    }

    return questions.map((question, index) => (
      <Box mb={3}>
        {
          readerId === question.writerId ? (
            <MyQuestionDetail
              key={index}
              question={question}
            >
              <MyQuestionDetail.Header
                renderAction={null}
              />
              <MyQuestionDetail.Content
                hover
                onClick={onClick}
                onClickTag={this.onClickTag}
                groupTags={questionList.groupTags}
              />
              <MyQuestionDetail.AnswerSummary />
            </MyQuestionDetail>
          ) : (
            <QuestionDetail
              key={index}
              question={question}
            >
              <QuestionDetail.Header renderAction={null} />
              <QuestionDetail.Content
                hover
                onClick={onClick}
                onClickTag={this.onClickTag}
                groupTags={questionList.groupTags}
              />
              {
                !question.secret && (
                  <QuestionDetail.AnswerSummary />
                )
              }
            </QuestionDetail>
          )
        }
        <Divider />
      </Box>
    ));
  }
}

export default ServiceInjector.useContext(
  QuestionsStateKeeper
)(ContentContainer);
