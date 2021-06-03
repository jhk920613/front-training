
import path from 'paths.macro';
import { docsUtils } from '@nara.platform/storybook';
import { QuestionForm } from '@nara.drama/qna';


export * from './1-basic.story';

export default docsUtils.componentDocs({
  path,
  component: QuestionForm.wrappedComponent,
});
