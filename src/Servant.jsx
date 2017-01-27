import React, { Component } from 'react';
import allData from 'data.jsx';

export default class Servant extends Component {
  constructor(props) {
    super(props);
    this.data = allData.servants.find( (e,i) => e.id === props.id );
  }

  render() {
    return (
      <article>
          <h1>{this.data.id}</h1>
          <sction>
              <h1>レアリティ</h1>
              {this.data.rarity}
          </sction>
      </article>
    );
  }
}
