import React, { Component } from 'react';
import { Link } from 'react-router';
import ServantModel from 'models/Servant.js';

export default class Servant extends Component {
  constructor(props) {
    super(props);
    this.model = ServantModel.find(props.params.id);
  }

  get rarity() {
    return Array(this.model.rarity+1).join('☆')
  }

  render() {
    return (
      <article>
        <h1>{this.model.id}</h1>
        <section className="container">
          <h2>クラス</h2>
          <p>{this.model.class}</p>
        </section>
        <section className="container">
          <h2>レアリティ</h2>
          <p>{this.rarity}</p>
        </section>
        <section className="container">
          <h2>再臨アイテム</h2>
          {this.model.evolutions.map((e,i) => {
            return <Evolution key={`evolution${i+1}`} model={e} level={i+1} />;
          })}
        </section>
      </article>
    );
  }
}

class Evolution extends Component {
  render() {
    return (
      <section className="container">
        <h3>第{this.props.level}段階</h3>
        <table className="table table-bordered table-condensed">
          <thead>
            <tr>
              <th>素材</th>
              <th>必要個数</th>
            </tr>
          </thead>
          <tbody>
            {this.props.model.map(e => {
              return <EvolutionItem key={`${e.level}-${e.item_id}`} model={e} />
            })}
          </tbody>
        </table>
      </section>
    );
  }
}

class EvolutionItem extends Component {
  render() {
    return (
      <tr>
        <td>
          <Link to={`/items/${this.props.model.item_id}`}>
            {this.props.model.item_id}
          </Link>
        </td>
        <td>{this.props.model.number}</td>
      </tr>
    );
  }
}
