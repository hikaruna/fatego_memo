import { EvolutionItemData } from 'data.jsx';
import Servant from 'models/Servant.js';
import Item from 'models/Item.js';

export default class EvolutionItem {

  static where(where) {
    return Util.where(EvolutionItemData, where).map(e => new EvolutionItem(e));
  }

  constructor(data) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get number() {
    return this.data.number;
  }

  get servant() {
    return Servant.findBy(this.data.servant_id);
  }

  get item() {
    return Item.findBy(this.data.item_id);
  }
}

class Util {
  static where(from, by) {
    return from.filter(e => {
      return Object.keys(by).reduce((ac,c)=> {
        return ac && (by[c] === e[c]);
      }, true);
    });
  }
}

