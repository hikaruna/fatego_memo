import ActiveObject from 'ActiveObject.js';
import ServantData from 'data/servants.yml';

export default class Servant extends ActiveObject {
  get evolutions() {
    return [1,2,3,4].map(e => {
      return ActiveObject.loadClass('EvolutionItem').where({servant_id: this.id, level: e});
    });
  }
  buildSkillEvolution(level) {
    return ActiveObject.loadClass('SkillEvolutionItem').where({
      servant_id: this.id,
      level: level
    });
  }

  get skillEvolutions() {
    return [1,2,3,4,5,6,7,8,9].map(e => {
      return this.buildSkillEvolution(e);
    });
  }

  get skillEvolution1() { return this.buildSkillEvolution(1); }
  get skillEvolution2() { return this.buildSkillEvolution(2); }
  get skillEvolution3() { return this.buildSkillEvolution(3); }
  get skillEvolution4() { return this.buildSkillEvolution(4); }
  get skillEvolution5() { return this.buildSkillEvolution(5); }
  get skillEvolution6() { return this.buildSkillEvolution(6); }
  get skillEvolution7() { return this.buildSkillEvolution(7); }
  get skillEvolution8() { return this.buildSkillEvolution(8); }
  get skillEvolution9() { return this.buildSkillEvolution(9); }
}
Servant.data = ServantData;
Servant.has_many('evolutionItems');
Servant.has_many('items', { through: 'evolutionItems' });
Servant.has_many('skillEvolutionItems');
