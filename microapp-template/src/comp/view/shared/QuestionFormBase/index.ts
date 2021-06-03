
import QuestionFormBaseView from './QuestionFormBaseView';
import Content from './sub-comp/Content';
import AttachedImage from './sub-comp/AttachedImage';
import Actions from './sub-comp/Actions';


type QuestionFormBaseComponent = typeof QuestionFormBaseView & {
  Content: typeof Content;
  AttachedImage: typeof AttachedImage;
  Actions: typeof Actions;
};

const QuestionFormBase = QuestionFormBaseView as QuestionFormBaseComponent;

QuestionFormBase.Content = Content;
QuestionFormBase.AttachedImage = AttachedImage;
QuestionFormBase.Actions = Actions;

export default QuestionFormBase;
