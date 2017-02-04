import React, { Component } from 'react';
import { Link } from 'react-router';
import { ServantData, EvolutionItemData } from 'data.jsx';
import ServantModel from 'models/Servant.js';
import EvolutionItemModel from 'models/EvolutionItem.js';

export default class Servant extends Component {
  constructor(props) {
    super(props);
    this.model = ServantModel.findBy(props.params.id);
  }

  get rarity() {
    return Array(this.model.rarity+1).join('☆')
  }

  render() {
    return (
      <article>
        <h1>{this.model.id}</h1>
        <section>
          <h1>クラス</h1>
          <p>{this.model.class}</p>
        </section>
        <section>
          <h1>レアリティ</h1>
          <p>{this.rarity}</p>
        </section>
        {this.model.evolutions.map((e,i) => {
          return <Evolution key={`evolution${i+1}`} model={e} level={i+1} />;
        })}
      </article>
    );
  }
}

class Evolution extends Component {
  render() {
    return (
      <section>
        <h1>第{this.props.level}段階</h1>
        <table>
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
