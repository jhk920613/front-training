
import React from 'react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { observer } from 'mobx-react';
import { Card } from '@nara.platform/react-ui';

import { Question } from '~/comp/api';
import MyQuestionDetailContext, { MyQuestionDetailContextModel } from './context/MyQuestionDetailContext';
import { withStyles, WithStyles } from './style';


interface Props extends WithStyles{
  //
  question: Question;
  children: React.ReactNode;
}

@autobind
@observer
class MyQuestionDetailContainer extends ReactComponent<Props> {
  //
  getContext(): MyQuestionDetailContextModel {
    //
    const { question } = this.props;

    return {
      questionDetail: {
        question,
      },
    };
  }

  render() {
    //
    const { children, classes } = this.props;

    return (
      <MyQuestionDetailContext.Provider value={this.getContext()}>
        {/*<Card className={classes.action}>*/}
          {children}
        {/*</Card>*/}
      </MyQuestionDetailContext.Provider>
    );
  }
}

export default withStyles(MyQuestionDetailContainer);
