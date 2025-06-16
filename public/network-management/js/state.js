// --- GLOBAL STATE & CONSTANTS ---
const appState = {
    apiKeyStorageKey: 'shared-google-api-key_v1',
    settingsKey: 'shared-app-settings_v1',
    themeKey: 'shared-app-theme_v1',
    googleApiKey: null,
    currentAudio: null,
    settings: { rate: 1, pitch: 1, autoRead: false },
    charts: {},
    voices: [],
    utterance: null,
};
const flashcardState = {
    storageKey: 'dbv-flashcards-progress_v3',
    aiCardsKey: 'dbv-flashcards-ai-cards_v1',
    customCardsKey: 'dbv-flashcards-custom-cards_v1', 
    initialContent: {
       "q1": { question: "Wofür sind Ortsrasterung und Intensitätsrasterung gut und wie funktionieren sie?", answer: `<div class="text-left w-full"><h3 class="font-bold text-xl mb-3">Ortsrasterung & Intensitätsrasterung</h3><p class="mb-4">Beide Prozesse sind grundlegend für die <strong class="text-[var(--accent-primary)]">Digitalisierung eines Bildes</strong>.</p><p class="mb-2"><strong>Ortsrasterung (Sampling):</strong></p><ul class="list-disc list-inside mb-4 pl-4 space-y-2"><li><strong>Funktion:</strong> Die kontinuierliche Bildebene wird in ein <strong class="text-[var(--accent-primary)]">diskretes Gitter</strong> (Pixel) zerlegt.</li><li><strong>Wichtig:</strong> Gemäß <strong class="text-[var(--accent-primary)]">Shannon'schem Abtasttheorem</strong> sollte die Abtastfrequenz mindestens doppelt so hoch sein wie die höchste Frequenz im Signal, um <strong class="text-[var(--accent-primary)]">Aliasing</strong> zu vermeiden.</li></ul><p class="mb-2"><strong>Intensitätsrasterung (Quantisierung):</strong></p><ul class="list-disc list-inside pl-4 space-y-2"><li><strong>Funktion:</strong> Der kontinuierliche Helligkeits-/Farbwert jedes Pixels wird einem von <strong class="text-[var(--accent-primary)]">endlich vielen diskreten Werten</strong> zugeordnet (z.B. 256 Stufen bei 8-Bit).</li></ul></div>` },
       "q2": { question: "Was ist das Shannon'sche Abtasttheorem?", answer: `<div class="text-left w-full"><h3 class="font-bold text-xl mb-3">Shannon'sches Abtasttheorem</h3><p>Das Theorem besagt, dass die Abtastfrequenz ($f_s$) mindestens doppelt so hoch sein muss wie die höchste Frequenz ($f_{max}$) im Originalsignal, um das Signal ohne Informationsverlust rekonstruieren zu können. $$f_s > 2 \cdot f_{max}$$ Wird diese Bedingung nicht erfüllt, kommt es zum <strong class="text-[var(--accent-primary)]">Aliasing-Effekt</strong>, bei dem höhere Frequenzen als niedrigere Frequenzen fehlinterpretiert werden.</p></div>` }
    },
    allCards: [],
    currentDeck: [],
    currentIndex: 0,
    activeLevel: 'all',
    isSearchActive: false,
    searchResults: [],
    searchIndex: 0,
    cardIdToDelete: null,
    cardContent: {},
};

