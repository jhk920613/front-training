import React from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { Box, FormControl, Typography } from '@nara.platform/react-ui';
import { Lock } from '@material-ui/icons';


interface Props {
  //
  message: string;
  secret: boolean;
  password: string;
}

@autobind
@observer
class QuestionContentView extends ReactComponent<Props> {
  //
  render() {
    //
    const { message, secret } = this.props;
    let content;

    if (secret) {
      content = (
        <Box p={2} mb={3} width="100%" style={{ background: '#f9f9f9', borderRadius: '4px', textAlign: 'center' }}>
          <FormControl.ControlLabel
            label={
              <Box mx={1} my={1}>
                <Typography variant="body2" color="textSecondary">
                  비밀글입니다.
                </Typography>
              </Box>
            }
            control={
              <Box pr={1} pl={2}>
                <Typography variant="body2" color="textSecondary">
                  <Lock />
                </Typography>
              </Box>
            }
          />
        </Box>
      );
    }
    else {
      content = (
        <Typography variant="body2" color="textPrimary" style={{ whiteSpace: 'pre-line' }}>
          {message}
        </Typography>
      );
    }

    return content;
  }
}

export default QuestionContentView;
