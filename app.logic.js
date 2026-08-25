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

// --- Nexkit 12-Language Support Engine ---

const translations = {
  fa: {
    dir: "rtl",
    calc: "ماشین حساب", imgTool: "تبدیل عکس", textDiff: "مقایسه متن", caseConv: "فرمت حروف",
    json: "ابزار JSON", pass: "رمز عبور", crypto: "کدگذاری Base64", settings: "تنظیمات",
    searchPlaceholder: "🔍 جستجوی سریع ابزارها...", toolTab: "ابزار", guideTab: "راهنما",
    jsonGuideText: "راهنمای JSON:\n۱. متن JSON را وارد کنید.\n۲. دکمه Format یا Minify را بزنید.",
    diffGuideText: "راهنمای مقایسه متن:\n۱. متن اول و دوم را وارد کنید.\n۲. روی مقایسه کلیک کنید.",
    caseGuideText: "راهنمای حروف:\n۱. متن را وارد کنید.\n۲. حالت مورد نظر را انتخاب کنید.",
    imgGuideText: "راهنمای عکس:\n۱. عکس را انتخاب کنید.\n۲. فرمت و کیفیت را مشخص و دانلود کنید.",
    passGuideText: "راهنمای رمز:\n۱. طول رمز را تعیین کنید.\n۲. دکمه تولید رمز را بزنید.",
    cryptoGuideText: "راهنمای Base64:\n۱. متن را وارد کنید.\n۲. دکمه Encode یا Decode را بزنید."
  },
  en: {
    dir: "ltr",
    calc: "Calculator", imgTool: "Image Converter", textDiff: "Text Diff", caseConv: "Case Converter",
    json: "JSON Tools", pass: "Password Gen", crypto: "Base64", settings: "Settings",
    searchPlaceholder: "🔍 Search tools...", toolTab: "Tool", guideTab: "Guide",
    jsonGuideText: "JSON Guide:\n1. Paste JSON.\n2. Click Format or Minify.",
    diffGuideText: "Text Diff Guide:\n1. Paste texts.\n2. Click Compare.",
    caseGuideText: "Case Guide:\n1. Enter text.\n2. Select case type.",
    imgGuideText: "Image Guide:\n1. Choose image.\n2. Select format & quality.",
    passGuideText: "Password Guide:\n1. Set length.\n2. Click Generate.",
    cryptoGuideText: "Base64 Guide:\n1. Paste text.\n2. Click Encode/Decode."
  },
  es: {
    dir: "ltr",
    calc: "Calculadora", imgTool: "Convertidor Imagen", textDiff: "Comparar Texto", caseConv: "Formato Texto",
    json: "Herramientas JSON", pass: "Contraseñas", crypto: "Base64", settings: "Ajustes",
    searchPlaceholder: "🔍 Buscar herramientas...", toolTab: "Herramienta", guideTab: "Guía",
    jsonGuideText: "Guía JSON:\n1. Pegue JSON.\n2. Haga clic en Formatear o Minificar.",
    diffGuideText: "Guía de Texto:\n1. Pegue textos.\n2. Haga clic en Comparar.",
    caseGuideText: "Guía de Formato:\n1. Ingrese texto.\n2. Seleccione formato.",
    imgGuideText: "Guía de Imagen:\n1. Elija imagen.\n2. Seleccione formato y calidad.",
    passGuideText: "Guía de Contraseña:\n1. Defina longitud.\n2. Genere.",
    cryptoGuideText: "Guía Base64:\n1. Ingrese texto.\n2. Codifique/Decodifique."
  },
  ar: {
    dir: "rtl",
    calc: "الحاسبة", imgTool: "محول الصور", textDiff: "مقارنة النصوص", caseConv: "حالة الأحرف",
    json: "أدوات JSON", pass: "مولد كلمة السر", crypto: "ترميز Base64", settings: "الإعدادات",
    searchPlaceholder: "🔍 بحث سريع...", toolTab: "أداة", guideTab: "دليل",
    jsonGuideText: "دليل JSON:\n١. أدخل نص JSON.\n٢. اضغط تنسيق أو ضغط.",
    diffGuideText: "دليل المقارنة:\n١. أدخل النصين.\n٢. اضغط مقارنة.",
    caseGuideText: "دليل الأحرف:\n١. أدخل النص.\n٢. اختر الحالة المطلوبة.",
    imgGuideText: "دليل الصور:\n١. اختر صورة.\n٢. حدد الصيغة والجودة.",
    passGuideText: "دليل كلمة السر:\n١. حدد الطول.\n٢. اضغط إنشاء.",
    cryptoGuideText: "دليل Base64:\n١. أدخل النص.\n٢. اضغط تشفير/فك التشفير."
  },
  fr: {
    dir: "ltr",
    calc: "Calculatrice", imgTool: "Convertisseur Image", textDiff: "Compare Texte", caseConv: "Casse Texte",
    json: "Outils JSON", pass: "Mots de Passe", crypto: "Base64", settings: "Paramètres",
    searchPlaceholder: "🔍 Rechercher...", toolTab: "Outil", guideTab: "Guide",
    jsonGuideText: "Guide JSON:\n1. Collez le JSON.\n2. Cliquez sur Formater ou Minifier.",
    diffGuideText: "Guide Texte:\n1. Collez les textes.\n2. Cliquez sur Comparer.",
    caseGuideText: "Guide Casse:\n1. Entrez le texte.\n2. Choisissez le format.",
    imgGuideText: "Guide Image:\n1. Choisissez une image.\n2. Sélectionnez le format.",
    passGuideText: "Guide Mot de Passe:\n1. Définissez la longueur.\n2. Générez.",
    cryptoGuideText: "Guide Base64:\n1. Entrez le texte.\n2. Encodez ou Décodez."
  },
  de: {
    dir: "ltr",
    calc: "Rechner", imgTool: "Bild-Konverter", textDiff: "Textvergleich", caseConv: "Schreibweise",
    json: "JSON-Tools", pass: "Passwort-Gen", crypto: "Base64", settings: "Einstellungen",
    searchPlaceholder: "🔍 Suchen...", toolTab: "Tool", guideTab: "Anleitung",
    jsonGuideText: "JSON-Anleitung:\n1. JSON einfügen.\n2. Formatieren oder Minimieren klicken.",
    diffGuideText: "Textvergleich-Anleitung:\n1. Texte einfügen.\n2. Vergleichen klicken.",
    caseGuideText: "Schreibweise-Anleitung:\n1. Text eingeben.\n2. Modus wählen.",
    imgGuideText: "Bild-Anleitung:\n1. Bild wählen.\n2. Format & Qualität wählen.",
    passGuideText: "Passwort-Anleitung:\n1. Länge festlegen.\n2. Generieren.",
    cryptoGuideText: "Base64-Anleitung:\n1. Text eingeben.\n2. Kodieren/Dekodieren."
  },
  ru: {
    dir: "ltr",
    calc: "Калькулятор", imgTool: "Конвертер Изображений", textDiff: "Сравнение Текста", caseConv: "Регистр Текста",
    json: "Инструменты JSON", pass: "Генератор Паролей", crypto: "Base64", settings: "Настройки",
    searchPlaceholder: "🔍 Поиск...", toolTab: "Инструмент", guideTab: "Инструкция",
    jsonGuideText: "Инструкция JSON:\n1. Вставьте JSON.\n2. Нажмите Форматировать или Сжать.",
    diffGuideText: "Инструкция Сравнения:\n1. Вставьте тексты.\n2. Нажмите Сравнить.",
    caseGuideText: "Инструкция Регистра:\n1. Введите текст.\n2. Выберите регистр.",
    imgGuideText: "Инструкция Изображений:\n1. Выберите фото.\n2. Укажите формат.",
    passGuideText: "Инструкция Паролей:\n1. Задайте длину.\n2. Нажмите Создать.",
    cryptoGuideText: "Инструкция Base64:\n1. Введите текст.\n2. Кодировать/Декодировать."
  },
  zh: {
    dir: "ltr",
    calc: "计算器", imgTool: "图片转换器", textDiff: "文本对比", caseConv: "大小写转换",
    json: "JSON 工具", pass: "密码生成器", crypto: "Base64", settings: "设置",
    searchPlaceholder: "🔍 搜索工具...", toolTab: "工具", guideTab: "指南",
    jsonGuideText: "JSON 指南：\n1. 粘贴 JSON。\n2. 点击格式化或压缩。",
    diffGuideText: "文本对比指南：\n1. 粘贴文本。\n2. 点击对比。",
    caseGuideText: "大小写指南：\n1. 输入文本。\n2. 选择转换类型。",
    imgGuideText: "图片指南：\n1. 选择图片。\n2. 选择格式和质量。",
    passGuideText: "密码指南：\n1. 设置长度。\n2. 点击生成。",
    cryptoGuideText: "Base64 指南：\n1. 输入文本。\n2. 点击编码/解码。"
  },
  ja: {
    dir: "ltr",
    calc: "电卓", imgTool: "画像変換", textDiff: "テキスト比較", caseConv: "文字変換",
    json: "JSON ツール", pass: "パスワード生成", crypto: "Base64", settings: "設定",
    searchPlaceholder: "🔍 ツールを検索...", toolTab: "ツール", guideTab: "ガイド",
    jsonGuideText: "JSON ガイド:\n1. JSONを貼り付け。\n2. 成形または圧縮をクリック。",
    diffGuideText: "テキスト比較ガイド:\n1. テキストを貼り付け。\n2. 比較をクリック。",
    caseGuideText: "文字変換ガイド:\n1. テキストを入力。\n2. 形式を選択。",
    imgGuideText: "画像ガイド:\n1. 画像を選択。\n2. フォーマットを選択。",
    passGuideText: "パスワードガイド:\n1. 長さを指定。\n2. 生成をクリック。",
    cryptoGuideText: "Base64 ガイド:\n1. テキストを入力。\n2. エンコード/デコード。"
  },
  tr: {
    dir: "ltr",
    calc: "Hesap Makinesi", imgTool: "Görsel Dönüştürücü", textDiff: "Metin Karşılaştırma", caseConv: "Büyük/Küçük Harf",
    json: "JSON Araçları", pass: "Şifre Oluşturucu", crypto: "Base64", settings: "Ayarlar",
    searchPlaceholder: "🔍 Araçlarda ara...", toolTab: "Araç", guideTab: "Rehber",
    jsonGuideText: "JSON Rehberi:\n1. JSON'u yapıştırın.\n2. Biçimlendir veya Sıkıştır'a tıklayın.",
    diffGuideText: "Karşılaştırma Rehberi:\n1. Metinleri yapıştırın.\n2. Karşılaştır'a tıklayın.",
    caseGuideText: "Harf Rehberi:\n1. Metni girin.\n2. Dönüştürme türünü seçin.",
    imgGuideText: "Görsel Rehberi:\n1. Görsel seçin.\n2. Format ve kaliteyi belirleyin.",
    passGuideText: "Şifre Rehberi:\n1. Uzunluğu ayarlayın.\n2. Oluştur'a tıklayın.",
    cryptoGuideText: "Base64 Rehberi:\n1. Metni girin.\n2. Kodla/Çöz'e tıklayın."
  },
  it: {
    dir: "ltr",
    calc: "Calcolatrice", imgTool: "Convertitore Immagini", textDiff: "Confronta Testo", caseConv: "Maiuscole/Minuscole",
    json: "Strumenti JSON", pass: "Generatore Password", crypto: "Base64", settings: "Impostazioni",
    searchPlaceholder: "🔍 Cerca strumenti...", toolTab: "Strumento", guideTab: "Guida",
    jsonGuideText: "Guida JSON:\n1. Incolla JSON.\n2. Clicca Formatta o Minifica.",
    diffGuideText: "Guida Confronto:\n1. Incolla i testi.\n2. Clicca Confronta.",
    caseGuideText: "Guida Testo:\n1. Inserisci testo.\n2. Seleziona formato.",
    imgGuideText: "Guida Immagini:\n1. Scegli immagine.\n2. Seleziona formato e qualità.",
    passGuideText: "Guida Password:\n1. Imposta lunghezza.\n2. Clicca Genera.",
    cryptoGuideText: "Guida Base64:\n1. Inserisci testo.\n2. Clicca Codifica/Decodifica."
  },
  pt: {
    dir: "ltr",
    calc: "Calculadora", imgTool: "Conversor de Imagem", textDiff: "Comparar Texto", caseConv: "Maiúsculas/Minúsculas",
    json: "Ferramentas JSON", pass: "Gerador de Senhas", crypto: "Base64", settings: "Configurações",
    searchPlaceholder: "🔍 Buscar ferramentas...", toolTab: "Ferramenta", guideTab: "Guia",
    jsonGuideText: "Guia JSON:\n1. Cole o JSON.\n2. Clique em Formatar ou Compactar.",
    diffGuideText: "Guia Comparar:\n1. Cole os textos.\n2. Clique em Comparar.",
    caseGuideText: "Guia Formato:\n1. Insira o texto.\n2. Escolha o formato.",
    imgGuideText: "Guia Imagem:\n1. Escolha a imagem.\n2. Selecione formato e qualidade.",
    passGuideText: "Guia Senha:\n1. Defina o tamanho.\n2. Clique em Gerar.",
    cryptoGuideText: "Guia Base64:\n1. Insira o texto.\n2. Clique em Codificar/Decodificar."
  }
};

