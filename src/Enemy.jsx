import React, { Component } from 'react';
import { Link } from 'react-router';
import Model from 'models/Enemy.js';

export default class Enemy extends Component {
  constructor(props) {
    super(props);
    this.model = Model.find(props.params.id);
  }

  render() {
    return (
      <article>
        <h1>{this.model.id}</h1>
        <section>
          <h2>クラス</h2>
          {this.model.class}
        </section>
        <section>
          <h2>出現するクエスト</h2>
          <ul>
            {this.model.quests.map(e => {
              return (
                <li key={e.id}>
                  <Link to={`/quests/${e.id}`}>{e.id}</Link>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <h3>クエストで一緒に出現する他の敵</h3>
          <ul>
            {this.model.enemies.filter(e => e.id != this.model.id).map(e => {
              return (
                <li key={e.id}>
                  <Link to={`/enemies/${e.id}`}>{e.id}</Link>
                </li>
              );
            })}
          </ul>
        </section>
      </article>
    );
  }
}
