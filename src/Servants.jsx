import React, { Component } from 'react';
import ServantSummary from 'ServantSummary.jsx';
import allData from 'data.jsx';

export default class Servants extends Component {

  constructor(props) {
    super(props);
    this.data = allData.servants;
  }

  render() {
    var rows = [];
    for (var i=0; i < this.data.length; i++) {
      let row = this.data[i];
      rows.push(<ServantSummary id={row.id} />);
    }

    return (
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th>★</th>
            <th>クラス</th>
          </tr>
        </thead>
        <tbody>
          <ServantSummary id={this.data[0].id} />
          <ServantSummary id={this.data[1].id} />
        </tbody>
      </table>
    );
  }
}
