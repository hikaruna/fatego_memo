import EvolutionItemData from 'data/evolution_items.yml';
import Servant from 'models/Servant.js';
import Item from 'models/Item.js';
import Util from 'Util.js';

export default class EvolutionItem {

  static where(where) {
    return Util.where(EvolutionItemData, where).map(e => new EvolutionItem(e));
  }

  static findBy(where) {
    return EvolutionItem.where(where)[0];
  }

  constructor(data) {
    this.data = data;
    this.number = data.number;
    this.item_id = data.item_id;
    this.servant_id = data.servant_id;
    this.level = data.level;
  }

  get servant() {
    return Servant.findBy(this.data.servant_id);
  }

  get item() {
    return Item.findBy(this.data.item_id);
  }
}
