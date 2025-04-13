import thedreamingItemBase from './base-item.mjs';

export default class thedreamingWeapon extends thedreamingItemBase {
  static LOCALIZATION_PREFIXES = [
    'THEDREAMING.Item.base',
    'THEDREAMING.Item.Weapon',
  ];
 
}


import { fields } from "foundry:data";

export class WeaponDataModel extends foundry.abstract.DataModel {
  static defineSchema() {
    return {
      category: new fields.StringField({
        label: "Weapon Category",
        choices: {
          melee: "Melee",
          ranged: "Ranged"
        },
        initial: "melee"
      }),

      ability: new fields.StringField({
        label: "Associated Ability",
        choices: {
          might: "Might",
          edge: "Edge",
          grit: "Grit",
          wits: "Wits"
        },
        initial: "might"
      }),

      damageDie: new fields.StringField({
        label: "Damage Die",
        choices: ["d4", "d6", "d8", "d10", "d12"],
        initial: "d6"
      }),

      damageBonus: new fields.NumberField({
        label: "Damage Bonus",
        initial: 0
      }),

      range: new fields.StringField({
        label: "Range (for Ranged Weapons)",
        choices: {
          touch: "Touch",
          short: "Short",
          medium: "Medium",
          long: "Long",
          distant: "Distant"
        },
        initial: "short",
        nullable: true // Only relevant for ranged weapons
      })
    };
  }
}