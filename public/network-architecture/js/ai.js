// --- AI & Speech functions ---
window.speak = async function(event, cardId, isFront) {
    event?.stopPropagation();

    // --- Try to PAUSE/STOP/RESUME existing speech ---

    // Check if this is the same audio that's currently playing/paused
    const isSameAudio = (appState.currentAudio && appState.currentAudio.cardId === cardId && appState.currentAudio.isFront === isFront) ||
                        (appState.utterance && appState.utterance.cardId === cardId && appState.utterance.isFront === isFront);

    // If we have Google TTS audio playing for this card
    if (appState.currentAudio && appState.currentAudio.cardId === cardId && appState.currentAudio.isFront === isFront) {
        if (!appState.currentAudio.paused) { // Currently Playing
            appState.currentAudio.pause(); // Action: Pause
            setReadButtonState(false);
            return;
        } else { // Currently Paused, resume or replay playback
            // If the audio has finished playing, reset its time to the beginning to allow replay.
            if (appState.currentAudio.ended) {
                appState.currentAudio.currentTime = 0;
            }
            appState.currentAudio.play().then(() => {
                setReadButtonState(true);
            }).catch(e => {
                console.error("Audio resume/replay failed:", e);
                setReadButtonState(false);
                appState.currentAudio = null; // Fallback to new instance if resume fails
            });
            return; // Skip creating a new instance
        }
    }

    // If we have Browser Speech Synthesis for this card
    else if (appState.utterance && appState.utterance.cardId === cardId && appState.utterance.isFront === isFront) {
        if (speechSynthesis.speaking && !speechSynthesis.paused) { // Currently Speaking
            speechSynthesis.cancel();    // Action: Cancel (to mimic interruption)
            setReadButtonState(false); // Immediate UI update
            return;
        }
        if (speechSynthesis.paused) { // Currently Paused, resume speech
            speechSynthesis.resume();
            setReadButtonState(true);
            return;
        }
    }

    // If we're playing different audio, stop it first
    else if (appState.currentAudio || speechSynthesis.speaking || speechSynthesis.paused) {
        if (appState.currentAudio) {
            appState.currentAudio.pause();
            appState.currentAudio = null;
        }
        speechSynthesis.cancel();
        appState.utterance = null;
        setReadButtonState(false); // Reset any active read buttons
    }


    // --- Now proceed with new audio creation ---

    if (!cardId) {
        setReadButtonState(false);
        return;
    }

    const content = flashcardState.cardContent[cardId];
    if (!content) {
        console.error("Content not found for cardId:", cardId);
        setReadButtonState(false);
        return;
    }

    const textToSpeak = (isFront ? content.question : content.answer).replace(/<[^>]*>/g, ' ').replace(/\$\$.*?\$\$/g, 'Formel').replace(/\$.*?\$/g, 'Formel');

    // Optimistic UI update for new speech
    setReadButtonState(true); 
    console.log("Starting new audio for", cardId, isFront ? "front" : "back");

    if (appState.googleApiKey) {
        try {
            const audioSrc = await callGoogleTTS(textToSpeak);
            if (audioSrc) {
                appState.currentAudio = new Audio(audioSrc);
                appState.currentAudio.cardId = cardId; // Tag audio with card info
                appState.currentAudio.isFront = isFront;

                appState.currentAudio.onplay = () => setReadButtonState(true);
                appState.currentAudio.onpause = () => setReadButtonState(false);

                // FIX: When audio ends, just update the button state.
                // Do NOT nullify the appState.currentAudio object here.
                // This allows the logic at the top of the function to check `currentAudio.ended`
                // and reset the audio for replay. The object is cleaned up when navigating to another card.
                appState.currentAudio.onended = () => {
                    setReadButtonState(false);
                };

                appState.currentAudio.onerror = (e) => {
                    console.error("Audio playback error:", e);
                    setReadButtonState(false);
                    appState.currentAudio = null; 
                    // Fallback to browser speech if Google audio fails during playback
                    speakWithBrowserTTS(textToSpeak, cardId, isFront);
                };

                appState.currentAudio.play().catch(e => {
                    console.error("Audio play initiation failed:", e);
                    setReadButtonState(false);
                    appState.currentAudio = null; 
                    speakWithBrowserTTS(textToSpeak, cardId, isFront); // Fallback
                });
                return;
            }
        } catch(e) {
            console.warn("Google TTS API call failed, falling back to browser voice:", e);
            // Fallback will be handled by calling speakWithBrowserTTS below
        }
    }

    // Fallback or primary if no API key / Google TTS failed
    speakWithBrowserTTS(textToSpeak, cardId, isFront);
};

