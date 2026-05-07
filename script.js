/* =============================================
   ANIMATED PARTICLE CANVAS
   ============================================= */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '0,212,255' : '124,58,237';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animate);
}
animate();

/* =============================================
   NAVBAR SCROLL
   ============================================= */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* =============================================
   HAMBURGER MENU
   ============================================= */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinksEl.classList.remove('open'));
});

/* =============================================
   TYPED TEXT EFFECT
   ============================================= */
const phrases = [
  'Cyber Security Analyst',
  'Penetration Tester',
  'Vulnerability Analyst',
  'Digital Forensics Enthusiast',
  'Security Compliance Specialist',
  'Ethical Hacker',
];
const typedEl = document.getElementById('typed-text');
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = phrase.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typedEl.textContent = phrase.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 75);
}
typeLoop();

/* =============================================
   COUNTER ANIMATION
   ============================================= */
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = Math.floor(current);
  }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number[data-count]').forEach(el => counterObserver.observe(el));

/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.glass-card, .timeline-item, .soft-skill, .section-header'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
/* =============================================
   HACKER FINGERPRINT TERMINAL
   ============================================= */
const hackerBtn = document.getElementById('hacker-btn');
const hackerTerminal = document.getElementById('hacker-terminal');
const terminalBody = document.getElementById('terminal-body');

function addLine(text, cls, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = `terminal-line ${cls}`;
      div.textContent = text;
      terminalBody.appendChild(div);
      terminalBody.scrollTop = terminalBody.scrollHeight;
      resolve();
    }, delay);
  });
}

