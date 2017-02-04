import ActiveObject from 'ActiveObject.js';
import Data from 'data/enemies.yml';
import EnemyQuest from 'models/EnemyQuest.js';

class Enemy extends ActiveObject {

}
Enemy.data = Data;
Enemy.has_many('quests', {class: EnemyQuest, foreign_key: 'enemy_id'});
export default Enemy;


