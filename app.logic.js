// دیکشنری زبان‌ها (English به عنوان زبان اصلی و پیش‌فرض)
const translations = {
  en: {
    title: "Nexkit",
    level: "Level",
    compass: "Compass",
    calc: "Calculator",
    converter: "Converter",
    tempConverter: "Temperature Converter",    tempResultDefault: "Result: -",
    text: "Text",
    notes: "Notes",
    todo: "To-Do",
    clock: "World Clock",
    pass: "Password",
    history: "History",
    qr: "QR Code",
    gps: "GPS",
    torch: "Flashlight",
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
    tempConverter: "مبدل دما",    tempResultDefault: "نتیجه: -",
    text: "متن",
    notes: "یادداشت",
    todo: "کارها",
    clock: "ساعت جهانی",
    pass: "رمزساز",
    history: "تاریخچه",
    qr: "بارکد QR",
    gps: "موقعیت‌یاب",
    torch: "چراغ‌قوه صفحه",
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

// چراغ‌قوه صفحه نمایش
function toggleScreenTorch() {
  let overlay = document.getElementById('torchOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'torchOverlay';
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: white; z-index: 9999; display: flex; justify-content: center; align-items: center; cursor: pointer;';
    overlay.innerHTML = '<span style="color: black; font-weight: bold; font-size: 18px; background: rgba(0,0,0,0.1); padding: 10px 20px; border-radius: 20px;">تپ کنید برای خروج / Tap to exit</span>';
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay);
  } else {
    overlay.remove();
  }
}

// مبدل دما
function convertTemp() {
  const val = parseFloat(document.getElementById('tempInput').value);
  const unit = document.getElementById('tempUnit').value;
  const resultEl = document.getElementById('tempResult');
  
  if (isNaN(val)) {
    resultEl.innerText = t('tempResultDefault') || "Result: -";
    return;
  }
  
  let c = 0, f = 0, k = 0;
  if (unit === 'C') {
    c = val;
    f = (val * 9/5) + 32;
    k = val + 273.15;
  } else if (unit === 'F') {
    c = (val - 32) * 5/9;
    f = val;
    k = c + 273.15;
  } else if (unit === 'K') {
    c = val - 273.15;
    f = (c * 9/5) + 32;
    k = val;
  }
  
  resultEl.innerText = `${c.toFixed(1)}°C | ${f.toFixed(1)}°F | ${k.toFixed(2)}K`;
}

// سیستم هوشمند تشخیص زبان و راه‌اندازی اولیه
function detectUserLanguage() {
  // بررسی اینکه آیا کاربر قبلاً زبان را انتخاب کرده است یا خیر
  const savedLang = localStorage.getItem('nexkit_lang');
  if (savedLang) {
    return savedLang;
  }

  // دریافت زبان مرورگر یا سیستم
  const sysLang = (navigator.language || navigator.userLanguage || 'en').substring(0, 2);
  
  // لیست زبان‌های پشتیبانی شده توسط اپ
  const supportedLangs = ['en', 'zh', 'es', 'hi', 'ar', 'fr', 'pt', 'ru', 'de', 'ja', 'tr', 'fa'];
  
  if (supportedLangs.includes(sysLang)) {
    return sysLang;
  }
  
  return 'en'; // پیش‌فرض استاندارد جهانی
}

// نمایش پاپ‌آپ خوش‌آمدگویی و تنظیم زبان در اولین اجرا
function checkFirstRunLanguage() {
  const hasRunBefore = localStorage.getItem('nexkit_configured');
  if (hasRunBefore) return;

  const detected = detectUserLanguage();
  const langNames = {
    en: 'English', zh: '中文', es: 'Español', hi: 'हिन्दी', ar: 'العربية',
    fr: 'Français', pt: 'Português', ru: 'Русский', de: 'Deutsch',
    ja: '日本語', tr: 'Türkçe', fa: 'فارسی'
  };

  const detectedName = langNames[detected] || 'English';

  // ساخت مدال استاندارد
  const modal = document.createElement('div');
  modal.id = 'langWelcomeModal';
  modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); z-index: 10000; display: flex; justify-content: center; align-items: center; padding: 20px;';
  
  modal.innerHTML = `
    <div style="background: var(--card-bg, #fff); color: var(--text, #333); padding: 24px; border-radius: 16px; width: 100%; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); text-align: center;">
      <h2 style="margin-bottom: 12px; font-size: 20px;">🌍 Language Preference / زبان برنامه</h2>
      <p style="font-size: 14px; color: var(--border, #666); margin-bottom: 20px;">
        We detected your system/location language as <b>${detectedName}</b>. Would you like to use Nexkit in this language or choose another?
        <br><br>
        زبان سیستم شما ${detectedName} تشخیص داده شد. مایلید برنامه با همین زبان ادامه پیدا کند؟
      </p>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button onclick="applyWelcomeLang('${detected}')" class="btn btn-accent" style="padding: 12px; font-weight: bold;">Continue with ${detectedName} / ادامه</button>
        <button onclick="showFullLangSelector()" class="btn" style="padding: 10px; background: transparent; border: 1px solid var(--border); color: inherit;">Choose from all languages / انتخاب از لیست</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function applyWelcomeLang(lang) {
  setLanguage(lang);
  localStorage.setItem('nexkit_configured', 'true');
  const modal = document.getElementById('langWelcomeModal');
  if (modal) modal.remove();
}

function showFullLangSelector() {
  const modalContent = document.querySelector('#langWelcomeModal > div');
  modalContent.innerHTML = `
    <h2 style="margin-bottom: 12px; font-size: 20px;">Select Language / انتخاب زبان</h2>
    <select id="welcomeLangSelect" class="input-field" style="margin-bottom: 20px;">
      <option value="en">English</option>
      <option value="zh">中文</option>
      <option value="es">Español</option>
      <option value="hi">हिन्दी</option>
      <option value="ar">العربية</option>
      <option value="fr">Français</option>
      <option value="pt">Português</option>
      <option value="ru">Русский</option>
      <option value="de">Deutsch</option>
      <option value="ja">日本語</option>
      <option value="tr">Türkçe</option>
      <option value="fa">فارسی</option>
    </select>
    <button onclick="applyWelcomeLang(document.getElementById('welcomeLangSelect').value)" class="btn btn-accent" style="width: 100%; padding: 12px;">Confirm / تایید</button>
  `;
}

// اجرا در زمان لود صفحه
window.addEventListener('DOMContentLoaded', () => {
  const initialLang = detectUserLanguage();
  setLanguage(initialLang);
  setTimeout(checkFirstRunLanguage, 500);
});

// مدیریت تاریخچه تبدیل‌ها
let conversionHistory = JSON.parse(localStorage.getItem('nexkit_conv_history') || '[]');

function addConversionHistory(itemText) {
  conversionHistory.unshift(itemText);
  if (conversionHistory.length > 20) conversionHistory.pop(); // نگهداری ۲۰ مورد آخر
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
  
  listEl.innerHTML = conversionHistory.map(item => `
    <div style="background: var(--bg); padding: 10px; border-radius: 8px; margin-bottom: 8px; font-size: 14px; border: 1px solid var(--border);">
      ${item}
    </div>
  `).join('');
}

// به‌روزرسانی توابع تبدیل برای ثبت خودکار در تاریخچه
const originalConvertLength = window.convertLength;
// ثبت در تاریخچه هنگام تبدیل طول
// (می‌توانید با یک تایمر کوچک یا هنگام تغییر کامل مقدار ثبت کنید)

// تغییر رنگ اصلی (Accent Color) برنامه
function setAccentColor(color) {
  document.documentElement.style.setProperty('--accent', color);
  document.documentElement.style.setProperty('--accent-cyan', color);
  localStorage.setItem('nexkit_accent', color);
}

// بارگذاری تنظیمات رنگ ذخیره‌شده هنگام لود
window.addEventListener('DOMContentLoaded', () => {
  const savedAccent = localStorage.getItem('nexkit_accent');
  if (savedAccent) {
    document.documentElement.style.setProperty('--accent', savedAccent);
    document.documentElement.style.setProperty('--accent-cyan', savedAccent);
  }
});
