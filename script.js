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