import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker    from './registerServiceWorker';
import App from './App.js';

// Main CSS
import './App.css';

// Main app picked up by the index.html file
render(<App />, document.getElementById('root'));

registerServiceWorker();