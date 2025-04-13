export default class thedreamingActorBase extends foundry.abstract
  .TypeDataModel {
  static LOCALIZATION_PREFIXES = ["THEDREAMING.Actor.base"];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};
  
    schema.health = new fields.SchemaField({
      value: new fields.NumberField({
        ...requiredInteger,
        initial: 10,
        min: 0,
      }),
      max: new fields.NumberField({ ...requiredInteger, initial: 10 }),
    });
  
    schema.power = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 5 }),
    });
  
    schema.biography = new fields.HTMLField();
  
    // Define abilities
    const abilitiesWithValue = ['might', 'edge', 'grit', 'wits'];
  
    schema.abilities = new fields.SchemaField(
      Object.keys(CONFIG.THEDREAMING.abilities).reduce((obj, ability) => {
        const abilityFields = {
          die: new fields.StringField({
            choices: ['d4', 'd6', 'd8', 'd10', 'd12'],
            initial: 'd6',
            nullable: false,
          }),
        };
  
        // Only include 'value' field if it's in the abilitiesWithValue list
        if (abilitiesWithValue.includes(ability)) {
          abilityFields.value = new fields.NumberField({
            ...requiredInteger,
            initial: 5,
            min: 1,
          });
        }
  
        obj[ability] = new fields.SchemaField(abilityFields);
        return obj;
      }, {})
    );
  
    return schema;
  }
  

  // Dirty tricks around onroll

  static DEFAULT_OPTIONS = {
    // ...
    actions: {
      roll: this._onRoll,
      // other actions...
    },
    // ...
  };
  

  // Route to the main roll handler in actor-sheet.mjs

  static async _onRoll(event, target) {
    event.preventDefault();
    const element = target || event.currentTarget;
  
    
    return this.prototype._onRollable.call(this, event, element);
  }

}
