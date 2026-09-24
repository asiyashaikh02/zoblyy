(globalThis as any).window = {
  location: { pathname: '/', search: '', hash: '' },
  addEventListener: () => {},
  removeEventListener: () => {},
  innerWidth: 1200,
  innerHeight: 800,
  scrollTo: () => {}
};
(globalThis as any).document = {
  getElementById: () => null,
  addEventListener: () => {},
  removeEventListener: () => {}
};

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/App';
import * as fs from 'fs';

const html = ReactDOMServer.renderToString(React.createElement(App));
fs.writeFileSync('./rendered.html', '<div id="root">' + html + '</div>');
console.log("SUCCESS rendered.html written, length:", html.length);
