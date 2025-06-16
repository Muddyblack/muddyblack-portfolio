
// --- FLASHCARD LOGIC ---

function initializeCards() {
    flashcardState.cardContent = { ...flashcardState.initialContent };
    const savedAICards = JSON.parse(localStorage.getItem(flashcardState.aiCardsKey) || '{}');
    const savedCustomCards = JSON.parse(localStorage.getItem(flashcardState.customCardsKey) || '{}');
    Object.assign(flashcardState.cardContent, savedAICards, savedCustomCards);
    
    const savedData = localStorage.getItem(flashcardState.storageKey);
    let progress = {};
    if (savedData) try { progress = JSON.parse(savedData); } catch (e) { console.error("Could not parse progress data", e); }
    
    flashcardState.allCards = Object.keys(flashcardState.cardContent).map(id => ({ 
        id, 
        level: progress[id] || 1, 
        isAI: id.startsWith('ai-'),
        isCustom: id.startsWith('custom-')
    }));
}

function saveProgress() {
    localStorage.setItem(flashcardState.storageKey, JSON.stringify(Object.fromEntries(flashcardState.allCards.map(c => [c.id, c.level]))));
}

function showCard() {
    const $ = (selector) => document.querySelector(selector);
    if (appState.currentAudio) appState.currentAudio.pause();
    speechSynthesis.cancel();
    
    let cardObject, content, cardId;
    const sourceDeck = flashcardState.isSearchActive ? flashcardState.searchResults : flashcardState.allCards.filter(c => flashcardState.currentDeck.includes(c.id));
    const sourceIndex = flashcardState.isSearchActive ? flashcardState.searchIndex : flashcardState.currentIndex;
    cardObject = sourceDeck[sourceIndex];
    
    const fcContainer = $('#fc-container');

    if (cardObject) { 
        cardId = cardObject.id; 
        content = flashcardState.cardContent[cardId]; 
    } else {
         let message = 'Alle Karten für diese Sitzung beantwortet!';
         if(flashcardState.isSearchActive) message = `Keine Ergebnisse für "${$('#fc-search-input').value}" gefunden.`;
         fcContainer.innerHTML = `<div class="w-full h-full flex items-center justify-center p-8 text-center glass-card"><h2 class="text-xl font-bold text-[var(--accent-primary)]">${message}</h2></div>`;
         $('#fc-card-counter').textContent = '';
         $('#fc-navigation-container').style.display = 'none';
         $('#fc-answer-buttons').style.display = 'none';
         return;
    }
    
    $('#fc-navigation-container').style.display = 'flex';
    $('#fc-answer-buttons').style.display = 'flex';

    const levelIndicatorClass = cardObject.isAI ? 'level-ai' : (cardObject.isCustom ? 'level-custom' : 'level-normal');

    const readBtnHTML = (isFront) => `<button onclick="speak(event, '${cardId}', ${isFront})" title="Vorlesen" class="absolute top-4 left-4 z-10 p-2 rounded-full text-[var(--text-secondary)] hover:bg-[var(--accent-text)] read-aloud-btn"><span class="read-icon"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg></span></button>`;
    const explainBtnHTML = `<button onclick="explainSimply(event)" title="Einfach erklärt" class="absolute bottom-4 right-16 z-10 p-2 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-110 transition-transform" ${!appState.googleApiKey ? 'disabled' : ''}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M12 21v-1m0-10a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3z"></path></svg></button>`;
    const exportBtnHTML = `<button onclick="exportSingleCard(event, '${cardId}')" title="Karte exportieren" class="absolute bottom-4 right-4 z-10 p-2 rounded-full bg-gray-500 text-white shadow-lg hover:bg-gray-600 focus:outline-none transform hover:scale-110 transition-transform"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg></button>`;
    const deleteBtnHTML = (cardObject.isAI || cardObject.isCustom) ? `<button onclick="openDeleteModal(event, '${cardId}')" title="Karte löschen" class="absolute bottom-4 left-4 z-10 p-2 rounded-full text-[var(--text-secondary)] hover:bg-red-500/20 hover:text-red-500 focus:outline-none"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>` : '';

    fcContainer.innerHTML = `
        <div id="flashcard" class="flashcard">
            <div class="card-face card-front">
                ${readBtnHTML(true)}
                <div class="level-indicator ${levelIndicatorClass}">Stufe ${cardObject.level}</div>
                <div class="card-content-wrapper"><h2 class="text-2xl lg:text-3xl font-bold text-center p-4">${content.question}</h2></div>
            </div>
            <div class="card-face card-back">
                ${readBtnHTML(false)}
                ${explainBtnHTML}
                ${exportBtnHTML}
                ${deleteBtnHTML}
                <div class="level-indicator ${levelIndicatorClass}">Stufe ${cardObject.level}</div>
                <div class="card-content-wrapper text-left">${marked.parse(content.answer)}</div>
            </div>
        </div>`;
    
    $('#fc-card-counter').textContent = `Karte ${sourceIndex + 1} / ${sourceDeck.length}`;
    $('#fc-prev-btn').disabled = sourceDeck.length <= 1;
    $('#fc-next-btn').disabled = sourceDeck.length <= 1;


    $('#flashcard').addEventListener('click', (e) => {
        if (!e.target.closest('button, a')) {
            const card = $('#flashcard');
            card.classList.toggle('is-flipped');
            if (appState.settings.autoRead && card.classList.contains('is-flipped')) {
                 setTimeout(() => speak(e, cardId, false), 300);
            }
        }
    });

    renderMathInElement(fcContainer, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }] });
    if (appState.settings.autoRead && !$('#flashcard').classList.contains('is-flipped')) {
        setTimeout(() => speak(null, cardId, true), 300);
    }
}

