export default {
  servants: [
    {
      id: 'ギルガメッシュ',
      rarity: 5,
      clazz: 'アーチャー'
    }
  ],
  evolution_items: [
    {
      servant_id: 'ギルガメッシュ',
      item_id: 'アーチャーピース',
      level: 1,
      number: 2
    },
    {
      servant_id: 'ギルガメッシュ',
      item_id: 'ゴーストランタン',
      level: 2,
      number: 12
    },
    {
      servant_id: 'ギルガメッシュ',
      item_id: 'アーチャーピース',
      level: 2,
      number: 12
    }
  ],
  items: [
    {
      id: 'ゴーストランタン'
    },
    {
      id: 'アーチャーピース'
    }
  ],
  areas: [
    {
      id: '第一特異点'
    }
  ],
  quests: [
    {
      id: 'パリ',
      areas_id: '第一特異点'
    }
  ],
  item_quests: [
    {
      item_id: 'ゴーストランタン',
      quest_id: 'パリ'
    }
  ]
}
