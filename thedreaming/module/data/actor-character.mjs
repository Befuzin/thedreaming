import thedreamingActorBase from './base-actor.mjs';
export default class thedreamingCharacter extends thedreamingActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'THEDREAMING.Actor.Character',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();
  
    // Define level
    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 }),
      }),
    });
         
    
    return schema;
       
  }
  
  activateListeners(html) {
    super.activateListeners(html);
  
    html.on('click', '[data-action="roll"]', this._onRollable.bind(this));;
  }


  activateListeners(html) {
    super.activateListeners(html);
  
    html.on('click', '.rollable[data-action="roll"]', (event) =>
      this._onRollable(event)
    );
  }
  

  prepareDerivedData() {
    const abilities = this.abilities;

    for (const key in abilities) {
      const ability = abilities[key];
      // Localization label
      ability.label = game.i18n.localize(CONFIG.THEDREAMING.abilities[key]) ?? key;
      // Combine value + die string for convenience use in template (optional)
      ability.rollFormula = `${ability.die} + ${ability.value}`;
    }
  }
  
  getRollData() {
    const data = {};

    if (this.abilities) {
      for (let [k, v] of Object.entries(this.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    if (this.attributes?.level?.value !== undefined) {
      data.lvl = this.attributes.level.value;
    }

    return data;
  }












  
  
  
}