function updateDeck(shuffle = false) {
    let eligibleCards;
    if (flashcardState.activeLevel === 'ai') {
        eligibleCards = flashcardState.allCards.filter(card => card.isAI);
    } else if (flashcardState.activeLevel === 'custom') {
        eligibleCards = flashcardState.allCards.filter(card => card.isCustom);
    } else if (flashcardState.activeLevel === 'all') {
        eligibleCards = flashcardState.allCards.filter(card => card.level < 5);
    } else { // It's a number for a level
        eligibleCards = flashcardState.allCards.filter(card => card.level === parseInt(flashcardState.activeLevel));
    }
    
    flashcardState.currentDeck = eligibleCards.map(card => card.id);
    
    if (shuffle) {
        flashcardState.currentDeck.sort(() => Math.random() - 0.5);
    } else {
        flashcardState.currentDeck.sort((a, b) => flashcardState.cardContent[a].question.localeCompare(flashcardState.cardContent[b].question, undefined, { numeric: true }));
    }
    flashcardState.currentIndex = 0;
    showCard();
}

function openResetModal() {
    const $ = (selector) => document.querySelector(selector);
    const modalContainer = $('#modal-container');
    modalContainer.innerHTML = `
    <div id="fc-reset-modal" class="modal-overlay">
        <div class="modal-content text-center">
            <button class="modal-close-button-top close-modal-trigger" title="Schließen"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <h2 id="fc-reset-modal-title" class="text-2xl font-bold mb-4 text-[var(--text-primary)]">Fortschritt zurücksetzen</h2>
            <p id="fc-reset-modal-text" class="text-[var(--text-secondary)] mb-6">Möchtest du den Lernfortschritt wirklich zurücksetzen?</p>
            <div class="flex justify-center gap-4">
                <button id="fc-reset-cancel-btn" class="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-500 transition-all close-modal-trigger">Abbrechen</button>
                <button id="fc-reset-confirm-btn" class="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-all">Zurücksetzen</button>
            </div>
        </div>
    </div>`;
    openModal('fc-reset-modal');
    setupModalEventListeners('fc-reset-modal');
    
    let title = "Alle Fortschritte zurücksetzen?", text = "Dadurch werden alle Karten auf Stufe 1 zurückgesetzt.";
    if (flashcardState.activeLevel === 'custom') {
        title = "Eigene Karten zurücksetzen?";
        text = "Dadurch wird der Fortschritt aller selbst erstellten Karten auf Stufe 1 zurückgesetzt.";
    } else if (flashcardState.activeLevel === 'ai') {
        title = "Generierte Karten zurücksetzen?";
        text = "Dadurch wird der Fortschritt aller generierten Karten auf Stufe 1 zurückgesetzt.";
    } else if (flashcardState.activeLevel !== 'all') {
        title = `Fortschritt für Stufe ${flashcardState.activeLevel} zurücksetzen?`;
        text = `Dadurch werden alle Karten der Stufe ${flashcardState.activeLevel} auf Stufe 1 zurückgesetzt.`;
    }
    $('#fc-reset-modal-title').textContent = title;
    $('#fc-reset-modal-text').textContent = text;

    $('#fc-reset-confirm-btn').onclick = resetProgress;
}

