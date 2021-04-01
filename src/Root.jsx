import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './styles/util.scss';
import './styles/colors.scss';

const Root = () => {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  );
};

export default Root;