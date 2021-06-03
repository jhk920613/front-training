
import path from 'paths.macro';
import { docsUtils } from '@nara.platform/storybook';
import { QuestionList } from '@nara.drama/qna';


export * from './1-basic.story';
export * from './2-onClick.story';

export default docsUtils.componentDocs({
  path,
  component: QuestionList.wrappedComponent,
  subcomponents: {
    'QuestionList.Header': QuestionList.Header,
    'QuestionList.Content': QuestionList.Content.wrappedComponent,
    'QuestionList.Pagination': QuestionList.Pagination,
  },
});
