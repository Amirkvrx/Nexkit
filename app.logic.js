// دیکشنری زبان‌ها (English به عنوان زبان اصلی و پیش‌فرض)
const translations = {
  en: {
    title: "Nexkit",
    level: "Level",
    compass: "Compass",
    calc: "Calculator",
    converter: "Converter",
    text: "Text",
    notes: "Notes",
    todo: "To-Do",
    clock: "World Clock",
    pass: "Password",
    history: "History",
    qr: "QR Code",
    gps: "GPS",
    sensorActive: "Sensor activated.",
    sensorNotSupported: "Not supported.",
    compassActive: "Compass activated.",
    compassNotSupported: "Not supported.",
    inchResult: "Result: 0 inches",
    chars: "Chars",
    words: "Words",
    notePlaceholder: "Write your note here (Auto-saved)...",
    passDefault: "Secure Password",
    genPassBtn: "Generate New",
    addTaskBtn: "Add",
    taskPlaceholder: "New task...",
    noTasks: "No tasks found.",
    gpsInfo: "Location not received yet.",
    getGpsBtn: "Get GPS Location",
    toastSaved: "Note saved successfully 📌",
    toastPass: "New password generated 🔐",
    toastTaskAdd: "Task added ✅",
    toastTaskDel: "Task deleted 🗑️",
    noHistory: "No password history yet."
  },
  fa: {
    title: "نکست‌کیت",
    level: "تراز",
    compass: "قطب‌نما",
    calc: "ماشین‌حساب",
    converter: "مبدل",
    text: "متن",
    notes: "یادداشت",
    todo: "کارها",
    clock: "ساعت جهانی",
    pass: "رمزساز",
    history: "تاریخچه",
    qr: "بارکد QR",
    gps: "موقعیت‌یاب",
    sensorActive: "سنسور تراز فعال شد.",
    sensorNotSupported: "پشتیبانی نمی‌شود.",
    compassActive: "قطب‌نما فعال شد.",
    compassNotSupported: "پشتیبانی نمی‌شود.",
    inchResult: "نتیجه: ۰ اینچ",
    chars: "حروف",
    words: "کلمات",
    notePlaceholder: "یادداشت خود را بنویسید (ذخیره خودکار)...",
    passDefault: "رمز عبور امن",
    genPassBtn: "ساخت رمز جدید",
    addTaskBtn: "افزودن",
    taskPlaceholder: "کار جدید...",
    noTasks: "هیچ وظیفه‌ای ثبت نشده است.",
    gpsInfo: "موقعیت شما هنوز دریافت نشده است.",
    getGpsBtn: "دریافت موقعیت GPS",
    toastSaved: "یادداشت با موفقیت ذخیره شد 📌",
    toastPass: "رمز عبور جدید ساخته شد 🔐",
    toastTaskAdd: "وظیفه جدید اضافه شد ✅",
    toastTaskDel: "وظیفه حذف شد 🗑️",
    noHistory: "هنوز رمز عبوری ذخیره نشده است."
  },
  // ساختار آماده برای بقیه زبان‌ها (به صورت پیش‌فرض از انگلیسی ارث‌بری می‌کنند تا بعداً تکمیل شوند)
  es: {}, fr: {}, de: {}, zh: {}, ja: {}, ru: {}, ar: {}, pt: {}, tr: {}, hi: {}
};

let currentLang = localStorage.getItem('nexkit_lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('nexkit_lang', lang);
  
  // تنظیم جهت صفحه (RTL برای فارسی و عربی، LTR برای بقیه)
  document.documentElement.setAttribute('dir', (lang === 'fa' || lang === 'ar') ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
  
  updateTexts();
}

function t(key) {
  return translations[currentLang]?.[key] || translations['en'][key] || key;
}

function updateTexts() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerText = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
}

function toggleTheme() {
  const body = document.body;
  const isDark = body.getAttribute('data-theme') === 'high-contrast';
  body.setAttribute('data-theme', isDark ? '' : 'high-contrast');
  localStorage.setItem('nexkit_theme', isDark ? 'dark' : 'light');
}

function switchTab(tabId, btnElement) {
  document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tabId).classList.add('active');
  if (btnElement) {
    btnElement.classList.add('active');
    localStorage.setItem('nexkit_tab', tabId);
  }
  if(tabId === 'qr') generateQR();
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 2500);
}

function initSensor() {
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation);
    document.getElementById('level-info').innerText = t('sensorActive');
  } else {
    document.getElementById('level-info').innerText = t('sensorNotSupported');
  }
}

function handleOrientation(event) {
  const x = event.gamma || 0;
  const y = event.beta || 0;
  const bubble = document.getElementById('bubble');
  bubble.style.transform = `translate(calc(-50% + ${Math.max(-50, Math.min(50, x))}px), calc(-50% + ${Math.max(-50, Math.min(50, y))}px))`;
  document.getElementById('level-info').innerText = `X: ${Math.round(x)}° | Y: ${Math.round(y)}°`;
}

function initCompass() {
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleCompass);
    document.getElementById('compass-info').innerText = t('compassActive');
  } else {
    document.getElementById('compass-info').innerText = t('compassNotSupported');
  }
}

function handleCompass(event) {
  const alpha = event.alpha;
  if (alpha !== null) {
    document.getElementById('needle').style.transform = `rotate(${360 - alpha}deg)`;
    document.getElementById('compass-info').innerText = `Direction: ${Math.round(alpha)}°`;
  }
}

