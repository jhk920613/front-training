import configurePreview from '@nara.platform/storybook/storyConfig/configurePreview';

import React from 'react';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { NaraService } from '@nara.drama/prologue';
import { ReactApp } from '@nara.platform/react-ui';
import { store } from '@nara.drama/qna';


configure({
  enforceActions: 'observed',
  isolateGlobalState: true,
});

NaraService.configure({
  kollectionUsid: 'gallery-management',
  kollectieUsid: 'nara-management-gallery',
});

const { parameters, decorators } = configurePreview((defaultConfig) => {
  //
  const customizedConfig = defaultConfig;

  const additionalDecorator = (Story) => (
    <Provider
      {...store}
    >
      <ReactApp>
          <Story />
      </ReactApp>
    </Provider>
  )

  customizedConfig.decorators.push(additionalDecorator);
  customizedConfig.parameters.viewMode = 'canvas';

  return customizedConfig;
});

export {
  parameters,
  decorators,
};
