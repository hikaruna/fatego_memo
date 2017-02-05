import ActiveObject from 'ActiveObject.js';
import data from 'data/areas.yml';

export default class Area extends ActiveObject {
}
Area.data = data;
Area.has_many('points');
