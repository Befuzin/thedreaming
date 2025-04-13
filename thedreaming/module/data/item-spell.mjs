import thedreamingItemBase from './base-item.mjs';

export default class thedreamingSpell extends thedreamingItemBase {
  static LOCALIZATION_PREFIXES = [
    'THEDREAMING.Item.base',
    'THEDREAMING.Item.Spell',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.spellLevel = new fields.NumberField({
      required: true,
      nullable: false,
      integer: true,
      initial: 1,
      min: 1,
      max: 9,
    });

    return schema;
  }
}
