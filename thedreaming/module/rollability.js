/**
 * Rolls an ability check including:
 * - Main ability die (e.g., d6, d8...)
 * - Ability value (modifier)
 * - Flex die (e.g., d10)
 * - Optional situational modifier from dialog
 *
 * Automatically detects automatic failures (1 on main die)
 * and critical successes (max on flex die).
 *
 * @param {object} options
 * @param {Actor} options.actor - The actor performing the roll
 * @param {string} options.abilityKey - The key for the ability (e.g., 'might')
 * @param {string} [options.label] - Optional label to display (defaults to abilityKey)
 */
export async function rollAbilityWithFlex({ actor, abilityKey, label = null }) {
    const ability = actor.system.abilities[abilityKey];
    const flex = actor.system.abilities.flex;
  
    if (!ability || !ability.die || !flex || !flex.die) {
      ui.notifications.warn("Missing ability or flex die data.");
      return;
    }
  
    const abilityDie = ability.die;
    const abilityMod = ability.value || 0;
    const flexDie = flex.die;
    const abilityLabel = label || abilityKey.toUpperCase();
  
    const dialogContent = `
      <p>Add situational modifier for ${abilityLabel}:</p>
      <input type="number" name="mod" value="0"/>
    `;
  
    new Dialog({
      title: `Roll ${abilityLabel} + Flex`,
      content: dialogContent,
      buttons: {
        roll: {
          icon: '<i class="fas fa-dice"></i>',
          label: 'Roll',
          callback: async (html) => {
            const mod = parseInt(html.find('[name="mod"]').val()) || 0;
            const totalMod = abilityMod + mod;
            const formula = `${abilityDie} + ${totalMod} + ${flexDie}`;
  
            const roll = await new Roll(formula).evaluate({ async: true });
  
            const abilityRoll = roll.terms[0]?.results?.[0]?.result;
            const flexRoll = roll.terms[2]?.results?.[0]?.result;
            const flexMax = parseInt(flexDie.slice(1));
  
            const isFail = abilityRoll === 1;
            const isCrit = flexRoll === flexMax;
  
            let flavor = `<strong>${abilityLabel}</strong> Roll`;
            if (isFail) flavor += `<br/><span style='color:red;'>Automatic Failure (1 on ${abilityDie})</span>`;
            if (isCrit) flavor += `<br/><span style='color:green;'>Critical Success (Max on ${flexDie})</span>`;
  
            roll.toMessage({
              speaker: ChatMessage.getSpeaker({ actor }),
              flavor,
            });
          }
        },
        cancel: {
          label: 'Cancel'
        }
      },
      default: 'roll'
    }).render(true);
  }
  