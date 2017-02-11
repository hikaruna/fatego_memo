import React, { Component } from 'react';
import { Link } from 'react-router';
import ServantModel from 'models/Servant.js';
import Util from 'Util.js';

export default class Servants extends Component {

  constructor(props) {
    super(props);
    const query = Util.parseUrlQuery(props.location.search);
    let where = Object.assign({}, props.params.where);
    this.servants = ServantModel.where(where).order(...(query.order || []));
  }

  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>名前</th>
            <th>★</th>
            <th>クラス</th>
          </tr>
        </thead>
        <tbody>
          {this.servants.map(e => {
            return <Servant key={`servants_${ e.id }`} servant={e} />;
          })}
        </tbody>
      </table>
    );
  }
}

class Servant extends Component {
  render() {
    return (
      <tr>
        <td><Link to={`/servants/${this.props.servant.id}`}>{this.props.servant.id}</Link></td>
        <td>{this.props.servant.rarity}</td>
        <td>{this.props.servant.class}</td>
      </tr>
    );
  }
}