// Helper function for browser TTS
function speakWithBrowserTTS(textToSpeak, cardId, isFront) {
    // Ensure any previous browser speech is fully stopped before starting a new one.
    speechSynthesis.cancel();

    appState.utterance = new SpeechSynthesisUtterance(textToSpeak);
    appState.utterance.cardId = cardId; // Tag utterance with card info
    appState.utterance.isFront = isFront;

    appState.utterance.voice = appState.voices.find(v => v.lang.startsWith('en') && v.default) || appState.voices.find(v => v.lang.startsWith('en'));
    appState.utterance.pitch = appState.settings.pitch;
    appState.utterance.rate = appState.settings.rate;

    // These handlers are for the utterance object
    appState.utterance.onstart = () => setReadButtonState(true);
    // Note: onpause and onresume on the utterance object are not universally supported or reliable.
    // We manage button state for pause/resume explicitly in the main speak function for browser synth.
    appState.utterance.onend = () => {
        setReadButtonState(false);
        appState.utterance = null; // Clear after ending for fresh start next time
    };
    appState.utterance.onerror = (e) => {
        console.error("Browser speech error:", e);
        setReadButtonState(false);
        appState.utterance = null;
    };
    
    // This call might implicitly setReadButtonState(true) via onstart
    speechSynthesis.speak(appState.utterance);
}


function setReadButtonState(isReading) {
    const icons = document.querySelectorAll('.read-aloud-btn .read-icon');
    if (!icons || icons.length === 0) return;
    
    const stopIcon = `<svg class="w-6 h-6 animate-pulse text-[var(--accent-primary)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM10,8H14v8H10Z"></path></svg>`;
    const playIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>`;
    
    icons.forEach(icon => {
        icon.innerHTML = isReading ? stopIcon : playIcon;
    });
}

async function callGoogleTTS(text) {
     if (!appState.googleApiKey) return null;
     const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${appState.googleApiKey}`;
     const payload = { input: { text: text }, voice: { languageCode: 'en-EN', name: 'en-EN-Wavenet-F' }, audioConfig: { audioEncoding: 'MP3' } };
     const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
     if (!response.ok) throw new Error(`Google TTS API request failed: ${response.status}`);
     const result = await response.json();
     if (result.audioContent) return `data:audio/mp3;base64,${result.audioContent}`;
     return null;
}

