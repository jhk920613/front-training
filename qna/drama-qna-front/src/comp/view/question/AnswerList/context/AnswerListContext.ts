import React from 'react';


export type AnswerListContextModel = {
  answerList: {
    userId: string;
    init: () => void;
  };
};

const AnswerListContext = React.createContext<AnswerListContextModel>({
  answerList: {
    userId: '',
    init: () => {},
  },
});

export default AnswerListContext;
