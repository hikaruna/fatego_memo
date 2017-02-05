import React, { Component } from 'react';
import { Link } from 'react-router';
import Model from 'models/Quest.js';

export default class Quests extends Component {
  constructor(props) {
    super(props);
    this.model = Model.all();
  }

  render() {
    return (
      <article>
        <h1>クエスト一覧</h1>
        <ul>
          {this.model.map(e => {
            return <li key={e.id}><Link to={`/quests/${e.id}`}>{e.id}</Link></li>;
          })}
        </ul>
      </article>
    );
  }
}
