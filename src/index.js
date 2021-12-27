import './index.css';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { App } from './App/App';

const app = (
  <StrictMode>
    <App/>
  </StrictMode>
);

render(app, document.getElementById('root'));