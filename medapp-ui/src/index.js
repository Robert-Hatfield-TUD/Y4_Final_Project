/*
This is the section of the UI which calls the application as a component to then display it to the
user.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
