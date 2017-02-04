import ActiveObject from 'ActiveObject.js';
import Data from 'data/enemies.yml';

export default class Enemy extends ActiveObject {
}

Enemy.data = Data;
Enemy.has_many('enemy_quests');
Enemy.has_many('enemies', { through: 'enemy_quests' });
