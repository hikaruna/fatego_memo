import React, { Component } from 'react';
import { Link } from 'react-router';
import path from 'path';

export default class QueryLink extends Link {
  render() {
    let base = path.basename(location.pathname);
    let to = base + this.props.q;
    let children = this.props.children;
    return <Link to={to} >{children}</Link>;
  }
}
