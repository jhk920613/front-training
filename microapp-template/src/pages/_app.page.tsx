import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { AppProps } from 'next/app';
import { autobind } from '@nara.drama/prologue';
import { store } from '@posco/qna';
import {Box, PageLayout, Typography} from '@nara.platform/react-ui';


@autobind
class ChannelApp extends Component<AppProps> {
  //
  render() {
    //
    const { Component, pageProps } = this.props;

    return (
      <Provider
        {...store}
      >
        <Box mb={5}>
          Question MSA 페이지 입니다.
        </Box>
        <Component
          {...pageProps}
        />
      </Provider>
    );
  }
}

export default ChannelApp;
