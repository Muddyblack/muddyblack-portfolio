const modulePageContent = {
    "flashcards": {
        title: "Lernkarten: Network Management",
        subtitle: "Klicke auf eine Karte, um die Antwort zu sehen. Bewerte sie danach.",
        navTitle: "Lernkarten",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>`,
        mainHtml: `
            <div class="w-full max-w-4xl mx-auto">
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
        `,
        initLogic: () => {
            initFlashcardLogic();
        }
    },
    "vl0": {
        title: "VL0: Grundlagen der Sicherheits-Frameworks",
        subtitle: "Überblick über NIST CSF als Basis für das Sicherheitsmanagement.",
        navTitle: "VL0: Frameworks",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9"></path></svg>`,
        mainHtml: `
            <div class="space-y-8">
                <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">NIST Cybersecurity Framework (CSF)</h3>
                    <p class="mb-6 text-[var(--text-secondary)]">Das NIST CSF ist ein freiwilliges Framework, das Organisationen einen risikobasierten Ansatz zur Verwaltung der Cybersicherheit bietet. Es ist keine starre Vorschrift, sondern ein Leitfaden zur Verbesserung der Sicherheitspraktiken. Gemäss Prüfungsplan ist ein Überblick über die Kernfunktionen erforderlich.</p>
                    <div class="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                        <h4 class="font-bold text-lg text-[var(--accent-primary)] mb-4 text-center">Die 6 Kernfunktionen des NIST CSF 2.0</h4>
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                            <div class="p-4 rounded-lg bg-purple-100 dark:bg-purple-900/40"><strong class="block text-purple-600 dark:text-purple-400 text-lg">Govern</strong><span class="text-xs text-[var(--text-secondary)]">Strategie, Richtlinien & Risikomanagement festlegen.</span></div>
                            <div class="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/40"><strong class="block text-blue-600 dark:text-blue-400 text-lg">Identify</strong><span class="text-xs text-[var(--text-secondary)]">Assets, Systeme und Risiken verstehen.</span></div>
                            <div class="p-4 rounded-lg bg-green-100 dark:bg-green-900/40"><strong class="block text-green-600 dark:text-green-400 text-lg">Protect</strong><span class="text-xs text-[var(--text-secondary)]">Schutzmaßnahmen implementieren.</span></div>
                            <div class="p-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/40"><strong class="block text-yellow-600 dark:text-yellow-400 text-lg">Detect</strong><span class="text-xs text-[var(--text-secondary)]">Vorfälle zeitnah erkennen.</span></div>
                            <div class="p-4 rounded-lg bg-orange-100 dark:bg-orange-900/40"><strong class="block text-orange-600 dark:text-orange-400 text-lg">Respond</strong><span class="text-xs text-[var(--text-secondary)]">Auf erkannte Vorfälle reagieren.</span></div>
                            <div class="p-4 rounded-lg bg-red-100 dark:bg-red-900/40"><strong class="block text-red-600 dark:text-red-400 text-lg">Recover</strong><span class="text-xs text-[var(--text-secondary)]">Systeme wiederherstellen & verbessern.</span></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
	"vl1": {
        title: "VL1: IT Service Management & Grundlagen der Authentifizierung",
        subtitle: "ITIL-Framework für Service Management und die fundamentalen Konzepte der Benutzeridentifikation.",
        navTitle: "VL1: ITSM & Auth",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h5"></path></svg>`,
        mainHtml: `
            <div class="space-y-8">
                <!-- ITIL 4 Section -->
                <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">Überblick: IT Service Management & ITIL 4</h3>
                    <p class="mb-4 text-[var(--text-secondary)]">
                        <strong class="text-[var(--text-primary)]">ITSM</strong> ist ein strategischer Ansatz, der IT als einen Service zur Wertschöpfung für den Kunden versteht, anstatt nur die Technologie selbst zu verwalten. 
                        <strong class="text-[var(--text-primary)]">ITIL 4</strong> ist das De-facto-Standard-Framework, das Organisationen eine Sammlung von Best Practices an die Hand gibt, um ITSM erfolgreich umzusetzen.
                    </p>
                    <div class="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                        <h4 class="font-bold text-lg text-[var(--accent-primary)] mb-3">Kernkomponenten von ITIL 4</h4>
                        <ul class="list-disc list-inside space-y-3 text-[var(--text-secondary)]">
                            <li><strong class="text-[var(--text-primary)]">Die 4 Dimensionen:</strong> Für einen ganzheitlichen Ansatz müssen vier Bereiche betrachtet werden: Organisation & Menschen, Information & Technologie, Partner & Lieferanten, Wertströme & Prozesse.</li>
                            <li><strong class="text-[var(--text-primary)]">Das Service Value System (SVS):</strong> Beschreibt, wie alle Komponenten und Aktivitäten zusammenwirken, um aus einer Nachfrage (Opportunity/Demand) einen Wert (Value) zu generieren.</li>
                            <li><strong class="text-[var(--text-primary)]">Die Service Value Chain (SVC):</strong> Das Herzstück des SVS. Es ist ein Betriebsmodell, das die sechs Kernaktivitäten (Plan, Improve, Engage, Design & Transition, Obtain/Build, Deliver & Support) zur Wertschöpfung beschreibt.</li>
                        </ul>
                    </div>
                </div>

                <!-- Authentication Fundamentals Section -->
                <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">Fundamentale Authentifizierungskonzepte</h3>
                    <p class="mb-6 text-[var(--text-secondary)]">Authentifizierung ist der Prozess der Verifizierung einer behaupteten Identität. Die folgenden Konzepte sind die Bausteine moderner Anmeldeverfahren. (Quelle: VL1, VL2)</p>
                    <div class="space-y-6">
                        <!-- Password Security -->
                        <div class="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                            <h4 class="font-bold text-lg text-[var(--accent-primary)] mb-3">Passwort-Sicherheit: Hashing & Salting</h4>
                            <p class="mb-4 text-[var(--text-secondary)]">Passwörter dürfen niemals im Klartext gespeichert werden.</p>
                            <ul class="list-decimal list-inside space-y-2">
                                <li><strong class="text-[var(--text-primary)]">Hashing:</strong> Das Passwort wird durch eine kryptographische Funktion (z.B. SHA-256) in eine Zeichenkette fester Länge umgewandelt. Dieser Prozess ist unumkehrbar (Einwegfunktion).</li>
                                <li><strong class="text-[var(--text-primary)]">Salting:</strong> Vor dem Hashing wird eine zufällige, benutzerspezifische Zeichenkette (der "Salt") an das Passwort angehängt. Der Salt wird zusammen mit dem Hash gespeichert. <strong class="text-[var(--text-secondary)]">Zweck:</strong> Es verhindert, dass Angreifer vorberechnete Hash-Tabellen (Rainbow Tables) verwenden können und stellt sicher, dass zwei identische Passwörter zu unterschiedlichen Hashes führen.</li>
                            </ul>
                        </div>
                        <!-- MFA and OTP -->
                        <div class="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                            <h4 class="font-bold text-lg text-[var(--accent-primary)] mb-3">Multi-Faktor-Authentifizierung (MFA) & Einmalpasswörter (OTP)</h4>
                            <p class="mb-4 text-[var(--text-secondary)]">MFA ist der heutige Sicherheitsstandard und kombiniert Anmeldeinformationen aus mindestens zwei der drei folgenden Kategorien:</p>
                             <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                                <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"><strong class="block">Wissen</strong>(Passwort, PIN)</div>
                                <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"><strong class="block">Besitz</strong>(Smartphone-App, Token)</div>
                                <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"><strong class="block">Inhärenz</strong>(Fingerabdruck, Gesicht)</div>
                            </div>
                            <p class="text-[var(--text-secondary)]">Einmalpasswörter (OTPs) sind eine häufige Form des zweiten Faktors (Besitz):</p>
                            <ul class="list-disc list-inside space-y-2 mt-2">
                               <li><strong class="text-[var(--text-primary)]">TOTP (Time-based OTP):</strong> Der häufigste Typ. Ein geheimer Schlüssel und die aktuelle Uhrzeit werden verwendet, um einen Code zu generieren. Server und Client müssen zeitsynchron sein.</li>
                               <li><strong class="text-[var(--text-primary)]">HOTP (HMAC-based OTP):</strong> Ein ereignisbasiertes Token, das einen Zähler verwendet, der bei jeder Anmeldung inkrementiert wird, um einen neuen Code zu erzeugen.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    "vl2": {
        title: "VL2: Zugriffsverwaltung & Detaillierter Kerberos-Ablauf",
        subtitle: "Autorisierungsmodelle und der detaillierte, visuelle Ablauf des Kerberos-Protokolls.",
        navTitle: "VL2: Zugriff & Kerberos",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`,
        mainHtml: `
            <div class="space-y-8">
                <!-- Authorization Models Section -->
                <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">Autorisierungsmodelle: Wer darf was?</h3>
                    <p class="mb-6 text-[var(--text-secondary)]">Nachdem ein Benutzer erfolgreich <strong class="text-[var(--text-primary)]">authentifiziert</strong> wurde, bestimmt die <strong class="text-[var(--text-primary)]">Autorisierung</strong>, auf welche Ressourcen er zugreifen darf.</p>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex-1 p-4 border-t-4 border-red-400 bg-[var(--card-bg)] rounded shadow-md">
                            <h5 class="font-bold">Benutzerbasierte Zugriffskontrolle</h5>
                            <p class="text-sm text-[var(--text-secondary)]">Berechtigungen werden direkt an einzelne Benutzerkonten vergeben. Schwer zu verwalten und nicht skalierbar.</p>
                        </div>
                        <div class="flex-1 p-4 border-t-4 border-green-400 bg-[var(--card-bg)] rounded shadow-md">
                            <h5 class="font-bold">Gruppenbasierte Zugriffskontrolle (Best Practice)</h5>
                            <p class="text-sm text-[var(--text-secondary)]">Berechtigungen werden an Gruppen vergeben. Benutzer erben Rechte durch Mitgliedschaft. Vereinfacht die Verwaltung enorm.</p>
                        </div>
                    </div>
                </div>

                <!-- Kerberos Detailed Flow -->
                <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">Kerberos im Detail: Der Ticket-Austausch</h3>
                    <p class="mb-6 text-[var(--text-secondary)]">Kerberos basiert auf einem Dreiecksverhältnis zwischen dem Client, dem Key Distribution Center (KDC) und dem Zieldienst. Der Prozess eliminiert die Notwendigkeit, Passwörter über das Netzwerk zu senden.</p>
                    <div class="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                        <div class="flex flex-col md:flex-row justify-between items-center text-center gap-4 mb-6">
                            <div class="flex flex-col items-center"><i class="fa-solid fa-user text-3xl mb-2 text-blue-400"></i><span class="font-bold">Client</span></div>
                            <div class="flex flex-col items-center"><i class="fa-solid fa-key text-3xl mb-2 text-yellow-400"></i><span class="font-bold">KDC</span><p class="text-xs text-[var(--text-secondary)]">(AS & TGS)</p></div>
                            <div class="flex flex-col items-center"><i class="fa-solid fa-server text-3xl mb-2 text-green-400"></i><span class="font-bold">Dienst</span></div>
                        </div>
                        <ol class="relative border-l border-gray-200 dark:border-gray-700 space-y-6">
                            <li class="ml-6">
                                <span class="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"><i class="fa-solid fa-1 text-blue-600 dark:text-blue-300"></i></span>
                                <h4 class="font-semibold">Anforderung des TGT (Ticket-Granting Ticket)</h4>
                                <p class="text-sm text-[var(--text-secondary)] mt-1">Client <i class="fa-solid fa-arrow-right-long mx-2"></i> KDC (AS). Der Client sendet eine <strong class="text-[var(--text-primary)]">AS-REQ</strong>-Nachricht mit seiner Benutzer-ID an den Authentication Server (AS). Optional wird ein mit dem Benutzerpasswort-Hash verschlüsselter Zeitstempel zur Prä-Authentifizierung mitgesendet.</p>
                            </li>
                             <li class="ml-6">
                                <span class="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"><i class="fa-solid fa-2 text-blue-600 dark:text-blue-300"></i></span>
                                <h4 class="font-semibold">Empfang des TGT</h4>
                                <p class="text-sm text-[var(--text-secondary)] mt-1">KDC (AS) <i class="fa-solid fa-arrow-right-long mx-2"></i> Client. Der AS prüft den Benutzer. Ist er gültig, sendet er eine <strong class="text-[var(--text-primary)]">AS-REP</strong> zurück. Diese enthält: <br>A) das <strong class="text-white">TGT</strong> (verschlüsselt mit dem geheimen Schlüssel des KDC) <br>B) einen <strong class="text-white">Session Key</strong> (Sitzungsschlüssel, verschlüsselt mit dem Passwort-Hash des Benutzers).</p>
                            </li>
                             <li class="ml-6">
                                <span class="absolute flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-900 dark:bg-yellow-900"><i class="fa-solid fa-3 text-yellow-600 dark:text-yellow-300"></i></span>
                                <h4 class="font-semibold">Anforderung des Service Tickets (ST)</h4>
                                <p class="text-sm text-[var(--text-secondary)] mt-1">Client <i class="fa-solid fa-arrow-right-long mx-2"></i> KDC (TGS). Um auf einen Dienst zuzugreifen, sendet der Client eine <strong class="text-[var(--text-primary)]">TGS-REQ</strong> an den Ticket-Granting Server (TGS). Diese enthält: <br>A) das erhaltene <strong class="text-white">TGT</strong> <br>B) die ID des Zieldienstes <br>C) einen Authenticator (Zeitstempel, verschlüsselt mit dem Session Key).</p>
                            </li>
                             <li class="ml-6">
                                <span class="absolute flex items-center justify-center w-8 h-8 bg-green-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-900 dark:bg-green-900"><i class="fa-solid fa-4 text-green-600 dark:text-green-300"></i></span>
                                <h4 class="font-semibold">Empfang des Service Tickets</h4>
                                <p class="text-sm text-[var(--text-secondary)] mt-1">KDC (TGS) <i class="fa-solid fa-arrow-right-long mx-2"></i> Client. Der TGS entschlüsselt das TGT, prüft den Authenticator und stellt ein <strong class="text-[var(--text-primary)]">Service Ticket (ST)</strong> aus. Dieses wird mit dem geheimen Schlüssel des <strong class="text-white">Zieldienstes</strong> verschlüsselt und an den Client gesendet.</p>
                            </li>
                              <li class="ml-6">
                                <span class="absolute flex items-center justify-center w-8 h-8 bg-green-100 rounded-full -left-4 ring-8 ring-white dark:ring-gray-900 dark:bg-green-900"><i class="fa-solid fa-5 text-green-600 dark:text-green-300"></i></span>
                                <h4 class="font-semibold">Zugriff auf den Dienst</h4>
                                <p class="text-sm text-[var(--text-secondary)] mt-1">Client <i class="fa-solid fa-arrow-right-long mx-2"></i> Dienst. Der Client sendet das <strong class="text-[var(--text-primary)]">Service Ticket (ST)</strong> an den Zieldienst. Der Dienst kann das ST mit seinem eigenen geheimen Schlüssel entschlüsseln, die Informationen darin verifizieren und dem Client Zugriff gewähren. Es werden keine Passwörter oder Hashes an den Dienst gesendet.</p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        `
    },
	"vl3": {
		title: "VL3: Fortgeschrittene Authentifizierung & SSO",
		subtitle: "Detaillierte Analyse prüfungsrelevanter Kerberos-Angriffe und die Funktionsweise von SSO mit SAML und OAuth 2.0.",
		navTitle: "VL3: Kerberos & SSO",
		navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>`,
		mainHtml: `
			<div class="space-y-8">
				<!-- Kerberos Attacks Section -->
				<div class="glass-card p-6 sm:p-8">
					<h3 class="text-2xl font-bold mb-4">Kerberos-Angriffe (Prüfungsrelevant)</h3>
					<p class="mb-6 text-[var(--text-secondary)]">Obwohl Kerberos sicher ist, gibt es spezifische Angriffsvektoren, die oft auf Fehlkonfigurationen oder schwache Passwörter abzielen.</p>
					<div class="grid md:grid-cols-2 gap-4">
						<div class="p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]">
							<strong class="block text-[var(--accent-primary)]">AS-REQ Roasting</strong>
							<p class="text-sm text-[var(--text-secondary)] mt-1">Ein Angreifer fordert Authentifizierungsdaten für Benutzer an, bei denen die Prä-Authentifizierung deaktiviert ist. Das KDC sendet Daten zurück, die mit dem Passwort-Hash des Benutzers verschlüsselt sind. Der Angreifer kann diese offline mit Wörterbuchangriffen knacken.</p>
						</div>
						<div class="p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]">
							<strong class="block text-[var(--accent-primary)]">Kerberoasting</strong>
							<p class="text-sm text-[var(--text-secondary)] mt-1">Ein Angreifer mit einem beliebigen gültigen Domänenkonto fordert ein Service Ticket (ST) für einen Dienst an. Das Ticket ist mit dem Passwort-Hash des <strong class="text-white">Dienstkontos</strong> verschlüsselt. Der Angreifer knackt dieses offline und zielt so auf schwache Passwörter von Dienstkonten ab.</p>
						</div>
						<div class="p-4 rounded-lg bg-yellow-900/10 border-l-4 border-yellow-500">
							<strong class="block text-yellow-500">Silver Ticket</strong>
							<p class="text-sm text-[var(--text-secondary)] mt-1">Ein gefälschtes <strong class="text-white">Service Ticket (ST)</strong>. Erfordert den Passwort-Hash des Ziel-Dienstes. Gewährt nur Zugriff auf <strong class="text-white">diesen einen Dienst</strong>, ist aber sehr schwer zu entdecken, da die Kommunikation nur zwischen Client und Dienst stattfindet.</p>
						</div>
						<div class="p-4 rounded-lg bg-red-900/10 border-l-4 border-red-500">
							<strong class="block text-red-500">Golden Ticket</strong>
							<p class="text-sm text-[var(--text-secondary)] mt-1">Ein gefälschtes <strong class="text-white">Ticket-Granting Ticket (TGT)</strong>. Erfordert den Hash des speziellen <strong class="text-white">krbtgt-Kontos</strong> vom Domain Controller. Ein Golden Ticket gewährt vollständigen, dauerhaften Domänen-Admin-Zugriff und kann für jeden Benutzer ausgestellt werden. Der "Super-GAU".</p>
						</div>
						<div class="p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] md:col-span-2">
							<strong class="block text-[var(--accent-primary)]">Pass-the-Ticket</strong>
							<p class="text-sm text-[var(--text-secondary)] mt-1">Ein Angreifer stiehlt ein <strong class="text-white">legitimes, aktives</strong> Kerberos-Ticket (TGT oder ST) aus dem Speicher einer kompromittierten Maschine (z.B. mittels Mimikatz) und verwendet es von seinem eigenen System aus wieder, um sich als der legitime Benutzer auszugeben. Erfordert kein Knacken von Passwörtern.</p>
						</div>
					</div>
				</div>

				<!-- SSO Section -->
				<div class="glass-card p-6 sm:p-8">
					<h3 class="text-2xl font-bold mb-4">Single Sign-On (SSO)</h3>
					<p class="mb-6 text-[var(--text-secondary)]">Ermöglicht Benutzern, sich einmal bei einem zentralen Dienst anzumelden und dann nahtlos auf mehrere verbundene Anwendungen zuzugreifen, ohne sich erneut authentifizieren zu müssen.</p>
					<div class="flex flex-col md:flex-row gap-6">
						<div class="flex-1 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg">
							<h5 class="font-bold text-lg mb-2 text-blue-500">SAML 2.0 (für Authentifizierung)</h5>
							<p class="text-sm text-[var(--text-secondary)]">Wird typischerweise in Unternehmensumgebungen verwendet, um den Login zu ermöglichen.
							<strong class="block mt-2 text-[var(--text-primary)]">Ablauf:</strong>
							1. Nutzer greift auf Service Provider (SP) zu.
							2. SP leitet Nutzer zum Identity Provider (IdP) um.
							3. Nutzer meldet sich beim IdP an.
							4. IdP sendet eine signierte "Assertion" (eine XML-Bestätigung) zurück an den SP.
							5. SP vertraut der Assertion und gewährt dem Nutzer Zugriff.</p>
						</div>
						<div class="flex-1 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg">
							<h5 class="font-bold text-lg mb-2 text-purple-500">OAuth 2.0 (für delegierte Autorisierung)</h5>
							<p class="text-sm text-[var(--text-secondary)]">Wird verwendet, um einer Anwendung zu erlauben, im Namen eines Benutzers auf dessen Daten zuzugreifen (z.B. "App möchte auf deine Google-Kontakte zugreifen"). Es geht nicht primär um den Login des Nutzers, sondern um die Berechtigung für eine App.
							<strong class="block mt-2 text-[var(--text-primary)]">Schlüsselkonzepte:</strong> Verwendet "Scopes", um den Umfang der Berechtigungen zu definieren, und "Access Tokens", um den Zugriff zu gewähren, ohne dass der Nutzer sein Passwort teilen muss.</p>
						</div>
					</div>
				</div>
			</div>
		`
	},
    "vl4": {
        title: "VL4: Netzwerküberwachung mit SNMP",
        subtitle: "Architektur, Operationen und die entscheidenden Sicherheitsunterschiede zwischen SNMPv2c und SNMPv3.",
        navTitle: "VL4: SNMP",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>`,
        mainHtml: `
            <div class="space-y-8">
                <!-- SNMP Architecture and Operations -->
                <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">SNMP-Architektur und Operationen</h3>
                    <p class="mb-6 text-[var(--text-secondary)]">Das Simple Network Management Protocol (SNMP) ist ein Standardprotokoll zur Überwachung und Verwaltung von Netzwerkgeräten wie Routern, Switches und Servern.</p>
                    <div class="grid lg:grid-cols-2 gap-8">
                        <div>
                           <h4 class="font-bold text-lg text-[var(--accent-primary)] mb-3">Kernarchitektur</h4>
                            <ul class="list-none space-y-4">
                                <li class="flex items-start gap-4"><div class="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center"><i class="fa-solid fa-server fa-lg"></i></div><div><h5 class="font-bold">Manager (NMS)</h5><p class="text-sm text-[var(--text-secondary)]">Ein zentraler Server, der die Überwachung durchführt, Daten von Agenten abfragt und Befehle sendet.</p></div></li>
                                <li class="flex items-start gap-4"><div class="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center"><i class="fa-solid fa-microchip fa-lg"></i></div><div><h5 class="font-bold">Agent</h5><p class="text-sm text-[var(--text-secondary)]">Eine Software, die auf dem verwalteten Gerät läuft, lokale Daten sammelt und auf Anfragen des Managers antwortet.</p></div></li>
                                <li class="flex items-start gap-4"><div class="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center"><i class="fa-solid fa-database fa-lg"></i></div><div><h5 class="font-bold">MIB (Management Information Base)</h5><p class="text-sm text-[var(--text-secondary)]">Eine hierarchische Datenbank auf dem Agenten, die alle verwaltbaren Objekte (z.B. CPU-Auslastung) über eine eindeutige <strong>Object Identifier (OID)</strong> definiert.</p></div></li>
                            </ul>
                        </div>
                         <div class="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                            <h4 class="font-bold text-lg text-[var(--accent-primary)] mb-3 text-center">Wichtige Protokolloperationen</h4>
                            <div class="text-center space-y-2">
                                <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-md"><strong>Get-Request:</strong> Manager fordert den Wert einer OID von einem Agenten an.</div>
                                <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-md"><strong>Set-Request:</strong> Manager ändert einen beschreibbaren Wert auf einem Agenten (z.B. den Systemnamen).</div>
                                <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-md"><strong>Response:</strong> Die Antwort des Agenten auf eine Get- oder Set-Anfrage.</div>
                                <div class="p-3 bg-red-100 dark:bg-red-900/40 rounded-md"><strong class="text-red-600">Trap:</strong> Eine unaufgeforderte, asynchrone Nachricht von einem Agenten an den Manager, um über ein wichtiges Ereignis zu informieren (z.B. "Netzwerkschnittstelle ausgefallen").</div>
                            </div>
                        </div>
                    </div>
                </div>
                 <!-- SNMP Security -->
                 <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">SNMP-Sicherheit: v2c vs. v3 (Prüfungsrelevant)</h3>
                    <p class="mb-6 text-[var(--text-secondary)]">Die Wahl der SNMP-Version ist aus Sicherheitssicht entscheidend. SNMPv3 ist die einzig empfohlene Version für den produktiven Einsatz.</p>
                    <div class="flex flex-col md:flex-row gap-6">
                        <div class="flex-1 p-6 bg-red-900/10 border-2 border-red-500/50 rounded-lg">
                            <h5 class="font-bold text-xl text-red-500 mb-2">SNMPv1/v2c (UNSICHER)</h5>
                            <p class="text-sm text-[var(--text-secondary)]">Verwendet zur Authentifizierung lediglich eine <strong class="text-[var(--text-primary)]">"Community-Zeichenfolge"</strong>, die unverschlüsselt im Klartext über das Netzwerk gesendet wird. Diese kann leicht abgefangen und missbraucht werden.</p>
                        </div>
                        <div class="flex-1 p-6 bg-green-900/10 border-2 border-green-500/50 rounded-lg">
                            <h5 class="font-bold text-xl text-green-500 mb-2">SNMPv3 (SICHER)</h5>
                            <p class="text-sm text-[var(--text-secondary)] mb-4">Führt ein robustes, benutzerbasiertes Sicherheitsmodell ein. Es trennt klar zwischen Authentifizierung/Verschlüsselung und Zugriffskontrolle:</p>
                             <ul class="list-disc list-inside space-y-2 text-sm text-[var(--text-secondary)]">
                                <li><strong class="text-[var(--text-primary)]">USM (User-based Security Model):</strong> Verantwortlich für <strong class="text-white">Authentizität</strong> (wer bist du?) und <strong class="text-white">Privatsphäre</strong> (Verschlüsselung der Nachricht).</li>
                                <li><strong class="text-[var(--text-primary)]">VACM (View-based Access Control Model):</strong> Verantwortlich für <strong class="text-white">Autorisierung</strong> (was darfst du sehen/ändern?). Definiert über "Views" (Teilmengen des MIB-Baums), welchen Benutzern oder Gruppen Zugriff auf welche OIDs gewährt wird.</li>
                             </ul>
                             <p class="text-sm text-[var(--text-secondary)] mt-4">SNMPv3 bietet drei Sicherheitsstufen:</p>
                             <div class="mt-2 text-sm space-y-1">
                                <div><span class="font-mono p-1 bg-gray-200 dark:bg-gray-600 rounded">noAuthNoPriv:</span> Keine Sicherheit (wie v2c).</div>
                                <div><span class="font-mono p-1 bg-yellow-200 dark:bg-yellow-800 rounded">authNoPriv:</span> Nur Authentifizierung (Nachricht ist verifiziert, aber nicht verschlüsselt).</div>
                                <div><span class="font-mono p-1 bg-green-200 dark:bg-green-800 rounded">authPriv:</span> Authentifizierung & Verschlüsselung (höchste Sicherheit).</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    "vl5": {
        title: "VL5: Schwachstellen- & Risikomanagement",
        subtitle: "Wie Schwachstellen mittels CVSS bewertet und durch die Business Impact Analysis (BIA) im Geschäftskontext priorisiert werden.",
        navTitle: "VL5: Risiko & CVSS",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
        mainHtml: `
            <div class="space-y-8">
                <!-- Vulnerability Definition -->
                <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">Grundlagen: Schwachstellen & CVE</h3>
                    <p class="mb-2 text-[var(--text-secondary)]">Eine <strong class="text-[var(--text-primary)]">Schwachstelle</strong> ist eine ausnutzbare Schwäche in einem IT-System. Dies kann ein Softwarefehler, eine Hardware-Schwäche, eine Fehlkonfiguration oder menschliches Versagen sein.</p>
                    <p class="text-[var(--text-secondary)]">Um eine standardisierte Referenz zu schaffen, wird jeder öffentlich bekannten Schwachstelle eine eindeutige <strong class="text-[var(--text-primary)]">CVE-ID (Common Vulnerabilities and Exposures)</strong> zugewiesen (z.B. CVE-2021-34527).</p>
                </div>

                <!-- Risk Assessment Section -->
                <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">Risikobewertung & Priorisierung (Prüfungsrelevant)</h3>
                    <p class="mb-6 text-[var(--text-secondary)]">Die entscheidende Frage ist nicht nur, *ob* eine Schwachstelle existiert, sondern *wie kritisch* sie für die eigene Organisation ist. Dies wird durch die Kombination von technischer Bewertung (CVSS) und geschäftlicher Analyse (BIA) ermittelt.</p>
                    <div class="grid lg:grid-cols-5 gap-8 items-start">
                        <!-- CVSS -->
                        <div class="lg:col-span-3 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                            <h4 class="font-bold text-lg text-[var(--accent-primary)] mb-3">CVSS (Common Vulnerability Scoring System)</h4>
                            <p class="mb-4 text-sm text-[var(--text-secondary)]">Ein Framework zur Bewertung des technischen Schweregrads einer Schwachstelle auf einer Skala von 0-10. Es besteht aus drei metrischen Gruppen:</p>
                            <ul class="space-y-3">
                                <li><strong class="text-[var(--text-primary)]">Base Score:</strong> Beschreibt die inhärenten, unveränderlichen technischen Eigenschaften der Schwachstelle (z.B. wie leicht sie auszunutzen ist). Dies ist der Wert, den man typischerweise in Datenbanken sieht.</li>
                                <li><strong class="text-[var(--text-primary)]">Temporal Score:</strong> Passt den Base Score an, basierend auf zeitabhängigen Faktoren wie der Verfügbarkeit eines Exploits oder eines offiziellen Patches.</li>
                                <li class="p-3 bg-red-900/10 border-l-4 border-red-500 rounded-r-md"><strong class="text-red-500">Environmental Score (Der Wichtigste für eine Organisation!):</strong> Dieser Score wird von der Organisation selbst berechnet. Er passt den Temporal Score an den spezifischen Geschäftskontext an. Er beantwortet die Frage: "Wie schlimm ist diese Schwachstelle <strong class="text-white">für uns</strong>?"</li>
                            </ul>
                        </div>
                        <!-- BIA -->
                        <div class="lg:col-span-2 p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl text-center">
                            <h4 class="font-bold text-lg text-teal-500 dark:text-teal-400 mb-3">Business Impact Analysis (BIA)</h4>
                            <p class="text-sm text-[var(--text-secondary)] mb-4">Ein Prozess zur Identifizierung der kritischsten Geschäftsfunktionen und zur Bewertung der potenziellen (finanziellen, reputationellen, operativen) Auswirkungen ihrer Störung.</p>
                            <div class="text-2xl font-light text-gray-400 my-2">▼</div>
                            <p class="p-3 bg-teal-900/10 rounded-lg text-sm"><strong class="text-teal-600 dark:text-teal-400">Die BIA liefert den entscheidenden Input für den CVSS Environmental Score.</strong> Nur durch die BIA weiß man, ob ein betroffenes System geschäftskritisch ist (z.B. ein Patientendaten-System) oder nicht (z.B. eine interne Test-Webseite), und kann die Priorität der Behebung korrekt festlegen.</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    "vl6": {
        title: "VL6: Prozesse des Schwachstellen- & Patch-Managements",
        subtitle: "Der kontinuierliche Lebenszyklus, praktische Scan-Methoden und die Strategien zur Behebung von Schwachstellen.",
        navTitle: "VL6: Vuln & Patch",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>`,
        mainHtml: `
             <div class="space-y-8">
                <!-- Lifecycle Section -->
                <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">Lebenszyklus des Schwachstellenmanagements</h3>
                    <p class="mb-6 text-[var(--text-secondary)]">Dies ist ein kontinuierlicher, zyklischer Prozess, der sicherstellt, dass Schwachstellen systematisch gehandhabt werden.</p>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                        <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"><strong class="block">1. Entdeckung</strong><span class="text-xs text-[var(--text-secondary)]">Scannen nach Schwachstellen</span></div>
                        <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"><strong class="block">2. Analyse & Priorisierung</strong><span class="text-xs text-[var(--text-secondary)]">Bewertung mit CVSS/BIA</span></div>
                        <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"><strong class="block">3. Berichterstattung</strong><span class="text-xs text-[var(--text-secondary)]">Infos an zuständige Teams</span></div>
                        <div class="p-3 bg-lime-100 dark:bg-lime-900/30 rounded-lg"><strong class="block text-lime-700 dark:text-lime-400">4. Behebung</strong><span class="text-xs text-[var(--text-secondary)]">Patch oder Workaround anwenden</span></div>
                        <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"><strong class="block">5. Überprüfung</strong><span class="text-xs text-[var(--text-secondary)]">Erneuter Scan zur Bestätigung</span></div>
                    </div>
                </div>
                
                <!-- Assessment Methods Section -->
                <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">Methoden zur Schwachstellenbewertung</h3>
                    <p class="mb-6 text-[var(--text-secondary)]">Die Art des Scans beeinflusst die Tiefe und Genauigkeit der Ergebnisse erheblich.</p>
                    <div class="grid md:grid-cols-2 gap-6 mt-4">
                        <div class="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg">
                            <h5 class="font-bold text-lg mb-2">Blackbox (unauthentifiziert)</h5>
                            <p class="text-sm text-[var(--text-secondary)]">Simuliert einen externen Angreifer ohne Anmeldeinformationen. Der Scanner testet das System von außen und sieht nur, was öffentlich sichtbar ist. Gut, um die externe Angriffsfläche zu verstehen.</p>
                        </div>
                         <div class="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg">
                            <h5 class="font-bold text-lg mb-2">Whitebox (authentifiziert)</h5>
                            <p class="text-sm text-[var(--text-secondary)]">Der Scanner meldet sich mit privilegierten Anmeldeinformationen am Zielsystem an. Er kann das System "von innen" analysieren (z.B. installierte Software-Versionen lesen, Konfigurationsdateien prüfen). <strong class="text-[var(--text-primary)]">Dies führt zu genaueren Ergebnissen und deutlich weniger Fehlalarmen (False Positives).</strong></p>
                        </div>
                    </div>
                </div>

                 <!-- Remediation & Patching Section -->
                 <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">Strategien zur Behebung & Patching</h3>
                     <p class="mb-6 text-[var(--text-secondary)]">Die Art und Weise, wie Patches verteilt werden, muss zwischen Dringlichkeit und Stabilität abwägen.</p>
                    <div class="grid md:grid-cols-2 gap-6 mt-4">
                        <div class="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg">
                            <h5 class="font-bold text-lg mb-2">Patch-Zyklen</h5>
                            <ul class="list-disc list-inside space-y-2 text-sm text-[var(--text-secondary)]">
                                <li><strong class="text-[var(--text-primary)]">Zyklisches Patchen:</strong> Ein regelmäßiger, geplanter Prozess (z.B. Microsofts "Patch Tuesday"). Dies schafft Vorhersehbarkeit, ermöglicht gründliche Tests und planbare Wartungsfenster.</li>
                                <li><strong class="text-[var(--text-primary)]">Notfall-Patchen (Emergency Patching):</strong> Eine ungeplante, sofortige Bereitstellung als Reaktion auf eine kritische, aktiv ausgenutzte Schwachstelle (Zero-Day). Hier wird das Risiko eines ungeplanten Ausfalls gegen das Sicherheitsrisiko abgewogen.</li>
                            </ul>
                        </div>
                         <div class="p-4 bg-amber-900/10 border-l-4 border-amber-500 rounded-r-lg">
                            <h5 class="font-bold text-amber-600 dark:text-amber-400">Die goldene Regel: Rollback-Pläne</h5>
                             <p class="text-sm text-[var(--text-secondary)]">Ein entscheidender Teil des Patch-Managements. Da jeder Patch potenziell neue Probleme verursachen kann, muss immer ein getesteter Plan zur Rückgängigmachung der Änderung existieren. Dies kann durch die Neuinstallation der alten Softwareversion oder, was üblicher ist, durch die schnelle Wiederherstellung eines Snapshots des Systems (auf VM- oder Dateisystemebene) von vor dem Patch erfolgen.</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    "vl7": {
        title: "VL7: Cyber Threat Intelligence & Angriffsmodelle",
        subtitle: "CTI nutzen, um Bedrohungen zu verstehen und Angriffe mit Frameworks wie der Cyber Kill Chain zu modellieren.",
        navTitle: "VL7: CTI & Kill Chain",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
        mainHtml: `
            <div class="space-y-8">
                <!-- CTI Types Section -->
                <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">Die vier Arten von Cyber Threat Intelligence (CTI)</h3>
                    <p class="mb-6 text-[var(--text-secondary)]">CTI ist evidenzbasiertes Wissen über Bedrohungen, das für verschiedene Zielgruppen aufbereitet wird, um fundierte Sicherheitsentscheidungen zu ermöglichen.</p>
                    <div class="space-y-3">
                        <div class="p-4 rounded-lg bg-[var(--card-bg)] border-l-4 border-red-500"><strong class="block text-red-500">Strategische CTI</strong><p class="text-sm text-[var(--text-secondary)]"><strong>Zielgruppe:</strong> Führungskräfte. <strong>Inhalt:</strong> High-Level-Trends, Geschäftsrisiken, Motivation von Angreifern.</p></div>
                        <div class="p-4 rounded-lg bg-[var(--card-bg)] border-l-4 border-orange-500"><strong class="block text-orange-500">Taktische CTI</strong><p class="text-sm text-[var(--text-secondary)]"><strong>Zielgruppe:</strong> Sicherheitsteams. <strong>Inhalt:</strong> Detaillierte <strong class="text-[var(--text-primary)]">TTPs</strong> (Taktiken, Techniken, Prozeduren) von Angreifern.</p></div>
                        <div class="p-4 rounded-lg bg-[var(--card-bg)] border-l-4 border-blue-500"><strong class="block text-blue-500">Operative CTI</strong><p class="text-sm text-[var(--text-secondary)]"><strong>Zielgruppe:</strong> Incident Response Teams. <strong>Inhalt:</strong> Infos über spezifische, laufende Angriffe.</p></div>
                        <div class="p-4 rounded-lg bg-[var(--card-bg)] border-l-4 border-gray-500"><strong class="block text-gray-500">Technische CTI</strong><p class="text-sm text-[var(--text-secondary)]"><strong>Zielgruppe:</strong> Automatisierte Systeme. <strong>Inhalt:</strong> Spezifische <strong class="text-[var(--text-primary)]">IoCs</strong> (Indicators of Compromise) wie Hashes, IPs.</p></div>
                    </div>
                </div>
                 <!-- Attack Frameworks Section -->
                <div class="glass-card p-6 sm:p-8">
                    <h3 class="text-2xl font-bold mb-4">Angriffsmodelle: Die Cyber Kill Chain</h3>
                    <p class="mb-6 text-[var(--text-secondary)]">Die von Lockheed Martin entwickelte Cyber Kill Chain ist ein High-Level-Framework, das die typischen Phasen eines Cyberangriffs beschreibt. Das Verständnis dieser Kette hilft, Abwehrmaßnahmen an den richtigen Stellen zu platzieren.</p>
                     <ol class="relative border-l border-gray-200 dark:border-gray-700 space-y-4">
                        <li class="ml-10 p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]"><span class="absolute -left-5 flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full ring-4 ring-white dark:ring-gray-800 dark:bg-gray-700">1</span><strong class="font-semibold">Reconnaissance (Aufklärung):</strong> Angreifer sammelt passiv Informationen über das Ziel (z.B. E-Mail-Adressen, Systeminformationen).</li>
                        <li class="ml-10 p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]"><span class="absolute -left-5 flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full ring-4 ring-white dark:ring-gray-800 dark:bg-gray-700">2</span><strong class="font-semibold">Weaponization (Bewaffnung):</strong> Angreifer kombiniert einen Exploit mit einer schädlichen Nutzlast (z.B. ein Trojaner in einem PDF).</li>
                        <li class="ml-10 p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]"><span class="absolute -left-5 flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full ring-4 ring-white dark:ring-gray-800 dark:bg-gray-700">3</span><strong class="font-semibold">Delivery (Zustellung):</strong> Die "Waffe" wird zum Ziel transportiert (z.B. per Phishing-E-Mail, USB-Stick, Web-Download).</li>
                        <li class="ml-10 p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]"><span class="absolute -left-5 flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full ring-4 ring-white dark:ring-gray-800 dark:bg-gray-700">4</span><strong class="font-semibold">Exploitation (Ausnutzung):</strong> Die Schwachstelle auf dem Zielsystem wird ausgenutzt, um den Code der Nutzlast auszuführen.</li>
                        <li class="ml-10 p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]"><span class="absolute -left-5 flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full ring-4 ring-white dark:ring-gray-800 dark:bg-gray-700">5</span><strong class="font-semibold">Installation:</strong> Malware wird auf dem System installiert, um dauerhaften Zugriff (Persistenz) zu gewährleisten.</li>
                        <li class="ml-10 p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]"><span class="absolute -left-5 flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full ring-4 ring-white dark:ring-gray-800 dark:bg-gray-700">6</span><strong class="font-semibold">Command & Control (C2):</strong> Die Malware baut einen Kommunikationskanal zu einem vom Angreifer kontrollierten Server auf, um Befehle zu empfangen.</li>
                        <li class="ml-10 p-4 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)]"><span class="absolute -left-5 flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full ring-4 ring-white dark:ring-gray-800 dark:bg-gray-700">7</span><strong class="font-semibold">Actions on Objectives (Handlungen am Ziel):</strong> Der Angreifer führt sein eigentliches Ziel aus (z.B. Datenexfiltration, Zerstörung, laterale Bewegung im Netzwerk).</li>
                    </ol>
                </div>
            </div>
        `
    }
};
