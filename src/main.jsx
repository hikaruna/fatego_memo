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
import Areas from 'Areas.jsx';
import Area from 'Area.jsx';

const history = useBasename(createHistory) ({
  basename: BASE_PATH
});

render((
  <Router history={history}>
    <Route name="Top" path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route name="サーヴァント一覧" path="servants">
        <IndexRoute component={Servants}/>
        <Route path=":id" component={Servant}/>
      </Route>
      <Route name="素材一覧" path="items">
        <IndexRoute component={Items}/>
        <Route path=":id" component={Item}/>
      </Route>
      <Route name="Area一覧" path="areas">
        <IndexRoute component={Areas}/>
        <Route path=":id" component={Area}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
