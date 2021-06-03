import React, { ContextType } from 'react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.drama/prologue';
import { observer } from 'mobx-react';
import { Box, Divider } from '@nara.platform/react-ui';

import { Question } from '~/comp/api';
import { QuestionsStateKeeper } from '~/comp/state';
import QuestionListContext from '../../context/QuestionListContext';
import CoachQuestionDetail from '../../../CoachQuestionDetail';


interface Props {
  //
  onClick?: (event: React.MouseEvent, question: Question) => void;
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
  };

  static contextType = QuestionListContext;

  context!: ContextType<typeof QuestionListContext>;

  onClickTag(event: React.MouseEvent, tag: string) {
    //
    const { onAddTag } = this.context.questionList;

    onAddTag(tag);
  }

  render() {
    //
    const { onClick } = this.propsWithDefault;
    const { questionsStateKeeper } = this.injected;
    const { questions } = questionsStateKeeper;

    return questions.map((question, index) => (
      <Box mb={3}>
        <CoachQuestionDetail
          key={index}
          question={question}
        >
          <CoachQuestionDetail.Header renderAction={null} />
          <CoachQuestionDetail.Content
            hover
            onClick={onClick}
            onClickTag={this.onClickTag}
          />
          <CoachQuestionDetail.AnswerSummary />
        </CoachQuestionDetail>
        <Divider />
      </Box>
    ));
  }
}

export { ContentContainer };
export default ServiceInjector.useContext(
  QuestionsStateKeeper
)(ContentContainer);