function updateStats() {
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);
    const allCardsCount = flashcardState.allCards.filter(c => c.level < 5).length;
    const aiCardsCount = flashcardState.allCards.filter(c => c.isAI).length;
    const customCardsCount = flashcardState.allCards.filter(c => c.isCustom).length;
    const levelCounts = flashcardState.allCards.reduce((acc, card) => {
        acc[card.level] = (acc[card.level] || 0) + 1;
        return acc;
    }, {});
    
    $('#fc-stats-container').innerHTML = `
        <div class="flex gap-2 flex-wrap justify-center items-center">
            <div data-level="all" class="stat-box p-2 px-3 text-sm">Alle (${allCardsCount})</div>
            ${[1, 2, 3, 4, 5].map(level => `<div data-level="${level}" class="stat-box p-2 px-3 text-sm">Stufe ${level}: <span class="font-bold">${levelCounts[level] || 0}</span></div>`).join('')}
            ${customCardsCount > 0 ? `<div data-level="custom" class="stat-box p-2 px-3 text-sm">Eigene (${customCardsCount})</div>` : ''}
            ${aiCardsCount > 0 ? `<div data-level="ai" class="stat-box p-2 px-3 text-sm">Generiert (${aiCardsCount})</div>` : ''}
            <button id="fc-shuffle-btn" class="p-2 px-3 text-sm rounded-md bg-[var(--accent-text)] text-[var(--accent-primary)] font-semibold">Mischen</button>
            <button id="fc-reset-btn" class="p-2 px-3 text-sm rounded-md bg-[var(--accent-text)] text-[var(--accent-primary)] font-semibold">Zurücksetzen</button>
        </div>`;
    
    $$('#fc-stats-container .stat-box').forEach(box => {
        box.classList.toggle('active', flashcardState.activeLevel === box.dataset.level);
        box.addEventListener('click', () => { 
            flashcardState.activeLevel = box.dataset.level;
            flashcardState.isSearchActive = false;
            $('#fc-search-input').value = '';
            updateStats(); 
            updateDeck(false); 
        });
    });

    $('#fc-shuffle-btn').addEventListener('click', () => updateDeck(true));
    $('#fc-reset-btn').addEventListener('click', openResetModal);
}

function handleAnswer(isCorrect) {
    const sourceDeck = flashcardState.isSearchActive ? flashcardState.searchResults : flashcardState.allCards.filter(c => flashcardState.currentDeck.includes(c.id));
    const sourceIndex = flashcardState.isSearchActive ? flashcardState.searchIndex : flashcardState.currentIndex;
    if (sourceDeck.length === 0) return;
    
    const cardObject = sourceDeck[sourceIndex];
    if (!cardObject) return;

    const oldLevel = cardObject.level;
    const newLevel = isCorrect ? Math.min(5, oldLevel + 1) : 1;
    cardObject.level = newLevel;
    saveProgress();

    let removeCardFromView = false;
    if (!flashcardState.isSearchActive) {
        const levelFilter = parseInt(flashcardState.activeLevel);
        if (!isNaN(levelFilter)) { // Filtering by a specific level
            if (newLevel !== levelFilter) {
                removeCardFromView = true;
            }
        } else if (flashcardState.activeLevel === 'all') { // 'All' view only shows levels 1-4
             if (newLevel === 5) {
                removeCardFromView = true;
             }
        }
    }
    
    if (removeCardFromView) {
        flashcardState.currentDeck.splice(flashcardState.currentIndex, 1);
        // Ensure index is not out of bounds
        if (flashcardState.currentIndex >= flashcardState.currentDeck.length) {
            flashcardState.currentIndex = 0;
        }
    } else {
        if (flashcardState.isSearchActive) {
            if (flashcardState.searchResults.length > 0) {
                 flashcardState.searchIndex = (flashcardState.searchIndex + 1) % flashcardState.searchResults.length;
            }
        } else {
            if (flashcardState.currentDeck.length > 0) {
                 flashcardState.currentIndex = (flashcardState.currentIndex + 1) % flashcardState.currentDeck.length;
            }
        }
    }

    updateStats();
    showCard();
}

