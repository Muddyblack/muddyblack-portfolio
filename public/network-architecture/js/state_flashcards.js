const flashcardState = {
    storageKey: 'dbv-flashcards-progress_v3',
    aiCardsKey: 'dbv-flashcards-ai-cards_v1',
    customCardsKey: 'dbv-flashcards-custom-cards_v1',
    initialContent: {
        "na1": {
            question: "What is CSMA/CD and how does it work in Ethernet networks?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">CSMA/CD (Carrier Sense Multiple Access with Collision Detection)</h3>
                         <p class="mb-4">This is a protocol that governs access to a shared medium (like an old coaxial cable) in wired networks.</p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>Carrier Sense (CS):</strong> Before a device sends, it <strong class="text-[var(--accent-primary)]">listens</strong> to see if the medium is free ("Listen before talk").</li>
                             <li><strong>Multiple Access (MA):</strong> Multiple devices share the same transmission medium.</li>
                             <li><strong>Collision Detection (CD):</strong> While sending, the device continues to <strong class="text-[var(--accent-primary)]">listen</strong>. If it receives data that is not its own, it detects a collision. This is mainly relevant for half-duplex Ethernet.</li>
                         </ul>
                       </div>`
        },
        "na2": {
            question: "What happens when a collision occurs in a CSMA/CD network?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Collision Handling in CSMA/CD</h3>
                         <p class="mb-4">When a collision is detected, a clearly defined process follows:</p>
                         <ol class="list-decimal list-inside pl-4 space-y-2">
                             <li><strong>Stop Sending:</strong> All involved devices immediately stop their transmission.</li>
                             <li><strong>Send Jam Signal:</strong> The devices send a short <strong class="text-[var(--accent-primary)]">jam signal</strong> to ensure all other devices on the network also notice the collision.</li>
                             <li><strong>Backoff Algorithm:</strong> Each device waits a <strong class="text-[var(--accent-primary)]">random amount of time</strong> (exponential backoff) before attempting to send again. The randomness reduces the likelihood of another collision.</li>
                             <li><strong>Retry:</strong> After the waiting period expires, the process starts over with listening to the medium (Carrier Sense).</li>
                         </ol>
                       </div>`
        },
        "na3": {
            question: "What is CSMA/CA and why is it used in Wi-Fi instead of CSMA/CD?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">CSMA/CA (Collision Avoidance)</h3>
                         <p class="mb-4">In contrast to CSMA/CD, CSMA/CA tries to <strong class="text-[var(--accent-primary)]">avoid</strong> collisions from the outset, rather than just detecting them.</p>
                         <p class="mb-2"><strong>Why in Wi-Fi?</strong></p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li><strong>No Simultaneous Sending/Receiving:</strong> Radio devices cannot reliably send and listen for collisions at the same time (half-duplex).</li>
                             <li><strong>Hidden Station Problem:</strong> Two devices can hear the Access Point (AP) but not each other. They would send simultaneously, causing a collision at the AP without realizing it.</li>
                         </ul>
                          <p class="mb-2 mt-3"><strong>How does it work?</strong></p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li>Devices wait a defined time (DIFS) and a random backoff timer before sending, even if the medium appears free.</li>
                         </ul>
                       </div>`
        },
        "na4": {
            question: "Explain the 'Hidden Station Problem' and the RTS/CTS solution.",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Hidden Station Problem & Solution</h3>
                         <p class="mb-2"><strong>Problem:</strong></p>
                         <p class="mb-4">Station A and Station C can both see the Access Point (B), but not each other. If A sends, C does not know the medium is busy at B and might also send, leading to a collision at the AP.</p>
                         <p class="mb-2"><strong>Solution: RTS/CTS (Request to Send / Clear to Send)</strong></p>
                         <ol class="list-decimal list-inside pl-4 space-y-2">
                             <li>Station A sends an <strong class="text-[var(--accent-primary)]">RTS</strong> frame to the AP, requesting permission to send.</li>
                             <li>The AP replies with a <strong class="text-[var(--accent-primary)]">CTS</strong> frame. This frame is heard by all stations within the AP's range, including Station C.</li>
                             <li>Station C hears the CTS and knows the medium will be busy for a specific time (indicated in the frame). It sets its internal timer (NAV) and remains silent.</li>
                             <li>Station A can now send to the AP without risk of collision from C.</li>
                         </ol>
                       </div>`
        },
        "na5": {
            question: "What are the three main states in the 802.11 connection state machine?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">802.11 Connection States</h3>
                         <p class="mb-4">A client goes through three states to establish a fully functional connection.</p>
                         <ol class="list-decimal list-inside pl-4 space-y-3">
                             <li><strong>State 1: Unauthenticated & Unassociated</strong><br>
                             Initial state. The client is not connected to any AP. Only Class 1 management frames (e.g., Probe Requests, Authentication Requests) are allowed.</li>
                             <li><strong>State 2: Authenticated & Unassociated</strong><br>
                             The client has successfully authenticated with the AP (e.g., via Open System Auth) but has not yet established a connection for data distribution. Class 1 and 2 frames (e.g., Association Requests) are allowed.</li>
                             <li><strong>State 3: Authenticated & Associated</strong><br>
                             The client is fully connected and can send and receive data. All frame classes (1, 2, and 3) are allowed. This is the normal operating state.</li>
                         </ol>
                       </div>`
        },
        "na6": {
            question: "What are the three classes of 802.11 frames and what are they used for?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">802.11 Frame Classes</h3>
                         <p class="mb-4">802.11 communication uses three main types of frames:</p>
                         <ul class="list-disc list-inside pl-4 space-y-3">
                             <li><strong>Class 1: Management Frames</strong><br>
                             Used to establish and manage connections. Examples are <strong class="text-[var(--accent-primary)]">Probe</strong> (to find networks), <strong class="text-[var(--accent-primary)]">Authentication</strong> (to confirm identity), and <strong class="text-[var(--accent-primary)]">Association</strong> (to connect to the AP).</li>
                             <li><strong>Class 2: Control Frames</strong><br>
                             Help to control access to the medium and confirm receipt. Examples are <strong class="text-[var(--accent-primary)]">RTS/CTS</strong> (to reserve the medium) and <strong class="text-[var(--accent-primary)]">ACK</strong> (acknowledgment of receipt).</li>
                             <li><strong>Class 3: Data Frames</strong><br>
                             Transport the actual user data from the upper layers (e.g., IP packets).</li>
                         </ul>
                       </div>`
        },
        "na7": {
            question: "Why was WEP (Wired Equivalent Privacy) fundamentally insecure?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">The Weaknesses of WEP</h3>
                         <p class="mb-4">WEP was the first attempt to secure Wi-Fi and suffered from serious design flaws:</p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>Static Key:</strong> All users shared the same secret key, which was rarely changed.</li>
                             <li><strong>Small IV (Initialization Vector):</strong> The 24-bit IV was too short and had to repeat quickly on a busy network. Since the keystream depended on <code class="text-sm bg-gray-700 px-1 rounded">IV || Key</code>, this led to <strong class="text-[var(--accent-primary)]">keystream reuse</strong>.</li>
                             <li><strong>Weak RC4 Cipher:</strong> The way WEP used the RC4 stream cipher had statistical weaknesses that allowed for key recovery.</li>
                             <li><strong>No Integrity Protection:</strong> WEP used an insecure CRC32 checksum. An attacker could flip bits in the encrypted message and adjust the checksum accordingly without being detected.</li>
                         </ul>
                       </div>`
        },
        "na8": {
            question: "How did WPA improve security compared to WEP?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Improvements with WPA (Wi-Fi Protected Access)</h3>
                         <p class="mb-4">WPA was developed as an interim solution to close WEP's gaps on existing hardware.</p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>TKIP (Temporal Key Integrity Protocol):</strong> Instead of a static key, TKIP generated a new, temporary key for each data packet. This prevented keystream reuse.</li>
                             <li><strong>MIC (Message Integrity Code):</strong> WPA replaced the insecure CRC32 checksum with a cryptographic hash called "Michael". This provided <strong class="text-[var(--accent-primary)]">stronger integrity protection</strong> and prevented undetected packet tampering.</li>
                             <li><strong>IV Sequencing:</strong> The IV was used as a sequence counter, which prevented <strong class="text-[var(--accent-primary)]">replay attacks</strong> where old packets are resent.</li>
                         </ul>
                         <p class="mt-4">Although WPA still used the RC4 cipher, these improvements made it significantly more secure than WEP.</p>
                       </div>`
        },
        "na9": {
            question: "Explain the purpose and process of the WPA2 4-Way Handshake.",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">The 4-Way Handshake</h3>
                         <p class="mb-2"><strong>Purpose:</strong></p>
                         <p class="mb-4">The main purpose is to derive a fresh, unique session key (the <strong class="text-[var(--accent-primary)]">Pairwise Transient Key, PTK</strong>) for a client without sending the long-term master key (the <strong class="text-secondary">Pairwise Master Key, PMK</strong>) over the air.</p>
                         <p class="mb-2"><strong>Simplified Process (4 messages):</strong></p>
                         <ol class="list-decimal list-inside pl-4 space-y-2">
                             <li><strong>AP to Client:</strong> The AP sends a random number (ANonce).</li>
                             <li><strong>Client to AP:</strong> The client sends its own random number (SNonce). Now both sides have all the information (PMK, ANonce, SNonce, MAC addresses) to independently calculate the same PTK.</li>
                             <li><strong>AP to Client:</strong> The AP installs the PTK, encrypts the group key (GTK) with it, and sends it to the client.</li>
                             <li><strong>Client to AP:</strong> The client installs the PTK and GTK and sends a confirmation. The connection is now secure.</li>
                         </ol>
                       </div>`
        },
        "na10": {
            question: "What is the difference between WPA2-Personal (PSK) and WPA2-Enterprise (802.1X)?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">WPA2: Personal vs. Enterprise</h3>
                         <p class="mb-4">Both modes use CCMP/AES for encryption but differ fundamentally in authentication.</p>
                         <p class="mb-2"><strong>WPA2-Personal (Pre-Shared Key - PSK):</strong></p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li><strong>Authentication:</strong> Based on a single <strong class="text-[var(--accent-primary)]">password (passphrase)</strong> shared among all users and devices.</li>
                             <li><strong>Use Case:</strong> Home networks, small offices.</li>
                             <li><strong>Disadvantage:</strong> If a device or user is compromised, the password must be changed on all devices. No individual tracking.</li>
                         </ul>
                         <p class="mb-2"><strong>WPA2-Enterprise (802.1X):</strong></p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>Authentication:</strong> Requires a central authentication server (<strong class="text-[var(--accent-primary)]">RADIUS server</strong>). Each user authenticates with their <strong class="text-[var(--accent-primary)]">own credentials</strong> (e.g., username/password or certificate).</li>
                             <li><strong>Use Case:</strong> Large enterprises, universities, public institutions.</li>
                             <li><strong>Advantage:</strong> High security, centralized management, individual permissions, and easy revocation of access for individual users.</li>
                         </ul>
                       </div>`
        },
        "na11": {
            question: "What is a KRACK attack and how does it exploit the WPA2 4-Way Handshake?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">KRACK (Key Reinstallation Attack)</h3>
                         <p class="mb-4">KRACK is an attack on WPA2 that forces a client to reinstall an already-used session key (PTK).</p>
                         <p class="mb-2"><strong>Attack Procedure:</strong></p>
                         <ol class="list-decimal list-inside pl-4 space-y-2">
                             <li>The attacker acts as a man-in-the-middle between the client and the AP.</li>
                             <li>The client receives Message 3 of the handshake from the AP and installs the PTK. It sends Message 4 (confirmation) to the AP.</li>
                             <li>The attacker <strong class="text-[var(--accent-primary)]">blocks Message 4</strong>, so the AP never receives it.</li>
                             <li>Since the AP doesn't get a confirmation, it <strong class="text-[var(--accent-primary)]">resends Message 3</strong>.</li>
                             <li>The client receives Message 3 a second time. According to the standard, it <strong class="text-[var(--accent-primary)]">reinstalls the same PTK</strong>, resetting the associated counter (nonce/replay counter) to its initial value.</li>
                             <li>By reusing the nonce, the attacker can now decrypt or forge packets.</li>
                         </ol>
                       </div>`
        },
        "na12": {
            question: "What are the main security improvements in WPA3?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">WPA3: The Next Generation of Wi-Fi Security</h3>
                         <p class="mb-4">WPA3 addresses key weaknesses of WPA2 and introduces new security standards.</p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>SAE (Simultaneous Authentication of Equals):</strong> Replaces the vulnerable PSK method. It's a secure key exchange that <strong class="text-[var(--accent-primary)]">prevents offline dictionary attacks</strong> and provides <strong class="text-[var(--accent-primary)]">Forward Secrecy</strong>.</li>
                             <li><strong>Enhanced Open Networks (OWE):</strong> Introduces <strong class="text-[var(--accent-primary)]">unauthenticated encryption</strong> for public, open Wi-Fi networks. Each user gets an individual encryption key, preventing passive eavesdropping.</li>
                             <li><strong>Stronger Encryption (Enterprise):</strong> Requires at least 192-bit security and forbids outdated protocols.</li>
                             <li><strong>KRACK Protection:</strong> The protocol has been adapted so that reinstallation of keys is no longer possible.</li>
                         </ul>
                       </div>`
        },
        "na13": {
            question: "How does SAE (Simultaneous Authentication of Equals) in WPA3 prevent offline dictionary attacks?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">SAE Protection Mechanism</h3>
                         <p class="mb-4">SAE (also called "Dragonfly Key Exchange") prevents offline attacks through an interactive process, rather than just using a static hash.</p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>No Direct Password Hash:</strong> Unlike WPA2, a simple hash of the password is not exchanged. Instead, the password is used as part of a complex <strong class="text-[var(--accent-primary)]">Elliptic-Curve key exchange</strong>.</li>
                             <li><strong>Interactive Process:</strong> An attacker who captures the handshake cannot verify the validity of a guessed password offline. For <strong class="text-[var(--accent-primary)]">every single guess</strong>, they must send a new handshake message to the AP and wait for its response.</li>
                             <li><strong>Resource-Intensive:</strong> This turns the attack into an online attack, which is extremely slow and noticeable, instead of testing millions of passwords per second offline. It makes brute-force attacks practically impossible.</li>
                         </ul>
                       </div>`
        },
        "na14": {
            question: "What is OWE (Opportunistic Wireless Encryption) and what problem does it solve?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">OWE: Security for Open Networks</h3>
                         <p class="mb-2"><strong>Problem:</strong></p>
                         <p class="mb-4">Traditional open Wi-Fi networks (e.g., in cafes, airports) are unencrypted. Anyone within range can read all traffic.</p>
                         <p class="mb-2"><strong>Solution with OWE:</strong></p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li>OWE provides <strong class="text-[var(--accent-primary)]">automatic, individual encryption</strong> for each client without requiring a password.</li>
                             <li>During the connection process, the client and AP perform an unsecured <strong class="text-[var(--accent-primary)]">Diffie-Hellman key exchange</strong>.</li>
                             <li>The result is a unique session key for each user, which encrypts their traffic.</li>
                             <li><strong>Result:</strong> This protects against <strong class="text-[var(--accent-primary)]">passive eavesdropping</strong>. However, it provides no authentication and therefore does not protect against active man-in-the-middle attacks.</li>
                         </ul>
                       </div>`
        },
        "na15": {
            question: "How does Fast Roaming (802.11r) speed up the handover between Access Points?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Fast BSS Transition (802.11r)</h3>
                         <p class="mb-2"><strong>Problem with Standard Roaming:</strong></p>
                         <p class="mb-4">When switching to a new AP, the client must go through the entire authentication and 4-way handshake process again. This can take 300-800ms and leads to interruptions, e.g., in VoIP calls.</p>
                         <p class="mb-2"><strong>Solution with Fast Roaming:</strong></p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>Key Preparation:</strong> The original AP forwards the necessary master keys (PMK-R0, PMK-R1) over the wired network (<strong class="text-[var(--accent-primary)]">Distribution System</strong>) to neighboring APs before the client even roams.</li>
                             <li><strong>Shortened Handshake:</strong> When the client roams to the new AP, the master key is already present. The complete 4-way handshake is skipped. Only a brief authentication and association exchange takes place.</li>
                             <li><strong>Result:</strong> The handover time is reduced to <strong class="text-[var(--accent-primary)]">under 50ms</strong>, enabling a seamless connection.</li>
                         </ul>
                       </div>`
        },
        "na16": {
            question: "What is a Wi-Fi Mesh network (802.11s) and how does it establish connections?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Wi-Fi Mesh Networks</h3>
                         <p class="mb-4">A mesh network is a decentralized topology where access points (called <strong class="text-secondary">Mesh Points, MP</strong>) communicate with each other wirelessly to extend network coverage, without each AP needing a wired connection. An MP with a wired connection is called a <strong class="text-secondary">Root MP</strong>.</p>
                         <p class="mb-2"><strong>Connection Setup (Mesh Peering):</strong></p>
                         <ol class="list-decimal list-inside pl-4 space-y-2">
                             <li><strong>Discovery:</strong> MPs find potential neighbors by sending <strong class="text-[var(--accent-primary)]">Mesh Probe Requests</strong> or listening for beacons.</li>
                             <li><strong>Authentication:</strong> Two MPs wanting to establish a connection authenticate each other using <strong class="text-[var(--accent-primary)]">SAE</strong> to create a secure channel.</li>
                             <li><strong>Link Establishment:</strong> They exchange capabilities and send each other "Peer Link Open" and "Peer Link Confirm" messages to formally establish the connection.</li>
                         </ol>
                         <p class="mt-4">Once the link is established, data can be forwarded over multiple hops using routing protocols like HWMP.</p>
                       </div>`
        },
        "na17": {
            question: "What are the three main types of data in log management?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Log Data: Logs, Metrics, Traces</h3>
                         <p class="mb-4">These three data types provide different insights into a system.</p>
                         <ul class="list-disc list-inside pl-4 space-y-3">
                             <li><strong>Logs:</strong><br>
                             <strong class="text-[var(--accent-primary)]">Discrete, timestamped events.</strong> They answer the question "What happened?". Examples: User login, application error, firewall blocked a connection.</li>
                             <li><strong>Metrics:</strong><br>
                             <strong class="text-[var(--accent-primary)]">Numerical measurements over time.</strong> They answer the question "What is the state?". Examples: CPU utilization in percent, network throughput in MB/s, number of active users. Metrics are aggregated and optimized for monitoring.</li>
                             <li><strong>Traces:</strong><br>
                             <strong class="text-[var(--accent-primary)]">The path of a single request through multiple systems.</strong> They answer the question "Where is the problem/delay?". Example: Tracking a web request from the load balancer through the web server to the database and back.</li>
                         </ul>
                       </div>`
        },
        "na18": {
            question: "Compare agent-based and agent-less log collection.",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Methods of Log Collection</h3>
                         <p class="mb-4">The choice of method depends on the requirements for reliability, security, and administrative effort.</p>
                         <p class="mb-2"><strong>Agent-based:</strong></p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li><strong>How:</strong> A dedicated software (agent) is installed on the source system.</li>
                             <li><strong>Advantages:</strong> <strong class="text-[var(--accent-primary)]">Reliable</strong> (can buffer during network outages), <strong class="text-[var(--accent-primary)]">efficient</strong> (can filter/compress logs before sending), <strong class="text-[var(--accent-primary)]">secure</strong> (encrypted transmission via TLS).</li>
                             <li><strong>Disadvantages:</strong> Installation and maintenance overhead for the agent.</li>
                         </ul>
                         <p class="mb-2"><strong>Agent-less:</strong></p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>How:</strong> Uses native protocols. Either <strong class="text-secondary">Push</strong> (system sends logs, e.g., via Syslog) or <strong class="text-secondary">Pull</strong> (central collector fetches logs, e.g., via SSH/API).</li>
                             <li><strong>Advantages:</strong> No additional software installation required on the endpoints.</li>
                             <li><strong>Disadvantages:</strong> Often <strong class="text-[var(--accent-primary)]">less reliable</strong> (e.g., data loss with UDP Syslog), potentially insecure, no buffering.</li>
                         </ul>
                       </div>`
        },
        "na19": {
            question: "What is the purpose of log parsing and normalization?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Bringing Structure to Log Data</h3>
                         <p class="mb-4">These two steps are crucial for turning raw log data into usable information.</p>
                         <p class="mb-2"><strong>1. Parsing (Field Extraction):</strong></p>
                         <ul class="list-disc list-inside mb-4 pl-4 space-y-2">
                             <li><strong>What:</strong> Breaks down an unstructured log line into structured <strong class="text-[var(--accent-primary)]">key-value pairs</strong>. This is often done with regular expressions (Regex).</li>
                             <li><strong>Example:</strong> <code class="text-sm bg-gray-700 px-1 rounded">192.168.1.10 - "GET /login" 200</code> becomes <code class="text-sm bg-gray-700 px-1 rounded">src_ip="192.168.1.10", method="GET", status=200</code>.</li>
                             <li><strong>Why:</strong> This is what makes the data searchable and usable for analysis.</li>
                         </ul>
                         <p class="mb-2"><strong>2. Normalization (Standardization):</strong></p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>What:</strong> Unifies field names from different log sources to a common schema (e.g., Common Information Model, CIM).</li>
                             <li><strong>Example:</strong> The fields <code class="text-sm bg-gray-700 px-1 rounded">src_ip</code>, <code class="text-sm bg-gray-700 px-1 rounded">SourceAddress</code>, and <code class="text-sm bg-gray-700 px-1 rounded">client.ip</code> all become the standard field <strong class="text-[var(--accent-primary)]">src_ip</strong>.</li>
                             <li><strong>Why:</strong> Allows for correlation and analysis of events across different systems.</li>
                         </ul>
                       </div>`
        },
        "na20": {
            question: "Explain the main components of a Splunk architecture.",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">Splunk Architecture</h3>
                         <p class="mb-4">Splunk typically consists of three core components that work together to process log data.</p>
                         <ol class="list-decimal list-inside pl-4 space-y-3">
                             <li><strong>Forwarder:</strong><br>
                             Lightweight agents installed on the source systems (servers, clients). Their sole job is to <strong class="text-[var(--accent-primary)]">collect data and forward it securely to the indexers</strong>.</li>
                             <li><strong>Indexer:</strong><br>
                             The "heart" of Splunk. They receive the data, <strong class="text-[var(--accent-primary)]">process (parse) it, and store it in indexes</strong> (called "buckets"). They execute the actual search queries. In large environments, they are often set up as a cluster.</li>
                             <li><strong>Search Head:</strong><br>
                             The web interface (GUI) for users. A user enters a search query in SPL (Splunk Processing Language). The Search Head <strong class="text-[var(--accent-primary)]">distributes the query to the indexers</strong>, collects the results, and presents them to the user (e.g., in tables or dashboards).</li>
                         </ol>
                       </div>`
        },
        "na21": {
            question: "What is the Space Data Link Protocol (SDLP) and what are its primary security concerns?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">SDLP: Communication in Space</h3>
                         <p class="mb-4">SDLP is a protocol standardized by CCSDS, designed for reliable data transmission between ground stations and spacecraft (e.g., satellites). It defines the structure of <strong class="text-secondary">Transfer Frames</strong> for telecommands (uplink) and telemetry (downlink).</p>
                         <p class="mb-2"><strong>Primary Security Concerns:</strong></p>
                         <p>The original SDLP was designed in the 80s without considering cybersecurity. Therefore, it lacks basic protection mechanisms:</p>
                         <ul class="list-disc list-inside pl-4 space-y-2">
                             <li><strong>No Confidentiality:</strong> The data is transmitted unencrypted and can be read by anyone with the right equipment.</li>
                             <li><strong>No Integrity:</strong> There is only a simple error detection (CRC), but no protection against targeted data manipulation.</li>
                             <li><strong>No Authentication:</strong> There is no way to ensure that a command comes from the legitimate ground station.</li>
                         </ul>
                         <p class="mt-4">This makes the communication vulnerable to <strong class="text-[var(--accent-primary)]">eavesdropping, spoofing, and replay attacks</strong>.</p>
                       </div>`
        },
        "na22": {
            question: "How does the Space Data Link Security Protocol (SDLSP) add security to SDLP?",
            answer: `<div class="text-left w-full">
                         <h3 class="font-bold text-xl mb-3">SDLSP: Securing SDLP</h3>
                         <p class="mb-4">SDLSP is a security protocol that "wraps" an SDLP frame by adding a Security Header and a Security Trailer. It implements the classic cryptographic security goals:</p>
                         <ul class="list-disc list-inside pl-4 space-y-3">
                             <li><strong>Confidentiality:</strong> The data field of the SDLP frame is encrypted, typically with <strong class="text-[var(--accent-primary)]">AES (e.g., AES-256 GCM)</strong>.</li>
                             <li><strong>Authenticity & Data Integrity:</strong> The <strong class="text-secondary">Security Trailer</strong> contains a <strong class="text-[var(--accent-primary)]">Message Authentication Code (MAC)</strong>, e.g., a GMAC or HMAC. This ensures that the message comes from the correct source and was not altered during transmission.</li>
                             <li><strong>Replay Protection:</strong> The <strong class="text-secondary">Security Header</strong> contains an <strong class="text-[var(--accent-primary)]">anti-replay sequence number</strong>. This ensures an attacker cannot resend old, captured frames.</li>
                         </ul>
                         <p class="mt-4">SDLSP thus turns SDLP into a fully-fledged, secure communication protocol.</p>
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
