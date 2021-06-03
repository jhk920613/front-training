
import QuestionDetailContainer from './QuestionDetailContainer';
import Header from './sub-comp/Header';
import Content from './sub-comp/Content';
import AnswerSummary from './sub-comp/AnswerSummary';


type QuestionDetailComponent = typeof QuestionDetailContainer & {
  Header: typeof Header;
  Content: typeof Content;
  AnswerSummary: typeof AnswerSummary;
};

const questionDetail = QuestionDetailContainer as QuestionDetailComponent;

questionDetail.Header = Header;
questionDetail.Content = Content;
questionDetail.AnswerSummary = AnswerSummary;

export default questionDetail;
