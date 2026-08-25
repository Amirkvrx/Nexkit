// --- Nexkit Core Logic Engine (Multi-Language & Guides) ---

const translations = {
  en: {
    calc: "Calculator", loan: "Loan Calc", bmi: "BMI Calc", json: "JSON Tools",
    crypto: "Base64", imgTool: "Image Converter", textDiff: "Text Diff", caseConv: "Case Converter",
    timer: "Timer", converter: "Length Converter", tempConverter: "Temp Converter",
    text: "Text Counter", notes: "Quick Notes", todo: "To-Do List", clock: "World Clock",
    pass: "Password Gen", qr: "QR Code", torch: "Flashlight", gps: "GPS", settings: "Settings",
    colorTool: "Color Tools", searchPlaceholder: "🔍 Quick search tools... (Ctrl + K)",
    toolTab: "Tool", guideTab: "Guide",
    jsonGuideText: "How to use JSON Tools:\n1. Paste your raw or unformatted JSON into the box.\n2. Click 'Format' to prettify or 'Minify' to compress.\n3. Check output for syntax errors.",
    diffGuideText: "How to use Text Diff:\n1. Paste original text in the first box and modified text in the second.\n2. Click 'Compare Texts' to view added/removed lines.",
    caseGuideText: "How to use Case Converter:\n1. Enter your text.\n2. Click desired case button (UPPERCASE, lowercase, Title, camelCase) to transform instantly.",
    imgGuideText: "How to use Image Converter:\n1. Select an image file from your device.\n2. Choose target format (WEBP, JPG, PNG) and quality.\n3. Click 'Process Image' to convert and download."
  },
  fa: {
    calc: "ماشین حساب", loan: "محاسبه وام", bmi: "شاخص BMI", json: "ابزار JSON",
    crypto: "هش و کدگذاری", imgTool: "تبدیل و فشرده‌ساز عکس", textDiff: "مقایسه دو متن", caseConv: "تغییر فرمت حروف",
    timer: "تایمر", converter: "مبدل طول", tempConverter: "مبدل دما",
    text: "شمارشگر متن", notes: "یادداشت سریع", todo: "کارهای روزمره", clock: "ساعت جهانی",
    pass: "تولید رمز عبور", qr: "بارکد QR", torch: "چراغ‌قوه صفحه", gps: "موقعیت‌یاب", settings: "تنظیمات",
    colorTool: "ابزار رنگ", searchPlaceholder: "🔍 جستجوی سریع ابزارها... (Ctrl + K)",
    toolTab: "ابزار", guideTab: "راهنما",
    jsonGuideText: "راهنمای استفاده از ابزار JSON:\n۱. متن JSON خود را در کادر وارد کنید.\n۲. دکمه Format را برای مرتب‌سازی یا Minify را برای فشرده‌سازی بزنید.\n۳. خطاهای ساختاری در خروجی نمایش داده می‌شوند.",
    diffGuideText: "راهنمای مقایسه متن:\n۱. متن اولیه را در کادر اول و متن ویرایش‌شده را در کادر دوم وارد کنید.\n۲. روی 'مقایسه' کلیک کنید تا تفاوت خط‌به‌خط نمایش داده شود.",
    caseGuideText: "راهنمای تبدیل حروف:\n۱. متن خود را وارد کنید.\n۲. روی دکمه دلخواه (بزرگ، کوچک، عنوان و...) کلیک کنید تا متن تبدیل شود.",
    imgGuideText: "راهنمای مبدل عکس:\n۱. تصویر مدنظر را انتخاب کنید.\n۲. فرمت خروجی و کیفیت را تنظیم کنید.\n۳. روی پردازش و دانلود تصویر کلیک کنید."
  }
};

let currentLang = 'en';

