// Convert Gmail links to mailto on mobile
if (matchMedia('(pointer:coarse)').matches) {
    document.querySelectorAll('a[href*="mail.google.com"]').forEach(a => {
        a.href = 'mailto:salmann4979@gmail.com';
        a.removeAttribute('target');
    });
}

// Interactive terminal
const tOut = document.getElementById('tout');
const tIn = document.getElementById('tin');
const t0 = Date.now();

const PR = '<span class="gr">salman@portfolio</span>:<span class="bl">~</span>$ ';

const esc = x => x.replace(/[&<>]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
}[c]));

const kv = (k, v) =>
    '<span class="cy">' + k.padEnd(10) + '</span>' + v;

const T = {
    help: () => [
        'Available commands:',
        ...[
            ['neofetch', 'system info'],
            ['about', 'who I am'],
            ['ls', 'list my projects'],
            ['skills', 'my tech stack'],
            ['git log', 'my journey'],
            ['contact', 'reach me'],
            ['social', 'my profiles'],
            ['cv', 'download my CV'],
            ['hire', 'open an email to me'],
            ['clear', 'clear screen']
        ].map(([c, d]) => '  <span class="ye">' + c.padEnd(10) + '</span>' + d)
    ].join('\n'),

    neofetch: () => '<div class="neo"><pre>  ____  ______\n / __/ / __/ /\n_\\ \\  / _// /\n/___/ /_/  /_/</pre><div>' + [
        '<span class="gr">salman</span>@<span class="gr">portfolio</span>',
        '-----------------',
        kv('Name', 'Salman Fariz A'),
        kv('Role', 'Co-Founder &amp; CTO, Vikastra Technologies'),
        kv('Study', 'B.Tech Data Science, UKF CET'),
        kv('Stack', 'MERN, C, ESP32, Flutter'),
        kv('Projects', '8 built'),
        kv('Location', 'Kerala, India'),
        kv('Uptime', Math.round((Date.now() - t0) / 1000) + 's on this page')
    ].join('\n') + '</div></div>',

    about: () =>
        'Salman Fariz A\n' +
        'Co-Founder &amp; CTO of <span class="gr">Vikastra Technologies</span>.\n' +
        'B.Tech Data Science student at UKF College of Engineering and Technology.\n' +
        'I build where <span class="ye">hardware</span>, <span class="ye">AI</span> and the <span class="ye">web</span> meet.',

    ls: () => [
        'ev-failure-prediction/',
        'airbnb-clone/',
        'quick-sos-campus/',
        'student-event-management/',
        'duck-robot/',
        'heart-rate-spo2-monitor/',
        'distance-alert-system/',
        'tic-tac-toe-ai/'
    ].map(f => '<span class="bl">' + f + '</span>').join('   '),

    skills: () => [
        kv('web', 'HTML, CSS, JavaScript, React, Node, Express, MongoDB'),
        kv('embedded', 'C, ESP32, servo &amp; DC motors, IR &amp; ultrasonic sensors'),
        kv('apps', 'Flutter, Java Swing, MySQL'),
        kv('data', 'Python, Git')
    ].join('\n'),

    'git log': () => [
        'Earned Full Stack Web Development certificate (Smarted)',
        'Co-founded Vikastra Technologies as CTO',
        'Built Airbnb clone on the MERN stack',
        'Built Quick SOS Campus safety app',
        'Started B.Tech Data Science at UKF CET'
    ].map((m, i) =>
        '<span class="ye">commit ' +
        (0xa3f9c1 - i * 0x1b2e).toString(16) +
        '</span>' +
        (i ? '' : ' <span class="cy">(HEAD -&gt; main)</span>') +
        '\n    ' + m
    ).join('\n\n'),

    contact: () =>
        [
            kv('email', 'salmann4979@gmail.com'),
            kv('phone', '+91 80867 56642'),
            kv('based', 'Kerala, India')
        ].join('\n') +
        '\n\n<span class="dim">tip: type "hire" to email me now</span>',

    social: () => [
        kv('github', 'github.com/salmann4979'),
        kv('linkedin', 'linkedin.com/in/salman-fariz-a-203873409')
    ].join('\n')
};

