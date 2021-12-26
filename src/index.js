import './index.css';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { App } from './App/App';
import { AppService } from './services/AppService';

const app = (
  <StrictMode>
    <App appService={new AppService()}/>
  </StrictMode>
);

render(app, document.getElementById('root'));