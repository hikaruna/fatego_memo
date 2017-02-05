import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <section>
        <h1>Home画面でーす</h1>
        <ul>
          <li><Link to="/servants">サーヴァント一覧</Link></li>
          <li><Link to="/items">素材一覧</Link></li>
          <li><Link to="/areas">エリア一覧</Link></li>
          <li><Link to="/points">座標一覧</Link></li>
          <li><Link to="/quests">クエスト一覧</Link></li>
          <li><Link to="/enemies">エネミー一覧</Link></li>
        </ul>
      </section>
    );
  }
}
