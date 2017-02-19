import React, { Component } from 'react';
import { Link } from 'react-router';
import { ItemData } from 'data.jsx';
import Model from 'models/Item.js';
import ServantModel from 'models/Servant.js';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.model = Model.find(props.params.id);
  }

  render() {
    return (
      <article>
        <h1>{this.props.params.id}</h1>
        <section>
          <h2>入手可能クエスト</h2>
          <ul>
            {this.model.quests.map(e => {
              return (
                <li>
                  <Link to={`/quests/${e.id}`}>{e.id}</Link>
                </li>
              );
            })}
          </ul>
        </section>
        <section>
          <h2>必要なサーヴァント</h2>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>サーヴァント</th>
                <th>使用先</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const evo   = this.model.servants;
                const skill = this.model.skillEvolutionItems
                  .map(e=> e.servant)
                  .filter(e=> (e || {}).constructor == ServantModel); // idが表記ゆれ
                const all = evo
                  .concat(skill)
                  .uniq((a,b)=> a.id === b.id);
                return all.map((e,i) => {
                  const situation = {
                    evolution: evo.map(e=> e.id).includes(e.id),
                    skillEvolutioin: skill.map(e=> e.id).includes(e.id),
                  };
                  return <Servant key={`${i}_${e.id}`} servant={e} situation={situation}/>;
                })
              })()}
            </tbody>
          </table>
        </section>
      </article>
    );
  }
}

class Servant extends Component {
  render() {
    return (
      <tr>
        <td>
          <Link to={`/servants/${this.props.servant.id}`}>
            {this.props.servant.id}
          </Link>
        </td>
        <td>
          {(()=> {
            let result = [];
            if(this.props.situation.evolution) {
              result.push('再臨');
            }
            if(this.props.situation.skillEvolutioin) {
              result.push('スキル');
            }
            return result.join();
          })()}
        </td>
      </tr>
    );
  }
}
