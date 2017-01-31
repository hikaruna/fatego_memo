import React, { Component } from 'react';
import { Link } from 'react-router';
import { ItemData } from 'data.jsx';

export default class Items extends Component {
  render() {
    const rows = ItemData.map(e => {
      const to = `/items/${e.id}`;
      return(
        <tr key={e.id}>
          <td><Link to={to}>{e.id}</Link></td>
        </tr>
      );
    });

    return(
      <table>
        <thead>
          <tr>
            <th>素材名</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}
