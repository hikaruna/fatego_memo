import React, { Component } from 'react';
import { Link } from 'react-router';
import Model from 'models/Point.js';

export default class Point extends Component {
  constructor(props) {
    super(props);
    this.model = Model.find(props.params.id);
  }

  get parent() {
    let a = "";
    if(this.props.params.hasOwnProperty('area_id')) {
      a += `/areas/${this.props.params.area_id}`;
    }
    a += `/points/${this.props.params.id}`;
    return a;
  }

  render() {
    return (
      <article>
        <h1>{this.model.id}</h1>
        <ul>
          {this.model.quest_ids.map(e => {
            return (
              <li key={e}>
                <Link to={`${this.parent}/quests/${e}`}>{e}</Link>
              </li>
            );
          })}
        </ul>
      </article>
    );
  }
}
