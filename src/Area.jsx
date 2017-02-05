import React, { Component } from 'react';
import { Link } from 'react-router';
import AreaModel from 'models/Area.js';

export default class Area extends Component {
  constructor(props) {
    super(props);
    this.model = AreaModel.find(props.params.id);
  }

  render() {
    return (
      <article>
        <h1>{this.props.params.id}</h1>
        <section>
          <ul>
            {this.model.point_ids.map(e => {
              return <li key={e}><Link to={`/areas/${this.model.id}/points/${e}`}>{e}</Link></li>;
            })}
          </ul>
        </section>
      </article>
    );
  }
}