function setLanguage(lang) {
  const selectedLang = translations[lang] ? lang : 'fa';
  const langData = translations[selectedLang];
  localStorage.setItem('nexkit_lang', selectedLang);
  document.documentElement.lang = selectedLang;
  document.documentElement.dir = langData.dir;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (langData[key]) el.innerText = langData[key];
  });

  const searchInput = document.getElementById('quickSearch');
  if (searchInput && langData.searchPlaceholder) {
    searchInput.placeholder = langData.searchPlaceholder;
  }
  
  document.querySelectorAll('.sub-tab-tool').forEach(el => el.innerText = langData.toolTab);
  document.querySelectorAll('.sub-tab-guide').forEach(el => el.innerText = langData.guideTab);
}

// محاسبه شاخص توده بدنی (BMI)
function calculateBMI() {
  const weight = parseFloat(document.getElementById('bmiWeight').value);
  const height = parseFloat(document.getElementById('bmiHeight').value) / 100;
  const resultEl = document.getElementById('bmiResult');

  if (!weight || !height || height <= 0 || weight <= 0) {
    resultEl.innerText = "Please enter valid weight and height.";
    return;
  }

  const bmi = (weight / (height * height)).toFixed(1);
  let status = "";

  if (bmi < 18.5) status = "Underweight";
  else if (bmi < 24.9) status = "Normal weight";
  else if (bmi < 29.9) status = "Overweight";
  else status = "Obesity";

  resultEl.innerText = `BMI: ${bmi} (${status})`;
}

