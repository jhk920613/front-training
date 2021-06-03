
import React from 'react';
import { autobind, ReactComponent } from '@nara.drama/prologue';
import { observer } from 'mobx-react';
import { Card } from '@nara.platform/react-ui';

import { Question } from '~/comp/api';
import QuestionDetailContext, { QuestionDetailContextModel } from './context/QuestionDetailContext';


interface Props {
  //
  question: Question;
  children: React.ReactNode;
}


@autobind
@observer
class QuestionDetailContainer extends ReactComponent<Props> {
  //
  getContext(): QuestionDetailContextModel {
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
    const { children } = this.props;

    return (
      <QuestionDetailContext.Provider value={this.getContext()}>
        {children}
      </QuestionDetailContext.Provider>
    );
  }
}

export default QuestionDetailContainer;
