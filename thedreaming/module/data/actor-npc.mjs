import thedreamingActorBase from './base-actor.mjs';

export default class thedreamingNPC extends thedreamingActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'THEDREAMING.Actor.NPC',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.cr = new fields.NumberField({
      ...requiredInteger,
      initial: 1,
      min: 0,
    });

    
    return schema;
  }

  prepareDerivedData() {
    this.xp = this.cr * this.cr * 100;
  }
}