document.addEventListener('DOMContentLoaded', () => {
    
    // --- GLOBAL SELECTORS ---
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // --- RESPONSIVE NAVBAR LOGIC ---
    const sidebar = $('#sidebar');
    const overlay = $('#sidebar-overlay');
    const hamburgerBtn = $('#hamburger-btn');

    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
    }

    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }

    hamburgerBtn.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);
    
    // --- THEME & SETTINGS MANAGEMENT ---
    const themeToggle = $('#theme-toggle');
    const sunIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> <span class="font-semibold ml-4">Heller Modus</span>`;
    const moonIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg> <span class="font-semibold ml-4">Dunkler Modus</span>`;
    
    const applyTheme = (isDark) => {
        document.documentElement.classList.toggle('dark', isDark);
        themeToggle.innerHTML = isDark ? sunIcon : moonIcon;
        // Update charts on theme change
        Object.values(appState.charts).forEach(chart => {
            if (!chart) return;
            const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-grid-color').trim();
            const labelColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-label-color').trim();
            if (chart.options.scales.y) { chart.options.scales.y.grid.color = gridColor; chart.options.scales.y.ticks.color = labelColor; }
            if (chart.options.scales.x) { chart.options.scales.x.grid.color = gridColor; chart.options.scales.x.ticks.color = labelColor; }
            if (chart.options.plugins.legend) { chart.options.plugins.legend.labels.color = labelColor; }
            chart.update('none');
        });
    };
    themeToggle.addEventListener('click', () => {
        const isDark = !document.documentElement.classList.contains('dark');
        localStorage.setItem(appState.themeKey, isDark ? 'dark' : 'light');
        applyTheme(isDark);
    });

    const loadSettings = () => {
        appState.googleApiKey = localStorage.getItem(appState.apiKeyStorageKey);
        const savedSettings = localStorage.getItem(appState.settingsKey);
        if(savedSettings) {
            try { appState.settings = JSON.parse(savedSettings); } catch(e) {}
        }
    };
    
    // --- NAVIGATION AND CONTENT RENDERING ---
    const mainContent = $('#main-content');
    const mainNav = $('#main-nav');
    const modules = [
        { id: 'flashcards', title: 'Lernkarten', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>` },
        { id: 'modul1', title: 'Grundlagen', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>` },
        { id: 'modul2', title: 'Schwachstellen', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>` },
        { id: 'modul3', title: 'Patching', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>` },
        { id: 'modul4', title: 'CTI & Angriffe', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>` },
        { id: 'modul5', title: 'Authentifizierung', icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>` },
    ];

    const renderContent = (moduleId) => {
        $$('.module-content').forEach(el => el.classList.remove('active'));
        const activeModuleContainer = $(`#${moduleId}`);
        if (activeModuleContainer) {
            // Check if content is already initialized
            if (!activeModuleContainer.hasChildNodes()) {
                const initFunction = window[`init${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)}`];
                if (typeof initFunction === 'function') initFunction();
                renderMathInElement(activeModuleContainer, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }] });
                applyTheme(document.documentElement.classList.contains('dark'));
            }
            activeModuleContainer.classList.add('active');
            window.scrollTo(0, 0);
        }
        $$('#main-nav .nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.target === moduleId);
        });
        closeSidebar();
    };

    modules.forEach(module => {
        const navLink = document.createElement('a');
        navLink.href = `#${module.id}`;
        navLink.dataset.target = module.id;
        navLink.className = 'nav-link flex items-center p-3 rounded-lg space-x-4';
        navLink.innerHTML = `${module.icon} <span class="font-semibold">${module.title}</span>`;
        navLink.onclick = (e) => { e.preventDefault(); renderContent(module.id); history.pushState(null, '', ` #${module.id}`); };
        mainNav.appendChild(navLink);
    });

    const initPage = () => {
        modules.forEach(module => {
            const moduleDiv = document.createElement('div');
            moduleDiv.id = module.id;
            moduleDiv.className = 'module-content';
            mainContent.appendChild(moduleDiv);
        });
        loadSettings();
        const savedTheme = localStorage.getItem(appState.themeKey);
        applyTheme(savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches));
        
        // Handle initial module from URL hash or default to first module
        const initialModule = window.location.hash.substring(1) || modules[0].id;
        renderContent(initialModule);
    };
    
    // --- MODULE INITIALIZATION FUNCTIONS ---
    window.initModul1 = function() {
        const moduleContainer = $('#modul1');
        moduleContainer.innerHTML = `
            <div class="glass-card p-6 sm:p-8 mb-8 text-center"><h2 class="text-3xl sm:text-4xl font-extrabold text-[var(--accent-primary)] mb-2">Modul 1: Grundlagen</h2><p class="text-[var(--text-secondary)] max-w-3xl mx-auto">Frameworks & Risikobewertung bilden das Fundament des Sicherheitsmanagements.</p></div>
            <div class="space-y-8">
                <div class="glass-card relative p-6 sm:p-8"><span class="source-tag absolute top-4 right-4">Quelle: NM-VL1, VL5</span><h3 class="text-2xl font-bold mb-4">NIST Cybersecurity Framework (CSF)</h3><p class="mb-8 text-[var(--text-secondary)]">Ein flexibler, risikobasierter Zyklus zur Verbesserung der Cybersicherheit. Klicken Sie auf eine Funktion, um mehr zu erfahren.</p><div id="m1-nist-diagram" class="flex flex-wrap justify-center items-center gap-2 sm:gap-4"></div><div id="m1-nist-details" class="mt-6 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg min-h-[110px] text-center flex items-center justify-center transition-all duration-300"><p class="font-medium text-[var(--text-secondary)]">Wählen Sie eine Funktion aus, um Details anzuzeigen.</p></div></div>
                <div class="glass-card relative p-6 sm:p-8"><span class="source-tag absolute top-4 right-4">Quelle: NM-VL5</span><h3 class="text-2xl font-bold mb-4">Risikobewertung: CVSS & BIA</h3><p class="mb-8 text-[var(--text-secondary)]">CVSS bewertet die technische Kritikalität von Schwachstellen, während eine BIA die Auswirkungen auf das Geschäft analysiert.</p><div class="grid lg:grid-cols-5 gap-8 items-start"><div class="lg:col-span-2 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl"><h4 class="font-bold text-lg text-[var(--accent-primary)] mb-3">Business Impact Analysis (BIA)</h4><p class="mb-4 text-sm text-[var(--text-secondary)]">Bewertet die potenziellen Auswirkungen einer Störung und hilft, Wiederherstellungsmaßnahmen zu priorisieren.</p><div id="m1-bia-container" class="space-y-4"></div></div><div class="lg:col-span-3 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl"><h4 class="font-bold text-lg text-[var(--accent-primary)] mb-3">CVSS: Kritikalität im Kontext</h4><p class="mb-4 text-sm text-[var(--text-secondary)]">Der CVSS-Score ist nicht absolut. Das Diagramm zeigt, wie derselbe Base Score in unterschiedlichen Umgebungen bewertet wird.</p><div class="chart-container"><canvas id="cvssChart"></canvas></div></div></div></div>
                <div class="glass-card takeaway-card p-8"><h3 class="text-2xl font-bold mb-2">Kernkonzept: Modul 1</h3><p>Sicherheitsmanagement stützt sich auf Frameworks wie NIST CSF. Die Priorisierung von Maßnahmen erfolgt durch eine kombinierte Risikobewertung: die technische Kritikalität (CVSS) und die geschäftlichen Auswirkungen (BIA).</p></div>
            </div>`;
        const nistContainer = $('#m1-nist-diagram');
        const nistDetails = $('#m1-nist-details');
        const nistData = [ { name: 'Govern', color: '#ef4444', desc: 'Festlegung der Cybersicherheitsstrategie & Richtlinien. Bildet das strategische Fundament.' }, { name: 'Identify', color: '#f97316', desc: 'Verständnis für Systeme, Assets & Risiken entwickeln.' }, { name: 'Protect', color: '#eab308', desc: 'Implementierung von Schutzmaßnahmen zur Sicherung kritischer Dienste.' }, { name: 'Detect', color: '#22c55e', desc: 'Implementierung von Mechanismen zur zeitnahen Entdeckung von Vorfällen.' }, { name: 'Respond', color: '#3b82f6', desc: 'Entwicklung & Umsetzung von Plänen, um auf erkannte Vorfälle zu reagieren.' }, { name: 'Recover', color: '#8b5cf6', desc: 'Maßnahmen zur Wiederherstellung von Systemen & Diensten nach einem Vorfall.' }, ];
        nistData.forEach(item => {
            const div = document.createElement('div');
            div.className = 'diagram-item w-24 h-24 sm:w-28 sm:h-28 rounded-full text-white flex items-center justify-center text-center p-2 font-bold shadow-lg';
            div.style.backgroundColor = item.color;
            div.textContent = item.name;
            div.onclick = () => { nistDetails.innerHTML = `<p class="font-medium text-base text-[var(--text-primary)]">${item.desc}</p>`; $$('#m1-nist-diagram .diagram-item').forEach(el => el.classList.remove('active')); div.classList.add('active'); };
            nistContainer.appendChild(div);
        });
        const biaContainer = $('#m1-bia-container');
        const biaData = [ { name: 'EHR Plattform', criticality: 'HOCH', downtime: '1 Stunde', color: 'red' }, { name: 'Internes Lohnsystem', criticality: 'MITTEL', downtime: '2 Tage', color: 'yellow' }, { name: 'Marketing-Webseite', criticality: 'NIEDRIG', downtime: '4 Tage', color: 'green' } ];
        biaData.forEach(item => {
            const card = document.createElement('div');
            card.className = `p-4 border-l-4 rounded-r-lg bg-[var(--card-bg)] shadow-sm border-${item.color}-500`;
            card.innerHTML = `<h5 class="font-bold text-[var(--text-primary)]">${item.name}</h5><p class="font-semibold text-${item.color}-600 dark:text-${item.color}-400">${item.criticality}</p><p class="text-sm text-[var(--text-secondary)]">Max. Ausfallzeit: ${item.downtime}</p>`;
            biaContainer.appendChild(card);
        });
        appState.charts.cvss = new Chart($('#cvssChart').getContext('2d'), { type: 'bar', data: { labels: ['Enterprise 1 (Ungesichert)', 'Enterprise 2 (Sandbox)'], datasets: [{ label: 'Temporal CVSS Score', data: [9.1, 6.4], backgroundColor: ['rgba(239, 68, 68, 0.7)', 'rgba(234, 179, 8, 0.7)'], borderColor: ['#dc2626', '#d97706'], borderWidth: 2, borderRadius: 5 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 10 }, x:{} }, plugins: { legend: { display: false } } } });
    }

    window.initModul2 = function() {
        const moduleContainer = $('#modul2');
        moduleContainer.innerHTML = `
            <div class="glass-card p-6 sm:p-8 mb-8 text-center"><h2 class="text-3xl sm:text-4xl font-extrabold text-[var(--accent-primary)] mb-2">Modul 2: Schwachstellenmanagement</h2><p class="text-[var(--text-secondary)] max-w-3xl mx-auto">Ein proaktiver und zyklischer Prozess zur Minimierung von Risiken.</p></div>
            <div class="space-y-8">
                <div class="glass-card relative p-6 sm:p-8"><span class="source-tag absolute top-4 right-4">Quelle: NM-VL6</span><h3 class="text-2xl font-bold mb-4">Lebenszyklus</h3><p class="mb-8 text-[var(--text-secondary)]">Fahren Sie mit der Maus über eine Phase (oder tippen Sie auf Mobilgeräten), um Details zu sehen.</p><div id="m2-lifecycle-container" class="flex flex-col md:flex-row justify-between items-center text-center gap-1 md:gap-2"></div><div id="m2-lifecycle-details" class="mt-6 p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg min-h-[80px] text-center flex items-center justify-center transition-all duration-300"><p class="font-medium text-[var(--text-secondary)]">Bewegen Sie den Mauszeiger über eine Phase.</p></div></div>
                <div class="glass-card relative p-6 sm:p-8"><span class="source-tag absolute top-4 right-4">Quelle: NM-VL6</span><h3 class="text-2xl font-bold mb-4">Methoden der Schwachstellenbewertung</h3><p class="mb-8 text-[var(--text-secondary)]">Klicken Sie die Begriffe an, um die Erklärungen aufzudecken.</p><div class="space-y-4" id="m2-accordion-container"></div></div>
                <div class="glass-card takeaway-card p-8"><h3 class="text-2xl font-bold mb-2">Kernkonzept: Modul 2</h3><p>Schwachstellenmanagement ist ein proaktiver Sicherheitsprozess, der einem festen Lebenszyklus folgt. Die Bewertung (Assessment) nutzt verschiedene Methoden (z.B. Whitebox vs. Blackbox), um ein genaues Risikobild zu erhalten.</p></div>
            </div>`;
        const lifecycleData = [ { name: "Discovery", desc: "Finden von Schwachstellen." }, { name: "Analysis", desc: "Bewertung und Ursachenanalyse." }, { name: "Reporting", desc: "Meldung an Verantwortliche." }, { name: "Remediation", desc: "Anwendung eines Patches." }, { name: "Verification", desc: "Sicherstellen, dass Lücke zu ist." }, { name: "Monitoring", desc: "Überwachung der Systeme." }, { name: "Review", desc: "Analyse der 'Lessons Learned'." } ];
        const lifecycleContainer = $('#m2-lifecycle-container');
        const lifecycleDetails = $('#m2-lifecycle-details');
        lifecycleData.forEach((item, index) => {
            if (index > 0) { const arrow = document.createElement('div'); arrow.className = "text-3xl text-[var(--text-secondary)] opacity-50 mx-1 hidden md:block"; arrow.textContent = "→"; lifecycleContainer.appendChild(arrow); }
            const div = document.createElement('div');
            div.className = "flex-1 p-2 md:p-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg shadow-sm hover:shadow-lg hover:bg-[var(--accent-text)] hover:-translate-y-1 cursor-pointer transition-all duration-200 text-xs sm:text-sm font-semibold w-full md:w-auto";
            div.textContent = item.name;
            const showDetails = () => lifecycleDetails.innerHTML = `<p class="font-medium text-base text-[var(--text-primary)]">${item.desc}</p>`;
            div.addEventListener('mouseover', showDetails); div.addEventListener('click', showDetails);
            lifecycleContainer.appendChild(div);
        });

        const accordionData = [ { term: 'Blackbox (Unauthenticated)', def: 'Simuliert einen externen Angreifer ohne Vorkenntnisse. Testet das System von außen.' }, { term: 'Whitebox (Authenticated)', def: 'Der Scanner hat Anmeldeinformationen und kann das System von innen analysieren. Liefert tiefere Einblicke.' }, { term: 'Agenten-los', def: 'Ein zentraler Scanner greift über das Netzwerk auf die Zielsysteme zu. Einfacher einzurichten.' }, { term: 'Agent-basiert', def: 'Eine Software (Agent) wird auf dem Endgerät installiert und sammelt lokal Daten. Oft genauer.' }];
        const accordionContainer = $('#m2-accordion-container');
        accordionData.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'border border-[var(--card-border)] rounded-xl bg-[var(--card-bg)] overflow-hidden';
            const button = document.createElement('button');
            button.className = 'accordion-button w-full flex justify-between items-center p-5 text-left font-semibold text-[var(--text-primary)] hover:bg-[var(--accent-text)]';
            button.innerHTML = `<span>${item.term}</span><span class="transform transition-transform duration-300 text-[var(--accent-primary)] text-2xl font-light">+</span>`;
            const content = document.createElement('div');
            content.className = 'accordion-content px-5 bg-[var(--card-bg)]';
            content.innerHTML = `<p class="py-4 text-[var(--text-secondary)] border-t border-[var(--card-border)]">${item.def}</p>`;
            button.onclick = () => {
                const isExpanded = content.style.maxHeight && content.style.maxHeight !== '0px';
                if (isExpanded) { content.style.maxHeight = '0px'; button.querySelector('span:last-child').style.transform = 'rotate(0deg)'; } 
                else { content.style.maxHeight = content.scrollHeight + 'px'; button.querySelector('span:last-child').style.transform = 'rotate(45deg)'; }
            };
            wrapper.appendChild(button); wrapper.appendChild(content); accordionContainer.appendChild(wrapper);
        });
    }

    window.initModul3 = function() { 
        const moduleContainer = $('#modul3');
        moduleContainer.innerHTML = `
            <div class="glass-card p-6 sm:p-8 mb-8 text-center"><h2 class="text-3xl sm:text-4xl font-extrabold text-[var(--accent-primary)] mb-2">Modul 3: Patch-Management</h2><p class="text-[var(--text-secondary)] max-w-3xl mx-auto">Der strukturierte Prozess zur Anwendung von Software-Updates.</p></div>
            <div class="space-y-8">
                <div class="glass-card relative p-6 sm:p-8"><span class="source-tag absolute top-4 right-4">Quelle: NM-VL6, VL7</span><h3 class="text-2xl font-bold mb-4">Patch-Typen und Zyklen</h3><p class="mb-8 text-[var(--text-secondary)]">Ein erfolgreiches Patch-Management balanciert zwischen Sicherheit, Stabilität und Planbarkeit.</p><div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"><div class="p-6 bg-red-900/10 border border-red-900/20 rounded-lg text-center shadow-sm"><h4 class="font-bold text-red-500 dark:text-red-400 text-lg">Security Patches</h4><p class="text-[var(--text-secondary)] text-sm">Höchste Priorität</p></div><div class="p-6 bg-green-900/10 border border-green-900/20 rounded-lg text-center shadow-sm"><h4 class="font-bold text-green-500 dark:text-green-400 text-lg">Functional Patches</h4><p class="text-[var(--text-secondary)] text-sm">Niedrige Dringlichkeit</p></div><div class="p-6 bg-yellow-900/10 border border-yellow-900/20 rounded-lg text-center shadow-sm"><h4 class="font-bold text-yellow-500 dark:text-yellow-400 text-lg">Stability Patches</h4><p class="text-[var(--text-secondary)] text-sm">Mittlere Priorität</p></div></div><div class="mt-8 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl"><h4 class="font-semibold text-xl mb-4 text-center text-[var(--accent-primary)]">Patch-Zyklen</h4><div class="flex flex-col md:flex-row gap-6 mt-4"><div class="flex-1 p-4 border-t-4 border-blue-400 bg-[var(--bg-color)] rounded shadow-inner"><h5 class="font-bold">Zyklische Patches</h5><p class="text-sm text-[var(--text-secondary)]">Regelmäßige, planbare Updates (z.B. "Patch Tuesday"), die Tests ermöglichen.</p></div><div class="flex-1 p-4 border-t-4 border-red-400 bg-[var(--bg-color)] rounded shadow-inner"><h5 class="font-bold">Emergency Patches</h5><p class="text-sm text-[var(--text-secondary)]">Außerplanmäßige, dringende Updates als Reaktion auf kritische Bedrohungen.</p></div></div></div></div>
                <div class="glass-card p-6 sm:p-8"><h4 class="font-bold text-xl text-amber-500 dark:text-amber-400">Wichtig: Rollback-Pläne</h4><p class="mt-2 text-[var(--text-secondary)]">Da Patches Probleme verursachen können, ist ein getesteter Rollback-Plan (z.B. via Snapshots) essenziell, um im Notfall schnell zum vorherigen Zustand zurückkehren zu können.</p></div>
                <div class="glass-card takeaway-card p-8"><h3 class="text-2xl font-bold mb-2">Kernkonzept: Modul 3</h3><p>Patch-Management ist der Prozess zur Verteilung von Software-Updates. Es unterscheidet zwischen kritischen Sicherheitspatches und anderen Updates und operiert in planbaren Zyklen. Ein getesteter Rollback-Plan ist unerlässlich.</p></div>
            </div>`;
    }

    window.initModul4 = function() {
        const moduleContainer = $('#modul4');
        moduleContainer.innerHTML = `
            <div class="glass-card p-6 sm:p-8 mb-8 text-center"><h2 class="text-3xl sm:text-4xl font-extrabold text-[var(--accent-primary)] mb-2">Modul 4: CTI & Angriffsmodelle</h2><p class="text-[var(--text-secondary)] max-w-3xl mx-auto">Cyber Threat Intelligence und Angriffsmodelle helfen, Bedrohungen zu verstehen und proaktiv abzuwehren.</p></div>
            <div class="space-y-8">
                <div class="glass-card relative p-6 sm:p-8"><span class="source-tag absolute top-4 right-4">Quelle: NM-VL7</span><h3 class="text-2xl font-bold mb-4">CTI-Typen nach Zielgruppe</h3><p class="mb-8 text-[var(--text-secondary)]">CTI wird je nach Zielgruppe in vier Ebenen unterteilt, von der strategischen Planung bis zur technischen Abwehr.</p><div class="grid md:grid-cols-2 gap-8 items-center"><div class="chart-container"><canvas id="ctiChart"></canvas></div><div class="space-y-4" id="m4-cti-details-container"></div></div></div>
                <div class="glass-card relative p-6 sm:p-8"><span class="source-tag absolute top-4 right-4">Quelle: NM-VL7</span><h3 class="text-2xl font-bold mb-4">Angriffsmodelle</h3><p class="mb-8 text-[var(--text-secondary)]">Diese Modelle helfen, Angriffe zu verstehen. Die Kill Chain zeigt den groben Ablauf, während ATT&CK die spezifischen Techniken katalogisiert.</p><div class="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl"><h4 class="font-semibold text-xl mb-4 text-center text-[var(--accent-primary)]">Cyber Kill Chain</h4><p class="text-center text-[var(--text-secondary)] mb-6">Wählen Sie eine Phase aus, um die zugehörige Beschreibung zu sehen.</p><div class="flex flex-col lg:flex-row gap-6"><div id="m4-killchain-diagram" class="lg:w-2/5 flex flex-col space-y-2"></div><div id="m4-killchain-details" class="lg:w-3/5 p-4 bg-[var(--bg-color)] rounded-lg flex items-center justify-center min-h-[150px] transition-all duration-300"><p class="font-medium text-[var(--text-secondary)]">Wählen Sie eine Phase aus.</p></div></div></div><div class="mt-8 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl"><h4 class="font-semibold text-xl mb-4 text-center text-[var(--accent-primary)]">MITRE ATT&CK® Framework</h4><p class="text-center text-[var(--text-secondary)] mb-6">Eine riesige Wissensdatenbank über die Taktiken und Techniken von Angreifern, mit Fokus auf das Verhalten nach der Kompromittierung.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-center"><div class="p-4 bg-[var(--bg-color)] rounded-lg shadow-inner"><strong class="text-[var(--text-primary)] block">Cyber Kill Chain</strong> High-Level, Phasen-orientiert</div><div class="p-4 bg-[var(--bg-color)] rounded-lg shadow-inner"><strong class="text-[var(--text-primary)] block">MITRE ATT&CK</strong> Sehr detailliert, Technik-orientiert</div></div></div></div>
                <div class="glass-card takeaway-card p-8"><h3 class="text-2xl font-bold mb-2">Kernkonzept: Modul 4</h3><p>CTI liefert Wissen über Bedrohungen. Modelle wie die Cyber Kill Chain (grobe Phasen) und MITRE ATT&CK (detaillierte Techniken) helfen, Angriffe zu verstehen und die eigene Abwehr systematisch zu verbessern.</p></div>
            </div>`;
        const ctiData = [ { type: "Strategische CTI", audience: "Management, C-Level" }, { type: "Operationale CTI", audience: "SOC-Manager, IR-Teams" }, { type: "Taktische CTI", audience: "Technische Experten" }, { type: "Technische CTI", audience: "SIEM, Firewalls" }];
        const ctiColors = ['#dc2626', '#f97316', '#2563eb', '#7c3aed'];
        appState.charts.cti = new Chart($('#ctiChart').getContext('2d'), { type: 'doughnut', data: { labels: ctiData.map(d => d.type), datasets: [{ data: [1, 1, 1, 1], backgroundColor: ctiColors, borderWidth: 5, borderColor: 'var(--card-bg)' }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { display: false } } } });
        const ctiDetailsContainer = $('#m4-cti-details-container');
        ctiData.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] shadow-sm'; card.style.borderLeft = `5px solid ${ctiColors[index]}`;
            card.innerHTML = `<h5 class="font-bold text-[var(--text-primary)]">${item.type}</h5><p class="text-sm text-[var(--text-secondary)]"><strong>Zielgruppe:</strong> ${item.audience}</p>`;
            ctiDetailsContainer.appendChild(card);
        });

        const killchainData = [ { name: 'Reconnaissance', desc: 'Der Angreifer sammelt Informationen über sein Ziel.' }, { name: 'Weaponization', desc: 'Der Angreifer erstellt eine schädliche Nutzlast.' }, { name: 'Delivery', desc: 'Die Waffe wird zum Ziel transportiert.' }, { name: 'Exploitation', desc: 'Eine Schwachstelle wird ausgenutzt.' }, { name: 'Installation', desc: 'Malware wird für dauerhaften Zugriff installiert.' }, { name: 'Command & Control', desc: 'Aufbau eines Kommunikationskanals.' }, { name: 'Actions on Objectives', desc: 'Der Angreifer führt sein eigentliches Ziel aus.' }, ];
        const killchainDiagram = $('#m4-killchain-diagram');
        const killchainDetails = $('#m4-killchain-details');
        killchainData.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'diagram-item p-3 w-full text-center bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg shadow-sm font-semibold text-[var(--text-secondary)]';
            div.onclick = () => { killchainDetails.innerHTML = `<p class="font-semibold text-[var(--text-primary)] text-lg">${item.desc}</p>`; $$('#m4-killchain-diagram .diagram-item').forEach(el => el.classList.remove('active')); div.classList.add('active'); };
            div.textContent = `${index + 1}. ${item.name}`;
            killchainDiagram.appendChild(div);
        });
    }
    
    window.initModul5 = function() {
        const moduleContainer = $('#modul5');
        moduleContainer.innerHTML = `
            <div class="glass-card p-6 sm:p-8 mb-8 text-center"><h2 class="text-3xl sm:text-4xl font-extrabold text-[var(--accent-primary)] mb-2">Modul 5: Authentifizierung</h2><p class="text-[var(--text-secondary)] max-w-3xl mx-auto">Zentrale Protokolle und deren häufigste Angriffsvektoren.</p></div>
            <div class="space-y-8">
                <div class="glass-card relative p-6 sm:p-8"><span class="source-tag absolute top-4 right-4">Quelle: NM-VL2</span><h3 class="text-2xl font-bold mb-4">NTLM: Pass-the-Hash</h3><p class="text-[var(--text-secondary)] mb-6">Die größte Schwäche des veralteten NTLM-Protokolls. Da zur Authentifizierung nur der Passwort-Hash benötigt wird, kann ein Angreifer mit einem gestohlenen Hash die Identität eines Benutzers übernehmen.</p><div class="p-4 bg-red-900/10 border border-red-900/20 rounded-lg text-center flex items-center justify-center gap-2 sm:gap-4 flex-wrap"><span class="font-semibold text-red-500 dark:text-red-400">Angreifer erbeutet Hash</span> <span class="text-red-500/40 dark:text-red-400/40 text-2xl font-light">➔</span> <span class="font-semibold text-red-500 dark:text-red-400">Authentifizierung mit Hash</span> <span class="text-red-500/40 dark:text-red-400/40 text-2xl font-light">➔</span> <span class="font-semibold text-red-500 dark:text-red-400">Zugriff</span></div></div>
                <div class="glass-card relative p-6 sm:p-8"><span class="source-tag absolute top-4 right-4">Quelle: NM-VL2, VL3</span><h3 class="text-2xl font-bold mb-4">Kerberos Attack Explorer</h3><p class="mb-6 text-[var(--text-secondary)]">Kerberos ist sicherer, aber nicht immun gegen Angriffe. Wählen Sie einen Angriffstyp, um Details zu sehen.</p><div id="kerberos-tabs" class="flex flex-wrap gap-2 mb-6 border-b border-[var(--card-border)]"></div><div class="grid md:grid-cols-5 gap-6 p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl items-center"><div id="m5-kerberos-details" class="md:col-span-3 p-2 transition-all duration-300"></div><div id="m5-kerberos-diagram" class="md:col-span-2 flex items-center justify-center text-center flex-wrap gap-2 md:gap-4 p-4 bg-[var(--bg-color)] rounded-lg shadow-inner min-h-[150px] transition-all duration-300"></div></div></div>
                <div class="glass-card takeaway-card p-8"><h3 class="text-2xl font-bold mb-2">Kernkonzept: Modul 5</h3><p>Kerberos ist der ticket-basierte Nachfolger von NTLM. Trotz seiner höheren Sicherheit ist es anfällig für Angriffe wie Roasting (Passwörter knacken) und Ticket-Manipulation (Pass-the-Ticket, Silver/Golden Tickets), die bei Erfolg weitreichenden Zugriff gewähren.</p></div>
            </div>`;
        const kerberosData = {
            'AS-REQ Roasting': { desc: "<strong>Bedingung:</strong> Keine Kerberos-Prä-Authentifizierung.<br><strong>Ablauf:</strong> Angreifer fordert Authentifizierungsdaten an und versucht offline, das verschlüsselte Paket zu knacken, um das Passwort zu erraten.", diagram: `<div class="text-red-500 dark:text-red-400 font-bold">Angreifer</div><div class="text-2xl text-[var(--text-secondary)] opacity-50">→</div><div>KDC</div><div class="text-2xl text-[var(--text-secondary)] opacity-50">→</div><div class="text-red-500 dark:text-red-400 font-bold">Offline Crack</div>` },
            'Kerberoasting': { desc: "<strong>Ziel:</strong> Passwörter von Dienstkonten.<br><strong>Ablauf:</strong> Ein Benutzer fordert ein Service Ticket an. Der Angreifer extrahiert dieses und versucht offline, das Passwort des Dienstes zu knacken.", diagram: `<div>Benutzer</div><div class="text-2xl text-[var(--text-secondary)] opacity-50">→</div><div>TGS</div><div class="text-2xl text-[var(--text-secondary)] opacity-50">→</div><div class="text-red-500 dark:text-red-400 font-bold">Offline Crack</div>` },
            'Silver Ticket': { desc: "<strong>Ziel:</strong> Zugriff auf einen *Dienst*.<br><strong>Ablauf:</strong> Mit dem Hash eines Dienstes fälscht der Angreifer ein Service Ticket und greift direkt auf den Dienst zu.", diagram: `<div class="text-red-500 dark:text-red-400 font-bold">Angreifer</div><div class="text-2xl text-[var(--text-secondary)] opacity-50">→</div><div class="font-mono bg-[var(--bg-color)] p-1 rounded-md">Gefälschtes ST</div><div class="text-2xl text-[var(--text-secondary)] opacity-50">→</div><div>Service</div>` },
            'Golden Ticket': { desc: "<strong>Ziel:</strong> Kontrolle über die *Domäne*.<br><strong>Ablauf:</strong> Mit dem Hash des \`krbtgt\`-Kontos fälscht der Angreifer ein TGT und kann sich als jeder Benutzer ausgeben.", diagram: `<div class="font-mono bg-yellow-400/20 p-1 rounded-md text-yellow-500 dark:text-yellow-400">Gefälschtes TGT</div><div class="text-2xl text-[var(--text-secondary)] opacity-50">→</div><div>KDC</div><div class="text-2xl text-[var(--text-secondary)] opacity-50">→</div><div class="text-red-500 dark:text-red-400 font-bold">Domain-Kontrolle</div>` },
            'Pass-the-Ticket': { desc: "<strong>Ablauf:</strong> Angreifer extrahiert gültige Kerberos-Tickets (TGT/ST) aus dem Speicher eines kompromittierten Clients und verwendet sie wieder.", diagram: `<div>Client</div><div class="text-2xl text-[var(--text-secondary)] opacity-50">→</div><div class="text-red-500 dark:text-red-400 font-bold">Ticket-Diebstahl</div><div class="text-2xl text-[var(--text-secondary)] opacity-50">→</div><div>Service</div>` },
        };
        const kerberosTabs = $('#kerberos-tabs');
        const kerberosDiagram = $('#m5-kerberos-diagram');
        const kerberosDetails = $('#m5-kerberos-details');
        function updateKerberosView(attackName) {
            const attack = kerberosData[attackName];
            kerberosDetails.innerHTML = `<h4 class="font-bold text-xl mb-3 text-[var(--accent-primary)]">${attackName}</h4><p class="text-[var(--text-secondary)] leading-relaxed">${attack.desc}</p>`;
            kerberosDiagram.innerHTML = attack.diagram;
        }
        Object.keys(kerberosData).forEach((name, index) => {
            const button = document.createElement('button');
            button.className = 'tab-button py-2 px-4 border-b-2 border-transparent font-medium text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition rounded-t-md';
            button.textContent = name;
            button.onclick = () => { updateKerberosView(name); $$('#kerberos-tabs .tab-button').forEach(btn => btn.classList.remove('active')); button.classList.add('active'); };
            kerberosTabs.appendChild(button);
            if(index === 0) { setTimeout(() => button.click(), 0); }
        });
    }

    window.initFlashcards = function() {
        const moduleContainer = $('#flashcards');
        moduleContainer.innerHTML = `
            <div class="w-full max-w-4xl mx-auto">
                <header class="text-center mb-6">
                    <h1 class="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">Lernkarten: Digitale Bildverarbeitung</h1>
                    <p class="text-[var(--text-secondary)] mt-2">Klicke auf eine Karte, um die Antwort zu sehen. Bewerte sie danach.</p>
                </header>
                <div class="w-full max-w-2xl mx-auto mb-6">
                    <div class="flex gap-2">
                        <div class="relative flex-grow">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input type="search" id="fc-search-input" placeholder="Frage oder Thema suchen..." class="block w-full pl-10 pr-10 py-2.5 border rounded-lg shadow-sm focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--card-bg)] border-[var(--card-border)] placeholder-[var(--text-secondary)]">
                            <button id="fc-clear-search-btn" class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hidden">
                                <svg class="w-5 h-5 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <button id="fc-open-create-modal-btn" title="Eigene Karte erstellen" class="flex-shrink-0 p-2.5 bg-teal-600 text-white rounded-lg shadow-sm hover:bg-teal-700 transition-all">
                             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                        <button id="fc-open-generate-modal-btn" title="Neue Karten generieren" class="flex-shrink-0 p-2.5 bg-[var(--accent-primary)] text-white rounded-lg shadow-sm hover:bg-[var(--accent-secondary)] transition-all">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M12 21v-1m0-10a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3z"></path></svg>
                        </button>
                    </div>
                </div>
                <div id="fc-stats-container" class="mb-6 text-center"></div>
                <main class="flex flex-col items-center">
                    <div id="fc-container" class="flashcard-container w-full h-[500px] sm:h-[450px] relative"></div>
                    <div id="fc-navigation-container" class="w-full max-w-lg flex justify-between items-center my-4">
                        <button id="fc-prev-btn" class="px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--accent-text)]">&lt; Zurück</button>
                        <span id="fc-card-counter" class="text-sm font-medium text-[var(--text-secondary)]"></span>
                        <button id="fc-next-btn" class="px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--accent-text)]">Weiter &gt;</button>
                    </div>
                    <div id="fc-answer-buttons" class="flex justify-center items-center gap-4 w-full mt-2">
                        <button id="fc-wrong-btn" class="group px-6 py-4 bg-gradient-to-br from-red-500 to-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-400 dark:focus:ring-red-800 transition-all text-lg w-1/2 max-w-xs transform hover:-translate-y-1"><span class="flex items-center justify-center"><svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>Falsch</span></button>
                        <button id="fc-correct-btn" class="group px-6 py-4 bg-gradient-to-br from-green-500 to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-green-800 transition-all text-lg w-1/2 max-w-xs transform hover:-translate-y-1"><span class="flex items-center justify-center"><svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Richtig</span></button>
                    </div>
                </main>
            </div>
        `;
        initFlashcardLogic();
    }
    
    // --- MAIN APP INITIALIZATION ---
    initPage();
    setupGlobalEventListeners();
});