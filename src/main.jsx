import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import Servants from './Servants.jsx';
import Servant from './Servant.jsx';

render((
  <Router history={browserHistory}>
    <Route path="/fatego_memo" component={Servants}>
      <Route path="servants/:id" component={Servant}/>
    </Route>
  </Router>
), document.getElementById('app'));
