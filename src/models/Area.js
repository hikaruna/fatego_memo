import { AreaData } from 'data.jsx';
import Quest from 'models/Quest.js';

export default class Area {
  static get all() {
    return AreaData.map(e => new Area(e));
  }

  static findBy(id) {
    return new Area(AreaData.find(e => e.id === id));
  }

  constructor(data) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get quest_ids() {
    return Quest.where({area_id: this.id}).map(e => e.id);
  }
}
