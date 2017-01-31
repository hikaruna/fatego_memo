import React, { Component } from 'react';
import { Link } from 'react-router';
import { ServantData, EvolutionItemData } from 'data.jsx';
import ServantModel from 'models/Servant.js';

export default class Servant extends Component {
  constructor(props) {
    super(props);
    this.model = ServantModel.findBy(props.params.id);
    this.data = ServantData.find( (e) => e.id === props.params.id);
    this.evolutionItems = EvolutionItemData.filter( (e) => e.servant_id === this.id );
    for(let i=0;i<4;i++) {
      this.evolution1Items = this.evolutionItems.filter( (e) => e.level === i );
    }
  }

  get rarity() {
    return Array(this.model.rarity+1).join('☆')
  }

  get evolutions() {
    return this.model.evolutions.map((evolutionItems,i) => {
      return new Evolution(evolutionItems, i+1).render();
    });
  }

  render() {
    console.log(this.model.evolutions[1][0]);
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
        {this.evolutions}
      </article>
    );
  }
}

class Evolution {
  constructor(evolutionItems, level) {
    this.evolutionItems = evolutionItems;
    this.level = level;
  }

  render() {
    return (
      <section key={this.level}>
        <h1>第{this.level}段階</h1>
        <table>
          <thead>
            <tr>
              <th>素材</th>
              <th>必要個数</th>
            </tr>
          </thead>
          <tbody>
            {this.evolutionItems.map(evolutionItem => {
              return (
                <tr key={evolutionItem.item.id}>
                  <td>
                    <Link to={`/items/${evolutionItem.item.id}`}>
                      {evolutionItem.item.id}
                    </Link>
                  </td>
                  <td>{evolutionItem.number}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }
}
