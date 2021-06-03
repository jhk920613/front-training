import React from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { Box, Card, Typography } from '@nara.platform/react-ui';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';


import { Question } from '~/comp/api';


interface Props {
  //
  question: Question;
  renderAction: (question: Question) => React.ReactNode;
}

@autobind
@observer
class HeaderView extends ReactComponent<Props> {
  //
  writerName(secret: boolean, name: string) {
    //
    if (secret) {
      const charCount = name.length;
      const middleChars = name.substring(1, charCount - 1);
      return name.replace(middleChars, '*'.repeat(middleChars.length));
    }

    return name;
  }

  render() {
    //
    const { question, renderAction } = this.props;

    if (question.editing) {
      return null;
    }

    return (
      <Card.Header
        disableTypography
        title={<Typography color="textPrimary" variant="h5" bold>{question.title}</Typography>}
        subheader={(
          <Box pt={2} display="flex" alignItems="center">
            {!question.anonymous && (
              <Box display="flex" mr={3} color="text.secondary">
                <Box pr={1}>
                  <PersonIcon fontSize="small" />
                </Box>
                <Typography variant="body2">
                  {this.writerName(question.secret, question.writerName)}
                </Typography>
              </Box>
            )}
            <Box display="flex" color="text.secondary">
              <Box pr={1}>
                <AccessTimeIcon fontSize="small" />
              </Box>
              <Typography variant="body2">
                {question.displayTime}
              </Typography>
            </Box>
          </Box>
        )}
        action={renderAction(question)}
      />
    );
  }
}

export default HeaderView;
