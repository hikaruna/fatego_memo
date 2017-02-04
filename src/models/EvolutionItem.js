import ActiveObject from 'ActiveObject.js';
import EvolutionItemData from 'data/evolution_items.yml';

export default class EvolutionItem extends ActiveObject {
}
EvolutionItem.data = EvolutionItemData;
EvolutionItem.belongs_to('servant');
EvolutionItem.belongs_to('item');
