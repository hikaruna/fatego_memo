import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory, useBasename } from 'history';

import App from 'App.jsx';
import Home from 'Home.jsx';
import Servants from 'Servants.jsx';
import Servant from 'Servant.jsx';
import Items from 'Items.jsx';
import Item from 'Item.jsx';

const history = useBasename(createHistory) ({
  basename: '/fatego_memo'
});

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="servants/:id" component={Servant}/>
      <Route path="servants" component={Servants}/>
      <Route path="items/:id" component={Item}/>
      <Route path="items" component={Items}/>
    </Route>
  </Router>
), document.getElementById('app'));
