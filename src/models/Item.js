import ActiveObject from 'ActiveObject.js';
import ItemData from 'data/items.yml';
import Util from 'Util.js';

export default class Item extends ActiveObject {
}
Item.data = ItemData;
Item.has_many('evolutionItems');
Item.has_many('servants', { through: 'evolutionItems' });
Item.has_many('itemQuests');
Item.has_many('quests', { through: 'itemQuests' });
