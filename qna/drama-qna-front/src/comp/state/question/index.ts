import {
  AnswerStateKeeper,
  AnswersStateKeeper,
  HashtagStateKeeper,
  HashtagsStateKeeper,
  QuestionStateKeeper,
  QuestionsStateKeeper,
} from './keeper';


export const store = {
  question: {
    answerStateKeeper: AnswerStateKeeper.instance,
    answersStateKeeper: AnswersStateKeeper.instance,
    hashtagStateKeeper: HashtagStateKeeper.instance,
    hashtagsStateKeeper: HashtagsStateKeeper.instance,
    questionStateKeeper: QuestionStateKeeper.instance,
    questionsStateKeeper: QuestionsStateKeeper.instance,
  },
};

export {
  AnswerStateKeeper,
  AnswersStateKeeper,
  HashtagStateKeeper,
  HashtagsStateKeeper,
  QuestionStateKeeper,
  QuestionsStateKeeper,
};
