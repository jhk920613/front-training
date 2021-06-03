
import path from 'paths.macro';
import { docsUtils } from '@nara.platform/storybook';
import { CoachQuestionList } from '@nara.drama/qna';


export * from './1-basic.story';
export * from './2-onClick.story';

export default docsUtils.componentDocs({
  path,
  component: CoachQuestionList.wrappedComponent,
  subcomponents: {
    'CoachQuestionList.Header': CoachQuestionList.Header,
    'CoachQuestionList.Content': CoachQuestionList.Content.wrappedComponent,
    'CoachQuestionList.Pagination': CoachQuestionList.Pagination,
  },
});
