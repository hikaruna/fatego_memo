import React, { Component } from 'react';
import { Link } from 'react-router';
import EnemyModel from 'models/Enemy.js';

export default class Enemy extends Component {
  constructor(props) {
    super(props);
    this.model = EnemyModel.findBy(props.params.id);
    this.class = EnemyModel;
  }

  render() {
    return (
      <article>
        <h1>{this.model.id}</h1>
        <section>
          <h1>クラス</h1>
          {this.model.class}
        </section>
        <ul>
          {this.model.quests.map(e => {
            return (
              <li key={e.quest_id}>
                <Link to={`/quests/${e.quest_id}`}>{e.quest_id}</Link>
              </li>
            );
          })}
        </ul>
      </article>
    );
  }
}
