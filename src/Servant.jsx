import React, { Component } from 'react';
import { Link } from 'react-router';
import { ServantData, EvolutionItemData } from 'data.jsx';

export default class Servant extends Component {
  constructor(props) {
    super(props);
    this.data = ServantData.find( (e) => e.id === props.params.id);
    this.evolutionItems = EvolutionItemData.filter( (e) => e.servant_id === this.id );
    for(let i=0;i<4;i++) {
      this.evolution1Items = this.evolutionItems.filter( (e) => e.level === i );
    }
  }

  get id() {
    return this.data.id;
  }

  get class() {
    return this.data.class;
  }

  get rarity() {
    return this.data.rarity;
  }

  render() {
    const evolutionItems = Array(4).fill().map( (_, i) => {
      const items = this.evolutionItems.filter(e => e.level === i+1).map(e => {
        let to = `/items/${e.item_id}`;
        return (
          <tr key={e.item_id}>
            <td><Link to={to}>{e.item_id}</Link></td>
            <td>{e.number}</td>
          </tr>
        );
      });

      return (
          <section key={i+1}>
            <h1>第{i+1}段階</h1>
            <table>
              <thead>
                <tr>
                  <th>素材</th>
                  <th>必要個数</th>
                </tr>
              </thead>
              <tbody>
                {items}
              </tbody>
            </table>
          </section>
      );
    });

    return (
      <article>
        <h1>{this.id}</h1>
        <section>
          <h1>クラス</h1>
          <p>{this.class}</p>
        </section>
        <section>
          <h1>レアリティ</h1>
          <p>{Array(this.rarity+1).join('☆')}</p>
        </section>
        <section>
          <h1>再臨素材</h1>
          {evolutionItems}
        </section>
      </article>
    );
  }
}
