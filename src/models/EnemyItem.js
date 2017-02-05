import ActiveObject from 'ActiveObject.js';
import data from 'data/enemy_items.yml';

export default class EnemyItem extends ActiveObject {
}
EnemyItem.data = data;
EnemyItem.belongs_to('enemy');
EnemyItem.belongs_to('item');
