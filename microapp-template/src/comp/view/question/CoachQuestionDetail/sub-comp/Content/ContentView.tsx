import React, { ContextType } from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { Box, Card } from '@nara.platform/react-ui';
import { Question } from '~/comp/api';
import { OpenQuestionContent, TagList } from '~/comp/view/shared';
import QuestionForm from '../../../QuestionForm';
import QuestionDetailContext from '../../context/QuestionDetailContext';


interface Props {
  //
  hover?: boolean;
  onClick?: (event: React.MouseEvent, question: Question) => void;
  onClickTag?: (event: React.MouseEvent, tag: string) => void;
}


@autobind
@observer
class ContentView extends ReactComponent<Props> {
  //
  static defaultProps = {
    onClick: () => {},
    onClickTag: () => {},
  };

  static contextType = QuestionDetailContext;

  context!: ContextType<typeof QuestionDetailContext>;

  onClickTag(event: React.MouseEvent, index: number) {
    //
    event.stopPropagation();
    const { onClickTag } = this.propsWithDefault;
    const { question } = this.context.questionDetail;

    onClickTag(event, question.hashtags[index]);
  }

  renderContent(question: Question) {
    //
    let content;

    if (question.editing) {
      content = <QuestionForm groupId={question.groupId} writerId={question.writerId} questionId={question.id} />;
    }
    else {
      const { hover } = this.props;

      content = (
        <Box style={hover ? { cursor: 'pointer' } : undefined}>
          <OpenQuestionContent
            message={question.sentences}
            secret={question.secret}
            password={question.password}
          />

          {!!question.hashtags.length && (
            <Box pt={3}>
              <TagList tags={question.hashtags} onClick={this.onClickTag} />
            </Box>
          )}
        </Box>
      );
    }

    return content;
  }

  render() {
    //
    const { onClick } = this.propsWithDefault;
    const { question } = this.context.questionDetail;

    return (
      <Card.Content onClick={(event: React.MouseEvent) => onClick(event, question)}>
        {this.renderContent(question)}
      </Card.Content>
    );
  }
}

export default ContentView;
