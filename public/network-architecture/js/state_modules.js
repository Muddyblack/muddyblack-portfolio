const modulePageContent = {
    "flashcards": {
        title: "Flashcards: Network Architectures",
        subtitle: "Click on a card to see the answer. Rate it afterwards.",
        navTitle: "Flashcards",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>`,
        mainHtml: `
              <div class="w-full max-w-4xl mx-auto">
                  <div class="w-full max-w-2xl mx-auto mb-6">
                      <div class="flex gap-2">
                          <div class="relative flex-grow">
                              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                              </div>
                              <input type="search" id="fc-search-input" placeholder="Search for question or topic..." class="block w-full pl-10 pr-10 py-2.5 border rounded-lg shadow-sm focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--card-bg)] border-[var(--card-border)] placeholder-[var(--text-secondary)]">
                              <button id="fc-clear-search-btn" class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hidden">
                                  <svg class="w-5 h-5 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                              </button>
                          </div>
                          <button id="fc-open-create-modal-btn" title="Create custom card" class="flex-shrink-0 p-2.5 bg-teal-600 text-white rounded-lg shadow-sm hover:bg-teal-700 transition-all">
                              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          </button>
                          <button id="fc-open-generate-modal-btn" title="Generate new cards" class="flex-shrink-0 p-2.5 bg-[var(--accent-primary)] text-white rounded-lg shadow-sm hover:bg-[var(--accent-secondary)] transition-all">
                              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M12 21v-1m0-10a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3z"></path></svg>
                          </button>
                      </div>
                  </div>
                  <div id="fc-stats-container" class="mb-6 text-center"></div>
                  <main class="flex flex-col items-center">
                      <div id="fc-container" class="flashcard-container w-full h-[500px] sm:h-[450px] relative"></div>
                      <div id="fc-navigation-container" class="w-full max-w-lg flex justify-between items-center my-4">
                          <button id="fc-prev-btn" class="px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--accent-text)]">< Previous</button>
                          <span id="fc-card-counter" class="text-sm font-medium text-[var(--text-secondary)]"></span>
                          <button id="fc-next-btn" class="px-4 py-2 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] hover:bg-[var(--accent-text)]">Next ></button>
                      </div>
                      <div id="fc-answer-buttons" class="flex justify-center items-center gap-4 w-full mt-2">
                          <button id="fc-wrong-btn" class="group px-6 py-4 bg-gradient-to-br from-red-500 to-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-400 dark:focus:ring-red-800 transition-all text-lg w-1/2 max-w-xs transform hover:-translate-y-1"><span class="flex items-center justify-center"><svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>Wrong</span></button>
                          <button id="fc-correct-btn" class="group px-6 py-4 bg-gradient-to-br from-green-500 to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-green-800 transition-all text-lg w-1/2 max-w-xs transform hover:-translate-y-1"><span class="flex items-center justify-center"><svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Correct</span></button>
                      </div>
                  </main>
              </div>
        `,
        initLogic: () => {
            initFlashcardLogic();
        }
    },
    "na_osi": {
        title: "OSI Model",
        subtitle: "A conceptual framework that divides the functions of a telecommunications or computer system into seven different layers.",
        navTitle: "OSI Model",
        navIcon: "<svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 1.75l-8.25 4.5V17.5L12 22.25l8.25-4.75V6.25L12 1.75zM3.75 6.25l8.25 4.5 8.25-4.5M3.75 17.5v-9l8.25 4.5v9l-8.25-4.5z\"/></svg>",
        mainHtml: `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div class="glass-card p-6">
          <h3 class="text-xl font-bold mb-4">The 7 Layers in Detail</h3>
          <div class="space-y-4">

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/70 text-blue-900 dark:text-blue-100 font-bold text-sm">7</div>
              <div class="flex-grow">
                <h4 class="font-bold text-md text-cyan-400">Application</h4>
                <p class="text-xs text-[var(--text-secondary)] mt-1 mb-2">Provides network services directly to user applications. It\'s the interface between the user and the network, handling protocols for specific tasks like Browse, email, and file transfers.</p>                <div class="flex flex-wrap gap-1 text-xs">
                  <span class="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 rounded-full">HTTP/S</span>
                  <span class="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 rounded-full">FTP</span>
                  <span class="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 rounded-full">SMTP</span>
                  <span class="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 rounded-full">DNS</span>
                </div>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/70 text-teal-900 dark:text-teal-100 font-bold text-sm">6</div>
              <div class="flex-grow">
                <h4 class="font-bold text-md text-teal-400">Presentation</h4>
                <p class="text-xs text-[var(--text-secondary)] mt-1 mb-2">Translates, encrypts, and compresses data. Ensures data is in a usable format for the Application layer by managing character encoding, data representation, and security.</p>                <div class="flex flex-wrap gap-1 text-xs">
                  <span class="px-2 py-0.5 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full">SSL/TLS</span>
                  <span class="px-2 py-0.5 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full">ASCII</span>
                  <span class="px-2 py-0.5 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full">MPEG</span>
                  <span class="px-2 py-0.5 bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 rounded-full">JPEG</span>
                </div>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 dark:bg-emerald-900/70 text-green-900 dark:text-emerald-100 font-bold text-sm">5</div>
              <div class="flex-grow">
                <h4 class="font-bold text-md text-emerald-400">Session</h4>
                <p class="text-xs text-[var(--text-secondary)] mt-1 mb-2">Establishes, manages, and terminates connections (sessions) between applications. Handles dialogue control, synchronization, and checkpointing.</p>                <div class="flex flex-wrap gap-1 text-xs">
                  <span class="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full">APIs</span>
                  <span class="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full">NetBIOS</span>
                  <span class="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-full">PPTP</span>
                </div>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/70 text-yellow-900 dark:text-yellow-100 font-bold text-sm">4</div>
              <div class="flex-grow">
                <h4 class="font-bold text-md text-yellow-400">Transport</h4>
                <p class="text-xs text-[var(--text-secondary)] mt-1 mb-2">Provides reliable end-to-end data transmission between hosts. Manages segmentation, flow control (TCP), and error correction. Can be connection-oriented (TCP) or connectionless (UDP).</p>                <div class="flex flex-wrap gap-1 text-xs">
                  <span class="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-full">TCP</span>
                  <span class="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-full">UDP</span>
                  <span class="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-full">Ports</span>
                </div>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/70 text-orange-900 dark:text-orange-100 font-bold text-sm">3</div>
              <div class="flex-grow">
                <h4 class="font-bold text-md text-orange-400">Network</h4>
                <p class="text-xs text-[var(--text-secondary)] mt-1 mb-2">Handles logical addressing (IP addresses) and routing to determine the best path for data packets across different networks. Manages packet forwarding and traffic control.</p>                <div class="flex flex-wrap gap-1 text-xs">
                  <span class="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full">IP (IPv4/v6)</span>
                  <span class="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full">ICMP</span>
                  <span class="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-full">Routers</span>
                </div>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900/70 text-red-900 dark:text-red-100 font-bold text-sm">2</div>
              <div class="flex-grow">
                <h4 class="font-bold text-md text-red-400">Data Link</h4>
                <p class="text-xs text-[var(--text-secondary)] mt-1 mb-2">Manages node-to-node data transfer (frames) and handles error detection from the physical layer. Defines physical addressing (MAC addresses) and controls access to the medium.</p>                <div class="flex flex-wrap gap-1 text-xs">
                  <span class="px-2 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full">MAC Addresses</span>
                  <span class="px-2 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full">Switches</span>
                  <span class="px-2 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-full">Ethernet</span>
                </div>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 dark:bg-rose-900/70 text-red-900 dark:text-rose-100 font-bold text-sm">1</div>
              <div class="flex-grow">
                <h4 class="font-bold text-md text-rose-400">Physical</h4>
                <p class="text-xs text-[var(--text-secondary)] mt-1 mb-2">Defines the physical medium and hardware characteristics. Transmits raw bit stream (1s and 0s) over physical media like cables, fiber optics, or radio waves.</p>                <div class="flex flex-wrap gap-1 text-xs">
                  <span class="px-2 py-0.5 bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 rounded-full">Cables</span>
                  <span class="px-2 py-0.5 bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 rounded-full">Hubs</span>
                  <span class="px-2 py-0.5 bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 rounded-full">NICs</span>
                  <span class="px-2 py-0.5 bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 rounded-full">Radio</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="glass-card p-6">
          <h3 class="text-xl font-bold mb-4">Generic MAC Frame Format</h3>
          <div class="flex flex-col space-y-2 font-mono text-xs text-center text-[var(--text-secondary)]">
            <p class="text-sm font-sans mb-2 text-left">A frame is structured with a header, a variable-length body carrying the actual data, and a trailer for error checking.</p>
            <div class="w-full bg-[var(--card-bg)] border border-[var(--card-border)] p-2 rounded-lg">
                <strong class="text-[var(--text-primary)]">MAC Header</strong>
            </div>
            <div class="flex flex-wrap gap-1">
                <div class="flex-1 p-2 bg-blue-100 dark:bg-blue-900/40 rounded-md border-b-2 border-blue-400"><strong>Frame Control</strong> (2B)<p class="text-[10px]">Type, Subtype, flags</p></div>
                <div class="flex-1 p-2 bg-blue-100 dark:bg-blue-900/40 rounded-md border-b-2 border-blue-400"><strong>Duration/ID</strong> (2B)<p class="text-[10px]">NAV timer value</p></div>
                <div class="flex-1 p-2 bg-purple-100 dark:bg-purple-900/40 rounded-md border-b-2 border-purple-400"><strong>Address 1</strong> (6B)<p class="text-[10px]">Receiver</p></div>
                <div class="flex-1 p-2 bg-purple-100 dark:bg-purple-900/40 rounded-md border-b-2 border-purple-400"><strong>Address 2</strong> (6B)<p class="text-[10px]">Transmitter</p></div>
            </div>
             <div class="flex flex-wrap gap-1">
                <div class="flex-1 p-2 bg-purple-100 dark:bg-purple-900/40 rounded-md border-b-2 border-purple-400"><strong>Address 3</strong> (0/6B)<p class="text-[10px]">e.g. Destination</p></div>
                <div class="flex-1 p-2 bg-teal-100 dark:bg-teal-900/40 rounded-md border-b-2 border-teal-400"><strong>Seq. Control</strong> (0/2B)<p class="text-[10px]">Frame order</p></div>
                <div class="flex-1 p-2 bg-purple-100 dark:bg-purple-900/40 rounded-md border-b-2 border-purple-400"><strong>Address 4</strong> (0/6B)<p class="text-[10px]">e.g. Source</p></div>
             </div>
            <div class="w-full bg-[var(--card-bg)] border border-[var(--card-border)] p-2 mt-2 rounded-lg">
                <strong class="text-[var(--text-primary)]">Frame Body (Payload)</strong>
            </div>
             <div class="w-full p-3 bg-green-100 dark:bg-green-900/40 rounded-md border-b-2 border-green-400">
                <strong>Data</strong> (0-2312B)<p class="text-[10px]">Data from higher protocols (e.g., IP packet)</p>
             </div>
            <div class="w-full bg-[var(--card-bg)] border border-[var(--card-border)] p-2 mt-2 rounded-lg">
                <strong class="text-[var(--text-primary)]">Frame Trailer</strong>
            </div>
             <div class="w-full p-3 bg-red-100 dark:bg-red-900/40 rounded-md border-b-2 border-red-400">
                <strong>Frame Check Sequence (FCS)</strong> (4B)<p class="text-[10px]">CRC checksum for error detection</p>
             </div>
          </div>
        </div>
      </div>
    `,
        "initLogic": () => {
            animateCards();
        }
    },
    "na_csma_cd": {
        title: "CSMA/CD: Collision Detection",
        subtitle: "A protocol for shared media like legacy Ethernet, where devices listen to the network before sending to detect collisions.",
        navTitle: "CSMA/CD",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 010 12.728m-12.728 0a9 9 0 010-12.728m12.728 0L5.636 18.364"></path></svg>`,
        mainHtml: `
              <div class="space-y-8">
                  <div class="glass-card p-6 sm:p-8">
                      <h3 class="text-2xl font-bold mb-4">Basic Principles of CSMA/CD</h3>
                      <p class="mb-6 text-[var(--text-secondary)] leading-relaxed">Used mainly in older wired Ethernet networks with hubs, which form a single large <strong class="text-[var(--text-primary)]">collision domain</strong>. Full-duplex operation (simultaneous sending and listening) is crucial for collision detection.</p>
                      <div class="grid md:grid-cols-2 gap-6">
                          <div class="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                              <h4 class="font-bold text-lg text-[var(--accent-primary)] mb-3">Procedure before Sending</h4>
                              <ol class="list-decimal list-inside space-y-2 text-[var(--text-secondary)]">
                                  <li>A station listens to the channel (<strong class="text-[var(--text-primary)]">Carrier Sense</strong>).</li>
                                  <li>If the channel is free for a specific time (<strong class="text-[var(--text-primary)]">Inter Frame Space - IFS</strong>), it starts sending.</li>
                                  <li>While sending, it continues to listen for data from other stations.</li>
                                  <li>If it detects another signal, a collision has occurred.</li>
                              </ol>
                          </div>
                          <div class="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                              <h4 class="font-bold text-lg text-[var(--accent-primary)] mb-3">Handling Collisions</h4>
                              <ol class="list-decimal list-inside space-y-2 text-[var(--text-secondary)]">
                                  <li>The station immediately stops transmitting its frame.</li>
                                  <li>It sends a <strong class="text-red-600">"Jam Signal"</strong> to ensure all other stations detect the collision.</li>
                                  <li>It starts the <strong class="text-[var(--text-primary)]">"Binary Exponential Backoff"</strong> algorithm and waits a random amount of time.</li>
                                  <li>The backoff window doubles with each subsequent collision.</li>
                                  <li>When the maximum number of attempts is reached, an error is reported.</li>
                              </ol>
                          </div>
                      </div>
                  </div>
                   <div class="glass-card p-6 sm:p-8">
                        <h3 class="text-2xl font-bold mb-4">CSMA/CD Algorithm (Flowchart)</h3>
                        <div class="p-4 rounded-xl overflow-x-auto border border-[var(--card-border)]">
                            <div data-svg-src="./img/svg/csma-cd-flowchart.svg"></div>
                        </div>
                   </div>
                   <div class="glass-card p-6 sm:p-8">
                        <h3 class="text-2xl font-bold mb-4">Collision Domains Example</h3>
                        <p class="mb-6 text-[var(--text-secondary)] leading-relaxed">Hubs create a single, large collision domain (every port is in the same domain). Switches and routers segment the network into multiple, smaller collision domains (each port is its own domain), which drastically reduces collisions.</p>
                        <div class="p-4 rounded-xl overflow-x-auto border border-[var(--card-border)]">
                           <div data-svg-src="./img/svg/collision-domains.svg" class="w-full h-auto"></div>
                        </div>
                   </div>
              </div>
        `,
        initLogic: () => { animateCards(); initSVGPlaceholders(); }
    },
    "na_wifi_concepts": {
        title: "WiFi: Access & Collision Avoidance",
        subtitle: "Fundamental concepts governing access to the WLAN medium, including CSMA/CA and the solution to the hidden station problem.",
        navTitle: "WiFi Basics",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.555a5.556 5.556 0 017.778 0M12 20.001h.01M4.444 13.111a10 10 0 0115.112 0M1.111 9.667a14.444 14.444 0 0121.778 0"></path></svg>`,
        mainHtml: `
              <div class="space-y-8">
                  <div class="glass-card p-6 sm:p-8">
                      <h3 class="text-2xl font-bold mb-4">CSMA/CA (Collision Avoidance)</h3>
                      <p class="mb-4 text-[var(--text-secondary)] leading-relaxed">A protocol used in Wi-Fi networks to <strong class="text-[var(--text-primary)]">avoid</strong> collisions. Unlike wired Ethernet, Wi-Fi devices typically operate in half-duplex, meaning they <strong class="text-[var(--text-primary)]">cannot listen while sending</strong>. This makes it impossible to detect a collision as it happens. Therefore, the goal is to avoid collisions before they occur.</p>                      <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded-r-lg">
                          <strong class="block text-yellow-800 dark:text-yellow-400 mb-2">Main Difference to CSMA/CD</strong>
                          <p class="text-sm text-yellow-900 dark:text-yellow-200 mt-1">CSMA/CA is <strong class="text-yellow-900 dark:text-yellow-100">proactive</strong> (avoids collisions before transmitting), whereas CSMA/CD is <strong class="text-yellow-900 dark:text-yellow-100">reactive</strong> (detects collisions during transmission and recovers).</p>
                      </div>
                  </div>

                  <div class="glass-card p-6 sm:p-8">
                      <h3 class="text-2xl font-bold mb-4">Distributed Coordination Function (DCF)</h3>
                      <p class="mb-6 text-[var(--text-secondary)]">DCF is the fundamental decentralized protocol used to share the wireless medium equally among stations. It is the standard implementation of CSMA/CA and has several core components:</p>
                       <ul class="list-disc list-inside space-y-3 text-[var(--text-secondary)]">
                          <li><strong class="text-[var(--text-primary)]">Physical Carrier Sense (CCA):</strong> The station physically checks the wireless frequency to see if another device is transmitting. This is called Clear Channel Assessment (CCA).</li>
                          <li><strong class="text-[var(--text-primary)]">Virtual Carrier Sense (NAV):</strong> A timer, the Network Allocation Vector (NAV), is used to reserve the medium. Frames contain a duration field that other stations use to set their NAV. A station will not attempt to send until its NAV is zero.</li>
                          <li><strong class="text-[var(--text-primary)]">Random Backoff Timer:</strong> If the medium is busy, a station waits for it to become free, then waits for an additional random amount of time before attempting to send again. This prevents multiple stations from transmitting at the exact same moment.</li>
                          <li><strong class="text-[var(--text-primary)]">Interframe Spaces (IFS):</strong> Short, defined quiet times between frames that allow for processing and help prioritize different types of traffic.</li>
                       </ul>
                  </div>
                  
                   <div class="glass-card p-6 sm:p-8">
                        <h3 class="text-2xl font-bold mb-4">Standard DCF Flow</h3>
                        <div class="p-4 rounded-xl overflow-x-auto border border-[var(--card-border)]">
                            <div data-svg-src="./img/svg/dfc.svg"></div>
                        </div>
                   </div>

                  <div class="glass-card p-6 sm:p-8">
                      <h3 class="text-2xl font-bold mb-4">The Hidden Station Problem & RTS/CTS</h3>
                      <p class="mb-6 text-[var(--text-secondary)] leading-relaxed">The standard DCF mechanism can fail. A "hidden station" occurs when a station (e.g., ST4) can hear the Access Point (AP), but cannot hear another station (e.g., ST1) that is also communicating with the AP. If both ST1 and ST4 transmit to the AP at the same time, their signals will collide at the AP, even though their own Carrier Sense checks showed the medium as free. The solution is the RTS/CTS mechanism, which adds two control frames to the process.</p>                       <div class="space-y-4">
                          <div class="p-4 bg-[var(--card-bg)] border-l-4 border-blue-500 rounded-lg">
                              <h4 class="font-semibold text-md mb-2 text-blue-600 dark:text-blue-400">1. Sender (e.g. ST1)</h4>
                              <ol class="list-decimal list-inside text-sm space-y-1 text-[var(--text-secondary)]">
                                <li>Wait for DIFS (medium idle)</li>
                                <li>Sends a <strong class="text-[var(--text-primary)]">Request To Send (RTS)</strong> frame to the AP, indicating the total time needed for the entire data exchange.</li>
                                <li>Receives the CTS frame from the AP.</li>
                                <li>Waits for one SIFS, then transmits its data.</li>
                                <li>Receives the final ACK from the AP.</li>
                              </ol>
                          </div>
                          <div class="p-4 bg-[var(--card-bg)] border-l-4 border-green-500 rounded-lg">
                              <h4 class="font-semibold text-md mb-2 text-green-600 dark:text-green-700">2. Receiver (Access Point)</h4>
                               <ol class="list-decimal list-inside text-sm space-y-1 text-[var(--text-secondary)]">
                                <li>Receives the RTS from the Sender.</li>
                                <li>Waits for one SIFS</li>
                                <li>Broadcasts a <strong class="text-[var(--text-primary)]">Clear To Send (CTS)</strong> frame to all stations in its range. This frame confirms the reservation.</li>
                                <li>Receives data from the Sender.</li>
                                <li>Waits for one SIFS</li>
                                <li>Sends an <strong class="text-[var(--text-primary)]">Acknowledgment (ACK)</strong> to confirm successful data receipt.</li>
                               </ol>
                          </div>
                          <div class="p-4 bg-[var(--card-bg)] border-l-4 border-orange-500 rounded-lg">
                              <h4 class="font-semibold text-md mb-2 text-orange-600 dark:text-orange-400">3. Visible Stations (Neighbors of Sender)</h4>
                               <ol class="list-decimal list-inside text-sm space-y-1 text-[var(--text-secondary)]">
                                <li>Receive the RTS from the Sender.</li>
                                <li>Set NAV timer → time for CTS-, data- and ACK frame + 3 SIFS</li>
                                <li>Stay quiet and ignore CTS, Data and ACK</li>
                                <li>Wait DIFS (after NAV expires)</li>
                                <li>New transmission possible</li>
                               </ol>
                          </div>
                          <div class="p-4 bg-[var(--card-bg)] border-l-4 border-red-500 rounded-lg">
                              <h4 class="font-semibold text-md mb-2 text-red-600 dark:text-red-400">4. Hidden Stations (Neighbors of AP, but not Sender)</h4>
                               <ol class="list-decimal list-inside text-sm space-y-1 text-[var(--text-secondary)]">
                                <li>Cannot hear the RTS from the sender.</li>
                                <li>They <strong class="text-[var(--text-primary)]">do</strong> hear the CTS from the AP.</li>
                                <li>Set NAV timer → time for data- and ACK frame + 2 SIFS</li>
                                <li>Stay quiet and ignore Data and ACK</li>
                                <li>Wait DIFS (after NAV expires)</li>
                                <li>New transmission possible</li>
                               </ol>
                          </div>
                      </div>
                  </div>                       <div class="glass-card p-6 sm:p-8">
                            <h3 class="text-2xl font-bold mb-4">DCF Flow with RTS</h3>
                            <p class="mb-6 text-[var(--text-secondary)]">Compared to the basic DCF flow, this version adds two new process steps (<strong class="text-green-600 dark:text-green-400">RTS</strong> and <strong class="text-green-600 dark:text-green-400">CTS</strong>) after the channel is determined to be free, and before the main data transmission begins. This is the key modification to solve the hidden station problem.</p>
                            <div class="p-4 rounded-xl overflow-x-auto border border-[var(--card-border)]">
                                <div data-svg-src="./img/svg/hidden-station-problem.svg"></div>
                            </div>
                       </div>                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">                      <div class="glass-card p-4">
                          <h3 class="text-lg font-bold mb-3 text-blue-600 dark:text-blue-400">Single Access</h3>
                          <ul class="list-disc list-inside space-y-1 text-sm text-[var(--text-secondary)]">
                              <li><strong class="text-[var(--text-primary)]">Distinguish between noise and weak signals</strong></li>
                              <li><strong class="text-[var(--text-primary)]">Discovery of AP harder</strong></li>
                              <li><strong class="text-[var(--text-primary)]">Align on protocols before transmission</strong></li>
                              <li><strong class="text-[var(--text-primary)]">Create communication stream</strong></li>
                              <li><strong class="text-[var(--text-primary)]">Limited by range of signal</strong></li>
                          </ul>
                          <div class="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500 rounded-r text-xs">
                              <span class="text-blue-900 dark:text-blue-200">→ Always signal in all directions</span>
                          </div>
                      </div>

                      <div class="glass-card p-4">
                          <h3 class="text-lg font-bold mb-3 text-red-600 dark:text-red-400">Multiple Access</h3>
                          <ul class="list-disc list-inside space-y-1 text-sm text-[var(--text-secondary)]">
                              <li><strong class="text-[var(--text-primary)]">Always broadcasting signal</strong></li>
                              <li><strong class="text-[var(--text-primary)]">Overlapping signals of multiple stations</strong></li>
                              <li><strong class="text-[var(--text-primary)]">Collisions can easily occur</strong></li>
                              <li><strong class="text-[var(--text-primary)]">Sending and receiving not possible at the same time</strong></li>
                              <li><strong class="text-[var(--text-primary)]">No immediate feedback possible</strong></li>
                          </ul>
                          <div class="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border-l-2 border-red-500 rounded-r text-xs">
                              <span class="text-red-900 dark:text-red-200">→ Protocol required to coordinate access</span>
                          </div>
                      </div>
                  </div>
              </div>
        `,
        initLogic: () => { animateCards(); initSVGPlaceholders(); }
    }, "na_wifi_statemachine": {
        title: "WiFi: Connection State Machine",
        subtitle: "The defined process a client follows to establish a connection with an Access Point, consisting of three states.",
        navTitle: "WiFi State Machine",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>`, mainHtml: `
              <div class="space-y-6">
                  <!-- Discovery Section -->
                  <div class="glass-card p-4">
                      <div class="flex items-center gap-3 mb-4">
                          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/70 text-blue-900 dark:text-blue-100 rounded-full flex items-center justify-center font-bold">0</div>
                          <div>
                              <h3 class="text-xl font-bold">Discovery Process</h3>
                              <p class="text-sm text-[var(--text-secondary)]">Before entering any state, the client must discover available Access Points in range.</p>
                          </div>
                      </div>
                      <div class="grid md:grid-cols-2 gap-4 text-sm">
                          <div class="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                              <strong class="text-blue-600 dark:text-blue-400 block mb-2">📡 Probe Request</strong>
                              <ul class="text-xs space-y-1 text-[var(--text-secondary)]">
                                  <li><strong>Purpose:</strong> Find APs for 802.11 connection</li>
                                  <li><strong>Advertise:</strong> Data rates & capabilities</li>
                                  <li><strong>Broadcast:</strong> To all APs within range</li>
                              </ul>
                          </div>
                          <div class="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                              <strong class="text-blue-600 dark:text-blue-400 block mb-2">📢 Probe Response</strong>
                              <ul class="text-xs space-y-1 text-[var(--text-secondary)]">
                                  <li><strong>Response:</strong> All receiving APs respond</li>
                                  <li><strong>Contains:</strong> AP capabilities & rates</li>
                                  <li><strong>Allows:</strong> Client to choose best AP</li>
                              </ul>
                          </div>
                      </div>
                  </div>                  <!-- States Overview -->
                  <div class="glass-card p-4">
                      <h3 class="text-xl font-bold mb-4 text-center">The Three Connection States</h3>
                      <div class="grid lg:grid-cols-3 gap-4">
                          <!-- State 1 -->
                          <div class="relative p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl border-2 border-red-200 dark:border-red-700">
                              <div class="absolute -top-3 left-3 w-6 h-6 bg-red-100 dark:bg-red-900/70 text-red-900 dark:text-red-100 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                              <h4 class="font-bold text-red-700 dark:text-red-300 mt-2 mb-3">🔴 Unauthenticated & Unassociated</h4>
                              <div class="space-y-2 text-xs">
                                  <div><strong>Status:</strong> No connection between AP and client</div>
                                  <div><strong>Frames:</strong> <span class="text-red-600 dark:text-red-400">Only Class 1 (Management) allowed</span></div>
                                  <div><strong>Process:</strong> Open System Authentication (OSA)</div>
                                  <div><strong>Key Point:</strong> <span class="text-red-600">❌ No PSK authentication yet!</span></div>
                                  <div><strong>Data:</strong> Auth request contains Station ID (MAC)</div>
                                  <div><strong>Response:</strong> AP sends ACK</div>
                                  <div class="bg-red-100 dark:bg-red-800/30 p-2 rounded text-center mt-2">
                                      <strong>Auth Request</strong> (MAC) → ACK
                                  </div>
                              </div>
                          </div>

                          <!-- State 2 -->
                          <div class="relative p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl border-2 border-yellow-200 dark:border-yellow-700">
                              <div class="absolute -top-3 left-3 w-6 h-6 bg-yellow-100 dark:bg-yellow-900/70 text-yellow-900 dark:text-yellow-100 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                              <h4 class="font-bold text-yellow-700 dark:text-yellow-300 mt-2 mb-3">🟡 Authenticated & Unassociated</h4>
                              <div class="space-y-2 text-xs">
                                  <div><strong>Status:</strong> Authenticated but not connected</div>
                                  <div><strong>Frames:</strong> <span class="text-yellow-700 dark:text-yellow-400">Class 1 & 2 (Control) allowed</span></div>
                                  <div><strong>Process:</strong> Choose matching AP to associate</div>
                                  <div><strong>Exchange:</strong> Association request ↔ response</div>
                                  <div><strong>Negotiation:</strong> Encryption types & capabilities</div>
                                  <div><strong>Verification:</strong> 802.11 compatibility check</div>
                                  <div class="bg-yellow-100 dark:bg-yellow-800/30 p-2 rounded text-center mt-2">
                                      <strong>Association</strong> Request ↔ Response
                                  </div>
                              </div>
                          </div>

                          <!-- State 3 -->
                          <div class="relative p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border-2 border-green-200 dark:border-green-700">
                              <div class="absolute -top-3 left-3 w-6 h-6 bg-green-100 dark:bg-green-900/70 text-green-900 dark:text-green-100 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                              <h4 class="font-bold text-green-700 dark:text-green-300 mt-2 mb-3">🟢 Authenticated & Associated</h4>
                              <div class="space-y-2 text-xs">
                                  <div><strong>Status:</strong> Full connection with one AP</div>
                                  <div><strong>Frames:</strong> <span class="text-green-600 dark:text-green-400">All classes (1, 2, 3 - Data) allowed</span></div>
                                  <div><strong>Capability:</strong> <span class="text-green-600">✅ Data transmission possible</span></div>
                                  <div><strong>Next Step:</strong> Encryption handshake starts</div>
                                  <div><strong>Example:</strong> WPA2 4-way handshake</div>
                                  <div><strong>Result:</strong> Ready for secure communication</div>
                                  <div class="bg-green-100 dark:bg-green-800/30 p-2 rounded text-center mt-2">
                                      <strong>WPA2 Handshake</strong> starts
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>                  <!-- Connection Flow -->
                  <div class="glass-card p-4">
                      <h3 class="text-xl font-bold mb-4 text-center">Connection Protocol Flow</h3>
                      <div class="flex flex-col items-center space-y-3">
                          <div class="flex flex-wrap justify-center gap-2 text-xs items-center">
                              <div class="flex items-center bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg">
                                  <span class="w-5 h-5 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center mr-2">1</span>
                                  <div><strong>Discovery:</strong> Client sends <code>Probe Request</code></div>
                              </div>
                              <div class="text-xl text-gray-400">→</div>
                              <div class="flex items-center bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg">
                                  <span class="w-5 h-5 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center mr-2">2</span>
                                  <div><strong>Discovery:</strong> AP replies with <code>Probe Response</code></div>
                              </div>
                          </div>
                          <div class="text-2xl text-gray-400">▼</div>
                          <div class="flex flex-wrap justify-center gap-2 text-xs items-center">
                              <div class="flex items-center bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded-lg">
                                  <span class="w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center mr-2">3</span>
                                  <div><strong>Authentication:</strong> Client sends <code>Auth Request</code></div>
                              </div>
                              <div class="text-xl text-gray-400">→</div>
                              <div class="flex items-center bg-yellow-100 dark:bg-yellow-900/30 px-3 py-2 rounded-lg border border-yellow-400">
                                  <span class="w-5 h-5 bg-yellow-500 rounded-full text-white text-xs flex items-center justify-center mr-2">4</span>
                                  <div><strong>Authentication:</strong> AP replies with <code>Auth Response</code> <span class="ml-2 text-yellow-600 font-bold">(→ State 2)</span></div>
                              </div>
                          </div>
                          <div class="text-2xl text-gray-400">▼</div>
                          <div class="flex flex-wrap justify-center gap-2 text-xs items-center">
                              <div class="flex items-center bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg">
                                  <span class="w-5 h-5 bg-green-500 rounded-full text-white text-xs flex items-center justify-center mr-2">5</span>
                                  <div><strong>Association:</strong> Client sends <code>Association Request</code></div>
                              </div>
                              <div class="text-xl text-gray-400">→</div>
                              <div class="flex items-center bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg border border-green-400">
                                  <span class="w-5 h-5 bg-green-500 rounded-full text-white text-xs flex items-center justify-center mr-2">6</span>
                                  <div><strong>Association:</strong> AP replies with <code>Association Response</code> <span class="ml-2 text-green-600 font-bold">(→ State 3)</span></div>
                              </div>
                          </div>
                          <div class="text-2xl text-gray-400">▼</div>
                          <div class="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg">
                              <span class="w-6 h-6 bg-gray-500 rounded-full text-white text-sm flex items-center justify-center mr-3">✓</span>
                              <strong class="text-lg">Data Transfer: Full connection, data can flow</strong>
                          </div>
                      </div>
                  </div>
              </div>
        `,
        initLogic: () => { animateCards(); }
    },
    "na_wifi_security": {
        title: "WiFi: Security & Vulnerabilities",
        subtitle: "The evolution of WLAN security from WEP to WPA2, including the 4-way handshake and critical attacks like KRACK.",
        navTitle: "WiFi Security",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>`, mainHtml: `
              <div class="space-y-6">
                  <!-- Security Evolution -->
                  <div class="glass-card p-4">
                      <h3 class="text-xl font-bold mb-4 text-center">Evolution of WiFi Security Protocols</h3>                      <div class="grid md:grid-cols-3 gap-4">
                          <div class="relative p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl border-2 border-red-200 dark:border-red-700 flex flex-col h-full">
                              <div class="absolute -top-3 left-3 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-sm font-bold">❌</div>
                              <h4 class="font-bold text-red-700 dark:text-red-300 mt-2 mb-3">WEP (Obsolete)</h4>
                              <div class="space-y-2 text-xs flex-grow">
                                  <div><strong>Cipher:</strong> <span class="text-red-600 dark:text-red-400">RC4 stream cipher (flawed)</span></div>
                                  <div><strong>IV:</strong> <span class="text-red-600 dark:text-red-400">24-bit (too short, reused)</span></div>
                                  <div><strong>Integrity:</strong> <span class="text-red-600 dark:text-red-400">CRC32 (linear, weak)</span></div>
                                  <div><strong>Attack:</strong> <span class="text-red-600 dark:text-red-400">Keystream recovery possible</span></div>
                              </div>
                              <div class="bg-red-100 dark:bg-red-800/30 p-2 rounded text-center mt-2">
                                  <strong class="text-red-700 dark:text-red-300">BROKEN</strong>
                              </div>
                          </div>

                          <div class="relative p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl border-2 border-yellow-200 dark:border-yellow-700 flex flex-col h-full">
                              <div class="absolute -top-3 left-3 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-sm font-bold">⚠️</div>
                              <h4 class="font-bold text-yellow-700 dark:text-yellow-300 mt-2 mb-3">WPA (Transitional)</h4>
                              <div class="space-y-2 text-xs flex-grow">
                                  <div><strong>Introduction:</strong> Based on WEP to tackle problems</div>
                                  <div><strong>Compatibility:</strong> Downward compatible, no new hardware necessary</div>
                                  <div><strong>Cipher:</strong> <span class="text-yellow-700 dark:text-yellow-400">RC4 with TKIP encryption</span></div>
                                  <div><strong>Key Management:</strong> Improved key management system</div>
                                  <div><strong>Handshake:</strong> <span class="text-green-600 dark:text-green-400">4-way handshake protocol</span></div>
                                  <div><strong>Vulnerability:</strong> <span class="text-red-600 dark:text-red-400">Still RC4-based, password cracking attacks</span></div>
                              </div>
                              <div class="bg-yellow-100 dark:bg-yellow-800/30 p-2 rounded text-center mt-2">
                                  <strong class="text-yellow-700 dark:text-yellow-300">LEGACY</strong>
                              </div>
                          </div>

                          <div class="relative p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border-2 border-green-200 dark:border-green-700 flex flex-col h-full">
                              <div class="absolute -top-3 left-3 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold">✅</div>
                              <h4 class="font-bold text-green-700 dark:text-green-300 mt-2 mb-3">WPA2/3 (Modern)</h4>                              <div class="space-y-2 text-xs flex-grow">
                                  <div><strong>Cipher:</strong> <span class="text-green-600 dark:text-green-400">CCMP (AES-based)</span></div>
                                  <div><strong>Confidentiality:</strong> <span class="text-green-600 dark:text-green-400">AES Counter (CTR) mode</span></div>
                                  <div><strong>Integrity:</strong> <span class="text-green-600 dark:text-green-400">AES CBC-MAC authentication</span></div>
                                  <div><strong>Security:</strong> <span class="text-green-600 dark:text-green-400">Much stronger encryption</span></div>
                                  <div><strong>WPA3:</strong> Enhanced handshake security</div>
                                  <div><strong>Vuln:</strong> <span class="text-red-600 dark:text-red-400">KRACK, offline cracking</span></div>
                              </div>
                              <div class="bg-green-100 dark:bg-green-800/30 p-2 rounded text-center mt-2">
                                  <strong class="text-green-700 dark:text-green-300">SECURE</strong>
                              </div>
                          </div>
                      </div>
                  </div>

                  <!-- TKIP Details -->
                  <div class="glass-card p-4">
                      <h3 class="text-xl font-bold mb-4">TKIP - Temporary Key Integrity Protocol</h3>
                      <p class="mb-4 text-sm text-[var(--text-secondary)]">TKIP was designed as a stopgap solution to address WEP's vulnerabilities while maintaining compatibility with existing hardware.</p>
                      
                      <div class="grid lg:grid-cols-2 gap-6">
                          <div>
                              <h4 class="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">🔑 Core TKIP Features</h4>
                              <div class="space-y-3">
                                  <div class="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                                      <strong class="text-blue-600 dark:text-blue-400">Per-Packet Key Changes:</strong>
                                      <p class="mt-1 text-xs">Each transferred frame is secured with a different key. Keys change with each packet to prevent key reuse attacks.</p>
                                  </div>
                                  <div class="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                                      <strong class="text-green-600 dark:text-green-400">48-bit Sequence Numbers:</strong>
                                      <p class="mt-1 text-xs">Packets have unique 48-bit serial numbers, incremented for each packet to prevent replay attacks. Much larger than WEP's 24-bit IV.</p>
                                  </div>
                                  <div class="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                                      <strong class="text-purple-600 dark:text-purple-400">MIC - Michael Integrity Code:</strong>
                                      <p class="mt-1 text-xs">64-bit cryptographic message integrity code called "Michael". Calculated over data and header using a cryptographic hash with password to prevent forgery.</p>
                                  </div>
                                  <div class="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg">
                                      <strong class="text-yellow-600 dark:text-yellow-400">Key Mixing Function:</strong>
                                      <p class="mt-1 text-xs">De-correlates public IV and weak keys. Uses two-phase approach to avoid correlation between IV and keys while maintaining WEP hardware compatibility.</p>
                                  </div>
                              </div>
                          </div>
                          
                          <div>
                              <h4 class="font-bold text-lg mb-3 text-orange-600 dark:text-orange-400">🔄 TKIP Key Mixing Process</h4>
                              <div class="space-y-3">
                                  <div class="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg">
                                      <strong class="text-orange-600 dark:text-orange-400">IV Split:</strong>
                                      <p class="mt-1 text-xs">IV is split into IVHigh (upper 24 bits) and IVLow (lower 24 bits) for two-phase processing.</p>
                                  </div>
                                  <div class="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                                      <strong class="text-red-600 dark:text-red-400">Phase 1 (Computationally Intensive):</strong>
                                      <p class="mt-1 text-xs">Uses MAC address to ensure individual keys per connection. Uses upper 24 bits of IV and PMK (Pairwise Master Key). Only secure keys are generated.</p>
                                  </div>
                                  <div class="bg-cyan-50 dark:bg-cyan-900/30 p-3 rounded-lg">
                                      <strong class="text-cyan-400 dark:text-cyan-400">Phase 2 (Performance Optimized):</strong>
                                      <p class="mt-1 text-xs">Optimized for WEP hardware compatibility. Uses lower 24 bits and Phase 1 key output for final key generation.</p>
                                  </div>
                                  <div class="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                                      <strong class="text-green-600 dark:text-green-400">Re-keying Mechanism:</strong>
                                      <p class="mt-1 text-xs">Fresh encryption keys prevent key reuse. Master keys not transmitted - they serve as basis for temporal keys.</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                      <div class="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
                          <h5 class="font-bold text-purple-700 dark:text-indigo-300 mb-2">🗝️ TKIP Key Hierarchy</h5>
                          <div class="grid md:grid-cols-2 gap-4 text-xs">
                              <div>
                                  <strong class="text-purple-700 dark:text-indigo-400">Master Keys (Not Transmitted):</strong>
                                  <ul class="mt-1 space-y-1 list-disc list-inside">
                                      <li><strong>PSK:</strong> Pre-Shared Key</li>
                                      <li><strong>PMK:</strong> Pairwise Master Key</li>
                                      <li><strong>GMK:</strong> Group Master Key</li>
                                  </ul>
                              </div>
                              <div>
                                  <strong class="text-purple-700 dark:text-purple-400">Temporal Keys (Session-specific):</strong>
                                  <ul class="mt-1 space-y-1 list-disc list-inside">
                                      <li><strong>PTK:</strong> Pairwise Transient Key (individual per association)</li>
                                      <li><strong>GTK:</strong> Group Transient Key (for multicast messages)</li>
                                      <li><strong>TK:</strong> Temporal Key (used as RC4 seed)</li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>

                  <!-- WEP Details -->
                  <div class="glass-card p-4">
                      <h3 class="text-xl font-bold mb-4">WEP Encryption Process & Critical Flaws</h3>
                      <p class="mb-4 text-sm text-[var(--text-secondary)]">WEP was designed to provide confidentiality and integrity comparable to a wired network. However, its cryptographic components were fundamentally flawed.</p>
                      <div class="grid lg:grid-cols-2 gap-6">
                          <div>
                              <h4 class="font-bold text-lg mb-3 text-red-600 dark:text-red-400">🔐 WEP Encryption Steps</h4>
                              <div class="space-y-3">
                                  <div class="flex items-start gap-3">
                                      <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                                      <div class="text-sm">
                                          <strong>Checksum Creation:</strong> A weak CRC32 checksum is calculated on the plaintext data. This is for error-detection, <span class="text-red-600">not cryptographic integrity</span>.
                                      </div>
                                  </div>
                                  <div class="flex items-start gap-3">
                                      <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                                      <div class="text-sm">
                                          <strong>Seed Concatenation:</strong> The short 24-bit IV is combined with the static pre-shared key. <span class="text-red-600">Because the IV space is so small, IVs were guaranteed to be reused on a busy network</span> - a fatal flaw for a stream cipher.
                                      </div>
                                  </div>
                                  <div class="flex items-start gap-3">
                                      <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                                      <div class="text-sm">
                                          <strong>Keystream Generation:</strong> The combined IV+Key is used as the seed for the RC4 algorithm to generate a keystream (a sequence of pseudo-random bytes).
                                      </div>
                                  </div>
                                  <div class="flex items-start gap-3">
                                      <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                                      <div class="text-sm">
                                          <strong>XOR Encryption:</strong> The plaintext (Data + Checksum) is XORed with the keystream to produce the final ciphertext.
                                      </div>
                                  </div>
                                  <div class="flex items-start gap-3">
                                      <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                                      <div class="text-sm">
                                          <strong>Transmission:</strong> <span class="text-red-600">The original (unencrypted) IV is attached to the ciphertext and sent over the air</span>. An attacker can see the IV and, <span class="text-red-600">by collecting enough packets with the same IV, can crack the key</span>.
                                      </div>
                                  </div>
                              </div>
                          </div>                          <div>
                              <h4 class="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">🔧 Core Concepts: S-Box & RC4</h4>
                              <div class="space-y-3 text-sm">
                                  <div class="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                                      <strong class="text-purple-700 dark:text-purple-400">S-Box (Substitution Box):</strong>
                                      <p class="mt-1 text-xs">Replace entries of an input • Used in cryptography as non-linear function • Transforms m input bits into n output bits • Works as a lookup table</p>
                                      <div class="mt-2 grid grid-cols-2 gap-2 text-xs">
                                          <div class="bg-white dark:bg-gray-800 p-2 rounded border-l-2 border-blue-400">
                                              <span class="font-semibold text-blue-600 dark:text-blue-400">Static S-Box:</span>
                                              <p class="mt-1">Not changing over time • Usually used multiple rounds • E.g. Rijndael S-Box (AES): Maps 8-bit input to 8-bit output • Resistant to cryptanalysis</p>
                                          </div>
                                          <div class="bg-white dark:bg-gray-800 p-2 rounded border-l-2 border-green-400">
                                              <span class="font-semibold text-green-600 dark:text-green-400">Dynamic S-Box:</span>
                                              <p class="mt-1">Generated based on input • Includes transformation operations • Each round new S-Box • E.g. RC4: Permutation of 256 bits • Substitution based on key</p>
                                          </div>
                                      </div>
                                  </div>                                  <div class="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                                      <strong class="text-purple-700 dark:text-purple-400">RC4 S-Box Initialization Algorithm:</strong>
                                      <p class="mt-1 text-xs">Starts with ordered array (0-255), shuffles using WEP key + IV as seed, creates unique pseudo-random S-Box.</p>
                                      <div class="mt-2 bg-gray-800 dark:bg-gray-900 p-3 rounded text-xs font-mono text-green-400 overflow-x-auto">
                                          <div class="text-gray-400 mb-1"># S-Box initialization</div>
                                          <div class="text-blue-300">def initialize_RC4(key):</div>
                                          <div class="ml-4 text-yellow-300">key_length = len(key)</div>
                                          <div class="ml-4 text-yellow-300">S = [i for i in range(256)]</div>
                                          <div class="ml-4 text-yellow-300">j = 0</div>
                                          <div class="ml-4 text-cyan-300">for i in range(256):</div>
                                          <div class="ml-8 text-pink-300">j = (j + S[i] + key[i % key_length]) % 256</div>
                                          <div class="ml-8 text-pink-300">S[i], S[j] = S[j], S[i]</div>
                                          <div class="ml-4 text-green-300">return S</div>
                                      </div>
                                  </div>
                                  <div class="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                                      <strong class="text-purple-700 dark:text-purple-400">RC4 Keystream Generation Algorithm:</strong>
                                      <p class="mt-1 text-xs">Loop: select byte from S-Box, swap elements, output byte. Sequence forms keystream for XOR encryption.</p>
                                      <div class="mt-2 bg-gray-800 dark:bg-gray-900 p-3 rounded text-xs font-mono text-green-400 overflow-x-auto">
                                          <div class="text-gray-400 mb-1"># Keystream Algorithm</div>
                                          <div class="text-yellow-300">i = 0</div>
                                          <div class="text-yellow-300">j = 0</div>
                                          <div class="text-cyan-300">for k in range(n):</div>
                                          <div class="ml-4 text-pink-300">i = (i + 1) % 256</div>
                                          <div class="ml-4 text-pink-300">j = (j + S[i]) % 256</div>
                                          <div class="ml-4 text-gray-400"># Swap bytes in S</div>
                                          <div class="ml-4 text-orange-300">S[i], S[j] = S[j], S[i]</div>
                                          <div class="ml-4 text-blue-300">rand_index = (S[i] + S[j]) % 256</div>
                                          <div class="ml-4 text-green-300">nextByte = S[rand_index]</div>
                                      </div>
                                      <div class="mt-2 text-xs text-purple-600 dark:text-purple-400">
                                          <strong>Key Points:</strong> Uses initialized S-box, increments counter i, chooses index j based on S[i] and previous j, swaps values, gets output byte based on S[i] and S[j].
                                      </div>
                                  </div>
                              </div>                          </div>
                      </div>
                      
                      <!-- WEP Encryption Diagram -->
                      <div class="mt-6">
                          <h4 class="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">📊 WEP Encryption Flow Diagram</h4>
                          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                              <div class="w-full overflow-x-auto">
                                  <div class="min-w-[600px]">
                                      <img src="./img/svg/WEP.svg" alt="WEP Encryption Process Diagram" class="w-full h-auto max-w-none">
                                  </div>
                              </div>
                              <p class="text-xs text-[var(--text-secondary)] mt-2 text-center">
                                  Visual representation of the WEP encryption process showing the flow from plaintext to encrypted output
                              </p>
                          </div>
                      </div>
                  </div>                  <!-- 4-Way Handshake & KRACK -->
                  <div class="glass-card p-4">
                      <h3 class="text-xl font-bold mb-4">4-Way Handshake & Security Analysis</h3>
                      <p class="mb-4 text-sm text-[var(--text-secondary)]">The 4-way handshake is the key exchange protocol that establishes secure communication without transmitting keys over the air.</p>
                      
                      <div class="grid lg:grid-cols-2 gap-6 mb-6">
                          <div>
                              <h4 class="font-bold text-lg mb-3 text-green-600 dark:text-green-400">🤝 4-Way Handshake Process</h4>
                              <div class="space-y-3">
                                  <div class="flex items-start gap-3">
                                      <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                                      <div class="text-sm">
                                          <strong>AP → ST:</strong> Sends <strong class="text-blue-600">ANonce</strong> (random number from AP). Client now has all components to calculate PTK.
                                      </div>
                                  </div>
                                  <div class="flex items-start gap-3">
                                      <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                                      <div class="text-sm">
                                          <strong>ST → AP:</strong> Sends <strong class="text-green-600">SNonce</strong> (random from station) + MIC. Both sides can now calculate identical PTK.
                                      </div>
                                  </div>
                                  <div class="flex items-start gap-3">
                                      <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                                      <div class="text-sm">
                                          <strong>AP → ST:</strong> Sends GTK (Group Transient Key) encrypted with PTK. Client installs both PTK and GTK.
                                      </div>
                                  </div>
                                  <div class="flex items-start gap-3">
                                      <div class="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                                      <div class="text-sm">
                                          <strong>ST → AP:</strong> Sends confirmation message. <span class="text-green-600 dark:text-green-400">Encrypted session begins!</span>
                                      </div>
                                  </div>
                              </div>
                              
        <div class="mt-4 p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg">
            <h5 class="font-bold text-cyan-700 dark:text-cyan-300 mb-2">🧮 PTK Generation Formula</h5>
            <div class="text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded border">
                PTK = PRF(PSK + ANonce + SNonce + MAC_AP + MAC_ST)
            </div>
            <p class="text-xs mt-2 text-cyan-400 dark:text-cyan-400">
                <strong>PRF:</strong> Pseudo Random Function (Hash)<br>
                <strong>Nonce:</strong> Random number used only once<br>
                <strong>Goal:</strong> Exchange temporary keys without transmitting them
            </p>
        </div>
                          </div>
                          
                          <div class="bg-red-50 dark:bg-red-900/30 p-4 rounded-xl border-2 border-red-200 dark:border-red-700">
                              <h4 class="font-bold text-lg mb-3 text-red-700 dark:text-red-300">⚠️ KRACK (Key Reinstallation Attack)</h4>
                              <div class="space-y-2 text-xs">
                                  <div><strong>Attack Vector:</strong> Man-in-the-middle blocks Message 4</div>
                                  <div><strong>AP Behavior:</strong> Re-transmits Message 3 (no confirmation received)</div>
                                  <div><strong>Client Flaw:</strong> <span class="text-red-600">Reinstalls same session key (PTK)</span></div>
                                  <div><strong>Critical Issue:</strong> <span class="text-red-600">Packet counter resets to initial value</span></div>
                                  <div><strong>Result:</strong> <span class="text-red-600">Nonce reuse = cryptographic failure</span></div>
                                  <div class="bg-red-100 dark:bg-red-800/30 p-2 rounded mt-3">
                                      <strong class="text-red-700 dark:text-red-300">Enables packet decryption & forgery</strong>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                      <!-- WPA Problems -->
                      <div class="glass-card p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-700">
                          <h4 class="text-xl font-bold mb-4 text-orange-700 dark:text-orange-300">🔓 WPA Security Problems & Attack Vectors</h4>
                          
                          <div class="grid lg:grid-cols-2 gap-6">
                              <div>
                                  <h5 class="font-bold text-lg mb-3 text-red-600 dark:text-red-400">💀 Password Cracking Attack</h5>
                                  <div class="space-y-3 text-sm">
                                      <div class="bg-white dark:bg-gray-800 p-3 rounded border-l-4 border-red-500">
                                          <strong class="text-red-600 dark:text-red-400">Problem:</strong> Packets are protected once encryption takes place → Capturing normal traffic not helpful
                                      </div>
                                      <div class="bg-white dark:bg-gray-800 p-3 rounded border-l-4 border-orange-500">
                                          <strong class="text-orange-600 dark:text-orange-400">Target:</strong> 4-Way Handshake contains enough information for offline password attacks
                                      </div>
                                      <div class="bg-white dark:bg-gray-800 p-3 rounded border-l-4 border-yellow-500">
                                          <strong class="text-yellow-700 dark:text-yellow-400">Success Factor:</strong> Depends entirely on password complexity
                                      </div>
                                  </div>
                              </div>
                              
                              <div>
                                  <h5 class="font-bold text-lg mb-3 text-purple-600 dark:text-purple-400">🎯 Attack Steps</h5>
                                  <div class="space-y-3">
                                      <div class="flex items-start gap-3">
                                          <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                                          <div class="text-sm">
                                              <strong>Deauth Attack:</strong> Disconnect client to force new handshake (using deauth frames)
                                          </div>
                                      </div>
                                      <div class="flex items-start gap-3">
                                          <div class="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                                          <div class="text-sm">
                                              <strong>Capture Handshake:</strong> Record the 4-way handshake to extract ANonce, SNonce, and MIC
                                          </div>
                                      </div>
                                      <div class="flex items-start gap-3">
                                          <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                                          <div class="text-sm">
                                              <strong>Offline Attack:</strong> Brute force or dictionary attack to crack password (compute PTK for each guess)
                                          </div>
                                      </div>
                                      <div class="flex items-start gap-3">
                                          <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                                          <div class="text-sm">
                                              <strong>Network Access:</strong> Connect with cracked password and full network access
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          
                          <div class="mt-4 p-3 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/50 dark:to-orange-900/50 rounded-lg">
                              <h6 class="font-bold text-red-700 dark:text-red-300 mb-1">🛡️ Defense Strategies</h6>
                              <div class="text-xs space-y-1">
                                  <div>• <strong>Strong Passwords:</strong> Complex, long passphrases resist brute force</div>
                                  <div>• <strong>WPA3:</strong> Uses SAE (Simultaneous Authentication of Equals) - resistant to offline attacks</div>
                                  <div>• <strong>Enterprise WPA:</strong> Uses 802.1X authentication with individual user credentials</div>                                  <div>• <strong>Network Monitoring:</strong> Detect deauth attacks and suspicious reconnection patterns</div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <!-- Modern Wi-Fi Enhancements -->
                  <div class="glass-card p-4">
                      <h3 class="text-xl font-bold mb-4 text-center text-cyan-400">🚀 Modern Wi-Fi Performance & Enterprise Features</h3>
                      <div class="grid md:grid-cols-2 gap-4">
                          <!-- Multi-User & Performance -->
                          <div class="space-y-3">
                              <div class="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                                  <h4 class="font-bold text-blue-700 dark:text-blue-300 mb-2">⚡ Multi-User Improvements</h4>
                                  <div class="text-xs space-y-1">
                                      <div><strong>Problem:</strong> Traditional Wi-Fi = single-user access (CSMA-CA)</div>
                                      <div><strong>Impact:</strong> Full channel blocked, suboptimal throughput</div>
                                      <div><strong>Solution:</strong> Parallel transmission technologies</div>
                                  </div>
                              </div>
                              <div class="p-3 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg">
                                  <h4 class="font-bold text-purple-700 dark:text-purple-300 mb-2">📊 OFDMA</h4>
                                  <div class="text-xs space-y-1">
                                      <div><strong>Concept:</strong> Orthogonal Frequency Division Multiple Access</div>
                                      <div><strong>Method:</strong> Split frequency into Resource Units (RU)</div>
                                      <div><strong>Benefit:</strong> Multiple stations transmit simultaneously</div>
                                  </div>
                              </div>
                          </div>
                          
                          <!-- MU-MIMO & Enterprise -->
                          <div class="space-y-3">
                              <div class="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                                  <h4 class="font-bold text-green-700 dark:text-green-300 mb-2">📡 MU-MIMO</h4>
                                  <div class="text-xs space-y-1">
                                      <div><strong>Concept:</strong> Multi-User Multiple Input Multiple Output</div>
                                      <div><strong>Method:</strong> Spatial multiplexing with beamforming</div>
                                      <div><strong>Benefit:</strong> Frequency reuse in different directions</div>
                                  </div>
                              </div>
                              <div class="p-3 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                                  <h4 class="font-bold text-orange-700 dark:text-orange-300 mb-2">🏢 Multi-AP Environments</h4>
                                  <div class="text-xs space-y-1">
                                      <div><strong>Challenges:</strong> Roaming, dead zones, load balancing</div>
                                      <div><strong>Solutions:</strong> Fast BSS transition, mesh networks</div>
                                      <div><strong>Standards:</strong> 802.11r (roaming), 802.11s (mesh)</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
        `,
        initLogic: () => { animateCards(); }
    },
    "na_aes_modes": {
        title: "AES & Block Cipher Modes",
        subtitle: "Advanced Encryption Standard - the foundation of modern WPA2/3 encryption with comprehensive security analysis.",
        navTitle: "AES/Block Ciphers",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417V21h18v-5.583a12.02 12.02 0 00-4.382-8.622z"></path></svg>`,
        mainHtml: `
            <div class="space-y-6">
                <!-- AES Fundamentals -->
                <div class="glass-card p-6">
                    <h3 class="text-2xl font-bold mb-4">AES - Advanced Encryption Standard</h3>
                    <p class="text-[var(--text-secondary)] mb-4">Developed after DES encryption was broken, AES is the modern standard for governmental sensitive information and the backbone of WPA2/WPA3 security.</p>
                    
                    <div class="grid lg:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">🔑 Core Properties</h4>
                            <div class="space-y-3">
                                <div class="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                                    <strong class="text-blue-600 dark:text-blue-400">Symmetric Block Cipher:</strong>
                                    <ul class="mt-1 text-xs space-y-1">
                                        <li>• <strong>Symmetric:</strong> Same key for encryption and decryption</li>
                                        <li>• <strong>Block cipher:</strong> Encrypts blocks of fixed size (128 bits)</li>
                                    </ul>
                                </div>
                                <div class="bg-cyan-50 dark:bg-cyan-900/30 p-3 rounded-lg">
                                    <strong class="text-cyan-400 dark:text-cyan-400">Key Lengths:</strong>
                                    <ul class="mt-1 text-xs space-y-1">
                                        <li>• <strong>128-bit:</strong> 10 rounds, fast performance</li>
                                        <li>• <strong>192-bit:</strong> 12 rounds, enhanced security</li>
                                        <li>• <strong>256-bit:</strong> 14 rounds, maximum security</li>
                                    </ul>
                                    <p class="mt-2 text-xs"><strong>Block size:</strong> Always 128 bits regardless of key length</p>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="font-bold text-lg mb-3 text-green-600 dark:text-green-400">🛡️ Security Analysis</h4>
                            <div class="space-y-3">
                                <div class="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                                    <strong class="text-green-600 dark:text-green-400">Current Security Status:</strong>
                                    <p class="mt-1 text-xs">Correctly set up with strong passwords, AES is currently considered unbreakable and quantum resistant.</p>
                                </div>
                                <div class="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                                    <strong class="text-red-600 dark:text-red-400">Known Attack Vectors:</strong>
                                    <ul class="mt-1 text-xs space-y-1">
                                        <li>• <strong>Related-Key Attack:</strong> Targets key schedule (theoretical)</li>
                                        <li>• <strong>Known-Key Attack:</strong> Uses one known key to target others</li>
                                        <li>• <strong>Side-Channel Attack:</strong> Attacks implementation, not cipher itself</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Block Cipher Challenges -->
                <div class="glass-card p-6">
                    <h3 class="text-2xl font-bold mb-4">Block Cipher Challenges & Solutions</h3>
                    <p class="text-[var(--text-secondary)] mb-4">Real-world data isn't exactly 128 bits. Block ciphers need padding for short messages and modes of operation for longer messages.</p>
                    
                    <div class="grid lg:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-bold text-lg mb-3 text-orange-600 dark:text-orange-400">📏 Padding Solutions</h4>
                            <div class="space-y-3">
                                <div class="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg">
                                    <strong class="text-orange-600 dark:text-orange-400">Problem:</strong>
                                    <p class="mt-1 text-xs">Messages usually not exactly 16 bytes. Last block often incomplete.</p>
                                </div>
                                <div class="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg">
                                    <strong class="text-yellow-700 dark:text-yellow-400">Padding Methods:</strong>
                                    <div class="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                                        <div>Data: A3 03 7E 18 10 B3 00 2E</div>
                                        <div class="text-green-600 dark:text-green-400">Zero: A3 03 7E 18 10 B3 00 2E 00 00 00 00 00 00 00 00</div>
                                        <div class="text-blue-600 dark:text-blue-400">DES: A3 03 7E 18 10 B3 00 2E 01 00 00 00 00 00 00 00</div>
                                        <div class="text-purple-700 dark:text-purple-400">PKCS: A3 03 7E 18 10 B3 00 2E 08 08 08 08 08 08 08 08</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="font-bold text-lg mb-3 text-purple-700 dark:text-purple-400">⚡ Side-Channel Attacks</h4>
                            <div class="space-y-3">
                                <div class="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                                    <strong class="text-purple-700 dark:text-purple-400">Attack Vector:</strong>
                                    <p class="mt-1 text-xs">Not attacking the cipher directly as a black box, but attacking implementations through data leakage.</p>
                                </div>
                                <div class="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg">
                                    <strong class="text-red-600 dark:text-red-400">Examples:</strong>
                                    <ul class="mt-1 text-xs space-y-1">
                                        <li>• <strong>Timing attacks:</strong> Measure execution time variations</li>
                                        <li>• <strong>Power analysis:</strong> Monitor power consumption patterns</li>
                                        <li>• <strong>CPU side-channels:</strong> Meltdown/Spectre vulnerabilities</li>
                                    </ul>
                                </div>
                                <div class="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                                    <strong class="text-blue-600 dark:text-blue-400">Protection:</strong>
                                    <p class="mt-1 text-xs">Requires secure hardware implementations, not changes to the cipher itself.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Block Cipher Modes -->
                <div class="glass-card p-6">
                    <h3 class="text-2xl font-bold mb-4">Block Cipher Modes of Operation</h3>
                    <p class="text-[var(--text-secondary)] mb-4">Different modes address how to securely encrypt multiple blocks with the same key, each with unique properties for error propagation and reordering.</p>
                    
                    <div class="space-y-4">
                        <!-- ECB Mode -->
                        <div class="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl border-2 border-red-200 dark:border-red-700">
                            <h4 class="font-bold text-lg text-red-600 dark:text-red-400 mb-2">❌ ECB (Electronic Codebook) - INSECURE</h4>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p class="text-sm text-red-700 dark:text-red-300 mb-2">Simplest mode: each block encrypted independently with same key.</p>
                                    <div class="text-xs space-y-1">
                                        <div><strong>Process:</strong> Use key for each block individually</div>
                                        <div><strong>Problem:</strong> Identical plaintext → identical ciphertext</div>
                                        <div><strong>Vulnerability:</strong> Statistical patterns remain visible</div>
                                    </div>
                                </div>
                                <div class="text-xs">
                                    <div><strong class="text-red-600">Security Properties:</strong></div>
                                    <div>• <strong>Identical Plaintext:</strong> Always maps to same cipherblock</div>
                                    <div>• <strong>Reordering:</strong> Cipherblocks remain the same (different order)</div>
                                    <div>• <strong>Error Propagation:</strong> Error affects only one block</div>
                                </div>
                            </div>
                        </div>

                        <!-- CBC Mode -->
                        <div class="p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl border-2 border-yellow-200 dark:border-yellow-700">
                            <h4 class="font-bold text-lg text-yellow-700 dark:text-yellow-400 mb-2">🔗 CBC (Cipher Block Chaining) - INTEGRITY</h4>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p class="text-sm text-yellow-700 dark:text-yellow-300 mb-2">Connects ciphertext with next block - iterative approach.</p>
                                    <div class="text-xs space-y-1">
                                        <div><strong>Process:</strong> Block(i+1) depends on Block(i)</div>
                                        <div><strong>Chain:</strong> Ciphertext as input to next block</div>
                                        <div><strong>IV:</strong> First block needs random Initialization Vector</div>
                                        <div><strong>CCMP Use:</strong> CBC-MAC for message authentication</div>
                                    </div>
                                </div>
                                <div class="text-xs">
                                    <div><strong class="text-yellow-700">Security Properties:</strong></div>
                                    <div>• <strong>Identical Plaintext:</strong> Same ciphertext only with same IV</div>
                                    <div>• <strong>Reordering:</strong> Changes all resulting cipher blocks</div>
                                    <div>• <strong>Error Propagation:</strong> Error affects all following blocks</div>
                                </div>
                            </div>
                        </div>

                        <!-- CTR Mode -->
                        <div class="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border-2 border-green-200 dark:border-green-700">
                            <h4 class="font-bold text-lg text-green-600 dark:text-green-400 mb-2">🔢 CTR (Counter Mode) - CONFIDENTIALITY</h4>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p class="text-sm text-green-700 dark:text-green-300 mb-2">Turns block cipher into stream cipher using nonce and counter.</p>
                                    <div class="text-xs space-y-1">
                                        <div><strong>Process:</strong> Encrypt (Nonce + Counter), XOR with plaintext</div>
                                        <div><strong>Counter:</strong> Increments for each block (starts at 0)</div>
                                        <div><strong>Nonce:</strong> Number used once to avoid key reuse</div>
                                        <div><strong>CCMP Use:</strong> AES-CTR for data encryption</div>
                                    </div>
                                </div>
                                <div class="text-xs">
                                    <div><strong class="text-green-600">Security Properties:</strong></div>
                                    <div>• <strong>Identical Plaintext:</strong> Different output because of nonce</div>
                                    <div>• <strong>Reordering:</strong> Changes resulting cipher blocks</div>
                                    <div>• <strong>Error Propagation:</strong> Error affects only one block</div>
                                    <div>• <strong>Parallel Processing:</strong> Blocks can be processed independently</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
                        <h5 class="font-bold text-purple-700 dark:text-indigo-300 mb-2">🎯 CCMP Usage Summary</h5>
                        <div class="grid md:grid-cols-2 gap-4 text-xs">
                            <div>
                                <strong class="text-purple-700 dark:text-indigo-400">Data Confidentiality:</strong>
                                <p class="mt-1">AES-CTR mode encrypts the actual data payload, ensuring it cannot be read by unauthorized parties.</p>
                            </div>
                            <div>
                                <strong class="text-purple-700 dark:text-purple-400">Data Integrity:</strong>
                                <p class="mt-1">AES CBC-MAC creates authentication codes that prove data integrity and source authentication.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        initLogic: () => { animateCards(); }
    },
    "na_log_management": {
    title: "Log Management: From Collection to Analysis",
    subtitle: "The systematic process of collecting, processing, and analyzing log data for troubleshooting, monitoring, and security analysis.",
    navTitle: "Log Management",
    navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2h2m2-12V7a4 4 0 00-8 0v4h8z"></path></svg>`,
    mainHtml: `
        <div class="space-y-8">
            <div class="glass-card p-6">
                <h3 class="text-2xl font-bold mb-4">Introduction to Logs</h3>
                <p class="text-[var(--text-secondary)] mb-2">Logs are automatically generated, timestamped records of important events that occur within computer systems and applications.  They are crucial for several reasons:</p>
                <ul class="text-sm text-[var(--text-secondary)] list-disc list-inside mb-6 space-y-1">
                    <li><strong>Troubleshooting & Debugging:</strong> Providing detailed information to fix errors and unwanted behavior. </li>
                    <li><strong>Monitoring:</strong> Tracking system performance and status over time. </li>
                    <li><strong>Security & Compliance:</strong> Collecting evidence for security analysis and ensuring policies are met. </li>
                    <li><strong>Analytics:</strong> Gaining insights into user behavior and business trends. </li>
                </ul>
                <div class="grid md:grid-cols-3 gap-4">
                    <div class="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                        <h4 class="font-bold text-lg text-green-700 dark:text-green-400 mb-2">Logs (Events)</h4>
                        <ul class="text-sm text-[var(--text-secondary)] list-disc list-inside space-y-1">
                            <li>Discrete, timestamped messages for a specific event. </li>
                            <li><strong>Ex:</strong> "User login successful" or "Application error".</li>
                        </ul>
                    </div>
                    <div class="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                        <h4 class="font-bold text-lg text-yellow-700 dark:text-yellow-400 mb-2">Metrics</h4>
                        <ul class="text-sm text-[var(--text-secondary)] list-disc list-inside space-y-1">
                            <li>Numerical measurements taken over time. </li>
                            <li><strong>Ex:</strong> "CPU usage is 80%" or "Network traffic amount". </li>
                        </ul>
                    </div>
                    <div class="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                        <h4 class="font-bold text-lg text-orange-700 dark:text-orange-400 mb-2">Traces</h4>
                        <ul class="text-sm text-[var(--text-secondary)] list-disc list-inside space-y-1">
                            <li>The end-to-end journey of a single request through a system. </li>
                            <li><strong>Ex:</strong> "API call flow through multiple microservices". </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="glass-card p-6 sm:p-8">
                <h3 class="text-2xl font-bold mb-6 text-center">The Log Management Pipeline</h3>
                <p class="text-[var(--text-secondary)] text-center text-sm mb-6">The process of turning raw log data into actionable intelligence involves several key phases. </p>
                <div class="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                    <div class="flex flex-col items-center">
                        <div class="w-20 h-20 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center border-2 border-blue-300 dark:border-blue-600">
                            <svg class="w-10 h-10 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v2M7 7h10"></path></svg>
                        </div>
                        <h4 class="font-bold mt-3">1. Collection</h4>
                        <p class="text-xs text-[var(--text-secondary)]">Gathering logs from all sources.</p>
                    </div>
                    <div class="text-2xl text-gray-400 transform rotate-90 md:rotate-0">→</div>
                    <div class="flex flex-col items-center">
                        <div class="w-20 h-20 bg-teal-100 dark:bg-teal-900/40 rounded-full flex items-center justify-center border-2 border-teal-300 dark:border-teal-600">
                           <svg class="w-10 h-10 text-teal-700 dark:text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 0l-3-3m3 3l-3 3M5 21l7-7-7-7M19 21l-7-7 7-7"></path></svg>
                        </div>
                        <h4 class="font-bold mt-3">2. Processing</h4>
                        <p class="text-xs text-[var(--text-secondary)]">Parsing & Normalizing data.</p>
                    </div>
                    <div class="text-2xl text-gray-400 transform rotate-90 md:rotate-0">→</div>
                    <div class="flex flex-col items-center">
                        <div class="w-20 h-20 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center border-2 border-purple-300 dark:border-purple-600">
                            <svg class="w-10 h-10 text-purple-700 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7l8-4 8 4M12 11v10"></path></svg>
                        </div>
                        <h4 class="font-bold mt-3">3. Storage & Indexing</h4>
                        <p class="text-xs text-[var(--text-secondary)]">Storing and organizing for search.</p>
                    </div>
                    <div class="text-2xl text-gray-400 transform rotate-90 md:rotate-0">→</div>
                    <div class="flex flex-col items-center">
                        <div class="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/40 rounded-full flex items-center justify-center border-2 border-yellow-300 dark:border-yellow-600">
                           <svg class="w-10 h-10 text-yellow-700 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2h2m2-12V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <h4 class="font-bold mt-3">4. Analysis</h4>
                        <p class="text-xs text-[var(--text-secondary)]">Searching and finding insights.</p>
                    </div>
                </div>
            </div>

            <div class="glass-card p-6">
                <h3 class="text-2xl font-bold mb-4">Log Collection & Filtering</h3>
                <p class="text-[var(--text-secondary)] mb-6">Centralized log collection is essential, as storing logs locally makes correlation difficult and offers no tamper protection.  The goal is to gather logs from all devices into a central system. </p>
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-bold text-lg mb-3">Collection Methods</h4>
                        <ul class="space-y-3">
                            <li class="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                <strong class="text-blue-600 dark:text-blue-400">Agent-Based</strong>
                                <ul class="mt-2 text-sm text-[var(--text-secondary)] list-disc list-inside space-y-1">
                                    <li>A dedicated software agent is installed on the source device. </li>
                                    <li><strong>Pros:</strong> Pre-filtering, reliable transmission (TLS), buffering for outages, and active response possible. </li>
                                </ul>
                            </li>
                            <li class="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                                <strong class="text-purple-600 dark:text-purple-400">Agentless</strong>
                                 <ul class="mt-2 text-sm text-[var(--text-secondary)] list-disc list-inside space-y-1">
                                    <li>Uses existing protocols; no new software is installed. </li>
                                    <li><strong>Methods:</strong> Includes <strong>Push</strong> (device sends logs) and <strong>Pull</strong> (collector fetches logs). </li>
                                    <li><strong>Pros:</strong> Low overhead, no installation required, reduced polling overhead (Push-based), and more collection control (Pull-based). </li>
                                 </ul>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg mb-3">Protocols & Filtering</h4>
                        <ul class="space-y-3">
                            <li class="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                                <strong class="text-green-600 dark:text-green-400">Syslog/Rsyslog</strong>
                                <ul class="mt-2 text-sm text-[var(--text-secondary)] list-disc list-inside space-y-1">
                                    <li>A standard protocol for system message and event logging. </li>
                                    <li>Rsyslog is an enhanced implementation supporting reliable transport over TCP, TLS encryption, and advanced filtering. </li>
                                </ul>
                            </li>
                            <li class="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                                <strong class="text-orange-600 dark:text-orange-400">Pre-Filtering</strong>
                                <ul class="mt-2 text-sm text-[var(--text-secondary)] list-disc list-inside space-y-1">
                                    <li>Goal is to reduce log volume to the bare minimum to save storage and bandwidth. </li>
                                    <li><strong>Agent-side:</strong> Reduces network traffic by filtering before sending. </li>
                                    <li><strong>Server-side:</strong> Drops unwanted logs after they are received. </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="glass-card p-6">
                 <h3 class="text-2xl font-bold mb-4">Log Processing</h3>
                 <div class="space-y-4">
                     <div class="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                         <h4 class="font-bold text-lg text-purple-600 dark:text-purple-400 mb-2">Parsing</h4>
                         <p class="text-sm text-[var(--text-secondary)]">Parsing transforms raw, unstructured log text into a structured format with distinct fields. This is often done using Regular Expressions (Regex) to define patterns for extracting data from log lines. </p>
                     </div>
                     <div class="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                         <h4 class="font-bold text-lg text-teal-600 dark:text-teal-400 mb-2">Normalization</h4>
                         <p class="text-sm text-[var(--text-secondary)]">Normalization standardizes field names and data formats across different log sources to make data comparable. For example, Apache logs might use <code>remote_addr</code>, IIS logs use <code>c-ip</code>, and firewall logs use <code>src_ip</code> - all of these would be normalized to a consistent field like <code>source.ip</code> for unified analysis. </p>
                     </div>
                     <div class="p-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                         <h4 class="font-bold text-lg text-green-600 dark:text-green-400 mb-2">Indexing</h4>
                         <p class="text-sm text-[var(--text-secondary)]">Indexing organizes parsed logs based on key fields like timestamp or hostname to dramatically improve search performance. This comes at the cost of additional storage and a slower data ingestion rate. </p>
                     </div>
                 </div>
            </div>

            <div class="glass-card p-6">
                <h3 class="text-2xl font-bold mb-4">Log Storage & Retention</h3>
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <h4 class="font-bold text-lg text-[var(--accent-primary)] mb-3">Key Concepts</h4>
                        <div class="space-y-3">
                            <div class="p-3 text-sm bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                                <strong class="text-[var(--text-primary)]">Retention Policy</strong>
                                <p class="mt-1 text-sm text-[var(--text-secondary)]">Defines how long logs are stored, balancing analysis needs with costs and legal regulations like GDPR or PCI-DSS. </p>
                            </div>
                            <div class="p-3 text-sm bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">

                                <strong class="text-[var(--text-primary)]">Scalability</strong>
                                <p class="mt-1 text-sm text-[var(--text-secondary)]">To handle growing data, <strong class="text-green-600 dark:text-green-500">horizontal scaling</strong> (adding more machines) is preferred over <strong class="text-red-600 dark:text-red-500">vertical scaling</strong> (upgrading one machine). </p>
                            </div>
                            <div class="p-3 text-sm bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl">
                                <strong class="text-[var(--text-primary)]">Tool Selection Factors</strong>
                                <p class="mt-1 text-sm text-[var(--text-secondary)]">The best tool depends on the use case, balancing access vs. ingestion speed, cost, scalability, and redundancy needs. </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg text-[var(--accent-primary)] mb-3">Storage Solutions</h4>
                        <div class="space-y-3 text-sm text-[var(--text-secondary)]">
                            <p><strong class="text-blue-600 dark:text-blue-700">Relational DB (SQL):</strong> Structured, with a pre-defined schema. Good for complex queries, but slow ingestion. </p>
                            <p><strong class="text-green-600 dark:text-green-700">NoSQL DB:</strong> Flexible schema (e.g., JSON documents). Ideal for fast ingestion and horizontal scaling of log data. </p>
                            <p><strong class="text-purple-700 dark:text-purple-700">Distributed Storage (HDFS, S3):</strong> For massive volumes, offers redundancy and fault tolerance. Often used for long-term "cold" storage. </p>
                            <p><strong class="text-yellow-700 dark:text-yellow-700">In-Memory DB:</strong> Fastest access times by using RAM, but is costly and not persistent by nature. </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="glass-card p-6">
                 <h3 class="text-2xl font-bold mb-4">Log Analytics</h3>
                 <p class="text-[var(--text-secondary)] mb-6">Log analysis is the process of examining stored logs to extract actionable insights, identify security incidents, and debug problems. </p>
                 <div class="grid lg:grid-cols-3 gap-4">
                     <div class="p-4 bg-[var(--card-bg)] border-l-4 border-blue-500 rounded-r-lg">
                         <h4 class="font-bold text-lg mb-2">Time-Series Analysis</h4>
                         <p class="text-sm text-[var(--text-secondary)]">Analyzing logs over time to identify trends, patterns, and spikes by grouping logs into time buckets and aggregating counts. </p>
                     </div>
                     <div class="p-4 bg-[var(--card-bg)] border-l-4 border-yellow-500 rounded-r-lg">
                         <h4 class="font-bold text-lg mb-2">Anomaly Detection</h4>
                         <p class="text-sm text-[var(--text-secondary)]">Finding outliers using static rules, statistical methods (e.g., Z-score), or machine learning to flag deviations from the norm. </p>
                     </div>
                     <div class="p-4 bg-[var(--card-bg)] border-l-4 border-red-500 rounded-r-lg">
                         <h4 class="font-bold text-lg mb-2">Correlation</h4>
                         <p class="text-sm text-[var(--text-secondary)]">Combining logs from different sources to get a complete picture of an event. This can be <strong class="text-[var(--text-primary)]">Temporal</strong> (linking events close in time) or <strong class="text-[var(--text-primary)]">Entity-based</strong> (linking events by IP address or user). </p>
                     </div>
                 </div>
            </div>
        </div>
    `,
    initLogic: () => { animateCards(); }
},
    "print": {
        title: "Print View",
        subtitle: "Compiled content for printing.",
        navTitle: "Print (2 pages)",
        navIcon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2h2m2-12V7a4 4 0 00-8 0v4h8z"></path></svg>`,
        mainHtml: `              <div class="flex justify-center my-3 no-print gap-4">
                  <button id="trigger-print-btn" class="px-6 py-2.5 bg-green-600 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg transition ease-in-out">
                      Print
                  </button>
                  <button id="download-print-pdf-btn" class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg transition ease-in-out">
                      Download as PDF
                  </button>
              </div>
              <div id="print-content-area" class="print-container"></div>`,
        initLogic: function () {
            const createModuleBlock = (moduleId) => {
                const contentEntry = modulePageContent[moduleId];
                if (!contentEntry) return null;

                const moduleBlock = document.createElement('div');
                moduleBlock.className = 'topic-block';

                let titleText = contentEntry.title || contentEntry.navTitle;

                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = contentEntry.mainHtml;
                tempDiv.querySelectorAll('button, input, script, style, .no-print, [onclick]').forEach(el => el.remove());

                moduleBlock.innerHTML = `<h2>${titleText}</h2>` + tempDiv.innerHTML;
                return moduleBlock;
            };

            const printContainer = document.getElementById('print-content-area');
            printContainer.innerHTML = '';

            const page1 = document.createElement('div');
            page1.className = 'print-page';
            page1.id = 'print-page-1';
            page1.innerHTML = '<div class="print-header"><h1>Exam Overview: Network Architectures</h1><span class="page-number">Page 1 / 2</span></div><div class="content-grid"></div>';

            const page2 = document.createElement('div');
            page2.className = 'print-page';
            page2.id = 'print-page-2';
            page2.innerHTML = '<div class="print-header"><h1>Exam Overview: Network Architectures</h1><span class="page-number">Page 2 / 2</span></div><div class="content-grid"></div>';

            printContainer.append(page1, page2);

            const page1Grid = page1.querySelector('.content-grid');
            const page2Grid = page2.querySelector('.content-grid');

            const p1_cols = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
            p1_cols.forEach(col => { col.className = 'print-column'; page1Grid.appendChild(col); });

            const p2_cols = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
            p2_cols.forEach(col => { col.className = 'print-column'; page2Grid.appendChild(col); });

            // Page 1 Distribution
            p1_cols[0].appendChild(createModuleBlock('na_osi'));
            p1_cols[1].appendChild(createModuleBlock('na_csma_cd'));
            p1_cols[1].appendChild(createModuleBlock('na_wifi_concepts'));
            p1_cols[2].appendChild(createModuleBlock('na_wifi_statemachine'));

            // Page 2 Distribution
            p2_cols[0].appendChild(createModuleBlock('na_wifi_security'));
            p2_cols[1].appendChild(createModuleBlock('na_log_management'));
            p2_cols[2].appendChild(createModuleBlock('na_aes_modes'));

            document.getElementById('trigger-print-btn')?.addEventListener('click', () => window.print());

            document.getElementById('download-print-pdf-btn')?.addEventListener('click', async (e) => {
                const btn = e.currentTarget;
                const originalText = btn.innerHTML;
                if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
                    alert('Error: PDF libraries (jsPDF, html2canvas) not found.');
                    return;
                }
                btn.innerHTML = 'Generating PDF...';
                btn.disabled = true;

                try {
                    const { jsPDF } = window.jspdf;
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth();

                    const page1 = document.getElementById('print-page-1');
                    const page2 = document.getElementById('print-page-2');

                    const captureOptions = {
                        scale: 3,
                        useCORS: true,
                        width: page1.scrollWidth,
                        height: page1.scrollHeight,
                        windowWidth: page1.scrollWidth,
                        windowHeight: page1.scrollHeight
                    };

                    const addImageToPdf = (canvas, pdfInstance) => {
                        const imgData = canvas.toDataURL('image/png', 1.0);
                        const props = pdfInstance.getImageProperties(imgData);
                        const pageHeight = pdfInstance.internal.pageSize.getHeight();
                        const imgHeight = (props.height * pdfWidth) / props.width;
                        let heightLeft = imgHeight;
                        let position = 0;

                        pdfInstance.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                        heightLeft -= pageHeight;

                        while (heightLeft > 0) {
                            position = heightLeft - imgHeight;
                            pdfInstance.addPage();
                            pdfInstance.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                            heightLeft -= pageHeight;
                        }
                    };

                    const canvas1 = await html2canvas(page1, captureOptions);
                    addImageToPdf(canvas1, pdf);

                    if (page2 && page2.childElementCount > 1) {
                        pdf.addPage();
                        const canvas2 = await html2canvas(page2, captureOptions);
                        addImageToPdf(canvas2, pdf);
                    }

                    pdf.save('Network-Architectures_Overview.pdf');
                } catch (error) {
                    console.error("PDF generation failed:", error);
                    alert("PDF creation failed. Please try the browser's print function.");
                } finally {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }
            });
        }
    }
};

// Helper function to be used in initLogic animateCards() and initSVGPlaceholders() can be found in utils.js