// Terminal output
const say = (h, c) => {
    const d = document.createElement('div');
    d.className = 'tl ' + (c || '');
    d.innerHTML = h;
    tOut.appendChild(d);
    tOut.scrollTop = tOut.scrollHeight;
};

// Command history
const hist = [];
let hi = 0;

function run(raw) {
    const c = raw.trim().toLowerCase().replace(/\s+/g, ' ');

    say(PR + '<span class="cmdtxt">' + esc(raw.trim()) + '</span>', 'cmd');

    if (!c) return;

    hist.push(c);
    hi = hist.length;

    if (c === 'clear') {
        tOut.innerHTML = '';
        return;
    }

    if (c === 'cv') {
        say('<span class="gr">✔</span> downloading cv.pdf ...');

        const a = document.createElement('a');
        a.href = 'cv.pdf';
        a.download = '';
        document.body.appendChild(a);
        a.click();
        a.remove();
        return;
    }

    if (c === 'hire' || c === 'sudo hire salman') {
        say('<span class="gr">✔ Access granted.</span> Opening email ...');

        const h = document.querySelector('.cta .btn.p').href;

        if (h.startsWith('mailto')) {
            location.href = h;
        } else {
            window.open(h, '_blank');
        }

        return;
    }

    if (c.startsWith('sudo')) {
        return say(
            '<span class="re">salman is not in the sudoers file.</span> Try "hire" ;)'
        );
    }

    if (c === 'cat about.txt') {
        return say(T.about());
    }

    if (T[c]) {
        return say(T[c]());
    }

    say(
        '<span class="re">zsh: command not found:</span> ' +
        esc(c) +
        '\n<span class="dim">type "help" to see available commands</span>'
    );
}

// Terminal form
document.getElementById('tform').addEventListener('submit', e => {
    e.preventDefault();
    run(tIn.value);
    tIn.value = '';
});

// Keyboard navigation and autocomplete
tIn.addEventListener('keydown', e => {

    if (e.key === 'ArrowUp' && hist.length) {
        e.preventDefault();
        hi = Math.max(0, hi - 1);
        tIn.value = hist[hi];
    }

    else if (e.key === 'ArrowDown' && hist.length) {
        e.preventDefault();
        hi = Math.min(hist.length, hi + 1);
        tIn.value = hist[hi] || '';
    }

    else if (e.key === 'Tab') {
        e.preventDefault();

        const v = tIn.value.toLowerCase();

        const m = Object.keys(T)
            .concat(['clear', 'cv', 'hire'])
            .filter(k => k.startsWith(v));

        if (m.length === 1) {
            tIn.value = m[0];
        }

        else if (m.length > 1) {
            say(m.join('   '), 'dim');
        }
    }
});

// Quick command buttons
document.querySelectorAll('.tchip').forEach(b => {
    b.addEventListener('click', () => run(b.dataset.c));
});

// Automatic terminal startup
let tStarted = false;

new IntersectionObserver((es, o) => {

    if (!es[0].isIntersecting || tStarted) return;

    tStarted = true;
    o.disconnect();

    say(
        '<span class="dim">Last login: ' +
        new Date().toDateString() +
        ' on ttys001</span>'
    );

    let i = 0;
    const w = 'neofetch';

    const iv = setInterval(() => {

        tIn.value = w.slice(0, ++i);

        if (i >= w.length) {
            clearInterval(iv);

            setTimeout(() => {
                run(w);
                tIn.value = '';

                say(
                    '<span class="dim">type "help" for more commands</span>'
                );

            }, 300);
        }

    }, 110);

}, { threshold: 0.4 }).observe(document.querySelector('.term'));

