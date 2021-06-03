
import path from 'paths.macro';
import { docsUtils } from '@nara.platform/storybook';
import { MyQuestionDetail } from '@nara.drama/qna';


export * from './1-basic.story';

export default docsUtils.componentDocs({
  path,
  component: MyQuestionDetail,
  subcomponents: {
    'MyQuestionDetail.Header': MyQuestionDetail.Header,
    'MyQuestionDetail.Content': MyQuestionDetail.Content,
    'MyQuestionDetail.AnswerSummary': MyQuestionDetail.AnswerSummary,
  },
});
