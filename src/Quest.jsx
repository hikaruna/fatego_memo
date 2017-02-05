import React, { Component } from 'react';
import { Link } from 'react-router';
import Model from 'models/Quest.js';

export default class Quest extends Component {
  constructor(props) {
    super(props);
    this.model = Model.find(props.params.id);
  }

  render() {
    return (
      <article>
        <h1>{this.model.id}</h1>
        <section>
          <h2>出現する敵</h2>
          <ul>
            {this.model.enemies.map(e => {
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
