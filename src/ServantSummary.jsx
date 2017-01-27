import React, { Component } from 'react';
import allData from 'data.jsx';

export default class ServantSummary extends Component {
  constructor(props) {
    super(props);
    this.data = allData.servants.find( (e,i) => e.id === props.id );
    console.debug(this.data);
    console.debug('hoge');
  }

  render() {
    return (
      <tr>
          <td>{this.data.id}</td>
          <td>{this.data.rarity}</td>
          <td>{this.data.class}</td>
      </tr>
    );
  }
}
