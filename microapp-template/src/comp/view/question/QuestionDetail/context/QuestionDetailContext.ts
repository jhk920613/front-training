
import React from 'react';
import { Question } from '~/comp/api';


export interface QuestionDetailContextModel {
  questionDetail: {
    question: Question;
  };
};

const QuestionDetailContext = React.createContext<QuestionDetailContextModel>({
  questionDetail: {
    question: {} as Question,
  },
});

export default QuestionDetailContext;
