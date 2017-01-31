import React, { Component } from 'react';
import { Link } from 'react-router';
import AreaModel from 'models/Area.js';

export default class Area extends Component {
  constructor(props) {
    super(props);
    this.model = AreaModel.findBy(props.params.id);
  }

  render() {
    return (
      <article>
        <h1>{this.props.params.id}</h1>
        <section>
          <ul>
            {this.model.quest_ids.map(e => {
              return <li key={e}>{e}</li>;
            })}
          </ul>
        </section>
      </article>
    );
  }
}
