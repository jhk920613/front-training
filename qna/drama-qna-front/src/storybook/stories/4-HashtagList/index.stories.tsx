
import path from 'paths.macro';
import { docsUtils } from '@nara.platform/storybook';
import { HashtagList } from '@nara.drama/qna';


export * from './1-basic.story';
export * from './2-onClick.story';

export default docsUtils.componentDocs({
  path,
  component: HashtagList.wrappedComponent,
});
