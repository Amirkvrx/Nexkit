// --- Nexkit Core Logic Engine ---

const translations = {
  en: {
    calc: "Calculator", loan: "Loan Calc", bmi: "BMI Calc", json: "JSON Tools",
    crypto: "Base64", imgTool: "Image Converter", textDiff: "Text Diff", caseConv: "Case Converter",
    timer: "Timer", converter: "Length Converter", tempConverter: "Temp Converter",
    text: "Text Counter", notes: "Quick Notes", todo: "To-Do List", clock: "World Clock",
    pass: "Password Gen", qr: "QR Code", torch: "Flashlight", gps: "GPS", settings: "Settings"
  },
  fa: {
    calc: "ماشین حساب", loan: "محاسبه وام", bmi: "شاخص BMI", json: "ابزار JSON",
    crypto: "هش و کدگذاری", imgTool: "تبدیل و فشرده‌ساز عکس", textDiff: "مقایسه دو متن", caseConv: "تغییر فرمت حروف",
    timer: "تایمر", converter: "مبدل طول", tempConverter: "مبدل دما",
    text: "شمارشگر متن", notes: "یادداشت سریع", todo: "کارهای روزمره", clock: "ساعت جهانی",
    pass: "تولید رمز عبور", qr: "بارکد QR", torch: "چراغ‌قوه صفحه", gps: "موقعیت‌یافتن", settings: "تنظیمات"
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
    if (translations[currentLang]?.[key]) el.innerText = translations[currentLang][key];
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

// سیستم جستجوی سریع ابزارها
function filterTools(query) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll('.nav-tabs .tab-btn').forEach(btn => {
    const text = btn.innerText.toLowerCase();
    btn.style.display = text.includes(q) ? 'inline-block' : 'none';
  });
}

// میانبر کیبورد (Ctrl + K)
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    const searchInput = document.getElementById('quickSearch');
    if (searchInput) searchInput.focus();
  }
});

// فشرده‌سازی و تبدیل فرمت تصاویر (آفلاین)
function processImage() {
  const fileInput = document.getElementById('imgInput');
  const quality = parseFloat(document.getElementById('imgQuality').value);
  const format = document.getElementById('imgFormat').value;
  const outputDiv = document.getElementById('imgOutput');
  
  if (!fileInput.files[0]) {
    outputDiv.innerText = "Please select an image file.";
    return;
  }
  
  const file = fileInput.files[0];
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const convertedUrl = canvas.toDataURL(format, quality);
      outputDiv.innerHTML = `
        <p style="font-size: 13px; color: var(--accent-cyan);">Processed successfully!</p>
        <img src="${convertedUrl}" style="max-width: 100%; border-radius: 8px; margin: 10px 0; border: 1px solid var(--border);">
        <br>
        <a href="${convertedUrl}" download="converted_image.${format.split('/')[1]}" class="btn btn-accent" style="display: inline-block; text-decoration: none; text-align: center;">Download Processed Image</a>
      `;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// مقایسه متن (Text Diff Checker)
function compareTexts() {
  const t1 = document.getElementById('diffText1').value.split('\n');
  const t2 = document.getElementById('diffText2').value.split('\n');
  const resultEl = document.getElementById('diffResult');
  
  let output = '';
  const maxLines = Math.max(t1.length, t2.length);
  
  for (let i = 0; i < maxLines; i++) {
    const line1 = t1[i] || '';
    const line2 = t2[i] || '';
    
    if (line1 === line2) {
      output += `<div>Line ${i+1}: ${line1}</div>`;
    } else {
      if (line1) output += `<div class="diff-removed">- Line ${i+1}: ${line1}</div>`;
      if (line2) output += `<div class="diff-added">+ Line ${i+1}: ${line2}</div>`;
    }
  }
  resultEl.innerHTML = output || "No differences found.";
}

// تبدیل حالت حروف (Case Converter)
function convertCase(type) {
  const input = document.getElementById('caseInput');
  let val = input.value;
  
  if (type === 'upper') val = val.toUpperCase();
  else if (type === 'lower') val = val.toLowerCase();
  else if (type === 'title') {
    val = val.toLowerCase().replace(/(?:^|\s)\w/g, match => match.toUpperCase());
  } else if (type === 'camel') {
    val = val.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }
  input.value = val;
}

// سایر ابزارها
function press(val) { document.getElementById('screen').value += val; }
function clearCalc() { document.getElementById('screen').value = ''; }
function calculate() {
  try { document.getElementById('screen').value = eval(document.getElementById('screen').value); }
  catch (e) { document.getElementById('screen').value = 'Error'; }
}

function formatJSON() {
  try {
    document.getElementById('jsonOutput').innerText = JSON.stringify(JSON.parse(document.getElementById('jsonInput').value), null, 2);
  } catch (e) { document.getElementById('jsonOutput').innerText = "Invalid JSON"; }
}

function calculateBMI() {
  const w = parseFloat(document.getElementById('bmiWeight').value);
  const h = parseFloat(document.getElementById('bmiHeight').value) / 100;
  if (!w || !h) return;
  const bmi = (w / (h * h)).toFixed(1);
  document.getElementById('bmiResult').innerHTML = `BMI: <strong>${bmi}</strong>`;
}

function encodeBase64() {
  try { document.getElementById('cryptoOutput').innerText = btoa(unescape(encodeURIComponent(document.getElementById('cryptoInput').value))); }
  catch(e) { document.getElementById('cryptoOutput').innerText = "Error"; }
}

function decodeBase64() {
  try { document.getElementById('cryptoOutput').innerText = decodeURIComponent(escape(atob(document.getElementById('cryptoInput').value))); }
  catch(e) { document.getElementById('cryptoOutput').innerText = "Error"; }
}

// آماده‌سازی اولیه
window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('nexkit_lang') || 'en';
  setLanguage(savedLang);
  document.getElementById('langSelector').value = savedLang;
  
  if (localStorage.getItem('nexkit_theme') === 'light') document.body.classList.add('light-theme');
  
  const activeTab = localStorage.getItem('nexkit_active_tab') || 'calc';
  const defaultBtn = document.querySelector(`.tab-btn[onclick*="${activeTab}"]`);
  switchTab(activeTab, defaultBtn);
});

