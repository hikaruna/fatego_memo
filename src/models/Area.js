import ActiveObject from 'ActiveObject.js';
import { AreaData } from 'data.jsx';
import Quest from 'models/Quest.js';

export default class Area extends ActiveObject {
}
Area.data = AreaData;
Area.has_many('quests');
