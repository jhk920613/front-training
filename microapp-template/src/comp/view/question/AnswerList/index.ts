
import AnswerListContainer from './AnswerListContainer';
import Content from './sub-comp/Content';
import Pagination from './sub-comp/Pagination';


type AnswerListComponent = typeof AnswerListContainer & {
  Content: typeof Content;
  Pagination: typeof Pagination;
};

const AnswerList = AnswerListContainer as AnswerListComponent;

AnswerList.Content = Content;
AnswerList.Pagination = Pagination;

export default AnswerList;
