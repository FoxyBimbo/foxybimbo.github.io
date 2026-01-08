//=============================================================================
// Echo_DiscordWebhooks.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Sends messages to Discord through webhooks.
 * @author Echo
 *
 * @param webhookId
 * @text Webhook ID
 * @type string
 * @desc The Discord webhook ID
 * @default
 *
 * @param webhookToken
 * @text Webhook Token
 * @type string
 * @desc The Discord webhook token
 * @default
 *
 * @command ExecuteWebhook
 * @text Execute Discord Webhook
 * @desc Send a message to Discord via webhook.
 *
 * @arg content
 * @text Message Content
 * @type string
 * @desc The message to send to Discord
 * @default
 *
 * @arg username
 * @text Username
 * @type string
 * @desc The name to display for the message sender
 * @default Echocondria
 *
 * @arg avatarUrl
 * @text Avatar URL
 * @type string
 * @desc The URL of the avatar image to display
 * @default
 *
 * @help
 * ============================================================================
 * Echo_DiscordWebhooks.js
 * ============================================================================
 * This plugin allows you to send messages to Discord through webhooks.
 * Messages can include RPG Maker MZ message codes that will be parsed before
 * sending to Discord.
 *
 * Setup Instructions:
 * 1. Create a Discord webhook in your server
 * 2. Copy the webhook URL and extract the ID and Token
 * 3. Set the Webhook ID and Webhook Token in the plugin parameters
 *
 * Webhook URL format: https://discordapp.com/api/webhooks/WEBHOOK_ID/WEBHOOK_TOKEN
 *
 * Plugin Command: Execute Discord Webhook
 * - Message Content: The text message to send (supports RPG Maker MZ codes)
 * - Username: The name to display (optional, uses default if empty)
 * - Avatar URL: URL to an image (optional)
 *
 * Supported Message Codes:
 * \V[n] - Replaced with variable value
 * \N - Replaced with current player's actor name
 * \N[n] - Replaced with actor name
 * \G - Replaced with gold amount
 * \P[n] - Replaced with party member name
 * \I[n] - Replaced with item name
 * \W[n] - Replaced with weapon name
 * \A[n] - Replaced with armor name
 * \S[n] - Replaced with skill name
 * \E[n] - Replaced with enemy name
 *
 * Example:
 * Message: Player \N[1] has \V[5] gold and owns the \I[1] item!
 * Username: Game Events
 * Avatar URL: https://example.com/avatar.png
 *
 * ============================================================================
 */

(() => {
    const pluginName = 'Echo_DiscordWebhooks';
    const parameters = PluginManager.parameters(pluginName);
    const webhookId = parameters.webhookId || '';
    const webhookToken = parameters.webhookToken || '';
    
    // Function to parse RPG Maker MZ message codes
    function parseMessageCodes(text) {
        // Replace \V[n] with variable value
        text = text.replace(/\\V\[(\d+)\]/gi, function(match, varId) {
            return $gameVariables.value(parseInt(varId));
        });
        
        // Replace \N[n] with actor name
        text = text.replace(/\\N\[(\d+)\]/gi, function(match, actorId) {
            const actor = $gameActors.actor(parseInt(actorId));
            return actor ? actor.name() : '';
        });
        
        // Replace \N with current player's actor name
        text = text.replace(/\\N(?!\[)/gi, function() {
            const leader = $gameParty.leader();
            return leader ? leader.name() : '';
        });
        
        // Replace \G with gold amount
        text = text.replace(/\\G/gi, function() {
            return $gameParty.gold();
        });
        
        // Replace \P[n] with party member name
        text = text.replace(/\\P\[(\d+)\]/gi, function(match, partyIndex) {
            const actor = $gameParty.members()[parseInt(partyIndex) - 1];
            return actor ? actor.name() : '';
        });
        
        // Replace \I[n] with item name
        text = text.replace(/\\I\[(\d+)\]/gi, function(match, itemId) {
            const item = $dataItems[parseInt(itemId)];
            return item ? item.name : '';
        });
        
        // Replace \W[n] with weapon name
        text = text.replace(/\\W\[(\d+)\]/gi, function(match, weaponId) {
            const weapon = $dataWeapons[parseInt(weaponId)];
            return weapon ? weapon.name : '';
        });
        
        // Replace \A[n] with armor name
        text = text.replace(/\\A\[(\d+)\]/gi, function(match, armorId) {
            const armor = $dataArmors[parseInt(armorId)];
            return armor ? armor.name : '';
        });
        
        // Replace \S[n] with skill name
        text = text.replace(/\\S\[(\d+)\]/gi, function(match, skillId) {
            const skill = $dataSkills[parseInt(skillId)];
            return skill ? skill.name : '';
        });
        
        // Replace \E[n] with enemy name
        text = text.replace(/\\E\[(\d+)\]/gi, function(match, enemyId) {
            const enemy = $dataEnemies[parseInt(enemyId)];
            return enemy ? enemy.name : '';
        });
        
        // Remove formatting codes that don't apply to Discord
        // \C[n] - Color (not applicable to Discord plain text)
        // \{ and \} - Text size (not applicable)
        // \| - Wait (not applicable)
        // \! - Wait for button (not applicable)
        // \^ - Don't wait (not applicable)
        text = text.replace(/\\C\[\d+\]/gi, '');
        text = text.replace(/\\[{}|!^]/gi, '');
        text = text.replace(/\\[<>]/gi, '');
        
        return text;
    }
    
    // Plugin Command Handler
    PluginManager.registerCommand(pluginName, 'ExecuteWebhook', function(args) {
        let content = args.content || '';
        const username = args.username || 'Echocondria';
        const avatarUrl = args.avatarUrl || '';
        
        if (!webhookId || !webhookToken) {
            // Show error if webhook settings are not configured
            $gameMessage.add('Webhook ID or Token not configured!');
            $gameMessage.setBackground(0);
            $gameMessage.setPositionType(2);
            return;
        }
        
        if (!content.trim()) {
            // Show error if message is empty
            $gameMessage.add('Message content cannot be empty!');
            $gameMessage.setBackground(0);
            $gameMessage.setPositionType(2);
            return;
        }
        
        // Parse RPG Maker MZ message codes
        content = parseMessageCodes(content);
        
        // Construct the webhook URL
        const webhookUrl = `https://discordapp.com/api/webhooks/${webhookId}/${webhookToken}`;
        
        // Prepare the payload
        const payload = {
            content: content,
            username: username
        };
        
        // Add avatar URL if provided
        if (avatarUrl.trim()) {
            payload.avatar_url = avatarUrl;
        }
        
        // Send the webhook
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                // Success
                $gameMessage.add('Message sent to Discord successfully!');
                $gameMessage.setBackground(0);
                $gameMessage.setPositionType(2);
                console.log('Discord webhook executed successfully');
            } else if (response.status === 204) {
                // 204 No Content is also a success for Discord webhooks
                $gameMessage.add('Message sent to Discord successfully!');
                $gameMessage.setBackground(0);
                $gameMessage.setPositionType(2);
                console.log('Discord webhook executed successfully');
            } else {
                // Handle HTTP error responses
                return response.text().then(text => {
                    throw new Error(`HTTP ${response.status}: ${text}`);
                });
            }
        })
        .catch(error => {
            console.error('Discord webhook error:', error);
            // Show error message
            $gameMessage.add('Failed to send message to Discord!');
            $gameMessage.add('Error: ' + error.message);
            $gameMessage.setBackground(0);
            $gameMessage.setPositionType(2);
        });
    });
})();