async function callGemini(prompt, isJson = false) {
    if (!appState.googleApiKey) { throw new Error("Google API Key ist nicht festgelegt."); }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${appState.googleApiKey}`;
    let payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        safetySettings: [ { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' }, { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' }, { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' }, { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' } ]
    };
    if (isJson) {
         payload.generationConfig = { responseMimeType: "application/json", responseSchema: { type: "ARRAY", items: { type: "OBJECT", properties: { "question": { "type": "STRING" }, "answer": { "type": "STRING" } }, required: ["question", "answer"] } } }
    }
    const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(`API Error: ${errorBody.error?.message || response.statusText}`);
    }
    const result = await response.json();
    if (result.candidates?.[0]?.content?.parts?.[0]) {
        const text = result.candidates[0].content.parts[0].text;
        return isJson ? JSON.parse(text) : text;
    }
    if (result.promptFeedback) throw new Error(`API Request Blocked: ${result.promptFeedback.blockReason}`);
    throw new Error('No content returned from API.');
}

window.explainSimply = async function(event) {
    event.stopPropagation();
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `<div id="explanation-modal" class="modal-overlay">
        <div class="modal-content max-h-[80vh] flex flex-col">
             <button class="modal-close-button-top close-modal-trigger" title="Schließen"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
             <h2 class="text-2xl font-bold mb-4 text-[var(--text-primary)]">Einfach erklärt</h2>
             <div id="explanation-content" class="text-[var(--text-secondary)] space-y-4 overflow-y-auto flex-grow"><div class="flex justify-center items-center p-8"><div class="spinner w-8 h-8 border-4"></div></div></div>
             <div class="flex justify-center mt-6 flex-shrink-0">
                 <button class="px-6 py-2 bg-[var(--accent-primary)] text-white font-semibold rounded-lg shadow hover:bg-[var(--accent-secondary)] transition-all close-modal-trigger">Schließen</button>
             </div>
        </div>
    </div>`;
    openModal('explanation-modal');
    setupModalEventListeners('explanation-modal');

    const cardId = flashcardState.isSearchActive ? flashcardState.searchResults[flashcardState.searchIndex].id : flashcardState.currentDeck[flashcardState.currentIndex];
    const content = flashcardState.cardContent[cardId];
    const prompt = `Erkläre das folgende Konzept aus der Netzwerk Architektur in einfachen Worten, auf Deutsch, und nutze Markdown zur Formatierung. Thema: "${content.question}"\nInhalt:\n${content.answer.replace(/<[^>]*>/g, ' ')}`;
    try {
        const explanation = await callGemini(prompt);
        document.getElementById('explanation-content').innerHTML = marked.parse(explanation);
    } catch (error) { document.getElementById('explanation-content').innerHTML = `<p class="text-red-500">Erklärung konnte nicht geladen werden: ${error.message}</p>`; }
}

function openGenerateModal() {
    const modalContainer = document.getElementById('modal-container');
    
    let modalContentHTML;
    if (appState.googleApiKey) {
        modalContentHTML = `
            <button class="modal-close-button-top close-modal-trigger" title="Schließen"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <h2 class="text-2xl font-bold mb-6 text-[var(--text-primary)]">Neue Karten generieren</h2>
            <div class="space-y-4">
                <div>
                    <label for="topic-input" class="block mb-2 text-sm font-medium text-[var(--text-secondary)]">Thema</label>
                    <input type="text" id="topic-input" class="bg-[var(--bg-color)] border border-[var(--card-border)] text-[var(--text-primary)] text-sm rounded-lg focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] block w-full p-2.5" placeholder="z.B. Fouriertransformation, Kantendetektion">
                </div>
                <button id="suggest-topic-btn" class="w-full px-4 py-2 text-sm font-medium text-[var(--accent-primary)] bg-[var(--accent-text)] rounded-lg hover:bg-opacity-80 transition-all flex items-center justify-center gap-2">
                    <span id="suggest-btn-text">Thema vorschlagen</span>
                    <div id="suggest-spinner" class="spinner w-5 h-5 border-2 hidden"></div>
                </button>
            </div>
             <div id="generation-status" class="mt-4 text-center h-5 text-sm text-[var(--text-secondary)]"></div>
             <div class="flex justify-center gap-4 mt-8">
                <button id="generate-cancel-btn" class="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-500 transition-all close-modal-trigger">Abbrechen</button>
                <button id="generate-confirm-btn" class="px-6 py-2 bg-[var(--accent-primary)] text-white font-semibold rounded-lg shadow hover:bg-[var(--accent-secondary)] transition-all flex items-center justify-center gap-2 w-36">
                    <span id="generate-btn-text">Generieren</span>
                    <div id="generate-spinner" class="spinner w-5 h-5 border-2 hidden"></div>
                </button>
            </div>
        `;
    } else {
        modalContentHTML = `
            <button class="modal-close-button-top close-modal-trigger" title="Schließen"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <h2 class="text-2xl font-bold mb-4 text-[var(--text-primary)]">API-Schlüssel benötigt</h2>
            <p class="text-[var(--text-secondary)] mb-6 text-center">Um die AI-Funktionen (Karten generieren, Vorschläge, etc.) zu nutzen, ist ein Google AI API-Schlüssel erforderlich.</p>
            <div class="flex justify-center gap-4 mt-2">
                <button class="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow close-modal-trigger">Abbrechen</button>
                <button id="go-to-settings-btn" class="px-6 py-2 bg-[var(--accent-primary)] text-white font-semibold rounded-lg shadow">Zu den Einstellungen</button>
            </div>
        `;
    }

    modalContainer.innerHTML = `<div id="generate-modal" class="modal-overlay"><div class="modal-content">${modalContentHTML}</div></div>`;
    
    openModal('generate-modal');
    setupModalEventListeners('generate-modal');
    
    if (appState.googleApiKey) {
        document.getElementById('generate-confirm-btn').onclick = generateNewCards;
        document.getElementById('suggest-topic-btn').onclick = suggestTopic;
    } else {
        const goToSettingsBtn = document.getElementById('go-to-settings-btn');
        if (goToSettingsBtn) goToSettingsBtn.onclick = () => {
            closeModal('generate-modal');
            setTimeout(openSettingsModal, 200); 
        };
    }
}

async function suggestTopic() {
    const btn = document.getElementById('suggest-topic-btn');
    const btnText = document.getElementById('suggest-btn-text');
    const spinner = document.getElementById('suggest-spinner');
    const statusEl = document.getElementById('generation-status');
    const topicInput = document.getElementById('topic-input');

    btn.disabled = true;
    btnText.classList.add('hidden');
    spinner.classList.remove('hidden');
    statusEl.textContent = 'Suche nach Themenvorschlag...';

    const existingTopics = Object.values(flashcardState.cardContent).map(c => c.question.split(':')[0]).join(', ');
    const prompt = `Basierend auf den existierenden Lernkarten-Themen (${existingTopics}), schlage ein verwandtes, aber neues Thema im Bereich der Netzwerk Architektur vor. Antworte nur mit dem Namen des Themas.`;

    try {
        const topic = await callGemini(prompt);
        topicInput.value = topic.trim().replace(/^"|"$/g, ''); // Remove quotes if any
        statusEl.textContent = '';
    } catch(e) {
        statusEl.textContent = 'Fehler beim Vorschlagen des Themas.';
    } finally {
        btn.disabled = false;
        btnText.classList.remove('hidden');
        spinner.classList.add('hidden');
    }
}


async function generateNewCards() {
    const topic = document.getElementById('topic-input').value.trim();
    if (!topic) {
        document.getElementById('generation-status').textContent = "Bitte ein Thema eingeben.";
        return;
    }
    const btn = document.getElementById('generate-confirm-btn');
    const btnText = document.getElementById('generate-btn-text');
    const spinner = document.getElementById('generate-spinner');
    const statusEl = document.getElementById('generation-status');

    btn.disabled = true;
    btnText.classList.add('hidden');
    spinner.classList.remove('hidden');
    statusEl.textContent = 'Generiere Karten...';

    const prompt = `Erstelle 3 Lernkarten (Frage und Antwort) zum Thema "${topic}" im Bereich der digitalen Bildverarbeitung. Die Antworten sollen Markdown verwenden, um wichtige Begriffe hervorzuheben und Listen oder Formeln darzustellen. Antworte mit einem JSON-Array von Objekten, wobei jedes Objekt einen "question"- und einen "answer"-Schlüssel hat.`;

    try {
        const newCards = await callGemini(prompt, true);
        const newAiCards = {};
        newCards.forEach(card => {
            const id = `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            newAiCards[id] = card;
            flashcardState.allCards.push({ id, level: 1, isAI: true, isCustom: false });
        });

        const existingAiCards = JSON.parse(localStorage.getItem(flashcardState.aiCardsKey) || '{}');
        const allAiCards = { ...existingAiCards, ...newAiCards };
        localStorage.setItem(flashcardState.aiCardsKey, JSON.stringify(allAiCards));
        Object.assign(flashcardState.cardContent, newAiCards);
        
        saveProgress();
        updateStats();
        flashcardState.activeLevel = 'ai'; // Switch to the AI deck
        updateDeck(false);
        closeModal('generate-modal');

    } catch (error) {
        statusEl.textContent = `Fehler: ${error.message}`;
        console.error("Card generation failed", error);
    } finally {
        btn.disabled = false;
        btnText.classList.remove('hidden');
        spinner.classList.add('hidden');
    }
}