// اضافه کردن متون BMI به شیء ترجمه‌ها
if (typeof translations !== 'undefined') {
  const bmiGuides = {
    fa: "راهنمای BMI:\\n۱. وزن (کیلوگرم) و قد (سانتی‌متر) خود را وارد کنید.\\n۲. روی 'محاسبه' کلیک کنید تا شاخص و وضعیت سلامت نمایش داده شود.",
    en: "BMI Guide:\\n1. Enter your weight (kg) and height (cm).\\n2. Click 'Calculate' to see your BMI and health category.",
    es: "Guía BMI:\\n1. Ingrese su peso (kg) y altura (cm).\\n2. Haga clic en 'Calcular'.",
    ar: "دليل BMI:\\n١. أدخل الوزن (كجم) والطول (سم).\\n٢. اضغط 'احسب' لرؤية مؤشر كتلة الجسم.",
    fr: "Guide IMC:\\n1. Entrez votre poids (kg) et taille (cm).\\n2. Cliquez sur 'Calculer'.",
    de: "BMI-Anleitung:\\n1. Gewicht (kg) und Größe (cm) eingeben.\\n2. Auf 'Berechnen' klicken.",
    ru: "Инструкция ИМТ:\\n1. Введите вес (кг) и рост (см).\\n2. Нажмите 'Рассчитать'.",
    zh: "BMI 指南：\\n1. 输入体重(kg)和身高(cm)。\\n2. 点击“计算”。",
    ja: "BMI ガイド:\\n1. 体重(kg)と身長(cm)を入力。\\n2. 「計算」をクリック。",
    tr: "VKİ Rehberi:\\n1. Kilo (kg) ve boyu (cm) girin.\\n2. 'Hesapla'ya tıklayın.",
    it: "Guida IMC:\\n1. Inserisci peso (kg) e altezza (cm).\\n2. Clicca 'Calcola'.",
    pt: "Guia IMC:\\n1. Insira seu peso (kg) e altura (cm).\\n2. Clique em 'Calcular'."
  };

  Object.keys(bmiGuides).forEach(lang => {
    if (translations[lang]) {
      translations[lang].bmi = lang === 'fa' ? "محاسبه BMI" : (lang === 'ar' ? "مؤشر كتلة الجسم" : "BMI Calculator");
      translations[lang].bmiGuideText = bmiGuides[lang];
    }
  });
}

