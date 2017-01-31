import React, { Component } from 'react';
import { Link } from 'react-router';
import { ServantData } from 'data.jsx';

export default class ServantSummary extends Component {
  constructor(props) {
    super(props);
    this.data = ServantData.find( (e,i) => e.id === props.id );
  }

  render() {
    let a = `/servants/${this.data.id}`;
    return (
      <tr>
        <td><Link to={a}>{this.data.id}</Link></td>
        <td>{this.data.rarity}</td>
        <td>{this.data.class}</td>
      </tr>
    );
  }
}
