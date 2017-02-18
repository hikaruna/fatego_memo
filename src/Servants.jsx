import React, { Component } from 'react';
import { Link } from 'react-router';
import ServantModel from 'models/Servant.js';
import Util from 'Util.js';
import ModelsTable from 'ModelsTable.jsx';

export default class Servants extends Component {

  constructor(props) {
    super(props);
    const query = Util.parseUrlQuery(props.location.search);
    this.order = (query.order || []);
    let where = Object.assign({}, props.params.where);
    this.servants = ServantModel.where(where);
  }

  render() {
    return (
      <ModelsTable
        models={this.servants}
        columns={ServantModel.columns}
        order={this.order}
        component={Servant}
      />
    );
  }
}

class Servant extends Component {
  render() {
    let text = this.props.value;
    if(this.props.column === 'id') {
      text = <Link to={`/servants/${this.props.value}`}>{this.props.value}</Link>;
    }
    return <td key={`body_${this.props.model.id}_${this.props.column}`}>{text}</td>;
  }
}
