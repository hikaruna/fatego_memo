import React from 'react';
import { render } from 'react-dom';

import Hello from './hello.jsx';

render(
  <div>
    <Hello ref="hello"/>
  </div>,
  document.getElementById('app')
);
