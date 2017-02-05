import React, { Component } from 'react';
import { Link } from 'react-router';
import Model from 'models/Point.js';

export default class Points extends Component {
  constructor(props) {
    super(props);
    this.model = Model.all();
  }

  render() {
    return (
      <article>
        <h1>{this.model.id}</h1>
        <ul>
          {this.model.map(e => {
            return <li key={e.id}><Link to={`/points/${e.id}`}>{e.id}</Link></li>;
          })}
        </ul>
      </article>
    );
  }
}
