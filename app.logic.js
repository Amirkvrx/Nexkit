// --- Nexkit Core Logic ---

// مدیریت زبان‌ها و ترجمه‌ها
const translations = {
  en: {
    level: "Digital Level",
    compass: "Digital Compass",
    calc: "Calculator",
    converter: "Length Converter",
    tempConverter: "Temperature Converter",
    text: "Text Counter",
    notes: "Quick Notes",
    todo: "To-Do List",
    clock: "World Clock",
    pass: "Password Generator",
    history: "Password History",
    qr: "QR Code",
    torch: "Flashlight",
    gps: "GPS Location",
    settings: "Settings",
    addTaskBtn: "Add",
    genPassBtn: "Generate New",
    getGpsBtn: "Get GPS Location"
  },
  fa: {
    level: "تراز دیجیتال",
    compass: "قطب‌نما",
    calc: "ماشین حساب",
    converter: "مبدل طول",
    tempConverter: "مبدل دما",
    text: "شمارشگر متن",
    notes: "یادداشت سریع",
    todo: "کارهای روزمره",
    clock: "ساعت جهانی",
    pass: "تولید رمز عبور",
    history: "تاریخچه رمزها",
    qr: "بارکد QR",
    torch: "چراغ‌قوه صفحه",
    gps: "موقعیت‌یاب GPS",
    settings: "تنظیمات",
    addTaskBtn: "افزودن",
    genPassBtn: "تولید جدید",
    getGpsBtn: "دریافت موقعیت"
  },
  fr: {
    level: "Niveau",
    compass: "Boussole",
    calc: "Calculatrice",
    converter: "Convertisseur",
    tempConverter: "Convertisseur Temp",
    text: "Texte",
    notes: "Notes",
    todo: "Tâches",
    clock: "Horloge",
    pass: "Mot de passe",
    history: "Historique",
    qr: "Code QR",
    torch: "Lampe",
    gps: "GPS",
    settings: "Paramètres",
    addTaskBtn: "Ajouter",
    genPassBtn: "Générer",
    getGpsBtn: "Obtenir GPS"
  },
  es: {
    level: "Nivel",
    compass: "Brújula",
    calc: "Calculadora",
    converter: "Conversor",
    tempConverter: "Conversor Temp",
    text: "Texto",
    notes: "Notas",
    todo: "Tareas",
    clock: "Reloj",
    pass: "Contraseña",
    history: "Historial",
    qr: "Código QR",
    torch: "Linterna",
    gps: "GPS",
    settings: "Ajustes",
    addTaskBtn: "Añadir",
    genPassBtn: "Generar",
    getGpsBtn: "Obtener GPS"
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = translations[lang] ? lang : 'en';
  localStorage.setItem('nexkit_lang', currentLang);
  document.documentElement.lang = currentLang;
  document.documentElement.dir = (currentLang === 'fa' || currentLang === 'ar') ? 'rtl' : 'ltr';
  
  // به‌روزرسانی متن عناصر دارای ویژگی data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.innerText = translations[currentLang][key];
    }
  });
}

function t(key) {
  return translations[currentLang]?.[key] || translations['en'][key] || key;
}

// سیستم تب‌ها
function switchTab(tabId, btnElement) {
  document.querySelectorAll('.card').forEach(card => card.style.display = 'none');
  const targetCard = document.getElementById(`tab-${tabId}`);
  if (targetCard) targetCard.style.display = 'block';
  
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  
  localStorage.setItem('nexkit_active_tab', tabId);
}

// تم تاریک و روشن
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('nexkit_theme', isLight ? 'light' : 'dark');
}

// ماشین حساب
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

// مبدل طول
function convertLength() {
  const cm = parseFloat(document.getElementById('cmInput').value);
  const res = isNaN(cm) ? 0 : (cm / 2.54).toFixed(2);
  document.getElementById('inchResult').innerText = `Result: ${res} inches`;
  if (!isNaN(cm)) addConversionHistory(`${cm} cm = ${res} inches`);
}

