// --- Nexkit Core Logic Engine ---

const translations = {
  en: {
    level: "Digital Level", compass: "Digital Compass", calc: "Calculator", loan: "Loan Calc",
    converter: "Length Converter", tempConverter: "Temperature Converter", text: "Text Counter",
    crypto: "Hash & Base64", timer: "Timer & Reminder", notes: "Quick Notes", todo: "To-Do List",
    clock: "World Clock", pass: "Password Generator", qr: "QR Code", torch: "Flashlight",
    gps: "GPS Location", settings: "Settings", backup: "Backup Data", addTaskBtn: "Add",
    genPassBtn: "Generate New", getGpsBtn: "Get GPS Location"
  },
  fa: {
    level: "تراز دیجیتال", compass: "قطب‌نما", calc: "ماشین حساب", loan: "محاسبه وام",
    converter: "مبدل طول", tempConverter: "مبدل دما", text: "شمارشگر متن",
    crypto: "هش و کدگذاری", timer: "تایمر و یادآور", notes: "یادداشت سریع", todo: "کارهای روزمره",
    clock: "ساعت جهانی", pass: "تولید رمز عبور", qr: "بارکد QR", torch: "چراغ‌قوه صفحه",
    gps: "موقعیت‌یاب GPS", settings: "تنظیمات", backup: "پشتیبان‌گیری", addTaskBtn: "افزودن",
    genPassBtn: "تولید جدید", getGpsBtn: "دریافت موقعیت"
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = translations[lang] ? lang : 'en';
  localStorage.setItem('nexkit_lang', currentLang);
  document.documentElement.lang = currentLang;
  document.documentElement.dir = (currentLang === 'fa' || currentLang === 'ar') ? 'rtl' : 'ltr';
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang]?.[key]) {
      el.innerText = translations[currentLang][key];
    }
  });
}

function switchTab(tabId, btnElement) {
  document.querySelectorAll('.card').forEach(card => card.style.display = 'none');
  const targetCard = document.getElementById(`tab-${tabId}`);
  if (targetCard) targetCard.style.display = 'block';
  
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  
  localStorage.setItem('nexkit_active_tab', tabId);
}

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('nexkit_theme', isLight ? 'light' : 'dark');
}

// ماشین حساب پایه
function press(val) { document.getElementById('screen').value += val; }
function clearCalc() { document.getElementById('screen').value = ''; }
function calculate() {
  try {
    let res = eval(document.getElementById('screen').value);
    document.getElementById('screen').value = res;
  } catch (e) {
    document.getElementById('screen').value = 'Error';
  }
}

// محاسبه اقساط وام
function calculateLoan() {
  const amount = parseFloat(document.getElementById('loanAmount').value);
  const rate = parseFloat(document.getElementById('loanRate').value) / 100 / 12;
  const months = parseFloat(document.getElementById('loanMonths').value);
  
  if (isNaN(amount) || isNaN(rate) || isNaN(months) || months <= 0) {
    document.getElementById('loanResult').innerText = "Please enter valid numbers.";
    return;
  }
  
  const x = Math.pow(1 + rate, months);
  const monthly = (amount * x * rate) / (x - 1);
  const totalPayment = monthly * months;
  
  document.getElementById('loanResult').innerHTML = `
    Monthly: <strong>${monthly.toFixed(2)}</strong><br>
    Total Pay: <strong>${totalPayment.toFixed(2)}</strong>
  `;
}

// هش و کدگذاری Base64
function encodeBase64() {
  const str = document.getElementById('cryptoInput').value;
  try {
    document.getElementById('cryptoOutput').innerText = btoa(unescape(encodeURIComponent(str)));
  } catch(e) {
    document.getElementById('cryptoOutput').innerText = "Encoding Error";
  }
}

function decodeBase64() {
  const str = document.getElementById('cryptoInput').value;
  try {
    document.getElementById('cryptoOutput').innerText = decodeURIComponent(escape(atob(str)));
  } catch(e) {
    document.getElementById('cryptoOutput').innerText = "Invalid Base64 string";
  }
}

// تایمر و هشدار
let timerInterval = null;
function startTimer() {
  let sec = parseInt(document.getElementById('timerSeconds').value);
  if (isNaN(sec) || sec <= 0) return;
  clearInterval(timerInterval);
  
  const display = document.getElementById('timerDisplay');
  timerInterval = setInterval(() => {
    sec--;
    display.innerText = `${sec}s remaining...`;
    if (sec <= 0) {
      clearInterval(timerInterval);
      display.innerText = "⏰ Time's up!";
      if ("vibrate" in navigator) navigator.vibrate([200, 100, 200]);
    }
  }, 1000);
}

// مبدل‌ها
function convertLength() {
  const cm = parseFloat(document.getElementById('cmInput').value);
  const res = isNaN(cm) ? 0 : (cm / 2.54).toFixed(2);
  document.getElementById('inchResult').innerText = `Result: ${res} inches`;
}

function convertTemp() {
  const val = parseFloat(document.getElementById('tempInput').value);
  const unit = document.getElementById('tempUnit').value;
  const resultEl = document.getElementById('tempResult');
  
  if (isNaN(val)) { resultEl.innerText = "Result: -"; return; }
  
  let c = 0, f = 0, k = 0;
  if (unit === 'C') { c = val; f = (val * 9/5) + 32; k = val + 273.15; }
  else if (unit === 'F') { c = (val - 32) * 5/9; f = val; k = c + 273.15; }
  else if (unit === 'K') { c = val - 273.15; f = (c * 9/5) + 32; k = val; }
  
  resultEl.innerText = `${c.toFixed(1)}°C | ${f.toFixed(1)}°F | ${k.toFixed(2)}K`;
}

