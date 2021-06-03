import React from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { Box, Card, Link, Typography } from '@nara.platform/react-ui';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { Answer } from '~/comp/api';
import { QuestionContent, SubMenu } from '~/comp/view/shared';
import AnswerForm from '../../../../AnswerForm';


interface Props {
  index: number;
  userId: string;
  answer: Answer;
  onClick: (event: React.MouseEvent, subComment: Answer) => void;
  onClickEdit: (index: number) => void;
  onClickRemove: (id: string) => void;
}

@autobind
@observer
class AnswerDetailView extends ReactComponent<Props> {
  //
  renderContent(answer: Answer) {
    //
    let content;

    if (answer.editing) {
      content = <AnswerForm writerId={answer.writerId} answerId={answer.id} />;
    }
    else {
      content = (
        <QuestionContent
          message={answer.message}
          secret={answer.secret}
          password={answer.password}
        />
      );
    }

    return content;
  }

  render() {
    //
    const { index, userId, answer, onClick, onClickEdit, onClickRemove } = this.props;

    return (
      <Box mb={2}>
        <Card onClick={(event: React.MouseEvent) => onClick(event, answer)}>
          <Card.Header
            title={
              <Box display="flex" alignItems="center">
                {!answer.anonymous && (
                  <>
                    <Link color="textPrimary" variant="h6">
                      {answer.writerName}
                    </Link>
                    <Box flexGrow={1} />
                  </>
                )}
                <Box display="flex" alignContent="center" color="text.secondary">
                  <Box pr={1}>
                    <AccessTimeIcon fontSize="small" />
                  </Box>
                  <Typography color="textSecondary" variant="body2">
                    {answer.displayTime}
                  </Typography>
                </Box>

                {answer.writerId === userId && (
                  <SubMenu
                    onClickEdit={() => onClickEdit(index)}
                    onClickRemove={() => onClickRemove(answer.id)}
                  />
                )}
              </Box>
            }
          />
          <Card.Content>
            {this.renderContent(answer)}
          </Card.Content>
        </Card>
      </Box>
    );
  }
}

export default AnswerDetailView;