window.openDeleteModal = function(event, cardId) {
    event.stopPropagation();
    flashcardState.cardIdToDelete = cardId;
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `<div id="delete-modal" class="modal-overlay">
        <div class="modal-content text-center">
            <button class="modal-close-button-top close-modal-trigger" title="Schließen"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <h2 class="text-2xl font-bold mb-4 text-[var(--text-primary)]">Karte löschen</h2>
            <p class="text-[var(--text-secondary)] mb-6">Möchtest du diese Karte wirklich endgültig löschen?</p>
            <div class="flex justify-center gap-4">
                <button class="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow close-modal-trigger">Abbrechen</button>
                <button id="delete-confirm-btn" class="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow">Löschen</button>
            </div>
        </div>
    </div>`;
    openModal('delete-modal');
    setupModalEventListeners('delete-modal');
    document.getElementById('delete-confirm-btn').onclick = deleteCard;
}

function deleteCard() {
    if (!flashcardState.cardIdToDelete) return;
    
    const cardToDelete = flashcardState.allCards.find(c => c.id === flashcardState.cardIdToDelete);
    if (!cardToDelete) return;

    // Remove from allCards array
    flashcardState.allCards = flashcardState.allCards.filter(c => c.id !== flashcardState.cardIdToDelete);
    
    // Remove from cardContent object
    delete flashcardState.cardContent[flashcardState.cardIdToDelete];

    // Remove from specific localStorage
    if (cardToDelete.isAI) {
        const existingAiCards = JSON.parse(localStorage.getItem(flashcardState.aiCardsKey) || '{}');
        delete existingAiCards[flashcardState.cardIdToDelete];
        localStorage.setItem(flashcardState.aiCardsKey, JSON.stringify(existingAiCards));
    } else if (cardToDelete.isCustom) {
        const existingCustomCards = JSON.parse(localStorage.getItem(flashcardState.customCardsKey) || '{}');
        delete existingCustomCards[flashcardState.cardIdToDelete];
        localStorage.setItem(flashcardState.customCardsKey, JSON.stringify(existingCustomCards));
    }
    
    saveProgress();
    updateStats();
    updateDeck(false);
    
    closeModal('delete-modal');
    flashcardState.cardIdToDelete = null;
}
