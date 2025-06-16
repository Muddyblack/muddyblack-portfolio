
const flashcardState = {
    storageKey: 'dbv-flashcards-progress_v3',
    aiCardsKey: 'dbv-flashcards-ai-cards_v1',
    customCardsKey: 'dbv-flashcards-custom-cards_v1',
    initialContent: {
        "nm1": {
            question: "Was sind ITIL und das NIST Cybersecurity Framework (CSF)?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Übergeordnete Frameworks</h3>
                         <p class="mb-4">Dies sind Leitfäden für die Verwaltung und Sicherung von IT-Diensten.</p>
                         <p class="mb-2"><strong>ITIL (Information Technology Infrastructure Library):</strong></p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li><strong>Was:</strong> Ein Framework von Best Practices für das IT Service Management (ITSM).</li>
                             <li><strong>Warum:</strong> Um die Servicebereitstellung zu standardisieren, die Effizienz zu verbessern und die IT an den Geschäftsanforderungen auszurichten. Der Fokus liegt auf dem <strong class="text-[var(--accent-primary)]">Service für den Kunden</strong>.</li>
                         </ul>
                         <p class="mb-2"><strong>NIST Cybersecurity Framework (CSF):</strong></p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>Was:</strong> Ein Richtlinien-Framework zur Verwaltung und Reduzierung von Cybersicherheitsrisiken.</li>
                             <li><strong>Warum:</strong> Um die aktuelle Sicherheitslage zu verstehen, ein Ziel zu definieren und eine gemeinsame Sprache für Risiken zu schaffen.</li>
                             <li><strong>Kernfunktionen:</strong> Steuern, Identifizieren, Schützen, Erkennen, Reagieren, Wiederherstellen.</li>
                         </ul>
                     </div>`
        },
        "nm2": {
            question: "Warum ist eine zentralisierte Kontoverwaltung der lokalen überlegen?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Kontoverwaltung</h3>
                         <p class="mb-2"><strong>Problem mit lokalen Konten:</strong></p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li><strong>Risiken:</strong> Jeder Rechner hat seine eigene Passwort-Datenbank, was zu inkonsistenten Rechten und der Möglichkeit von Lateral Movement führt, wenn ein Rechner kompromittiert wird.</li>
                             <li><strong>Ineffizienz:</strong> Die Verwaltung von Benutzern auf Gerätebasis verursacht einen enormen Verwaltungsaufwand und ist nicht skalierbar.</li>
                         </ul>
                         <p class="mb-2"><strong>Lösung: Zentralisierte Verwaltung:</strong></p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>Wie:</strong> Eine zentrale Autorität (z.B. Domain Controller) verwaltet alle Benutzerkonten und schafft so einen Single Point of Truth.</li>
                             <li><strong>Vorteile:</strong> Reduziert den Verwaltungsaufwand, sorgt für konsistente Richtlinien, vereinfacht die Benutzerverwaltung und verbessert die Sicherheit.</li>
                         </ul>
                     </div>`
        },
        "nm3": {
            question: "Was ist NTLM und seine Hauptschwachstelle, 'Pass-the-Hash'?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">NTLM & Pass-the-Hash</h3>
                         <p class="mb-4">NTLM ist ein älteres Challenge-Response-Authentifizierungsprotokoll für Windows-Netzwerke.</p>
                         <p class="mb-2"><strong>Hauptschwachstelle: Pass-the-Hash</strong></p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li><strong>Problem:</strong> Die Authentifizierungsantwort wird aus dem Passwort-<strong class="text-[var(--accent-primary)]">Hash</strong> des Benutzers abgeleitet, nicht aus dem Passwort selbst.</li>
                             <li><strong>Angriff:</strong> Ein Angreifer mit Admin-Rechten auf einem Rechner kann diese Hashes aus dem Arbeitsspeicher stehlen.</li>
                             <li><strong>Vorgehen:</strong> Der Angreifer muss den Hash nicht knacken. Er kann den Hash einfach an den Server "weitergeben", um sich zu authentifizieren, was eine laterale Bewegung im Netzwerk ermöglicht, ohne das Passwort des Benutzers zu kennen.</li>
                         </ul>
                     </div>`
        },
        "nm4": {
            question: "Wie funktioniert Kerberos auf einer übergeordneten Ebene?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Kerberos-Authentifizierung</h3>
                         <p class="mb-4">Ein sicheres, ticketbasiertes Protokoll, das Single Sign-On (SSO) ermöglicht.</p>
                         <p class="mb-2"><strong>Kernkomponenten:</strong></p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li><strong>KDC (Key Distribution Center):</strong> Die zentrale Autorität, die den AS und den TGS enthält.</li>
                             <li><strong>AS (Authentication Server):</strong> Überprüft den Benutzer bei der Anmeldung und stellt ein TGT aus.</li>
                             <li><strong>TGS (Ticket-Granting Server):</strong> Stellt Dienst-Tickets (ST) für bestimmte Ressourcen aus.</li>
                         </ul>
                         <p class="mb-2"><strong>Vereinfachter Prozess:</strong></p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li>1. Der Client erhält nach der Anmeldung ein <strong class="text-[var(--accent-primary)]">Ticket-Granting Ticket (TGT)</strong> vom AS.</li>
                             <li>2. Der Client verwendet das TGT, um ein <strong class="text-[var(--accent-primary)]">Dienst-Ticket (ST)</strong> vom TGS für einen bestimmten Dienst anzufordern.</li>
                             <li>3. Der Client legt dem Dienst das ST vor, um Zugriff zu erhalten.</li>
                         </ul>
                     </div>`
        },
        "nm5": {
            question: "Was sind die Hauptangriffe gegen Kerberos?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Kerberos-Angriffe</h3>
                         <p class="mb-2"><strong>Roasting-Angriffe (Offline-Cracking):</strong></p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li><strong>Kerberoasting:</strong> Ein Angreifer mit einem gültigen Konto fordert ein Dienst-Ticket an und versucht, den Passwort-Hash des Dienstkontos offline zu knacken.</li>
                         </ul>
                         <p class="mb-2"><strong>Ticket-Missbrauch (Identitätsdiebstahl):</strong></p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>Pass-the-Ticket:</strong> Stehlen gültiger Tickets aus dem Arbeitsspeicher eines kompromittierten Rechners, um sie wiederzuverwenden.</li>
                             <li><strong>Silver Ticket:</strong> Ein gefälschtes <strong class="text-[var(--accent-primary)]">Dienst-Ticket (ST)</strong>, um als beliebiger Benutzer auf einen bestimmten Dienst zuzugreifen.</li>
                             <li><strong>Golden Ticket:</strong> Ein gefälschtes <strong class="text-[var(--accent-primary)]">Ticket-Granting Ticket (TGT)</strong>, das domänenweiten God-Mode-Zugriff gewährt. Erfordert die Kompromittierung des geheimen Schlüssels des KDC.</li>
                         </ul>
                     </div>`
        },
        "nm6": {
            question: "Welches Problem löst SNMP und wie funktioniert es?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Simple Network Management Protocol (SNMP)</h3>
                         <p class="mb-4">SNMP bietet ein standardisiertes Protokoll zur Automatisierung der Überwachung und Verwaltung von Netzwerkgeräten.</p>
                         <p class="mb-2"><strong>Architektur:</strong></p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li><strong>SNMP Manager (NMS):</strong> Der zentrale Server, der Geräte überwacht.</li>
                             <li><strong>SNMP Agent:</strong> Software auf einem verwalteten Gerät, die Daten sammelt.</li>
                             <li><strong>MIB (Management Information Base):</strong> Eine Datenbank auf dem Agenten, die verwaltbare Objekte definiert.</li>
                             <li><strong>OID (Object Identifier):</strong> Eine eindeutige Adresse für jedes Objekt in der MIB.</li>
                         </ul>
                         <p class="mb-2"><strong>Schlüsselprozesse:</strong></p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                            <li><strong>Polling:</strong> Der NMS sendet eine <strong class="text-[var(--accent-primary)]">Get-Request</strong> mit einer OID an einen Agenten, der eine <strong class="text-[var(--accent-primary)]">Get-Response</strong> mit den Daten zurücksendet.</li>
                            <li><strong>Traps:</strong> Der Agent sendet proaktiv eine <strong class="text-[var(--accent-primary)]">Trap</strong>-Nachricht an den NMS, um ein wichtiges Ereignis in Echtzeit zu melden.</li>
                         </ul>
                     </div>`
        },
        "nm7": {
            question: "Wie verbessert SNMPv3 die Sicherheit gegenüber früheren Versionen?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">SNMPv3-Sicherheit</h3>
                         <p class="mb-4">Es behebt die großen Sicherheitslücken von SNMPv1/v2c, die Klartext-Passwörter (Community-Strings) verwendeten.</p>
                         <p class="mb-2"><strong>Wichtige Sicherheitskomponenten:</strong></p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li><strong>USM (User-Based Security Model):</strong> Verwaltet Benutzer und Sicherheitsstufen.</li>
                             <li><strong>VACM (View-Based Access Control Model):</strong> Bietet eine granulare, rollenbasierte Zugriffskontrolle, die definiert, welche Benutzer welche Teile der MIB sehen oder ändern können.</li>
                         </ul>
                         <p class="mb-2"><strong>Sicherheitsstufen:</strong></p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>noAuthNoPriv:</strong> Keine Authentifizierung, keine Verschlüsselung. (Wie v1/v2c)</li>
                             <li><strong>authNoPriv:</strong> Nachrichten sind <strong class="text-[var(--accent-primary)]">authentifiziert</strong> (verifizierter Absender, keine Manipulation), aber nicht verschlüsselt.</li>
                             <li><strong>authPriv:</strong> Nachrichten sind <strong class="text-[var(--accent-primary)]">authentifiziert UND verschlüsselt</strong>. Dies ist die sicherste Stufe.</li>
                         </ul>
                     </div>`
        },
        "nm8": {
            question: "Wie arbeiten CVE, CVSS und BIA bei der Priorisierung von Schwachstellen zusammen?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Priorisierung von Schwachstellen</h3>
                         <p class="mb-4">Man kann nicht alles auf einmal beheben. Diese Kombination hilft bei der Entscheidung, was zuerst behoben werden soll.</p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li><strong>CVE (Common Vulnerabilities and Exposures):</strong> Ein <strong class="text-[var(--accent-primary)]">Wörterbuch</strong>, das jeder bekannten Schwachstelle eine eindeutige ID gibt. Stellt eine gemeinsame Sprache bereit.</li>
                             <li><strong>CVSS (Common Vulnerability Scoring System):</strong> Ein <strong class="text-[var(--accent-primary)]">Rechner</strong>, der jeder CVE eine numerische Bewertung (0-10) für ihren technischen Schweregrad basierend auf Basis-, Zeit- und Umgebungsmetriken gibt.</li>
                             <li><strong>BIA (Business Impact Analysis):</strong> Liefert den geschäftlichen <strong class="text-[var(--accent-primary)]">Kontext</strong>. Sie identifiziert, welche Systeme für das Unternehmen am kritischsten sind.</li>
                         </ul>
                         <p class="mt-4"><strong>Prozess:</strong> Die BIA hilft Ihnen, den CVSS Environmental Score anzupassen. Eine Schwachstelle mit hohem CVSS-Wert auf einem unkritischen System (niedrige BIA) ist weniger dringend als dieselbe Schwachstelle auf einem kritischen System (hohe BIA).</p>
                     </div>`
        },
        "nm9": {
            question: "Welche verschiedenen Arten von Cyber Threat Intelligence (CTI) gibt es?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Arten von Cyber Threat Intelligence (CTI)</h3>
                         <p class="mb-4">CTI liefert Kontext zu Bedrohungen ("kenne deinen Feind"). Sie ist auf verschiedene Zielgruppen zugeschnitten.</p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li><strong>Strategische CTI:</strong> Für <strong class="text-[var(--accent-primary)]">Führungskräfte</strong>. Übergeordneter Überblick über allgemeine Trends, Motivationen und geopolitische Auswirkungen zur Steuerung von Strategie und Investitionen.</li>
                             <li><strong>Taktische CTI:</strong> Für <strong class="text-[var(--accent-primary)]">Sicherheitsmanager</strong>. Detaillierte Informationen zu den TTPs (Taktiken, Techniken, Prozeduren) von Bedrohungsakteuren zur Verbesserung der Verteidigungsarchitektur.</li>
                             <li><strong>Operative CTI:</strong> Für <strong class="text-[var(--accent-primary)]">SOC/Incident Responder</strong>. Informationen über spezifische, laufende oder bevorstehende Angriffe für eine sofortige Reaktion.</li>
                             <li><strong>Technische CTI:</strong> Für <strong class="text-[var(--accent-primary)]">Sicherheitsanalysten & Tools</strong>. Spezifische Kompromittierungsindikatoren (IoCs) wie IPs, Datei-Hashes und Domänen für die automatisierte Blockierung.</li>
                         </ul>
                     </div>`
        },
        "nm10": {
            question: "Was ist der Unterschied zwischen der Cyber Kill Chain und MITRE ATT&CK?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Angriffsmodelle</h3>
                         <p class="mb-4">Diese Frameworks helfen zu verstehen, wie Angriffe ablaufen.</p>
                         <p class="mb-2"><strong>Cyber Kill Chain:</strong></p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li>Ein <strong class="text-[var(--accent-primary)]">übergeordnetes, sequenzielles Modell</strong>, das die 7 typischen Phasen eines Angriffs beschreibt (z. B. Aufklärung, Auslieferung, Ausnutzung).</li>
                             <li>Hilft Verteidigern zu überlegen, wo sie "die Kette durchbrechen" können, um einen Angriff zu stoppen.</li>
                         </ul>
                         <p class="mb-2"><strong>MITRE ATT&CK:</strong></p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li>Eine <strong class="text-[var(--accent-primary)]">riesige, detaillierte Wissensdatenbank</strong> über Taktiken und Techniken von Angreifern, die auf realen Beobachtungen basiert.</li>
                             <li>Viel granularer als die Kill Chain, katalogisiert es spezifische "How-to"-Techniken, die von Angreifern verwendet werden (z. B. wie sie Persistenz erreichen).</li>
                         </ul>
                     </div>`
        },
        "nm11": {
            question: "Was ist Passwort-Salting und welches Problem löst es?",
            answer: `<div class="text-left w-full">
                     <h3 class="font-bold text-xl mb-3">Passwort-Salting</h3>
                     <p class="mb-4">Salting ist eine Technik, um die Sicherheit von gespeicherten Passwörtern zu erhöhen.</p>
                     <p class="mb-2"><strong>Problem:</strong></p>
                     <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                         <li>Wenn zwei Benutzer das gleiche Passwort verwenden, wird derselbe Hash erzeugt. Ein Angreifer, der den Hash für ein Konto kennt, kennt ihn für alle.</li>
                         <li>Angreifer können vorberechnete Tabellen (Rainbow Tables) verwenden, um häufige Passwörter und ihre Hashes schnell nachzuschlagen.</li>
                     </ul>
                     <p class="mb-2"><strong>Lösung: Salting</strong></p>
                     <ul class="list-disc list-inside pl-4 space-y-2">
                         <li><strong>Wie:</strong> Vor dem Hashing wird eine zufällige Zeichenfolge (das "Salt") an das Passwort angehängt. Dieses Salt ist für jeden Benutzer einzigartig.</li>
                         <li><strong>Formel:</strong> <code>Gespeicherter_Hash = Hash(Passwort + Salt)</code></li>
                         <li><strong>Ergebnis:</strong> Selbst bei identischen Passwörtern entstehen durch die einzigartigen Salts unterschiedliche Hashes. Rainbow-Table-Angriffe werden dadurch unbrauchbar, da für jedes Salt eine neue Tabelle generiert werden müsste.</li>
                     </ul>
                 </div>`
        },
        "nm12": {
            question: "Was ist der Unterschied zwischen SAML und OAuth 2.0?",
            answer: `<div class="text-left w-full">
                     <h3 class="font-bold text-xl mb-3">SAML vs. OAuth 2.0</h3>
                     <p class="mb-4">Beides sind Protokolle für den sicheren Zugriff auf Anwendungen, aber sie lösen unterschiedliche Kernprobleme.</p>
                     <p class="mb-2"><strong>SAML (Security Assertion Markup Language):</strong></p>
                     <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                         <li><strong>Zweck:</strong> <strong class="text-[var(--accent-primary)]">Authentifizierung</strong>. Es ermöglicht Single Sign-On (SSO), indem es einem Service Provider (SP) mitteilt, wer der Benutzer ist und dass er sich erfolgreich beim Identity Provider (IdP) angemeldet hat.</li>
                         <li><strong>Anwendungsfall:</strong> Ein Mitarbeiter meldet sich einmal an und erhält Zugriff auf verschiedene interne Firmenanwendungen (z.B. Salesforce, Office 365), ohne sich erneut einloggen zu müssen.</li>
                     </ul>
                     <p class="mb-2"><strong>OAuth 2.0:</strong></p>
                     <ul class="list-disc list-inside pl-4 space-y-2">
                         <li><strong>Zweck:</strong> <strong class="text-[var(--accent-primary)]">Autorisierung</strong>. Es ermöglicht einer Anwendung, im Namen eines Benutzers auf dessen Daten in einer anderen Anwendung zuzugreifen, ohne das Passwort des Benutzers preiszugeben.</li>
                         <li><strong>Anwendungsfall:</strong> Sie erlauben einer Drittanbieter-App (z.B. einer Kalender-App), auf Ihre Google-Kontakte zuzugreifen, um Geburtstage zu synchronisieren. Die App erhält ein "Token" mit begrenzten Rechten, aber nicht Ihr Google-Passwort.</li>
                     </ul>
                 </div>`
        },
        "nm13": {
            question: "Erklären Sie den Vulnerability Management Lifecycle in seinen Hauptphasen.",
            answer: `<div class="text-left w-full">
                     <h3 class="font-bold text-xl mb-3">Vulnerability Management Lifecycle</h3>
                     <p class="mb-4">Dies ist ein kontinuierlicher, zyklischer Prozess zur Identifizierung und Behebung von Schwachstellen.</p>
                     <ol class="list-decimal list-inside space-y-3 pl-4">
                         <li><strong>Discovery (Entdeckung):</strong> Identifizierung von allen Assets im Netzwerk und Durchführung von Scans, um Schwachstellen zu finden (z.B. durch Nessus, OpenVAS).</li>
                         <li><strong>Analysis & Reporting (Analyse & Berichterstattung):</strong> Die gefundenen Schwachstellen werden analysiert, validiert und priorisiert (z.B. mittels CVSS und BIA). Die Ergebnisse werden den zuständigen Teams gemeldet.</li>
                         <li><strong>Remediation (Behebung):</strong> Die priorisierten Schwachstellen werden behoben. Dies kann durch Patchen, Konfigurationsänderungen oder andere Maßnahmen (Workarounds) geschehen.</li>
                         <li><strong>Verification (Überprüfung):</strong> Nach der Behebung wird erneut gescannt, um zu überprüfen, ob die Schwachstelle erfolgreich geschlossen wurde und keine neuen Probleme eingeführt wurden.</li>
                     </ol>
                     <p class="mt-4">Dieser Zyklus wiederholt sich kontinuierlich, um eine ständige Überwachung und Verbesserung der Sicherheit zu gewährleisten.</p>
                 </div>`
        },
        "nm14": {
            question: "Erklären Sie den Unterschied zwischen Blackbox- und Whitebox-Scanning.",
            answer: `<div class="text-left w-full">
                 <h3 class="font-bold text-xl mb-3">Scanning-Typen: Blackbox vs. Whitebox</h3>
                 <p class="mb-4">Diese Begriffe beschreiben das Ausmaß an Informationen, das ein Tester über das Zielsystem hat.</p>
                 <p class="mb-2"><strong>Blackbox-Scanning (Unauthenticated):</strong></p>
                 <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                     <li><strong>Was:</strong> Der Tester hat <strong class="text-[var(--accent-primary)]">kein Vorwissen</strong> über die interne Funktionsweise oder Struktur des Systems. Er agiert wie ein externer Angreifer.</li>
                     <li><strong>Ziel:</strong> Schwachstellen finden, die von außen ohne spezielle Zugriffsrechte ausnutzbar sind (z.B. offene Ports, fehlerhafte Webseiten-Logik).</li>
                     <li><strong>Vorteil:</strong> Simuliert ein realistisches externes Angriffsszenario.</li>
                     <li><strong>Nachteil:</strong> Geringere Testtiefe; interne Konfigurationsfehler werden oft nicht entdeckt.</li>
                 </ul>
                 <p class="mb-2"><strong>Whitebox-Scanning (Authenticated):</strong></p>
                 <ul class="list-disc list-inside pl-4 space-y-2">
                     <li><strong>Was:</strong> Der Tester hat <strong class="text-[var(--accent-primary)]">vollständiges Wissen</strong> und oft auch privilegierten Zugriff (z.B. Admin-Konto, Quellcode, Netzwerkpläne).</li>
                     <li><strong>Ziel:</strong> Eine tiefgehende Analyse durchführen, um auch interne Schwachstellen zu finden, die nach einem ersten Einbruch relevant werden (z.B. fehlerhafte Berechtigungen, unsichere Konfigurationen).</li>
                     <li><strong>Vorteil:</strong> Sehr hohe Testtiefe und Gründlichkeit, findet eine breitere Palette von Fehlern.</li>
                     <li><strong>Nachteil:</strong> Simuliert keinen typischen Erstangriff von außen.</li>
                 </ul>
             </div>`
        },
        "nm15": {
            question: "Vergleichen Sie zyklisches und notfallbasiertes Patch-Management.",
            answer: `<div class="text-left w-full">
                     <h3 class="font-bold text-xl mb-3">Patch-Management-Strategien</h3>
                     <p class="mb-4">Dies sind zwei unterschiedliche Ansätze, um Patches in einem Netzwerk auszurollen.</p>
                     <p class="mb-2"><strong>Zyklisches Patch-Management (Cyclic Patches):</strong></p>
                     <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                         <li><strong>Was:</strong> Patches werden in regelmäßigen, vorhersehbaren Intervallen ausgerollt (z.B. jeden zweiten Dienstag im Monat - "Patch Tuesday").</li>
                         <li><strong>Vorteile:</strong> Planbarkeit, ausreichend Zeit für Tests, gebündelte Installationen reduzieren die Anzahl der Wartungsfenster.</li>
                         <li><strong>Nachteile:</strong> Kritische Lücken bleiben möglicherweise bis zum nächsten Zyklus offen.</li>
                         <li><strong>Anwendung:</strong> Standard für die meisten nicht-kritischen Sicherheits- und Funktionsupdates.</li>
                     </ul>
                     <p class="mb-2"><strong>Notfall-Patch-Management (Emergency Patches):</strong></p>
                     <ul class="list-disc list-inside pl-4 space-y-2">
                         <li><strong>Was:</strong> Patches werden sofort und außerhalb des normalen Zyklus ausgerollt.</li>
                         <li><strong>Auslöser:</strong> Eine kritische Zero-Day-Schwachstelle, die aktiv ausgenutzt wird und ein hohes Geschäftsrisiko darstellt.</li>
                         <li><strong>Vorteile:</strong> Schnelle Schließung von gefährlichen Sicherheitslücken.</li>
                         <li><strong>Nachteile:</strong> Wenig bis keine Zeit für Tests, höheres Risiko von Betriebsstörungen, unvorhergesehene Unterbrechungen.</li>
                         <li><strong>Anwendung:</strong> Nur für die dringendsten und kritischsten Schwachstellen.</li>
                     </ul>
                 </div>`
        },
        "nm16": {
            question: "Welche Rolle spielt ein SNMP-Proxy-Server in einer Netzwerkarchitektur?",
            answer: `<div class="text-left w-full">
                     <h3 class="font-bold text-xl mb-3">SNMP-Proxy-Server</h3>
                     <p class="mb-4">Ein SNMP-Proxy agiert als Vermittler zwischen einem SNMP-Manager und SNMP-Agenten und erfüllt dabei mehrere wichtige Funktionen.</p>
                     <p class="mb-2"><strong>Hauptfunktionen:</strong></p>
                     <ul class="list-disc list-inside pl-4 space-y-3">
                         <li><strong>Übersetzung:</strong> Ein Proxy kann zwischen verschiedenen SNMP-Versionen vermitteln. Beispielsweise kann er Anfragen von einem modernen v3-Manager an ein älteres v1-Gerät weiterleiten und so die Kommunikation mit Legacy-Systemen ermöglichen, ohne die Sicherheit des Managers zu kompromittieren.</li>
                         <li><strong>Aggregation & Lastenverteilung:</strong> Er kann Daten von vielen Agenten sammeln und gebündelt an den Manager senden. Dies reduziert den Netzwerkverkehr über langsame oder teure WAN-Verbindungen.</li>
                         <li><strong>Sicherheits-Gateway:</strong> Der Proxy kann als sicherer Zugangspunkt zu einem ansonsten isolierten oder geschützten Netzwerksegment (z.B. einer DMZ) dienen. Der Manager kommuniziert nur mit dem Proxy, der die Anfragen dann sicher intern weiterleitet.</li>
                         <li><strong>Integration von Nicht-SNMP-Geräten:</strong> Er kann Daten von Geräten, die kein SNMP sprechen (z.B. über eine REST-API), abfragen und diese in das SNMP-Format für den Manager übersetzen.</li>
                     </ul>
                 </div>`
        },
        "nm17": {
            question: "Was sind die Risiken von lokalen Admin-Rechten und wie löst Endpoint Privilege Management (EPM) dieses Problem?",
            answer: `<div class="text-left w-full">
                 <h3 class="font-bold text-xl mb-3">Problem & Lösung: Lokale Admin-Rechte</h3>
                 <p class="mb-2"><strong>Teil 1: Risiken & Notwendigkeit</strong></p>
                 <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                     <li><strong>Risiko:</strong> Ein Benutzer mit ständigen Admin-Rechten stellt eine enorme Angriffsfläche dar. Wird sein Konto kompromittiert, kann ein Angreifer Malware (z.B. Rootkits) installieren, sich dauerhaft festsetzen und sich seitlich im Netzwerk bewegen (<strong class="text-[var(--accent-primary)]">Lateral Movement</strong>).</li>
                     <li><strong>Notwendigkeit:</strong> Manchmal benötigen Benutzer oder der IT-Support erhöhte Rechte, um legitime Aufgaben auszuführen, z.B. um Treiber zu installieren, spezielle Software zu nutzen oder Systeme zu konfigurieren. Ein komplettes Entziehen ist daher oft unpraktikabel.</li>
                 </ul>
                 <p class="mb-2"><strong>Teil 2: Lösung durch EPM</strong></p>
                 <ul class="list-disc list-inside pl-4 space-y-2">
                     <li><strong>Konzept:</strong> EPM implementiert das <strong class="text-[var(--accent-primary)]">Least-Privilege-Prinzip</strong>. Standardmäßig hat kein Benutzer Admin-Rechte. Diese werden nur bei Bedarf, zeitlich begrenzt und für eine bestimmte Anwendung gewährt.</li>
                     <li><strong>Prozess einer Rechteanfrage:</strong>
                         <ol class="list-decimal list-inside pl-5 mt-2 space-y-1">
                             <li>Ein Benutzer versucht, eine Aktion auszuführen, die Admin-Rechte erfordert.</li>
                             <li>Ein EPM-Agent auf dem Endgerät fängt diese Anfrage ab (interception).</li>
                             <li>Der Agent fordert den Benutzer auf, eine Begründung für die Notwendigkeit der erhöhten Rechte einzugeben.</li>
                             <li>Die Anfrage wird an einen zentralen Management-Server gesendet.</li>
                             <li>Ein IT-Team prüft und genehmigt die Anfrage. Alternativ kann die Genehmigung automatisch erfolgen, wenn die Anwendung auf einer Whitelist steht.</li>
                             <li>Nach der Genehmigung wird nur der spezifische Prozess mit erhöhten Rechten ausgeführt, nicht die gesamte Benutzersitzung.</li>
                         </ol>
                     </li>
                 </ul>
             </div>`
        },
        "nm18": {
            question: "Beschreiben Sie den Prozess und die Herausforderungen des Patch Managements.",
            answer: `<div class="text-left w-full">
                 <h3 class="font-bold text-xl mb-3">Prozess des Patch Managements</h3>
                 <p class="mb-4">Patch Management ist der Prozess zur Identifizierung, Beschaffung, Prüfung und Bereitstellung von Software-Patches, um Systeme vor Schwachstellen zu schützen und ihre Stabilität zu gewährleisten.</p>
                 <p class="mb-2"><strong>Automatisches vs. Manuelles Patching:</strong></p>
                 <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                     <li><strong>Automatisch:</strong> Eine zentrale Plattform (z.B. WSUS) holt Patches von Herstellern, plant die Verteilung in Test- und Produktionsgruppen und rollt sie über vordefinierte Kanäle aus. Dies ist die <strong class="text-[var(--accent-primary)]">Standardmethode</strong>.</li>
                     <li><strong>Manuell:</strong> Notwendig für Systeme ohne ständige Netzwerkanbindung, in kritischen Infrastrukturen oder Industrieanlagen (OT). Es ist zeitaufwendig und birgt das Risiko inkonsistenter Patch-Stände.</li>
                 </ul>
                 <p class="mb-2"><strong>Herausforderungen & wichtige Überlegungen:</strong></p>
                 <ul class="list-disc list-inside pl-4 space-y-2">
                     <li><strong>Balance zwischen Sicherheit & Betrieb:</strong> Ein Patch kann kritische Anwendungen beeinträchtigen. Tests sind unerlässlich.</li>
                     <li><strong>Rollback-Pläne:</strong> Was passiert, wenn ein Patch Probleme verursacht? Man braucht einen Plan zur Rückkehr zum vorherigen Zustand (z.B. Deinstallation des Pakets, Rückkehr zu einem Snapshot), was bei verteilten Systemen sehr komplex sein kann.</li>
                     <li><strong>Scheduling:</strong> Patches werden oft in Zyklen (z.B. "Patch Tuesday") oder als Notfall-Patches bei kritischen Lücken (Zero-Days) ausgerollt, was eine sorgfältige Planung erfordert.</li>
                 </ul>
             </div>`
        },
        "nm19": {
            question: "Was sind die Hauptunterschiede zwischen SAML und OAuth im Kontext von Single Sign-On (SSO)?",
            answer: `<div class="text-left w-full">
                 <h3 class="font-bold text-xl mb-3">SAML vs. OAuth: Kernunterschiede</h3>
                 <p class="mb-4">Obwohl beide Protokolle für SSO verwendet werden, lösen sie unterschiedliche Kernprobleme.</p>
                 <p class="mb-2"><strong>SAML (Security Assertion Markup Language):</strong></p>
                 <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                     <li><strong>Fokus:</strong> <strong class="text-[var(--accent-primary)]">Authentifizierung</strong> – "Wer bist du und bist du angemeldet?".</li>
                     <li><strong>Anwendungsfall:</strong> Klassisches Unternehmens-SSO für Webanwendungen. Der Benutzer meldet sich einmal beim <strong class="text-secondary">Identity Provider (IdP)</strong> an, der dann gegenüber anderen <strong class="text-secondary">Service Providern (SP)</strong> bestätigt ("asserts"), dass der Benutzer authentifiziert ist.</li>
                     <li><strong>Ergebnis:</strong> Der Benutzer erhält Zugriff auf die Anwendung.</li>
                 </ul>
                 <p class="mb-2"><strong>OAuth (Open Authorization):</strong></p>
                 <ul class="list-disc list-inside pl-4 space-y-2">
                     <li><strong>Fokus:</strong> <strong class="text-[var(--accent-primary)]">Delegierte Autorisierung</strong> – "Was darf diese Anwendung in deinem Namen tun?".</li>
                     <li><strong>Anwendungsfall:</strong> Einer Drittanbieter-Anwendung erlauben, auf Daten eines anderen Dienstes zuzugreifen, ohne das Passwort preiszugeben. Beispiel: Eine Druck-App greift auf Ihre Google Fotos zu.</li>
                     <li><strong>Ergebnis:</strong> Die Anwendung erhält ein <strong class="text-secondary">Access Token</strong> mit einem begrenzten Geltungsbereich (Scope, z.B. "nur-lesen"), um auf die Ressource zuzugreifen.</li>
                 </ul>
                 <p class="mt-4"><strong>Merksatz:</strong> SAML ist der Türsteher, der prüft, wer du bist. OAuth ist der Schlüssel, der nur eine bestimmte Tür öffnet.</p>
             </div>`
        },
        "nm20": {
            question: "Was sind die 7 Phasen des Vulnerability Management Lifecycles?",
            answer: `<div class="text-left w-full">
                 <h3 class="font-bold text-xl mb-3">Der Vulnerability Management Lifecycle</h3>
                 <p class="mb-4">Ein kontinuierlicher, zyklischer Prozess zur systematischen Handhabung von IT-Schwachstellen.</p>
                 <ol class="list-decimal list-inside space-y-2 pl-4">
                     <li><strong>Discovery:</strong> Identifizieren aller IT-Assets und proaktives Suchen nach Schwachstellen durch Scans (z.B. mit Nessus) oder Penetrationstests.</li>
                     <li><strong>Analysis:</strong> Bestätigen der gefundenen Schwachstellen, Analyse der Ursache und Bewertung des potenziellen Schadens/Risikos (z.B. mit CVSS & BIA).</li>
                     <li><strong>Reporting:</strong> Erstellen von Berichten und Kommunikation der Ergebnisse an die verantwortlichen Teams (z.B. Systemadministratoren, Entwickler) oder externe Hersteller.</li>
                     <li><strong>Remediation:</strong> Beheben der Schwachstelle durch einen <strong class="text-[var(--accent-primary)]">Patch</strong> (dauerhafte Lösung) oder eine <strong class="text-[var(--accent-primary)]">Mitigation</strong> (temporäre Risikominderung, z.B. eine Firewall-Regel).</li>
                     <li><strong>Verification:</strong> Überprüfen, ob die Behebung erfolgreich war und keine neuen Probleme verursacht hat. Ein erneuter Scan bestätigt, dass die Lücke geschlossen ist.</li>
                     <li><strong>Monitoring:</strong> Kontinuierliche Überwachung der Systeme auf neue Bedrohungen und Angriffsversuche, insbesondere auf noch nicht gepatchte Systeme.</li>
                     <li><strong>Review and Documentation:</strong> Dokumentation des gesamten Prozesses für Audits und Compliance. Aus den "Lessons Learned" werden die Prozesse verbessert.</li>
                 </ol>
             </div>`
        },
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
