import React from 'react';
import {autobind, ReactComponent} from '@nara.drama/prologue';
import { inject, observer } from 'mobx-react';
import {HashtagsStateKeeper} from '../../../state';
import {TagList} from '../../shared';


interface Props {
  onClick?: () => void;
}

interface State {

}

interface InjectedProps {
  hashtagsStateKeeper: HashtagsStateKeeper;
}

@inject(HashtagsStateKeeper.instanceName)
@observer
@autobind
class CustomHashtagListContainer extends ReactComponent<Props, State, InjectedProps> {
  //
  componentDidMount() {
    //
    const { hashtagsStateKeeper } = this.injected;
    hashtagsStateKeeper.findHashtags(0, 1000);
  }

  render() {
    //
    const { hashtags } = this.injected.hashtagsStateKeeper;
    const tags = hashtags.map((hashtag) => hashtag.tag);

    return (
      <TagList
        tags={tags}
      />
    );
  }
}

export default CustomHashtagListContainer;