function setLanguage(lang) {
  currentLang = translations[lang] ? lang : 'en';
  localStorage.setItem('nexkit_lang', currentLang);
  document.documentElement.lang = currentLang;
  document.documentElement.dir = (currentLang === 'fa' || currentLang === 'ar') ? 'rtl' : 'ltr';
  
  // ترجمه عناوین با ویژگی data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang]?.[key]) el.innerText = translations[currentLang][key];
  });

  // ترجمه placeholderها
  const searchInput = document.getElementById('quickSearch');
  if (searchInput && translations[currentLang]?.searchPlaceholder) {
    searchInput.placeholder = translations[currentLang].searchPlaceholder;
  }
  
  // بروزرسانی متن تب‌های راهنما
  document.querySelectorAll('.sub-tab-tool').forEach(el => el.innerText = translations[currentLang].toolTab);
  document.querySelectorAll('.sub-tab-guide').forEach(el => el.innerText = translations[currentLang].guideTab);
}

function switchTab(tabId, btnElement) {
  document.querySelectorAll('.card').forEach(card => card.style.display = 'none');
  const targetCard = document.getElementById(`tab-${tabId}`);
  if (targetCard) targetCard.style.display = 'block';
  
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  
  localStorage.setItem('nexkit_active_tab', tabId);
}

function switchSubTab(toolPrefix, tabType, btnElement) {
  const card = document.getElementById(`tab-${toolPrefix}`);
  if (!card) return;
  card.querySelectorAll('.sub-pane').forEach(pane => pane.style.display = 'none');
  const targetPane = document.getElementById(`${toolPrefix}-${tabType}`);
  if (targetPane) targetPane.style.display = 'block';
  
  card.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
}

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('nexkit_theme', isLight ? 'light' : 'dark');
}

// الگوریتم جستجوی فازی مقاوم در برابر خطا
function filterTools(query) {
  const q = query.toLowerCase().trim();
  const buttons = document.querySelectorAll('.nav-tabs .tab-btn');
  if (!q) { buttons.forEach(btn => btn.style.display = 'inline-block'); return; }

  buttons.forEach(btn => {
    const text = btn.innerText.toLowerCase();
    btn.style.display = text.includes(q) ? 'inline-block' : 'none';
  });
}

// توابع ابزارها
function press(val) { document.getElementById('screen').value += val; }
function clearCalc() { document.getElementById('screen').value = ''; }
function calculate() {
  try { document.getElementById('screen').value = eval(document.getElementById('screen').value); }
  catch (e) { document.getElementById('screen').value = 'Error'; }
}

function formatJSON() {
  try {
    document.getElementById('jsonOutput').innerText = JSON.stringify(JSON.parse(document.getElementById('jsonInput').value), null, 2);
  } catch (e) { document.getElementById('jsonOutput').innerText = "Invalid JSON: " + e.message; }
}

function minifyJSON() {
  try {
    document.getElementById('jsonOutput').innerText = JSON.stringify(JSON.parse(document.getElementById('jsonInput').value));
  } catch (e) { document.getElementById('jsonOutput').innerText = "Invalid JSON"; }
}

function compareTexts() {
  const t1 = (document.getElementById('diffText1').value || '').split('\n');
  const t2 = (document.getElementById('diffText2').value || '').split('\n');
  let output = '';
  const maxLines = Math.max(t1.length, t2.length);
  for (let i = 0; i < maxLines; i++) {
    if (t1[i] === t2[i]) output += `<div>Line ${i+1}: ${t1[i] || ''}</div>`;
    else {
      if (t1[i] !== undefined) output += `<div style="color:#ff5252;">- ${t1[i]}</div>`;
      if (t2[i] !== undefined) output += `<div style="color:#4caf50;">+ ${t2[i]}</div>`;
    }
  }
  document.getElementById('diffResult').innerHTML = output || "No difference.";
}

function convertCase(type) {
  const input = document.getElementById('caseInput');
  let val = input.value;
  if (type === 'upper') val = val.toUpperCase();
  else if (type === 'lower') val = val.toLowerCase();
  else if (type === 'title') val = val.toLowerCase().replace(/(?:^|\s)\w/g, m => m.toUpperCase());
  else if (type === 'camel') val = val.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  input.value = val;
}

