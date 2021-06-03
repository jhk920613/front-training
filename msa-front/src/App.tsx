import React from 'react';
import {Provider} from 'mobx-react';
import MainPage from './page/MainPage';
import ProfileStateKeeper from './comp/state';

function App() {
  return (
      <Provider profileStateKeeper={ProfileStateKeeper.instance}>
        <MainPage />
      </Provider>
  );
}

export default App;