// --- قابلیت اشتراک‌گذاری وب (Web Share API) ---
function shareContent(title, text) {
  if (navigator.share) {
    navigator.share({ title: title, text: text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  }
}

// ثبت تاریخچه فعالیت‌ها در LocalStorage
function saveHistory(toolName, resultText) {
  let history = JSON.parse(localStorage.getItem('nexkit_history') || '[]');
  history.unshift({ tool: toolName, text: resultText, time: new Date().toLocaleTimeString() });
  if (history.length > 15) history.pop(); // نگهداری ۱۵ مورد آخر
  localStorage.setItem('nexkit_history', JSON.stringify(history));
}

// تابع محاسبه فاصله لوون‌شتاین برای تشخیص خطاهای تایپی
function getLevenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) { matrix[i] = [i]; }
  for (let j = 0; j <= a.length; j++) { matrix[0][j] = j; }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1  // deletion
          )
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// سیستم جستجوی هوشمند فازی (مقاوم در برابر خطای تایپی)
function filterTools(query) {
  const q = query.toLowerCase().trim();
  const buttons = document.querySelectorAll('.nav-tabs .tab-btn');
  
  if (!q) {
    buttons.forEach(btn => btn.style.display = 'inline-block');
    return;
  }

  buttons.forEach(btn => {
    const text = btn.innerText.toLowerCase();
    const words = text.split(/\s+/);
    
    let isMatch = false;
    
    // ۱. بررسی تطابق بخشی از کلمه یا شامل بودن
    if (text.includes(q)) {
      isMatch = true;
    } else {
      // ۲. بررسی خطای تایپی برای هر کلمه با توجه به طول آن
      for (const word of words) {
        const distance = getLevenshteinDistance(q, word);
        // اگر خطای تایپی مجاز نسبت به طول کلمه کمتر یا مساوی ۲ باشد
        if (distance <= 2 || (q.length > 3 && word.includes(q))) {
          isMatch = true;
          break;
        }
      }
    }
    
    btn.style.display = isMatch ? 'inline-block' : 'none';
  });
}

// --- ابزار انتخاب رنگ و پالت‌ساز ---
function updateColorTool(hex) {
  document.getElementById('colorPreview').style.backgroundColor = hex;
  document.getElementById('hexCode').value = hex;
  
  // تبدیل HEX به RGB
  let r = parseInt(hex.slice(1,3), 16);
  let g = parseInt(hex.slice(3,5), 16);
  let b = parseInt(hex.slice(5,7), 16);
  document.getElementById('rgbCode').value = `rgb(${r}, ${g}, ${b})`;
}

function generateRandomPalette() {
  const container = document.getElementById('paletteContainer');
  container.innerHTML = '';
  
  for (let i = 0; i < 5; i++) {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const box = document.createElement('div');
    box.style.cssText = `flex: 1; height: 60px; background: ${randomHex}; border-radius: 6px; cursor: pointer; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 4px; font-size: 10px; font-family: monospace; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.8);`;
    box.innerText = randomHex;
    box.onclick = () => {
      navigator.clipboard.writeText(randomHex);
      alert(`Copied ${randomHex} to clipboard!`);
    };
    container.appendChild(box);
  }
}

// افزودن کلید ترجمه ابزار رنگ به شیء translations
if (typeof translations !== 'undefined') {
  if (translations.en) translations.en.colorTool = "Color Tools";
  if (translations.fa) translations.fa.colorTool = "ابزار رنگ";
}

// مدیریت تب‌های داخلی راهنما برای هر ابزار
function switchSubTab(toolPrefix, tabType, btnElement) {
  const card = document.getElementById(`tab-${toolPrefix}`);
  if (!card) return;
  
  // مخفی کردن همه محتواهای این کارت
  card.querySelectorAll('.sub-pane').forEach(pane => pane.style.display = 'none');
  // نمایش تب انتخاب شده
  const targetPane = document.getElementById(`${toolPrefix}-${tabType}`);
  if (targetPane) targetPane.style.display = 'block';
  
  // بروزرسانی استایل دکمه‌ها
  card.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
}
