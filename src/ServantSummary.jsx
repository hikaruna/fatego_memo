import React, { Component } from 'react';
import { ServantData } from 'data.jsx';

export default class ServantSummary extends Component {
  constructor(props) {
    super(props);
    this.data = ServantData.find( (e,i) => e.id === props.id );
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
