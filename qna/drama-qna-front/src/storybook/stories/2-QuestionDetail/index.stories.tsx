
import path from 'paths.macro';
import { docsUtils } from '@nara.platform/storybook';
import { QuestionDetail } from '@nara.drama/qna';


export * from './1-basic.story';
export * from './2-renderAction.story';

export default docsUtils.componentDocs({
  path,
  component: QuestionDetail,
  subcomponents: {
    'QuestionDetail.Header': QuestionDetail.Header,
    'QuestionDetail.Content': QuestionDetail.Content,
    'QuestionDetail.AnswerSummary': QuestionDetail.AnswerSummary,
  },
});
