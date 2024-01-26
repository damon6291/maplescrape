const schema = [
  {
    column: "name",
    type: String,
    value: (x) => x.name,
  },
  {
    column: "category",
    type: String,
    value: (x) => x.category,
  },
  {
    column: "sub_category",
    type: String,
    value: (x) => x.sub_category,
  },
  {
    column: "overall_category",
    type: String,
    value: (x) => x.overall_category,
  },
  {
    column: "job",
    type: String,
    value: (x) => x.job,
  },
  {
    column: "upgrade_slots",
    type: Number,
    value: (x) => x.upgrade_slots,
  },
  {
    column: "sells_for",
    type: Number,
    value: (x) => x.sells_for,
  },

  // required fields
  {
    column: "required_level",
    type: Number,
    value: (x) => x.required_level,
  },
  {
    column: "required_str",
    type: Number,
    value: (x) => x.required_str,
  },
  {
    column: "required_dex",
    type: Number,
    value: (x) => x.required_dex,
  },
  {
    column: "required_int",
    type: Number,
    value: (x) => x.required_int,
  },
  {
    column: "required_luk",
    type: Number,
    value: (x) => x.required_luk,
  },
  {
    column: "required_pop",
    type: Number,
    value: (x) => x.required_pop,
  },

  // these are for 표창
  {
    column: "weapon_damage",
    type: String,
    value: (x) => x.weapon_damage,
  },
  {
    column: "slot_max",
    type: Number,
    value: (x) => x.slot_max,
  },
  // these are scroll effects &&   // These are 갑옷, 무기 effects
  {
    column: "effect_str",
    type: String,
    value: (x) => x.effect_str,
  },
  {
    column: "effect_dex",
    type: String,
    value: (x) => x.effect_dex,
  },
  {
    column: "effect_int",
    type: String,
    value: (x) => x.effect_int,
  },
  {
    column: "effect_luk",
    type: String,
    value: (x) => x.effect_luk,
  },
  {
    column: "effect_physical_damage",
    type: String,
    value: (x) => x.effect_physical_damage,
  },
  {
    column: "effect_physical_defense",
    type: String,
    value: (x) => x.effect_physical_defense,
  },
  {
    column: "effect_magic_damage",
    type: String,
    value: (x) => x.effect_magic_damage,
  },
  {
    column: "effect_magic_defense",
    type: String,
    value: (x) => x.effect_magic_defense,
  },
  {
    column: "effect_hp",
    type: String,
    value: (x) => x.effect_hp,
  },
  {
    column: "effect_mp",
    type: String,
    value: (x) => x.effect_mp,
  },
  {
    column: "effect_attack_speed",
    type: String,
    value: (x) => x.effect_attack_speed,
  },
  {
    column: "effect_movement_speed",
    type: String,
    value: (x) => x.effect_movement_speed,
  },
  {
    column: "effect_avoidability",
    type: String,
    value: (x) => x.effect_avoidability,
  },
  {
    column: "effect_accuracy",
    type: String,
    value: (x) => x.effect_accuracy,
  },
  {
    column: "effect_jump",
    type: String,
    value: (x) => x.effect_jump,
  },
];

exports.schema = schema;
