import './App.css'
import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store/configureStore';
import MainPage from './components/MainPage';

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <div className="container">
            <MainPage />
        </div>
      </Provider>
  );
};

export default App;
