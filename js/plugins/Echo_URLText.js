//=============================================================================
// Echo_URLText.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Reads text from a remote URL and stores it in a game variable.
 * @author Echo
 *
 * @command FetchURLText
 * @text Fetch URL Text
 * @desc Fetches text content from a remote URL and stores it in a variable.
 *
 * @arg url
 * @text URL
 * @type string
 * @desc The remote URL to fetch text from
 * @default https://example.com
 *
 * @arg variableId
 * @text Variable ID
 * @type variable
 * @desc The variable ID where the fetched text will be stored
 * @default 1
 *
 * @arg showMessage
 * @text Show Message Box
 * @type boolean
 * @desc Show a message box with the fetched text once it's retrieved
 * @default false
 *
 * @arg timeout
 * @text Timeout (ms)
 * @type number
 * @desc Maximum time to wait for the URL to respond in milliseconds
 * @default 5000
 * @min 1000
 * @max 30000
 *
 * @help
 * ============================================================================
 * Echo_URLText.js
 * ============================================================================
 * This plugin allows you to fetch text content from a remote URL and store
 * it in a game variable.
 *
 * Plugin Command: FetchURLText
 * - URL: The remote URL to fetch from
 * - Variable ID: The variable where the text will be stored
 * - Show Message Box: Whether to display the fetched text in a message box
 * - Timeout: Maximum time to wait for a response (default 5000ms)
 *
 * Example:
 * Use the plugin command "Fetch URL Text" and provide:
 * - URL: https://example.com/message.txt
 * - Variable ID: 5 (the text will be stored in variable 5)
 * - Show Message Box: true (to display the text)
 * - Timeout: 5000 (wait up to 5 seconds)
 *
 * ============================================================================
 */

(() => {
    const pluginName = 'Echo_URLText';
    
    // Plugin Command Handler
    PluginManager.registerCommand(pluginName, 'FetchURLText', function(args) {
        const url = args.url;
        const variableId = parseInt(args.variableId);
        const showMessage = args.showMessage === 'true';
        const timeout = parseInt(args.timeout) || 5000;
        
        // Add cache-busting parameter to ensure fresh data
        const cacheBustUrl = url + (url.includes('?') ? '&' : '?') + '_t=' + Date.now();
        
        // Create an abort controller for timeout functionality
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        // Fetch the HTML from the remote URL with cache control and timeout
        fetch(cacheBustUrl, { 
            signal: controller.signal,
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache, no-store, max-age=0'
            }
        })
            .then(response => {
                clearTimeout(timeoutId);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Parse HTML and extract text from <p> tags
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const paragraphs = doc.querySelectorAll('p');
                
                // Extract text from all <p> tags
                let extractedText = '';
                paragraphs.forEach((p, index) => {
                    extractedText += p.textContent;
                    if (index < paragraphs.length - 1) {
                        extractedText += '\n';
                    }
                });
                
                // Store the extracted text in the specified variable
                $gameVariables.setValue(variableId, extractedText);
                console.log(`Fetched and extracted text from ${url} and stored in variable ${variableId}`);
                
                // Show message box if enabled
                if (showMessage) {
                    $gameMessage.add(extractedText);
                    $gameMessage.setBackground(0);
                    $gameMessage.setPositionType(2);
                }
            })
            .catch(error => {
                clearTimeout(timeoutId);
                console.error(`Error fetching from ${url}:`, error);
                
                // Show error message box
                $gameMessage.add("I'm sorry something bad happened");
                $gameMessage.setBackground(0);
                $gameMessage.setPositionType(2);
                
                // Store error message in variable
                $gameVariables.setValue(variableId, `Error: ${error.message}`);
            });
    });
})();
