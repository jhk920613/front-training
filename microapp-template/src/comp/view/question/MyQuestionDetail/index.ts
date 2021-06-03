
import MyQuestionDetailContainer from './MyQuestionDetailContainer';
import Header from './sub-comp/Header';
import Content from './sub-comp/Content';
import AnswerSummary from './sub-comp/AnswerSummary';


type MyQuestionDetailComponent = typeof MyQuestionDetailContainer & {
  Header: typeof Header;
  Content: typeof Content;
  AnswerSummary: typeof AnswerSummary;
};

const myQuestionDetail = MyQuestionDetailContainer as MyQuestionDetailComponent;

myQuestionDetail.Header = Header;
myQuestionDetail.Content = Content;
myQuestionDetail.AnswerSummary = AnswerSummary;

export default myQuestionDetail;
