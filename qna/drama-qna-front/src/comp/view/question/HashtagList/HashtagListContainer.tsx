import React from 'react';
import { observer } from 'mobx-react';
import { autobind, ReactComponent, ServiceInjector } from '@nara.drama/prologue';

import { HashtagsStateKeeper } from '~/comp/state';
import { TagList } from '~/comp/view/shared';


interface Props {
  onClick?: (event: React.MouseEvent, tag: string) => void;
}

interface InjectedProps {
  //
  hashtagsStateKeeper: HashtagsStateKeeper;
}

@autobind
@observer
class HashtagListContainer extends ReactComponent<Props, {}, InjectedProps> {
  //
  static defaultProps = {
    onClick: () => {},
  };

  componentDidMount() {
    //
    this.init();
  }

  async init() {
    //
    const { hashtagsStateKeeper } = this.injected;

    hashtagsStateKeeper.findAllTags();
  }

  onClick(event: React.MouseEvent, index: number) {
    //
    const { onClick } = this.propsWithDefault;
    const { tags } = this.injected.hashtagsStateKeeper;
    const tag = tags[index];

    onClick(event, tag);
  }

  render() {
    //
    const { tags } = this.injected.hashtagsStateKeeper;

    return (
      <TagList
        tags={tags}
        onClick={this.onClick}
      />
    );
  }
}

export { HashtagListContainer };
export default ServiceInjector.withContext(
  HashtagsStateKeeper
)(HashtagListContainer);
