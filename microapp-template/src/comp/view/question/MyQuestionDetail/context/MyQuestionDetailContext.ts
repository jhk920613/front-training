
import React from 'react';
import { Question } from '~/comp/api';


export type MyQuestionDetailContextModel = {
  questionDetail: {
    question: Question;
  };
};

const MyQuestionDetailContext = React.createContext<MyQuestionDetailContextModel>({
  questionDetail: {
    question: {} as Question,
  },
});

export default MyQuestionDetailContext;
