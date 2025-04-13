import thedreamingItemBase from './base-item.mjs';

export default class thedreamingGear extends thedreamingItemBase {
  static LOCALIZATION_PREFIXES = [
    'THEDREAMING.Item.base',
    'THEDREAMING.Item.Gear',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.quantity = new fields.NumberField({
      ...requiredInteger,
      initial: 1,
      min: 1,
    });

    schema.weight = new fields.NumberField({
      required: false,
      nullable: true,
      initial: 0,
      min: 0,
    });

    // Roll formula breakdown
    schema.roll = new fields.SchemaField({
      diceNum: new fields.NumberField({
        ...requiredInteger,
        initial: 1,
        min: 1,
      }),
      diceSize: new fields.StringField({ initial: 'd20' }),
      diceBonus: new fields.StringField({
        initial: '+@str.mod+ceil(@lvl / 2)',
      }),
    });


    // Change this into a choice field, other, weapons, armours, shields etc.

    schema.formula = new fields.StringField({ blank: true });

    // Add weapon toggle and weapon-specific fields
    schema.isWeapon = new fields.BooleanField({ initial: false });

    // Add armour toggle and armour-specific fields
    schema.isArmour = new fields.BooleanField({ initial: false });

























    return schema;
  }

  prepareDerivedData() {
    const roll = this.roll;

    // Build the roll formula string
    this.formula = `${roll.diceNum}${roll.diceSize}${roll.diceBonus}`;
  }
}
