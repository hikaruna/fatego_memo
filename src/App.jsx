import React, { Component } from 'react';
import Breadcrumbs from 'react-breadcrumbs';

export default class App extends Component {
  render() {
    return (
      <div>
        <Breadcrumbs routes={this.props.routes} params={this.props.params}/>
        <div>
        { this.props.children }
        </div>
      </div>
    );
  }
}
