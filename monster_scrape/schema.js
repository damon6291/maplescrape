const schema = [
  {
    column: "name",
    type: String,
    value: (x) => x.name,
  },
  {
    column: "level",
    type: Number,
    value: (x) => x.level,
  },
  {
    column: "hp",
    type: Number,
    value: (x) => x.hp,
  },
  {
    column: "mp",
    type: Number,
    value: (x) => x.mp,
  },
  {
    column: "accuracy_hit",
    type: Number,
    value: (x) => x.accuracy_hit,
  },
  {
    column: "meso",
    type: Number,
    value: (x) => x.meso,
  },
  {
    column: "exp",
    type: Number,
    value: (x) => x.exp,
  },
  {
    column: "min_push_damage",
    type: Number,
    value: (x) => x.min_push_damage,
  },
  {
    column: "speed",
    type: Number,
    value: (x) => x.speed,
  },
  {
    column: "accuracy_monster",
    type: Number,
    value: (x) => x.accuracy_monster,
  },
  {
    column: "physical_damage",
    type: Number,
    value: (x) => x.physical_damage,
  },
  {
    column: "physical_defense",
    type: Number,
    value: (x) => x.physical_defense,
  },
  {
    column: "magic_damage",
    type: Number,
    value: (x) => x.magic_damage,
  },
  {
    column: "magic_defense",
    type: Number,
    value: (x) => x.magic_defense,
  },
];

exports.schema = schema;
