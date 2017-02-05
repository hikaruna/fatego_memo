import ActiveObject from 'ActiveObject.js';
import data from 'data/quests.yml';

export default class Quest extends ActiveObject {
}
Quest.data = data;
Quest.belongs_to('point');
Quest.has_many('enemy_quests');
Quest.has_many('enemies', { through: 'enemy_quests'});
Quest.has_many('item_quests');
Quest.has_many('items', { through: 'item_quests'});
