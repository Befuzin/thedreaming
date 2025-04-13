export function openRollDialog(actor) {
    new Dialog({
      title: "Roll Attributes",
      content: `
        <form>
          <div class="form-group">
            <label for="attribute">Attribute:</label>
            <select id="attribute" name="attribute">
              <option value="str">Strength</option>
              <option value="dex">Dexterity</option>
              <option value="wil">Willpower</option>
            </select>
          </div>
          <div class="form-group">
            <label for="modifier">Modifier:</label>
            <input type="number" id="modifier" name="modifier" value="0"/>
          </div>
          <div class="form-group">
            <label for="flexDie">Flex Die:</label>
            <select id="flexDie" name="flexDie">
              <option value="d4">d4</option>
              <option value="d6">d6</option>
              <option value="d8">d8</option>
            </select>
          </div>
        </form>
      `,
      buttons: {
        roll: {
          icon: '<i class="fas fa-dice-d20"></i>',
          label: "Roll",
          callback: html => {
            const attribute = html.find('[name="attribute"]').val();
            const modifier = parseInt(html.find('[name="modifier"]').val());
            const flexDie = html.find('[name="flexDie"]').val();
            performRoll(actor, attribute, modifier, flexDie);
          }
        },
        cancel: { label: "Cancel" }
      },
      default: "roll"
    }).render(true);
  }
  
  function performRoll(actor, attribute, modifier, flexDie) {
    const attrDie = actor.system.attributes[attribute]?.die || "d6";
    const attrMod = actor.system.attributes[attribute]?.max || 0;
  
    const formula = `${attrDie} + ${modifier} + ${flexDie}`;
    const roll = new Roll(formula);
    roll.evaluate({ async: false });
  
    const isAutoFail = roll.terms.some(term => term.results?.some(r => r.result === 1));
    const isCritSuccess = roll.terms.some(term => {
      if (term.faces && term.results) {
        return term.results.some(r => r.result === term.faces);
      }
      return false;
    });
  
    let messageContent = `<p><strong>Roll Result:</strong> ${roll.total}</p>`;
    if (isAutoFail) messageContent += `<p><em>Automatic Failure!</em></p>`;
    else if (isCritSuccess) messageContent += `<p><em>Critical Success!</em></p>`;
  
    ChatMessage.create({
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor }),
      content: messageContent,
      type: CONST.CHAT_MESSAGE_TYPES.ROLL,
      roll: roll
    });
  }
  