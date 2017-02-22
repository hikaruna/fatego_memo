import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import path from 'path';

// 現在のpathのqueryだけを変えてonPushedをcallする
export default class QueryLink extends Component {
  static getToByQuery(query) {
    let url = new URL(location.toString());
    url.pathname = url.pathname.split('/').pop();
    for(const [ key, value ] of Object.entries(query)) {
      url.searchParams.set(key, value);
    }
    let pathname =  url.pathname.replace(/^\//, '')
    return pathname + url.search;
  }

  onClick(event) {
    event.preventDefault();
    browserHistory.push(QueryLink.getToByQuery(this.props.query));
    this.props.onPushed(event);
  }

  render() {
    return <Link
      to={QueryLink.getToByQuery(this.props.query)}
      onClick={(event) => this.onClick(event)}
    >
      {this.props.children}
    </Link>;
  }
}

QueryLink.propTypes = {
  query:    React.PropTypes.object,
  onPushed: React.PropTypes.func,
}
QueryLink.defaultProps = {
  query: {},
  onPushed: () => {},
}