// تابع اصلی سوئیچ تب‌ها
function switchTab(tabName, btnElement) {
  // پنهان کردن تمامی کارت‌ها
  const cards = document.querySelectorAll('.tool-card');
  cards.forEach(card => card.style.display = 'none');

  // غیرفعال کردن کلاس active تمام دکمه‌های ناوبری
  const navBtns = document.querySelectorAll('.tab-btn');
  navBtns.forEach(btn => btn.classList.remove('active'));

  // فعال کردن دکمه و نمایش کارت مقصد
  if (btnElement) btnElement.classList.add('active');
  
  const targetCard = document.getElementById('tab-' + tabName);
  if (targetCard) {
    targetCard.style.display = 'block';
  }
}

// تابع سوئیچ بین Tool و Guide
function switchSubTab(cardName, paneType, btnElement) {
  const card = document.getElementById('tab-' + cardName);
  if (!card) return;

  const toolPane = card.querySelector('#' + cardName + '-tool');
  const guidePane = card.querySelector('#' + cardName + '-guide');
  const btns = card.querySelectorAll('.sub-tabs .btn');

  btns.forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  if (paneType === 'tool') {
    if (toolPane) toolPane.style.display = 'block';
    if (guidePane) guidePane.style.display = 'none';
  } else {
    if (toolPane) toolPane.style.display = 'none';
    if (guidePane) guidePane.style.display = 'block';
  }
}

