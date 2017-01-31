import { ItemData, EvolutionItemData } from 'data.jsx';
export default class Item {

  static findBy(id) {
    return new Item(ItemData.find(e => e.id === id));
  }

  constructor(data) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get evolutionItems() {
    return EvolutionItemData.filter(e => e.item_id === this.id);
  }

  get servants() {
    return Array.from(new Set(this.evolutionItems.map(e => e.servant_id)));
  }
}