// شمارشگر متن
function countText() {
  const text = document.getElementById('textInput').value;
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  document.getElementById('textStats').innerText = `Chars: ${chars} | Words: ${words}`;
}

// یادداشت سریع
function saveNote() {
  localStorage.setItem('nexkit_quick_note', document.getElementById('noteInput').value);
}

// مدیریت کارها (To-Do)
let tasks = JSON.parse(localStorage.getItem('nexkit_tasks') || '[]');
function addTask() {
  const input = document.getElementById('taskInput');
  if (!input.value.trim()) return;
  tasks.push({ text: input.value, done: false });
  input.value = '';
  saveAndRenderTasks();
}
function toggleTask(i) { tasks[i].done = !tasks[i].done; saveAndRenderTasks(); }
function deleteTask(i) { tasks.splice(i, 1); saveAndRenderTasks(); }
function saveAndRenderTasks() {
  localStorage.setItem('nexkit_tasks', JSON.stringify(tasks));
  const listEl = document.getElementById('taskList');
  if (!listEl) return;
  if (tasks.length === 0) { listEl.innerHTML = '<p style="color: var(--border); text-align: center; font-size: 13px;">No tasks yet.</p>'; return; }
  listEl.innerHTML = tasks.map((t, i) => `
    <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg); padding: 8px 12px; border-radius: 8px; margin-bottom: 6px; border: 1px solid var(--border);">
      <span onclick="toggleTask(${i})" style="cursor: pointer; text-decoration: ${t.done ? 'line-through' : 'none'}; color: ${t.done ? 'var(--border)' : 'inherit'}; font-size: 14px;">${t.text}</span>
      <button onclick="deleteTask(${i})" style="background: transparent; border: none; color: #ff5252; cursor: pointer; font-size: 16px;">×</button>
    </div>
  `).join('');
}

// ساعت جهانی
function updateWorldClocks() {
  const container = document.getElementById('worldClockList');
  if (!container) return;
  const zones = [
    { name: 'UTC / London', tz: 'UTC' },
    { name: 'New York', tz: 'America/New_York' },
    { name: 'Tehran', tz: 'Asia/Tehran' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' }
  ];
  const now = new Date();
  container.innerHTML = zones.map(z => {
    try {
      const timeStr = now.toLocaleTimeString('en-US', { timeZone: z.tz, hour12: false });
      return `<div style="display: flex; justify-content: space-between; background: var(--bg); padding: 8px 12px; border-radius: 8px; margin-bottom: 6px; font-size: 14px; border: 1px solid var(--border);"><span>${z.name}</span><strong style="font-family: monospace;">${timeStr}</strong></div>`;
    } catch (e) { return ''; }
  }).join('');
}
setInterval(updateWorldClocks, 1000);

// پشتیبان‌گیری
function exportBackup() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('nexkit_')) data[key] = localStorage.getItem(key);
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `nexkit_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
}

function importBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      Object.keys(data).forEach(k => {
        if (k.startsWith('nexkit_')) localStorage.setItem(k, data[k]);
      });
      alert('Backup restored successfully!');
      location.reload();
    } catch (err) { alert('Invalid JSON file.'); }
  };
  reader.readAsText(file);
}

// تولید رمز عبور
function generatePassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";
  let pass = "";
  for (let i = 0; i < 12; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
  document.getElementById('passOutput').innerText = pass;
}

// QR Code
function generateQR() {
  const val = document.getElementById('qrInput').value;
  const container = document.getElementById('qrcode');
  if (!container) return;
  container.innerHTML = "";
  if (val.trim()) new QRCode(container, { text: val, width: 128, height: 128 });
}

// چراغ‌قوه
function toggleScreenTorch() {
  let overlay = document.getElementById('torchOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'torchOverlay';
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: white; z-index: 9999; display: flex; justify-content: center; align-items: center; cursor: pointer;';
    overlay.innerHTML = '<span style="color: black; font-weight: bold; font-size: 18px;">Tap to exit</span>';
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay);
  } else { overlay.remove(); }
}

// GPS
function getLocation() {
  const info = document.getElementById('gps-info');
  if (!navigator.geolocation) { info.innerText = "Geolocation not supported"; return; }
  info.innerText = "Locating...";
  navigator.geolocation.getCurrentPosition(
    p => info.innerText = `Lat: ${p.coords.latitude.toFixed(4)}, Lon: ${p.coords.longitude.toFixed(4)}`,
    () => info.innerText = "Unable to retrieve location"
  );
}

function setAccentColor(color) {
  document.documentElement.style.setProperty('--accent', color);
  document.documentElement.style.setProperty('--accent-cyan', color);
  localStorage.setItem('nexkit_accent', color);
}

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('nexkit_lang') || 'en';
  setLanguage(savedLang);
  document.getElementById('langSelector').value = savedLang;
  
  const accent = localStorage.getItem('nexkit_accent');
  if (accent) setAccentColor(accent);
  
  if (localStorage.getItem('nexkit_theme') === 'light') document.body.classList.add('light-theme');
  
  const note = localStorage.getItem('nexkit_quick_note');
  if (note) document.getElementById('noteInput').value = note;
  
  saveAndRenderTasks();
  updateWorldClocks();
  
  const activeTab = localStorage.getItem('nexkit_active_tab') || 'calc';
  const defaultBtn = document.querySelector(`.tab-btn[onclick*="${activeTab}"]`);
  switchTab(activeTab, defaultBtn);
});