// مبدل دما
function convertTemp() {
  const val = parseFloat(document.getElementById('tempInput').value);
  const unit = document.getElementById('tempUnit').value;
  const resultEl = document.getElementById('tempResult');
  
  if (isNaN(val)) {
    resultEl.innerText = "Result: -";
    return;
  }
  
  let c = 0, f = 0, k = 0;
  if (unit === 'C') { c = val; f = (val * 9/5) + 32; k = val + 273.15; }
  else if (unit === 'F') { c = (val - 32) * 5/9; f = val; k = c + 273.15; }
  else if (unit === 'K') { c = val - 273.15; f = (c * 9/5) + 32; k = val; }
  
  resultEl.innerText = `${c.toFixed(1)}°C | ${f.toFixed(1)}°F | ${k.toFixed(2)}K`;
  addConversionHistory(`${val}°${unit} -> ${c.toFixed(1)}°C / ${f.toFixed(1)}°F`);
}

// تاریخچه تبدیل‌ها
let conversionHistory = JSON.parse(localStorage.getItem('nexkit_conv_history') || '[]');
function addConversionHistory(itemText) {
  conversionHistory.unshift(itemText);
  if (conversionHistory.length > 15) conversionHistory.pop();
  localStorage.setItem('nexkit_conv_history', JSON.stringify(conversionHistory));
  renderConversionHistory();
}
function renderConversionHistory() {
  const listEl = document.getElementById('conversionHistoryList');
  if (!listEl) return;
  if (conversionHistory.length === 0) {
    listEl.innerHTML = '<p style="color: var(--border); text-align: center;">No conversion history yet.</p>';
    return;
  }
  listEl.innerHTML = conversionHistory.map(item => `<div style="background: var(--bg); padding: 8px 12px; border-radius: 8px; margin-bottom: 6px; font-size: 13px; border: 1px solid var(--border);">${item}</div>`).join('');
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
  const note = document.getElementById('noteInput').value;
  localStorage.setItem('nexkit_quick_note', note);
}

// لیست کارها (To-Do)
let tasks = JSON.parse(localStorage.getItem('nexkit_tasks') || '[]');
function addTask() {
  const input = document.getElementById('taskInput');
  if (!input.value.trim()) return;
  tasks.push({ text: input.value, done: false });
  input.value = '';
  saveAndRenderTasks();
}
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveAndRenderTasks();
}
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRenderTasks();
}
function saveAndRenderTasks() {
  localStorage.setItem('nexkit_tasks', JSON.stringify(tasks));
  const listEl = document.getElementById('taskList');
  if (!listEl) return;
  if (tasks.length === 0) {
    listEl.innerHTML = '<p style="color: var(--border); text-align: center; font-size: 13px;">No tasks yet.</p>';
    return;
  }
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
    { name: 'Paris / Berlin', tz: 'Europe/Paris' },
    { name: 'Tehran', tz: 'Asia/Tehran' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' }
  ];
  const now = new Date();
  container.innerHTML = zones.map(z => {
    try {
      const timeStr = now.toLocaleTimeString('en-US', { timeZone: z.tz, hour12: false });
      return `<div style="display: flex; justify-content: space-between; background: var(--bg); padding: 8px 12px; border-radius: 8px; margin-bottom: 6px; font-size: 14px; border: 1px solid var(--border);"><span>${z.name}</span><strong style="font-family: monospace;">${timeStr}</strong></div>`;
    } catch (e) {
      return '';
    }
  }).join('');
}
setInterval(updateWorldClocks, 1000);

