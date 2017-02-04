import ActiveObject from 'ActiveObject.js';
import ServantData from 'data/servants.yml';

export default class Servant extends ActiveObject {
  get evolutions() {
    return [1,2,3,4].map(e => {
      return ActiveObject.loadClass('EvolutionItem').where({servant_id: this.id, level: e});
    });
  }
}
Servant.data = ServantData;
Servant.has_many('evolutionItems');
Servant.has_many('items', { through: 'evolutionItems' });
