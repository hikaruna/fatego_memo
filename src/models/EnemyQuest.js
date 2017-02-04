import ActiveObject from 'ActiveObject.js';
import Data from 'data/enemy_quests.yml';

export default class EnemyQuest extends ActiveObject {
}
EnemyQuest.data = require('data/enemy_quests.yml');
EnemyQuest.belongs_to('enemy');