function resetProgress() {
    if (flashcardState.activeLevel === 'all') {
        flashcardState.allCards.forEach(c => { c.level = 1; });
    } else if (flashcardState.activeLevel === 'ai') {
        flashcardState.allCards.forEach(c => { if (c.isAI) c.level = 1; });
    } else if (flashcardState.activeLevel === 'custom') {
        flashcardState.allCards.forEach(c => { if (c.isCustom) c.level = 1; });
    } else {
        flashcardState.allCards.forEach(c => { if (c.level === parseInt(flashcardState.activeLevel)) c.level = 1; });
    }
    saveProgress();
    updateStats();
    closeModal('fc-reset-modal');
    updateDeck(false);
}

function performSearch() {
    const $ = (selector) => document.querySelector(selector);
    const query = $('#fc-search-input').value.toLowerCase().trim();
    flashcardState.isSearchActive = query.length > 0;
    $('#fc-clear-search-btn').classList.toggle('hidden', !flashcardState.isSearchActive);
    
    if(flashcardState.isSearchActive) {
        flashcardState.searchResults = flashcardState.allCards.filter(card => {
            const content = flashcardState.cardContent[card.id];
            return content.question.toLowerCase().includes(query) || (content.answer.replace(/<[^>]*>/g, ' ').toLowerCase().includes(query));
        });
        flashcardState.searchIndex = 0;
    } else {
        flashcardState.searchResults = [];
    }
    showCard();
}

function initFlashcardLogic() {
    const $ = (selector) => document.querySelector(selector);

    initializeCards();
    updateStats();
    updateDeck(false);
    setupFlashcardEventListeners();

    function setupFlashcardEventListeners() {
        $('#fc-correct-btn').addEventListener('click', () => handleAnswer(true));
        $('#fc-wrong-btn').addEventListener('click', () => handleAnswer(false));
        $('#fc-prev-btn').addEventListener('click', () => {
             if (flashcardState.isSearchActive) {
                if (flashcardState.searchResults.length > 0) {
                    flashcardState.searchIndex = (flashcardState.searchIndex - 1 + flashcardState.searchResults.length) % flashcardState.searchResults.length;
                }
             } else {
                if (flashcardState.currentDeck.length > 0) {
                    flashcardState.currentIndex = (flashcardState.currentIndex - 1 + flashcardState.currentDeck.length) % flashcardState.currentDeck.length;
                }
             }
             showCard();
        });
        $('#fc-next-btn').addEventListener('click', () => {
            if (flashcardState.isSearchActive) {
                if (flashcardState.searchResults.length > 0) {
                    flashcardState.searchIndex = (flashcardState.searchIndex + 1) % flashcardState.searchResults.length;
                }
            } else {
                if (flashcardState.currentDeck.length > 0) {
                    flashcardState.currentIndex = (flashcardState.currentIndex + 1) % flashcardState.currentDeck.length;
                }
            }
            showCard();
        });
        $('#fc-search-input').addEventListener('input', performSearch);
        $('#fc-clear-search-btn').addEventListener('click', () => { $('#fc-search-input').value = ''; performSearch(); });
        $('#fc-open-generate-modal-btn').addEventListener('click', openGenerateModal);
        $('#fc-open-create-modal-btn').addEventListener('click', openCreateCardModal);
    }
}