async function runHackerScan() {
  hackerBtn.disabled = true;
  hackerBtn.textContent = '🔴 SCANNING...';
  hackerTerminal.classList.add('visible');
  terminalBody.innerHTML = '';

  let d = 0;
  const step = 320;

  await addLine('[+] Target acquired. Initiating passive recon...', 'boot', d += step);
  await addLine('[+] No permission needed. No malware required.', 'boot', d += step);
  await addLine('[+] This is what any website silently sees...', 'boot', d += step);
  await addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'sep', d += step);

  // Browser & OS
  const ua = navigator.userAgent;
  let browser = 'Unknown Browser';
  if (ua.includes('Edg/')) browser = 'Microsoft Edge ' + (ua.match(/Edg\/(\S+)/)?.[1] || '');
  else if (ua.includes('OPR/') || ua.includes('Opera')) browser = 'Opera';
  else if (ua.includes('Chrome/') && !ua.includes('Chromium')) browser = 'Google Chrome ' + (ua.match(/Chrome\/(\S+)/)?.[1] || '');
  else if (ua.includes('Firefox/')) browser = 'Mozilla Firefox ' + (ua.match(/Firefox\/(\S+)/)?.[1] || '');
  else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Apple Safari';

  let os = 'Unknown OS';
  if (ua.includes('Windows NT 10.0')) os = 'Windows 10/11';
  else if (ua.includes('Windows NT')) os = 'Windows (Legacy)';
  else if (ua.includes('Mac OS X')) os = 'macOS ' + (ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g,'.') || '');
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android ' + (ua.match(/Android ([\d.]+)/)?.[1] || '');
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  let device = 'Desktop/Laptop';
  if (/Mobi|Android|iPhone|iPad/i.test(ua)) device = 'Mobile / Tablet';

  await addLine('[ BROWSER FINGERPRINT ]', 'key', d += step);
  await addLine(`  Browser         : ${browser}`, 'val', d += step);
  await addLine(`  Operating System: ${os}`, 'val', d += step);
  await addLine(`  Device Type     : ${device}`, 'val', d += step);
  await addLine(`  Language        : ${navigator.language || 'Unknown'}`, 'val', d += step);
  await addLine(`  Cookies Enabled : ${navigator.cookieEnabled ? 'YES ⚠️' : 'No'}`, 'val', d += step);
  await addLine(`  Do Not Track    : ${navigator.doNotTrack === '1' ? 'Enabled' : 'NOT Set ⚠️'}`, 'val', d += step);
  await addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'sep', d += step);

  // Screen
  await addLine('[ DISPLAY & HARDWARE ]', 'key', d += step);
  await addLine(`  Screen          : ${window.screen.width}x${window.screen.height} (${window.devicePixelRatio}x DPI)`, 'val', d += step);
  await addLine(`  Viewport        : ${window.innerWidth}x${window.innerHeight}`, 'val', d += step);
  await addLine(`  Color Depth     : ${window.screen.colorDepth}-bit`, 'val', d += step);
  await addLine(`  CPU Cores       : ${navigator.hardwareConcurrency || 'Unknown'}`, 'val', d += step);
  const mem = navigator.deviceMemory;
  await addLine(`  RAM (approx)    : ${mem ? mem + ' GB' : 'Hidden by browser'}`, 'val', d += step);
  await addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'sep', d += step);

  // Time & Location
  await addLine('[ TIME & LOCATION HINTS ]', 'key', d += step);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localTime = new Date().toLocaleTimeString();
  const localDate = new Date().toLocaleDateString();
  await addLine(`  Timezone        : ${tz}`, 'val', d += step);
  await addLine(`  Local Time      : ${localTime}`, 'val', d += step);
  await addLine(`  Local Date      : ${localDate}`, 'val', d += step);
  const tzOffset = new Date().getTimezoneOffset();
  const offsetHrs = Math.abs(Math.floor(tzOffset/60)).toString().padStart(2,'0');
  const offsetMins = Math.abs(tzOffset % 60).toString().padStart(2,'0');
  const offsetStr = `UTC${tzOffset <= 0 ? '+' : '-'}${offsetHrs}:${offsetMins}`;
  await addLine(`  UTC Offset      : ${offsetStr}`, 'val', d += step);
  await addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'sep', d += step);

  // Network info
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  await addLine('[ NETWORK INFO ]', 'key', d += step);
  if (conn) {
    await addLine(`  Connection Type : ${conn.effectiveType?.toUpperCase() || 'Unknown'}`, 'val', d += step);
    await addLine(`  Downlink Speed  : ~${conn.downlink || '?'} Mbps`, 'val', d += step);
    await addLine(`  Save Data Mode  : ${conn.saveData ? 'ON' : 'OFF'}`, 'val', d += step);
  } else {
    await addLine(`  Connection Type : Not exposed by browser`, 'val', d += step);
  }
  await addLine(`  Online Status   : ${navigator.onLine ? 'ONLINE ✓' : 'OFFLINE'}`, 'val', d += step);

  // Fetch public IP
  addLine('  Fetching IP...  : [...]', 'val', d += step);
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    setTimeout(async () => {
      const ipLine = terminalBody.querySelector('.terminal-line.val:last-child');
      if (ipLine) ipLine.textContent = `  Public IP       : ${data.ip} ⚠️`;
      // Geo from ip-api
      try {
        const geoRes = await fetch(`https://ip-api.com/json/${data.ip}`);
        const geo = await geoRes.json();
        if (geo.status === 'success') {
          await addLine(`  ISP             : ${geo.isp}`, 'val', d + 200);
          await addLine(`  City / Region   : ${geo.city}, ${geo.regionName}`, 'val', d + 400);
          await addLine(`  Country         : ${geo.country} ${geo.countryCode}`, 'val', d + 600);
        }
      } catch(_) {}
      await addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'sep', d + 800);
      await addLine('[!] RECON COMPLETE. You have been profiled.', 'warn', d + 1000);
      await addLine('[!] Imagine if this was malicious. It wasn\'t — but it could have been.', 'warn', d + 1200);
      await addLine('[!] This is why Cybersecurity matters. — Yasindu', 'key', d + 1400);
      setTimeout(() => {
        hackerBtn.textContent = '🔴 Run Again';
        hackerBtn.disabled = false;
        hackerBtn.onclick = runHackerScan;
      }, d + 1600);
    }, 1500);
  } catch(_) {
    await addLine(`  Public IP       : Could not fetch (blocked)`, 'val', d + 300);
    await addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'sep', d + 500);
    await addLine('[!] RECON COMPLETE.', 'warn', d + 700);
    setTimeout(() => {
      hackerBtn.textContent = '🔴 Run Again';
      hackerBtn.disabled = false;
    }, d + 900);
  }

  // Battery API
  if (navigator.getBattery) {
    navigator.getBattery().then(async bat => {
      await addLine(`  Battery         : ${Math.round(bat.level * 100)}% ${bat.charging ? '(Charging ⚡)' : '(Not charging)'}`, 'val', d);
    }).catch(() => {});
  }
}

hackerBtn.addEventListener('click', runHackerScan);
