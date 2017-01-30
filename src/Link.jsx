import React, { Component } from 'react';
import { Link as ReactLink } from 'react-router';

export default class Link extends Component {
  constructor(props) {
    super(props);
    this.publicPath = "/fatego_memo";
  }
  render() {
    const to = `${this.publicPath}/${this.props.to}`;
    return (
      <ReactLink to={to}>{this.props.value}</ReactLink>
    );
  }
}
