// --- GLOBAL HELPER FUNCTIONS ---
function openModal(id) {
    const modal = document.getElementById(id);
    if(modal) modal.classList.add('visible');
}

function closeModal(id) {
    const modalOverlay = document.getElementById(id);
    if (modalOverlay) modalOverlay.remove();
}

function setupModalEventListeners(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.querySelectorAll('.close-modal-trigger').forEach(btn => {
        btn.onclick = () => closeModal(modalId);
    });
    modal.addEventListener('click', e => { 
        if (e.target.id === modalId) closeModal(modalId); 
    });
}

function openSettingsModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <div id="settings-modal" class="modal-overlay">
        <div class="modal-content max-h-[90vh] overflow-y-auto">
             <button class="modal-close-button-top close-modal-trigger" title="Schließen"><svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <div class="border-b border-[var(--card-border)] pb-6 mb-6">
                <h2 class="text-2xl font-bold mb-4 text-[var(--text-primary)] text-center">AI-Einstellungen</h2>
                <div class="space-y-4">
                    <div>
                        <label for="api-key-input" class="block mb-2 text-sm font-medium text-[var(--text-secondary)]">Google AI API Schlüssel</label>
                        <div class="flex gap-2">
                             <input type="password" id="api-key-input" class="flex-grow bg-[var(--bg-color)] border border-[var(--card-border)] text-[var(--text-primary)] text-sm rounded-lg focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] block w-full p-2.5" placeholder="Deinen Schlüssel hier einfügen">
                             <button id="api-key-save-btn" class="px-4 py-2 bg-[var(--accent-primary)] text-white font-semibold rounded-lg shadow hover:bg-[var(--accent-secondary)] transition-all flex items-center justify-center w-28">Speichern</button>
                             <button id="api-key-remove-btn" class="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition-all flex items-center justify-center w-28 ${!appState.googleApiKey ? 'hidden' : ''}">Entfernen</button>
                        </div>
                         <div id="api-key-status" class="text-xs text-center mt-2 h-4"></div>
                         <p class="text-xs text-[var(--text-secondary)] mt-2">
                            Dein Schlüssel wird sicher in deinem Browser gespeichert.
                            <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-[var(--accent-primary)] hover:underline">Hier einen neuen Schlüssel erstellen</a>.
                        </p>
                    </div>
                </div>
            </div>
            <div class="border-b border-[var(--card-border)] pb-6 mb-6">
                <h2 class="text-2xl font-bold mb-6 text-[var(--text-primary)] text-center">Audio-Einstellungen</h2>
                <div class="space-y-6">
                    <div>
                        <label for="rate-slider" class="block mb-2 text-sm font-medium text-[var(--text-secondary)]">Geschwindigkeit: <span id="rate-value">1</span></label>
                        <input id="rate-slider" type="range" min="0.5" max="2" step="0.1" value="1" class="custom-slider">
                    </div>
                    <div>
                        <label for="pitch-slider" class="block mb-2 text-sm font-medium text-[var(--text-secondary)]">Tonhöhe: <span id="pitch-value">1</span></label>
                        <input id="pitch-slider" type="range" min="0" max="2" step="0.1" value="1" class="custom-slider">
                    </div>
                    <div class="flex items-center">
                        <input id="auto-read-checkbox" type="checkbox" value="" class="w-4 h-4 text-[var(--accent-primary)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--accent-primary)]">
                        <label for="auto-read-checkbox" class="ml-2 text-sm font-medium text-[var(--text-secondary)]">Karten automatisch vorlesen</label>
                    </div>
                </div>
            </div>
            <div class="border-b border-[var(--card-border)] pb-6 mb-6">
                <h2 class="text-2xl font-bold mb-4 text-[var(--text-primary)] text-center">Datensicherung</h2>
                <div id="data-sync-section" class="space-y-3 pt-4">
                     <p class="text-xs text-[var(--text-secondary)] text-center">Speichern oder laden Sie Ihre Lernkarten und Fortschritte in einer lokalen Datei.</p>
                    <button id="data-export-btn" class="w-full px-6 py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-lg shadow">Alle Daten exportieren</button>
                    <button id="data-import-btn" class="w-full px-6 py-2 bg-[var(--accent-secondary)] text-white font-semibold rounded-lg shadow">Alle Daten importieren</button>
                    <div id="data-sync-status" class="text-xs text-center mt-2 h-4"></div>
                </div>
            </div>
             <div class="flex justify-center mt-8">
                <button class="px-6 py-2 bg-[var(--accent-primary)] text-white font-semibold rounded-lg shadow hover:bg-[var(--accent-secondary)] transition-all close-modal-trigger">Schließen</button>
            </div>
        </div>
    </div>`;

    openModal('settings-modal');
    setupModalEventListeners('settings-modal');

    document.getElementById('api-key-input').placeholder = appState.googleApiKey ? "API-Schlüssel ist gespeichert" : "Deinen Schlüssel hier einfügen";
    document.getElementById('rate-slider').value = appState.settings.rate;
    document.getElementById('rate-value').textContent = appState.settings.rate;
    document.getElementById('pitch-slider').value = appState.settings.pitch;
    document.getElementById('pitch-value').textContent = appState.settings.pitch;
    document.getElementById('auto-read-checkbox').checked = appState.settings.autoRead;
    
    document.getElementById('api-key-save-btn').addEventListener('click', verifyAndSaveApiKey);
    document.getElementById('api-key-remove-btn').addEventListener('click', removeApiKey);
    document.getElementById('rate-slider').addEventListener('input', e => { appState.settings.rate = e.target.value; document.getElementById('rate-value').textContent = e.target.value; saveAppSettings(); });
    document.getElementById('pitch-slider').addEventListener('input', e => { appState.settings.pitch = e.target.value; document.getElementById('pitch-value').textContent = e.target.value; saveAppSettings(); });
    document.getElementById('auto-read-checkbox').addEventListener('change', e => { appState.settings.autoRead = e.target.checked; saveAppSettings(); });
    
    // Data Sync buttons
    document.getElementById('data-export-btn').addEventListener('click', exportData);
    document.getElementById('data-import-btn').addEventListener('click', () => importData(false));
}

function saveAppSettings() {
    localStorage.setItem(appState.settingsKey, JSON.stringify(appState.settings));
}

async function verifyAndSaveApiKey() {
    const keyInput = document.getElementById('api-key-input');
    const key = keyInput.value.trim();
    const saveBtn = document.getElementById('api-key-save-btn');
    const statusEl = document.getElementById('api-key-status');
    const originalBtnHTML = saveBtn.innerHTML;

    if (!key) {
        statusEl.textContent = 'Bitte geben Sie einen Schlüssel ein.';
        statusEl.className = 'text-xs text-center mt-2 h-4 text-red-500';
        return;
    }
    
    saveBtn.disabled = true;
    saveBtn.innerHTML = '<div class="spinner w-5 h-5 border-t-2 border-r-2 border-white rounded-full"></div>';
    statusEl.textContent = 'Verifiziere Schlüssel...';
    statusEl.className = 'text-xs text-center mt-2 h-4 text-[var(--text-secondary)]';

    try {
        const testApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;
        const response = await fetch(testApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: "hello" }] }] })
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.error?.message || `HTTP-Fehler: ${response.status}`);
        }
        
        appState.googleApiKey = key;
        localStorage.setItem(appState.apiKeyStorageKey, key);
        keyInput.value = '';
        keyInput.placeholder = "Erfolgreich gespeichert!";
        statusEl.textContent = 'Schlüssel verifiziert und gespeichert!';
        statusEl.className = 'text-xs text-center mt-2 h-4 text-green-600 dark:text-green-400';
        setTimeout(() => closeModal('settings-modal'), 1500);

    } catch (error) {
        console.error("API key verification failed:", error);
        statusEl.textContent = 'Ungültiger API-Schlüssel.';
        statusEl.className = 'text-xs text-center mt-2 h-4 text-red-500';
    } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalBtnHTML;
    }
}

function removeApiKey() {
    const keyInput = document.getElementById('api-key-input');
    const statusEl = document.getElementById('api-key-status');
    const removeBtn = document.getElementById('api-key-remove-btn');
    
    appState.googleApiKey = null;
    localStorage.removeItem(appState.apiKeyStorageKey);
    
    keyInput.value = '';
    keyInput.placeholder = "Deinen Schlüssel hier einfügen";
    statusEl.textContent = 'API-Schlüssel entfernt.';
    statusEl.className = 'text-xs text-center mt-2 h-4 text-orange-600 dark:text-orange-400';
    removeBtn.classList.add('hidden');
    
    setTimeout(() => {
        statusEl.textContent = '';
    }, 3000);
}

function setupGlobalEventListeners() {
    document.getElementById('settings-btn').addEventListener('click', openSettingsModal);
    if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => { appState.voices = speechSynthesis.getVoices(); };
    }
    document.addEventListener('keydown', (e) => {        if (e.key === "Escape") {
            const visibleModal = document.querySelector('.modal-overlay.visible');
            if (visibleModal) {
                closeModal(visibleModal.id);
            }
        }
    });
}


function animateCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('#main-content .glass-card, #main-content .grid > div').forEach(card => {
        observer.observe(card);
    });
}

function initSVGPlaceholders() {
    document.querySelectorAll('[data-svg-src]').forEach(async (placeholder) => {
        const src = placeholder.dataset.svgSrc;
        try {
            const response = await fetch(src);
            const svgText = await response.text();
            const div = document.createElement('div');
            div.innerHTML = svgText;
            const svg = div.querySelector('svg');
            if (svg) {
                // Copy attributes from placeholder to SVG
                for (const attr of placeholder.attributes) {
                    if (attr.name !== 'data-svg-src') {
                        svg.setAttribute(attr.name, attr.value);
                    }
                }
                placeholder.replaceWith(svg);
            }
        } catch (e) {
            console.error('Error loading SVG:', src, e);
            placeholder.textContent = 'Error loading SVG.';
        }
    });
}