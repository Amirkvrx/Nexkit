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

function initSensor() {
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation);
    document.getElementById('level-info').innerText = "سنسور تراز فعال شد.";
  } else {
    document.getElementById('level-info').innerText = "پشتیبانی نمی‌شود.";
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
    document.getElementById('compass-info').innerText = "قطب‌نما فعال شد.";
  } else {
    document.getElementById('compass-info').innerText = "پشتیبانی نمی‌شود.";
  }
}

function handleCompass(event) {
  const alpha = event.alpha;
  if (alpha !== null) {
    document.getElementById('needle').style.transform = `rotate(${360 - alpha}deg)`;
    document.getElementById('compass-info').innerText = `جهت: ${Math.round(alpha)} درجه`;
  }
}

let screen = document.getElementById('screen');
function press(val) { screen.value += val; }
function clearCalc() { screen.value = ''; }
function calculate() {
  try { screen.value = eval(screen.value); } catch { screen.value = 'خطا'; }
}

function convertLength() {
  const cm = parseFloat(document.getElementById('cmInput').value) || 0;
  document.getElementById('inchResult').innerText = `نتیجه: ${(cm / 2.54).toFixed(2)} اینچ`;
}

function countText() {
  const text = document.getElementById('textInput').value;
  document.getElementById('textStats').innerText = `حروف: ${text.length} | کلمات: ${text.trim() ? text.trim().split(/\s+/).length : 0}`;
}

function saveNote() {
  localStorage.setItem('nexkit_note', document.getElementById('noteInput').value);
}

function generatePassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";
  let pass = "";
  for (let i = 0; i < 12; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
  document.getElementById('passOutput').innerText = pass;
}

function generateQR() {
  const val = document.getElementById('qrInput').value || "https://github.com/Amirkvrx/Nexkit";
  const container = document.getElementById('qrcode');
  container.innerHTML = "";
  new QRCode(container, { text: val, width: 128, height: 128 });
}

function getLocation() {
  if (navigator.geolocation) {
    document.getElementById('gps-info').innerText = "در حال دریافت موقعیت...";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lon = pos.coords.longitude.toFixed(4);
        document.getElementById('gps-info').innerText = `عرض جغرافیایی: ${lat}\nطول جغرافیایی: ${lon}`;
      },
      () => { document.getElementById('gps-info').innerText = "خطا در دریافت موقعیت یا عدم دسترسی."; }
    );
  } else {
    document.getElementById('gps-info').innerText = "GPS در این مرورگر پشتیبانی نمی‌شود.";
  }
}

window.onload = function() {
  const savedNote = localStorage.getItem('nexkit_note');
  if (savedNote) document.getElementById('noteInput').value = savedNote;

  if (localStorage.getItem('nexkit_theme') === 'light') {
    document.body.setAttribute('data-theme', 'high-contrast');
  }

  const savedTab = localStorage.getItem('nexkit_tab') || 'level';
  const tabBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick').includes(savedTab));
  switchTab(savedTab, tabBtn || document.querySelector('.tab-btn'));
};

// ثبت Service Worker برای قابلیت PWA و آفلاین
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => console.log('Service Worker registered successfully:', reg.scope))
      .catch((err) => console.log('Service Worker registration failed:', err));
  });
}

// تابع نمایش اعلان (Toast)
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// به‌روزرسانی بخش ذخیره یادداشت برای نمایش اعلان
const originalSaveNote = saveNote;
saveNote = function() {
  originalSaveNote();
  showToast('یادداشت با موفقیت ذخیره شد 📌');
};

// به‌روزرسانی ساخت رمز عبور برای کپی خودکار یا نمایش پیام
const originalGenPass = generatePassword;
generatePassword = function() {
  originalGenPass();
  showToast('رمز عبور جدید ساخته شد 🔐');
};

// مدیریت تاریخچه رمزهای عبور
let passwordHistory = JSON.parse(localStorage.getItem('nexkit_pass_history')) || [];

const originalGenPassForHistory = generatePassword;
generatePassword = function() {
  originalGenPassForHistory();
  const pass = document.getElementById('passOutput').innerText;
  passwordHistory.unshift(pass);
  if (passwordHistory.length > 5) passwordHistory.pop(); // نگهداری ۵ مورد آخر
  localStorage.setItem('nexkit_pass_history', JSON.stringify(passwordHistory));
  updateHistoryUI();
};

function updateHistoryUI() {
  const historyList = document.getElementById('passHistoryList');
  if (historyList) {
    historyList.innerHTML = passwordHistory.map(p => `<div style="padding: 6px; background: var(--bg); margin-bottom: 4px; border-radius: 6px; font-family: monospace;">${p}</div>`).join('');
  }
}

// بارگذاری تاریخچه هنگام لود صفحه
window.addEventListener('load', () => {
  updateHistoryUI();
});
