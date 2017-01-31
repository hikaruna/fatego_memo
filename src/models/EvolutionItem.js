import { EvolutionItemData } from 'data.jsx';
import Servant from 'models/Servant.js';
import Item from 'models/Item.js';
import Util from 'Util.js';

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