/* ==========================================
   SALMAN FARIZ - PORTFOLIO FEATURES
   1. Project Universe
   2. Ask My Portfolio
   3. Digital Fingerprint
   ========================================== */

(() => {
    "use strict";

    // ======================================
    // PROJECT DATA
    // Automatically reads existing project cards
    // ======================================

    const projectsSection = document.querySelector("#projects");
    const aboutSection = document.querySelector("#about");

    if (!projectsSection || !aboutSection) {
        console.warn("Portfolio sections not found.");
        return;
    }

    const projects = [
        ...projectsSection.querySelectorAll(".card")
    ].map((card, index) => ({
        name:
            card.querySelector("h3")?.textContent.trim() ||
            `Project ${index + 1}`,

        stack:
            card.querySelector("small")?.textContent.trim() ||
            "Development Project",

        description:
            card.querySelector("p")?.textContent.trim() ||
            "Explore this project."
    }));

    const escapeHTML = (value) =>
        String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);

    // ======================================
    // 1. PROJECT UNIVERSE
    // ======================================

    const universe = document.createElement("section");

    universe.id = "project-universe";

    universe.innerHTML = `
        <div class="wrap">

            <h2 class="rv">Project Universe</h2>

            <p class="lead rv">
                Explore the work behind the ideas.
                Select a planet to discover a project.
            </p>

            <div class="sf-extra sf-panel sf-universe rv">

                <div class="sf-space">

                    <div class="sf-orbit"
                        style="--orbit:150px;--speed:28s">
                    </div>

                    <div class="sf-orbit"
                        style="--orbit:245px;--speed:38s">
                    </div>

                    <div class="sf-orbit"
                        style="--orbit:340px;--speed:52s">
                    </div>

                    <div class="sf-core">SF</div>

                    <div id="sf-planets"></div>

                </div>

                <article class="sf-project-info">

                    <span class="sf-kicker">
                        Selected Project
                    </span>

                    <h3 id="sf-project-name">
                        Choose a planet
                    </h3>

                    <div class="sf-tags"
                        id="sf-project-stack">
                    </div>

                    <p class="sf-muted"
                        id="sf-project-description">
                        Each planet represents one of your projects.
                    </p>

                </article>

            </div>
        </div>
    `;

    projectsSection.parentNode.insertBefore(
        universe,
        projectsSection
    );

    const planetHost =
        universe.querySelector("#sf-planets");

    const planetColors = [
        "#777",
        "#aaa",
        "#555",
        "#999",
        "#666",
        "#bbb",
        "#888",
        "#444"
    ];

    projects.forEach((project, index) => {

        const angle =
            (Math.PI * 2 * index / Math.max(projects.length, 1))
            - Math.PI / 2;

        const radius =
            75 + (index % 3) * 48;

        const planet =
            document.createElement("button");

        planet.type = "button";

        planet.className = "sf-planet";

        planet.style.left =
            `calc(50% + ${Math.cos(angle) * radius}px - 27px)`;

        planet.style.top =
            `calc(50% + ${Math.sin(angle) * radius}px - 27px)`;

        planet.style.background =
            `radial-gradient(circle at 30% 25%,
            ${planetColors[index % planetColors.length]},
            #222 58%, #07070b 82%)`;

        planet.textContent =
            String(index + 1).padStart(2, "0");

        planet.setAttribute(
            "aria-label",
            project.name
        );

        planet.setAttribute(
            "aria-pressed",
            index === 0 ? "true" : "false"
        );

        planet.addEventListener("click", () => {
            selectProject(index);
        });

        planetHost.appendChild(planet);

    });

    function selectProject(index) {

        const project = projects[index];

        if (!project) return;

        universe.querySelector(
            "#sf-project-name"
        ).textContent = project.name;

        universe.querySelector(
            "#sf-project-description"
        ).textContent = project.description;

        universe.querySelector(
            "#sf-project-stack"
        ).innerHTML = project.stack
            .split(/[,·|]/)
            .map(item => `
                <span class="sf-tag">
                    ${escapeHTML(item.trim())}
                </span>
            `)
            .join("");

        [...planetHost.children].forEach(
            (planet, planetIndex) => {

                planet.setAttribute(
                    "aria-pressed",
                    String(planetIndex === index)
                );

            }
        );

    }

    if (projects.length > 0) {
        selectProject(0);
    }

    // ======================================
    // 2. DIGITAL FINGERPRINT
    // ======================================

    const fingerprint = document.createElement("div");

    fingerprint.className = "sf-extra";

    fingerprint.innerHTML = `

        <div class="sf-panel sf-fingerprint rv">

            <div class="sf-finger-art">

                <svg viewBox="0 0 220 220"
                    role="img"
                    aria-label="Digital fingerprint">

                    <path d="
                    M110 18C62 18 30 54 30 101c0 22 5 43 13 62
                    M110 34c-38 0-64 29-64 67 0 25 5 44 13 62
                    M110 50c-29 0-48 22-48 52 0 28 6 48 16 66
                    M110 66c-20 0-32 16-32 37 0 28 7 48 19 67
                    M110 82c-11 0-17 9-17 21 0 25 7 45 18 62
                    M110 18c48 0 80 36 80 83 0 29-7 56-21 80
                    M110 34c38 0 64 29 64 67 0 34-9 61-25 84
                    M110 50c29 0 48 22 48 52 0 35-10 63-27 84
                    M110 66c20 0 32 16 32 37 0 34-10 60-25 82
                    M110 82c11 0 17 9 17 21 0 30-10 53-22 75
                    M110 98c4 0 7 4 7 9 0 22-5 42-7 55
                    "/>

                </svg>

            </div>

            <div class="sf-identity">

                <span class="sf-kicker">
                    Digital Identity
                </span>

                <div class="sf-signature">
                    SALMAN FARIZ
                </div>

                <div class="sf-role">
                    DEVELOPER · BUILDER · LEARNER
                </div>

                <div class="sf-traits">

                    <span>Full Stack Development</span>

                    <span>Embedded Systems</span>

                    <span>Problem Solving</span>

                    <span>Vikastra Technologies</span>

                </div>

                <span class="sf-muted">
                    A visual signature for my work.
                </span>

            </div>

        </div>

    `;

    const aboutWrap =
        aboutSection.querySelector(".wrap");

    if (aboutWrap) {
        aboutWrap.appendChild(
            fingerprint.firstElementChild
        );
    }

    // ======================================
    // 3. ASK MY PORTFOLIO
    // ======================================

    const launcher =
        document.createElement("button");

    launcher.className =
        "sf-chat-launch";

    launcher.type = "button";

    launcher.textContent = "✦";

    launcher.setAttribute(
        "aria-label",
        "Open Ask My Portfolio"
    );

    const chat =
        document.createElement("div");

    chat.className =
        "sf-panel sf-chat";

    chat.setAttribute("role", "dialog");

    chat.innerHTML = `

        <div class="sf-chat-head">

            <div>

                <strong>Ask My Portfolio</strong>

                <div class="sf-muted">
                    ● Online · Portfolio Guide
                </div>

            </div>

            <button type="button"
                class="sf-quick"
                id="sf-chat-close">
                ×
            </button>

        </div>

        <div class="sf-chat-log"
            id="sf-chat-log"
            aria-live="polite">

            <div class="sf-msg">
                Hi! I'm your portfolio assistant.
                Ask me anything about Salman Fariz.
            </div>

        </div>

        <div class="sf-quick-row">

            <button class="sf-quick"
                data-q="What are your skills?">
                Skills
            </button>

            <button class="sf-quick"
                data-q="Tell me about your projects.">
                Projects
            </button>

            <button class="sf-quick"
                data-q="What is your education?">
                Education
            </button>

        </div>

        <form class="sf-chat-form"
            id="sf-chat-form">

            <input
                id="sf-chat-input"
                placeholder="Ask a question..."
                autocomplete="off"
                aria-label="Your question"
            >

            <button type="submit">
                Send
            </button>

        </form>

    `;

    document.body.append(
        launcher,
        chat
    );

    launcher.addEventListener("click", () => {
        chat.classList.toggle("open");
    });

    chat.querySelector(
        "#sf-chat-close"
    ).addEventListener("click", () => {
        chat.classList.remove("open");
    });

    const chatLog =
        chat.querySelector("#sf-chat-log");

    // ======================================
    // ASSISTANT KNOWLEDGE BASE
    // ======================================

    function getAnswer(question) {

        const q = question.toLowerCase();

        const aboutText =
            aboutSection.innerText;

        if (
            /skill|technology|stack|language/.test(q)
        ) {
            return `
Salman's listed technical skills include:

HTML, CSS, JavaScript, React,
Node.js, Express, MongoDB,
C, Java, Python, MySQL,
Flutter, ESP32 and Git.
            `.trim();
        }

        if (
            /project|work|built|portfolio/.test(q)
        ) {

            if (!projects.length) {
                return "Please explore the Projects section.";
            }

            return projects.map(
                (project, index) =>
                    `${index + 1}. ${project.name} — ${project.stack}`
            ).join("\n");

        }

        if (
            /education|college|study|cgpa/.test(q)
        ) {
            return `
Salman is a B.Tech Data Science student
at UKF College of Engineering and Technology, Kerala.
The portfolio lists an 8.33 CGPA.
            `.trim();
        }

        if (
            /experience|startup|vikastra|role|cto/.test(q)
        ) {
            return `
Salman is Co-Founder & CTO of
Vikastra Technologies.
            `.trim();
        }

        if (
            /contact|email|hire|phone/.test(q)
        ) {
            return `
Email: salmann4979@gmail.com
Phone: +91 80867 56642

Please use the Contact section to connect.
            `.trim();
        }

        if (
            /who|about|salman/.test(q)
        ) {
            return aboutText;
        }

        return `
I can answer questions about:

• Skills
• Projects
• Education
• Experience
• Contact information

Try asking about one of these topics.
        `.trim();

    }

    // ======================================
    // CHAT MESSAGE HANDLER
    // ======================================

    function sendMessage(message) {

        const question =
            message.trim();

        if (!question) return;

        const userMessage =
            document.createElement("div");

        userMessage.className =
            "sf-msg user";

        userMessage.textContent =
            question;

        chatLog.appendChild(userMessage);

        const botMessage =
            document.createElement("div");

        botMessage.className =
            "sf-msg";

        botMessage.textContent =
            getAnswer(question);

        chatLog.appendChild(botMessage);

        chatLog.scrollTop =
            chatLog.scrollHeight;

    }

    // Chat form

    chat.querySelector(
        "#sf-chat-form"
    ).addEventListener("submit", event => {

        event.preventDefault();

        const input =
            chat.querySelector("#sf-chat-input");

        sendMessage(input.value);

        input.value = "";

    });

    // Suggested questions

    chat.querySelectorAll(
        "[data-q]"
    ).forEach(button => {

        button.addEventListener("click", () => {

            sendMessage(
                button.dataset.q
            );

        });

    });

    // ======================================
    // REVEAL ANIMATION SUPPORT
    // ======================================

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("in");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        document.querySelectorAll(
            "#project-universe .rv, .sf-fingerprint.rv"
        ).forEach(element => {

            observer.observe(element);

        });

    } else {

        document.querySelectorAll(
            "#project-universe .rv, .sf-fingerprint.rv"
        ).forEach(element => {

            element.classList.add("in");

        });

    }

    console.log(
        "Salman Fariz Portfolio Features Loaded Successfully."
    );

})();
