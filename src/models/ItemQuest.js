import ActiveObject from 'ActiveObject.js';
import Data from 'data/item_quests.yml';

export default class ItemQuest extends ActiveObject {
}
ItemQuest.data = require('data/item_quests.yml');
ItemQuest.belongs_to('item');
ItemQuest.belongs_to('quest');
