import EvolutionItem from 'models/EvolutionItem.js';
import Util from 'Util.js';
import ServantData from 'data/servants.yml';

export default class Servant {

  static all() {
    return Servant.where();
  }

  static where(where = {}) {
    return Util.where(ServantData, where).map(e => new Servant(e));
  }

  static findBy(id) {
    return new Servant(ServantData.find(e => e.id === id));
  }

  constructor(data) {
    this.data = data;
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

  get evolutionItems() {
    return EvolutionItem.where({servant_id: this.id});
  }

  get items() {
    return Array.from(new Set(this.evolutionItems.map(e => e.item)));
  }

  get evolutions() {
    return [1,2,3,4].map(e => {
      return EvolutionItem.where({servant_id: this.id, level: e});
    });
  }
}
