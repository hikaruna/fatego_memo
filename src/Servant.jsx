import React, { Component } from 'react';
import { ServantData } from 'data.jsx';

export default class Servant extends Component {
  render() {
    return (
      <article>
          <h1>{this.props.params.id}</h1>
      </article>
    );
  }
}
