import ItemData from 'data/items.yml';
import EvolutionItem from 'models/EvolutionItem.js';
import Util from 'Util.js';

export default class Item {

  static where(where = {}) {
    return Util.where(ItemData, where).map(e => new Item(e));
  }

  static all() {
    return Item.where();
  }

  static findBy(id) {
    return Item.where({id: id})[0];
  }

  constructor(data) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get evolutionItems() {
    return EvolutionItem.where({item_id: this.id});
  }

  get servants() {
    return Array.from(new Set(this.evolutionItems.map(e => e.servant_id)));
  }
}
