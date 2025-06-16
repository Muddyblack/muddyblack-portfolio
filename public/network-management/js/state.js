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

    // Helper function to create standard module header
    const createModuleHeaderHtml = (title, subtitle) => `
        <div class="glass-card p-6 sm:p-8 mb-8 text-center">
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[var(--accent-primary)] mb-2">${title}</h2>
            <p class="text-[var(--text-secondary)] max-w-3xl mx-auto">${subtitle}</p>
        </div>`;

    // Generic module initialization function
    const initializeModule = (moduleContainer, moduleId) => {
        const contentEntry = modulePageContent[moduleId];
        if (!contentEntry) {
            moduleContainer.innerHTML = `<p>Error: Content for ${moduleId} not found.</p>`;
            return;
        }
        
        // Set the HTML content
        moduleContainer.innerHTML = createModuleHeaderHtml(contentEntry.title, contentEntry.subtitle) + contentEntry.mainHtml;
        
        // Execute module-specific logic if it exists
        if (typeof contentEntry.initLogic === 'function') {
            contentEntry.initLogic();
        }
    };

    // Generate modules array dynamically from modulePageContent
    const modules = Object.keys(modulePageContent).map(moduleId => ({
        id: moduleId,
        title: modulePageContent[moduleId].navTitle || modulePageContent[moduleId].title,
        icon: modulePageContent[moduleId].navIcon,
        init: initializeModule
    }));

    const renderContent = (moduleId) => {
        $$('.module-content').forEach(el => el.classList.remove('active'));
        const activeModuleContainer = $(`#${moduleId}`);
        const moduleConfig = modules.find(m => m.id === moduleId);

        if (activeModuleContainer && moduleConfig) {
            if (!activeModuleContainer.hasChildNodes() && typeof moduleConfig.init === 'function') {
                moduleConfig.init(activeModuleContainer, moduleId);
                renderMathInElement(activeModuleContainer, { delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }] });
                applyTheme(document.documentElement.classList.contains('dark')); // Ensure theme applied to new content
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
    
    // --- MAIN APP INITIALIZATION ---
    initPage();
    setupGlobalEventListeners();
});