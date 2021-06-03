
import React from 'react';
import { autobind, ReactComponent } from '@nara.drama/prologue';

import { Box, Card, FormControl, Divider } from '@nara.platform/react-ui';


interface Props {
  children: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}

@autobind
class FormWrapperView extends ReactComponent<Props> {
  //
  static defaultProps = {
    title: '',
    action: null,
  };

  render() {
    //
    const { title, action, children } = this.props;

    return (
      <Card>
        { title && (
          <>
            <Box px={2}>
              <Card.Header title={title} action={action} />
            </Box>
            <Divider />
          </>
        )}

        <Card.Content>
          <Box p={1}>
            <FormControl>
              {/*<form>*/}
              {children}
              {/*</form>*/}
            </FormControl>
          </Box>
        </Card.Content>
      </Card>
    );
  }
}

export default FormWrapperView;