let screen = document.getElementById('screen');
function press(val) { screen.value += val; }
function clearCalc() { screen.value = ''; }
function calculate() {
  try { screen.value = eval(screen.value); } catch { screen.value = 'Error'; }
}

function convertLength() {
  const cm = parseFloat(document.getElementById('cmInput').value) || 0;
  document.getElementById('inchResult').innerText = `Result: ${(cm / 2.54).toFixed(2)} inches`;
}

function countText() {
  const text = document.getElementById('textInput').value;
  document.getElementById('textStats').innerText = `${t('chars')}: ${text.length} | ${t('words')}: ${text.trim() ? text.trim().split(/\s+/).length : 0}`;
}

function saveNote() {
  localStorage.setItem('nexkit_note', document.getElementById('noteInput').value);
  showToast(t('toastSaved'));
}

// لیست وظایف
let tasks = JSON.parse(localStorage.getItem('nexkit_tasks')) || [];
function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, completed: false });
  input.value = '';
  saveAndRenderTasks();
  showToast(t('toastTaskAdd'));
}
function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  saveAndRenderTasks();
}
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveAndRenderTasks();
  showToast(t('toastTaskDel'));
}
function saveAndRenderTasks() {
  localStorage.setItem('nexkit_tasks', JSON.stringify(tasks));
  renderTasks();
}
function renderTasks() {
  const container = document.getElementById('taskList');
  if (!container) return;
  if (tasks.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: var(--border);">${t('noTasks')}</p>`;
    return;
  }
  container.innerHTML = tasks.map(tk => `
    <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg); padding: 8px 12px; margin-bottom: 6px; border-radius: 8px; border: 1px solid var(--border);">
      <span onclick="toggleTask(${tk.id})" style="cursor: pointer; text-decoration: ${tk.completed ? 'line-through' : 'none'}; opacity: ${tk.completed ? '0.6' : '1'}; flex-grow: 1;">${tk.text}</span>
      <button onclick="deleteTask(${tk.id})" style="background: none; border: none; color: #EF4444; cursor: pointer; font-size: 16px;">✕</button>
    </div>
  `).join('');
}

// ساعت جهانی
function updateWorldClocks() {
  const container = document.getElementById('worldClockList');
  if (!container) return;
  const cities = [
    { name: 'Tehran', zone: 'Asia/Tehran' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'New York', zone: 'America/New_York' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' }
  ];
  const now = new Date();
  container.innerHTML = cities.map(city => {
    const timeString = now.toLocaleTimeString('en-US', { timeZone: city.zone, hour12: false });
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg); padding: 10px 14px; margin-bottom: 8px; border-radius: 8px; border: 1px solid var(--border);">
        <span>${city.name}</span>
        <span style="font-family: monospace; font-size: 16px; color: var(--accent-cyan);">${timeString}</span>
      </div>
    `;
  }).join('');
}
setInterval(updateWorldClocks, 1000);

// رمزساز و تاریخچه
let passwordHistory = JSON.parse(localStorage.getItem('nexkit_pass_history')) || [];
function generatePassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";
  let pass = "";
  for (let i = 0; i < 12; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
  document.getElementById('passOutput').innerText = pass;
  passwordHistory.unshift(pass);
  if (passwordHistory.length > 5) passwordHistory.pop();
  localStorage.setItem('nexkit_pass_history', JSON.stringify(passwordHistory));
  updateHistoryUI();
  showToast(t('toastPass'));
}
function updateHistoryUI() {
  const historyList = document.getElementById('passHistoryList');
  if (historyList) {
    if (passwordHistory.length === 0) {
      historyList.innerHTML = `<p style="color: var(--border);">${t('noHistory')}</p>`;
    } else {
      historyList.innerHTML = passwordHistory.map(p => `<div style="padding: 6px; background: var(--bg); margin-bottom: 4px; border-radius: 6px; font-family: monospace;">${p}</div>`).join('');
    }
  }
}

function generateQR() {
  const val = document.getElementById('qrInput').value || "https://github.com/Amirkvrx/Nexkit";
  const container = document.getElementById('qrcode');
  container.innerHTML = "";
  new QRCode(container, { text: val, width: 128, height: 128 });
}

function getLocation() {
  if (navigator.geolocation) {
    document.getElementById('gps-info').innerText = "Fetching location...";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lon = pos.coords.longitude.toFixed(4);
        document.getElementById('gps-info').innerText = `Latitude: ${lat}\nLongitude: ${lon}`;
      },
      () => { document.getElementById('gps-info').innerText = "Location error or permission denied."; }
    );
  } else {
    document.getElementById('gps-info').innerText = "GPS not supported.";
  }
}

window.addEventListener('load', () => {
  const savedNote = localStorage.getItem('nexkit_note');
  if (savedNote) document.getElementById('noteInput').value = savedNote;

  if (localStorage.getItem('nexkit_theme') === 'light') {
    document.body.setAttribute('data-theme', 'high-contrast');
  }

  setLanguage(currentLang);
  document.getElementById('langSelector').value = currentLang;

  const savedTab = localStorage.getItem('nexkit_tab') || 'level';
  const tabBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick').includes(savedTab));
  switchTab(savedTab, tabBtn || document.querySelector('.tab-btn'));

  renderTasks();
  updateHistoryUI();
  updateWorldClocks();
});

// ثبت Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
