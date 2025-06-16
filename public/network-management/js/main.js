// --- Data Sync & Custom Card Functions ---
function exportData(singleCardData = null) {
    const statusEl = document.getElementById('data-sync-status');
    try {
        let dataToExport;
        let filename = 'lernkarten-data.json';

        if (singleCardData) {
            dataToExport = singleCardData;
            filename = `karte-${singleCardData.id}.json`;
        } else {
            const progress = JSON.parse(localStorage.getItem(flashcardState.storageKey) || '{}');
            const aiCards = JSON.parse(localStorage.getItem(flashcardState.aiCardsKey) || '{}');
            const customCards = JSON.parse(localStorage.getItem(flashcardState.customCardsKey) || '{}');
            dataToExport = { progress, aiCards, customCards };
        }
        
        const dataStr = JSON.stringify(dataToExport, null, 2);
        const dataBlob = new Blob([dataStr], {type: "application/json"});
        const url = URL.createObjectURL(dataBlob);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
        
        if (statusEl) {
            statusEl.textContent = 'Daten erfolgreich exportiert!';
            statusEl.className = 'text-xs text-center mt-2 h-4 text-green-600 dark:text-green-400';
            setTimeout(() => statusEl.textContent = '', 3000);
        }

    } catch (error) {
        console.error("Export failed:", error);
        if(statusEl) {
            statusEl.textContent = 'Export fehlgeschlagen.';
            statusEl.className = 'text-xs text-center mt-2 h-4 text-red-500';
            setTimeout(() => statusEl.textContent = '', 3000);
        }
    }
}

window.exportSingleCard = function(event, cardId) {
    event.stopPropagation();
    const cardData = flashcardState.cardContent[cardId];
    if (cardData) {
        exportData({ id: cardId, ...cardData });
    }
}


function importData(isSingleCard = false) {
    const statusEl = document.getElementById('data-sync-status');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json,application/json';
    
    fileInput.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const importedData = JSON.parse(event.target.result);
                
                if (isSingleCard) {
                    if (!importedData.question || !importedData.answer) {
                        throw new Error("Ungültiges Einzelkarten-Format.");
                    }
                    saveCustomCard(importedData.question, importedData.answer, true);
                } else {
                    if (typeof importedData.progress !== 'object' || typeof importedData.aiCards !== 'object' || typeof importedData.customCards !== 'object') {
                        throw new Error("Ungültiges Dateiformat für den vollständigen Import.");
                    }
                    localStorage.setItem(flashcardState.storageKey, JSON.stringify(importedData.progress || {}));
                    localStorage.setItem(flashcardState.aiCardsKey, JSON.stringify(importedData.aiCards || {}));
                    localStorage.setItem(flashcardState.customCardsKey, JSON.stringify(importedData.customCards || {}));
                }
                
                initFlashcardLogic();
                
                if (statusEl) {
                    statusEl.textContent = 'Daten erfolgreich importiert!';
                    statusEl.className = 'text-xs text-center mt-2 h-4 text-green-600 dark:text-green-400';
                    setTimeout(() => closeModal('settings-modal'), 1500);
                } else {
                    closeModal('create-card-modal');
                }


            } catch (error) {
                console.error("Import failed:", error);
                if(statusEl) {
                    statusEl.textContent = `Import fehlgeschlagen: ${error.message}`;
                    statusEl.className = 'text-xs text-center mt-2 h-4 text-red-500';
                    setTimeout(() => statusEl.textContent = '', 3000);
                }
            }
        };
        reader.readAsText(file);
    };
    
    fileInput.click();
}

function openCreateCardModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `<div id="create-card-modal" class="modal-overlay">
        <div class="modal-content">
            <button class="modal-close-button-top close-modal-trigger" title="Schließen"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <h2 class="text-2xl font-bold mb-6 text-[var(--text-primary)]">Eigene Karte erstellen</h2>
            <div class="space-y-4">
                <div>
                    <label for="custom-question" class="block mb-2 text-sm font-medium text-[var(--text-secondary)]">Frage</label>
                    <textarea id="custom-question" rows="3" class="w-full p-2.5 bg-[var(--bg-color)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-lg focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]"></textarea>
                </div>
                <div>
                    <label for="custom-answer" class="block mb-2 text-sm font-medium text-[var(--text-secondary)]">Antwort (Markdown/HTML erlaubt)</label>
                    <textarea id="custom-answer" rows="6" class="w-full p-2.5 bg-[var(--bg-color)] border border-[var(--card-border)] text-[var(--text-primary)] rounded-lg focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)]"></textarea>
                </div>
            </div>
            <div id="create-card-status" class="mt-4 text-center h-5 text-sm text-red-500"></div>
            <div class="flex justify-between items-center mt-8">
                 <button id="import-single-card-btn" class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--accent-primary)] bg-[var(--accent-text)] rounded-lg hover:bg-opacity-80 transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    <span>Importieren</span>
                </button>
                <div class="flex gap-4">
                    <button class="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow close-modal-trigger">Abbrechen</button>
                    <button id="create-save-btn" class="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow">Speichern</button>
                </div>
            </div>
        </div>
    </div>`;
    
    openModal('create-card-modal');
    setupModalEventListeners('create-card-modal');

    document.getElementById('import-single-card-btn').onclick = () => importData(true);
    document.getElementById('create-save-btn').onclick = () => {
        const question = document.getElementById('custom-question').value;
        const answer = document.getElementById('custom-answer').value;
        saveCustomCard(question, answer);
    };
}

function saveCustomCard(question, answer, fromImport = false) {
    if (!question.trim() || !answer.trim()) {
        const statusEl = document.getElementById('create-card-status');
        if (statusEl) statusEl.textContent = 'Frage und Antwort dürfen nicht leer sein.';
        return;
    }

    const id = `custom-${Date.now()}`;
    const newCard = { question, answer };

    flashcardState.cardContent[id] = newCard;
    flashcardState.allCards.push({ id, level: 1, isAI: false, isCustom: true });

    const existingCustomCards = JSON.parse(localStorage.getItem(flashcardState.customCardsKey) || '{}');
    existingCustomCards[id] = newCard;
    localStorage.setItem(flashcardState.customCardsKey, JSON.stringify(existingCustomCards));
    
    saveProgress();
    updateStats();
    
    if (!fromImport) {
        flashcardState.activeLevel = 'custom';
        updateDeck();
        closeModal('create-card-modal');
    }
}
