import React, { Component } from 'react';
import { Link } from 'react-router';
import { ItemData } from 'data.jsx';
import Model from 'models/Item.js';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.model = Model.find(props.params.id);
  }

  render() {
    return (
      <article>
        <h1>{this.props.params.id}</h1>
        <section>
          <h1>必要なサーヴァント</h1>
          <table>
            <tbody>
              {this.model.servants.map((e,i) => {
                return <Servant key={e.id} servant={e}/>;
              })}
            </tbody>
          </table>
        </section>
      </article>
    );
  }
}

class Servant extends Component {
  render() {
    return (
      <tr>
        <td>
          <Link to={`/servants/${this.props.servant.id}`}>
            {this.props.servant.id}
          </Link>
        </td>
      </tr>
    );
  }
}
