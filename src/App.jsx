import React, { Component } from 'react';
require('bootstrap/dist/css/bootstrap.css');
import Breadcrumbs from 'react-breadcrumbs';

export default class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <Breadcrumbs routes={this.props.routes} params={this.props.params}/>
        </nav>
        <main className="container">
          { this.props.children }
        </main>
      </div>
    );
  }
}
