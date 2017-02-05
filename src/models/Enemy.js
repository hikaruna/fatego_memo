import ActiveObject from 'ActiveObject.js';
import data from 'data/enemies.yml';

export default class Enemy extends ActiveObject {
}

Enemy.data = data;
Enemy.has_many('enemy_quests');
Enemy.has_many('quests', { through: 'enemy_quests' });
Enemy.has_many('enemies', { through: 'enemy_quests' });
