import React, { Component } from 'react';
import { Link } from 'react-router';
import { ItemData } from 'data.jsx';
import Model from 'models/Item.js';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.model = Model.findBy(props.params.id);
  }

  render() {
    const servants = this.model.servants.map(e => {
      const to = `/servants/${e}`;
      return(
        <tr key={e}>
          <td><Link to={to}>{e}</Link></td>
        </tr>
      );
    });
    return (
      <article>
        <h1>{this.props.params.id}</h1>
        <section>
          <h1>必要なサーヴァント</h1>
          <table>
            <tbody>
              {servants}
            </tbody>
          </table>
        </section>
      </article>
    );
  }
}