// جستجوی سریع ابزارها
function filterTools() {
  const query = document.getElementById('quickSearch').value.toLowerCase();
  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(btn => {
    const text = btn.innerText.toLowerCase();
    if (text.includes(query)) {
      btn.style.display = 'inline-block';
    } else {
      btn.style.display = 'none';
    }
  });
}

// تابع محاسبه آمار متن (کاراکتر، کلمه و خطوط)
function updateTextStats(inputId, statsId) {
  const text = document.getElementById(inputId).value || "";
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').length : 0;

  const statsEl = document.getElementById(statsId);
  if (statsEl) {
    statsEl.innerText = `Words: ${words} | Chars: ${chars} | Lines: ${lines}`;
  }
}

// حفظ آخرین تب انتخاب‌شده در حافظه مرورگر
function switchTab(tabName, btnElement) {
  const cards = document.querySelectorAll('.tool-card');
  cards.forEach(card => card.style.display = 'none');

  const navBtns = document.querySelectorAll('.tab-btn');
  navBtns.forEach(btn => btn.classList.remove('active'));

  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    // فعال‌سازی دکمه بر اساس نام تب
    const targetBtn = document.querySelector(`.tab-btn[onclick*="'${tabName}'"]`);
    if (targetBtn) targetBtn.classList.add('active');
  }

  const targetCard = document.getElementById('tab-' + tabName);
  if (targetCard) {
    targetCard.style.display = 'block';
    localStorage.setItem('nexkit_active_tab', tabName);
  }
}

