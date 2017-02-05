import ActiveObject from 'ActiveObject.js';
import data from 'data/points.yml';

export default class Point extends ActiveObject {
}
Point.data = data;
Point.belongs_to('area');
Point.has_many('quests');
