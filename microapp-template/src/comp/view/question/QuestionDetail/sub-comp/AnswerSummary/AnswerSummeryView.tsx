import React, { ContextType } from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { Box, Card, Typography } from '@nara.platform/react-ui';
import QuestionDetailContext from '../../context/QuestionDetailContext';
import { WithStyles, withStyles } from './style';


interface Props extends WithStyles {
  //
}

@autobind
@observer
class AnswerSummeryView extends ReactComponent<Props> {
  //
  static contextType = QuestionDetailContext;

  context!: ContextType<typeof QuestionDetailContext>;


  render() {
    //
    const { classes } = this.props;
    const { question } = this.context.questionDetail;

    return (
      <Card.Actions>
        {!question.editing && question.answerSummary && (
          <Box p={3} m={3} className={classes.action}>
            <Typography style={{ whiteSpace: 'pre-line' }}>
              {question.answerMessage}
            </Typography>
          </Box>
        )}
      </Card.Actions>
    );
  }
}

export default withStyles(AnswerSummeryView);