function processImage() {
  const fileInput = document.getElementById('imgInput');
  const quality = parseFloat(document.getElementById('imgQuality').value);
  const format = document.getElementById('imgFormat').value;
  const outputDiv = document.getElementById('imgOutput');
  if (!fileInput.files[0]) { outputDiv.innerText = "Please select image."; return; }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      const url = canvas.toDataURL(format, quality);
      outputDiv.innerHTML = `<img src="${url}" style="max-width:100%; border-radius:8px; margin:10px 0;"><br><a href="${url}" download="image.${format.split('/')[1]}" class="btn btn-accent" style="display:inline-block; text-decoration:none;">Download</a>`;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(fileInput.files[0]);
}

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('nexkit_lang') || 'en';
  setLanguage(savedLang);
  document.getElementById('langSelector').value = savedLang;
  if (localStorage.getItem('nexkit_theme') === 'light') document.body.classList.add('light-theme');
  const activeTab = localStorage.getItem('nexkit_active_tab') || 'calc';
  const defaultBtn = document.querySelector(`.tab-btn[onclick*="${activeTab}"]`);
  switchTab(activeTab, defaultBtn);
});

// دکمه کپی هوشمند خروجی‌ها
function copyToClipboard(elementId) {
  const el = document.getElementById(elementId);
  const text = el.innerText || el.value;
  if (!text) return;
  
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard!');
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Copied!');
  });
}

// تولیدکننده رمز عبور و راهنما
function generatePassword() {
  const length = parseInt(document.getElementById('passLength').value) || 12;
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('passOutput').value = pass;
}

// اضافه کردن متن راهنمای رمز عبور به شیء ترجمه‌ها
if (typeof translations !== 'undefined') {
  translations.en.passGuideText = "How to use Password Generator:\n1. Select desired password length.\n2. Click 'Generate' to create a strong random password.\n3. Click 'Copy' to use it securely.";
  translations.fa.passGuideText = "راهنمای تولید رمز عبور:\n۱. طول رمز عبور مورد نظر را تعیین کنید.\n۲. روی 'تولید رمز' کلیک کنید تا یک رمز قوی و تصادفی ساخته شود.\n۳. با دکمه 'کپی' آن را ذخیره کنید.";
}

// دانلود خروجی متنی یا JSON به صورت فایل
function downloadAsFile(elementId, filename) {
  const content = document.getElementById(elementId).innerText || document.getElementById(elementId).value;
  if (!content) {
    alert("No content to download!");
    return;
  }
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// کدگذاری و کدگشایی Base64 به همراه پشتیبانی از UTF-8 (متن‌های فارسی)
function processBase64(mode) {
  const input = document.getElementById('cryptoInput').value;
  const outputEl = document.getElementById('cryptoOutput');
  
  if (!input) {
    outputEl.innerText = "Please enter text.";
    return;
  }
  
  try {
    if (mode === 'encode') {
      outputEl.innerText = btoa(unescape(encodeURIComponent(input)));
    } else if (mode === 'decode') {
      outputEl.innerText = decodeURIComponent(escape(atob(input)));
    }
  } catch (e) {
    outputEl.innerText = "Invalid Base64 input!";
  }
}

// اضافه کردن متن‌های راهنمای Base64 و BMI به شیء ترجمه‌ها
if (typeof translations !== 'undefined') {
  translations.en.cryptoGuideText = "How to use Base64:\n1. Enter normal text to Encode or Base64 string to Decode.\n2. Click the desired operation button.\n3. Copy or download the output result.";
  translations.fa.cryptoGuideText = "راهنمای Base64:\n۱. متن معمولی برای کدگذاری یا متن Base64 برای کدگشایی را وارد کنید.\n۲. دکمه عملیات مورد نظر را بزنید.\n۳. خروجی را کپی یا دانلود کنید.";
}

// اضافه کردن راهنمای Case Converter به زبان‌های مختلف
if (typeof translations !== 'undefined') {
  translations.en.caseGuideText = "How to use Case Converter:\n1. Paste or type your text in the input box.\n2. Choose a format: UPPERCASE, lowercase, Title Case, or camelCase.\n3. Copy or download the result.";
  translations.fa.caseGuideText = "راهنمای تغییر فرمت حروف:\n۱. متن خود را در کادر وارد کنید.\n۲. روی یکی از حالت‌ها (حروف بزرگ، کوچک، عنوان یا شترکلید) کلیک کنید.\n۳. متن تبدیل‌شده را کپی یا دانلود کنید.";
}
