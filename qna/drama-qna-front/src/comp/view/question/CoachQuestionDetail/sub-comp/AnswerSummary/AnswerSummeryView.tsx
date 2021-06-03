import React, { ContextType } from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { Box, Card, Typography, Button } from '@nara.platform/react-ui';
import QuestionDetailContext from '../../context/QuestionDetailContext';
import { WithStyles, withStyles } from './style';


interface Props extends WithStyles {
  //
  onEdit?: (event: React.MouseEvent) => void;
}

@autobind
@observer
class AnswerSummeryView extends ReactComponent<Props> {
  //
  static defaultProps = {
    onEdit: () => {},
  };

  static contextType = QuestionDetailContext;

  context!: ContextType<typeof QuestionDetailContext>;


  render() {
    //
    const { classes } = this.props;
    const { onEdit } = this.propsWithDefault;
    const { question } = this.context.questionDetail;



    return (
      <Card.Actions>
        {!question.editing && question.answerSummary && (
          <Box px={4} py={3} mb={3} className={classes.action}>
            <Box display="flex" justifyContent="flex-end" mb={1}>
              <Button variant="outlined" onClick={onEdit}>
                EDIT
              </Button>
            </Box>
            <Box>
              <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                {question.answerMessage}
              </Typography>
            </Box>
          </Box>
        )}
      </Card.Actions>
    );
  }
}

export default withStyles(AnswerSummeryView);
