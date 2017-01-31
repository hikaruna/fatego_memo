import React, { Component } from 'react';
import { Link } from 'react-router';
import { AreaData } from 'data.jsx';
import AreaModel from 'models/Area.js';

export default class Areas extends Component {
  constructor(props) {
    super(props);
    this.model = AreaModel.all;
  }

  render() {
    return(
      <article>
        <h1>エリア一覧</h1>
        <ul>
          {this.model.map(e => {
            return <li key={e.id}><Link to={`/areas/${e.id}`}>{e.id}</Link></li>;
          })}
        </ul>
      </article>
    );
  }
}
