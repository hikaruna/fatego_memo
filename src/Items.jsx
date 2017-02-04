import React, { Component } from 'react';
import { Link } from 'react-router';
import ItemModel from 'models/Item.js';

export default class Items extends Component {
  render() {
    return(
      <table>
        <thead>
          <tr>
            <th>素材名</th>
          </tr>
        </thead>
        <tbody>
          {ItemModel.all().map(e => {
            return (
              <tr key={e.id}>
                <td><Link to={`/items/${e.id}`}>{e.id}</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
