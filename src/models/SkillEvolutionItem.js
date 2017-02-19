import ActiveObject from 'ActiveObject.js';
import SkillEvolutionItemData from 'data/skill_evolution_items.yml';

export default class SkillEvolutionItem extends ActiveObject {
}
SkillEvolutionItem.data = SkillEvolutionItemData;
SkillEvolutionItem.belongs_to('servant');
SkillEvolutionItem.belongs_to('item');
