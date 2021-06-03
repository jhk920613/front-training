
import QuestionListContainer from './QuestionListContainer';
import Header from './sub-comp/Header';
import Content from './sub-comp/Content';
import Pagination from './sub-comp/Pagination';


type QuestionListComponent = typeof QuestionListContainer & {
  Header: typeof Header;
  Content: typeof Content;
  Pagination: typeof Pagination;
};

const QuestionList = QuestionListContainer as QuestionListComponent;

QuestionList.Header = Header;
QuestionList.Content = Content;
QuestionList.Pagination = Pagination;

export default QuestionList;