// تولید رمز عبور
function generatePassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";
  let pass = "";
  for (let i = 0; i < 12; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
  document.getElementById('passOutput').innerText = pass;
  
  let history = JSON.parse(localStorage.getItem('nexkit_pass_history') || '[]');
  history.unshift(pass);
  if (history.length > 10) history.pop();
  localStorage.setItem('nexkit_pass_history', JSON.stringify(history));
  renderPassHistory();
}
function renderPassHistory() {
  const historyEl = document.getElementById('passHistoryList');
  if (!historyEl) return;
  let history = JSON.parse(localStorage.getItem('nexkit_pass_history') || '[]');
  if (history.length === 0) { historyEl.innerText = "No password history yet."; return; }
  historyEl.innerHTML = history.map(p => `<div style="background: var(--bg); padding: 6px 10px; border-radius: 6px; margin-bottom: 4px; font-family: monospace; border: 1px solid var(--border);">${p}</div>`).join('');
}

// QR Code
function generateQR() {
  const val = document.getElementById('qrInput').value;
  const container = document.getElementById('qrcode');
  if (!container) return;
  container.innerHTML = "";
  if (val.trim()) {
    new QRCode(container, { text: val, width: 128, height: 128 });
  }
}

// چراغ‌قوه صفحه
function toggleScreenTorch() {
  let overlay = document.getElementById('torchOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'torchOverlay';
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: white; z-index: 9999; display: flex; justify-content: center; align-items: center; cursor: pointer;';
    overlay.innerHTML = '<span style="color: black; font-weight: bold; font-size: 18px; background: rgba(0,0,0,0.1); padding: 10px 20px; border-radius: 20px;">Tap to exit</span>';
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay);
  } else {
    overlay.remove();
  }
}

// موقعیت‌یاب GPS
function getLocation() {
  const info = document.getElementById('gps-info');
  if (!navigator.geolocation) {
    info.innerText = "Geolocation is not supported by your browser";
    return;
  }
  info.innerText = "Locating...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      info.innerText = `Lat: ${pos.coords.latitude.toFixed(4)}, Lon: ${pos.coords.longitude.toFixed(4)}`;
    },
    () => {
      info.innerText = "Unable to retrieve your location";
    }
  );
}

// تراز و قطب‌نما (شبیه‌سازی سنسورها)
function initSensor() { document.getElementById('level-info').innerText = "Sensor active (Level 0.0°)"; }
function initCompass() { document.getElementById('compass-info').innerText = "Compass active (North 0°)"; }

// تنظیمات ظاهر و رنگ
function setAccentColor(color) {
  document.documentElement.style.setProperty('--accent', color);
  document.documentElement.style.setProperty('--accent-cyan', color);
  localStorage.setItem('nexkit_accent', color);
}

// تشخیص زبان و اجرای اولیه
function detectUserLanguage() {
  const saved = localStorage.getItem('nexkit_lang');
  if (saved) return saved;
  const sys = (navigator.language || 'en').substring(0, 2);
  return translations[sys] ? sys : 'en';
}

function checkFirstRunLanguage() {
  if (localStorage.getItem('nexkit_configured')) return;
  const detected = detectUserLanguage();
  setLanguage(detected);
  localStorage.setItem('nexkit_configured', 'true');
}

window.addEventListener('DOMContentLoaded', () => {
  const lang = detectUserLanguage();
  setLanguage(lang);
  document.getElementById('langSelector').value = lang;
  
  const accent = localStorage.getItem('nexkit_accent');
  if (accent) setAccentColor(accent);
  
  const savedTheme = localStorage.getItem('nexkit_theme');
  if (savedTheme === 'light') document.body.classList.add('light-theme');
  
  const note = localStorage.getItem('nexkit_quick_note');
  if (note) document.getElementById('noteInput').value = note;
  
  saveAndRenderTasks();
  renderConversionHistory();
  renderPassHistory();
  updateWorldClocks();
  
  const activeTab = localStorage.getItem('nexkit_active_tab') || 'calc';
  const defaultBtn = document.querySelector(`.tab-btn[onclick*="${activeTab}"]`);
  switchTab(activeTab, defaultBtn);
});
