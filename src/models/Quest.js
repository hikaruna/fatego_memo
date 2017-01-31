import { QuestData } from 'data.jsx';
import Util from 'Util.js';

export default class Quest {
  static get all() {
    return QuestData.map(e => new Quest(e));
  }

  static where(where) {
    return Util.where(QuestData, where).map(e => new Quest(e));
  }

  static findBy(id) {
    return new Quest(QuestData.find(e => e.id === id));
  }

  constructor(data) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }
}