// بازیابی آخرین تب هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', () => {
  const savedTab = localStorage.getItem('nexkit_active_tab') || 'calc';
  switchTab(savedTab, null);
});

// تابع پاک کردن محتوای کادرهای ورودی و آمارها
function clearField(fieldId, statsId) {
  const el = document.getElementById(fieldId);
  if (el) {
    el.value = '';
    if (el.tagName === 'DIV' || el.tagName === 'P') {
      el.innerText = '';
    }
  }
  if (statsId) {
    updateTextStats(fieldId, statsId);
  }
}

// ۱. تبدیل فرمت کدهای رنگ
function convertColor(hexValue) {
  const hex = hexValue.replace('#', '');
  if (hex.length !== 6) return;

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const rgbStr = `rgb(${r}, ${g}, ${b})`;
  const hexStr = `#${hex.toUpperCase()}`;

  const resEl = document.getElementById('colorResult');
  if (resEl) {
    resEl.innerText = `HEX: ${hexStr}  |  RGB: ${rgbStr}`;
  }
}

// ۲. محاسبه نسبت تصویر (Aspect Ratio)
function calcAspectRatio() {
  const w1 = parseFloat(document.getElementById('arW1').value);
  const h1 = parseFloat(document.getElementById('arH1').value);
  const w2 = parseFloat(document.getElementById('arW2').value);
  const h2Input = document.getElementById('arH2');

  if (w1 > 0 && h1 > 0 && w2 > 0) {
    const calculatedH2 = Math.round((h1 / w1) * w2);
    h2Input.value = calculatedH2;
  }
}

// اضافه کردن متون راهنمای ابزارهای جدید به سیستم ترجمه
if (typeof translations !== 'undefined') {
  Object.keys(translations).forEach(lang => {
    translations[lang].color = lang === 'fa' ? "مبدل رنگ" : "Color Converter";
    translations[lang].aspect = lang === 'fa' ? "نسبت تصویر" : "Aspect Ratio";
    translations[lang].colorGuideText = "راهنما:\\nرنگ مورد نظر خود را انتخاب یا کد HEX را وارد کنید تا کدهای RGB و HEX استاندارد تولید شوند.";
    translations[lang].aspectGuideText = "راهنما:\\nابعاد اصلی (عرض و ارتفاع اول) و عرض جدید را وارد کنید تا ارتفاع جدید طبق نسبت تصویر محاسبه شود.";
  });
}


// تابع اصلاح‌شده برای سوئیچ دقیق بین تب‌ها
function switchTab(tabName, btnElement) {
  // ۱. مخفی کردن تمام کارت‌های ابزار
  const cards = document.querySelectorAll('.tool-card');
  cards.forEach(card => card.style.display = 'none');

  // ۲. برداشتن استایل active از دکمه‌ها
  const navBtns = document.querySelectorAll('.tab-btn');
  navBtns.forEach(btn => btn.classList.remove('active'));

  // ۳. فعال کردن دکمه و نمایش کارت مربوطه
  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    const targetBtn = document.querySelector(`.tab-btn[onclick*="'${tabName}'"]`);
    if (targetBtn) targetBtn.classList.add('active');
  }

  const targetCard = document.getElementById('tab-' + tabName);
  if (targetCard) {
    targetCard.style.display = 'block';
  }
}

// مقداردهی اولیه پس از لود کامل صفحه
document.addEventListener('DOMContentLoaded', () => {
  switchTab('calc', document.querySelector('.tab-btn'));
});
