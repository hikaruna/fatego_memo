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
import Points from 'Points.jsx';
import Point from 'Point.jsx';
import Quests from 'Quests.jsx';
import Quest from 'Quest.jsx';
import Enemies from 'Enemies.jsx';
import Enemy from 'Enemy.jsx';

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
        <Route path=":area_id">
          <Route path="points/:id" component={Point}/>
          <Route path="points/:point_id">
            <Route path="quests/:id" component={Quest}/>
          </Route>
        </Route>
      </Route>
      <Route name="Points一覧" path="points">
        <IndexRoute component={Points}/>
        <Route path=":id" component={Point}/>
        <Route path=":point_id">
          <Route path="quests/:id" component={Quest}/>
        </Route>
      </Route>
      <Route name="Quests一覧" path="quests">
        <IndexRoute component={Quests}/>
        <Route path=":id" component={Quest}/>
      </Route>
      <Route name="Enemy一覧" path="enemies">
        <IndexRoute component={Enemies}/>
        <Route path=":id" component={Enemy}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
