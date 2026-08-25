// --- 1. Tab Switching Logic ---
function switchTab(tabName, btnElement) {
  const cards = document.querySelectorAll('.tool-card');
  cards.forEach(card => card.style.display = 'none');

  const navBtns = document.querySelectorAll('.tab-btn');
  navBtns.forEach(btn => btn.classList.remove('active'));

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

// --- 2. Calculator Logic ---
let calcExpression = '';

function appendCalc(val) {
  const display = document.getElementById('calcDisplay');
  calcExpression += val;
  if (display) display.value = calcExpression;
}

function clearCalc() {
  calcExpression = '';
  const display = document.getElementById('calcDisplay');
  if (display) display.value = '';
}

function calculateResult() {
  const display = document.getElementById('calcDisplay');
  if (!calcExpression) return;
  try {
    const result = eval(calcExpression);
    display.value = result;
    calcExpression = String(result);
  } catch (e) {
    display.value = 'Error';
    calcExpression = '';
  }
}

// --- 3. JSON Tools ---
function formatJSON() {
  const input = document.getElementById('jsonInput').value;
  const output = document.getElementById('jsonOutput');
  try {
    const parsed = JSON.parse(input);
    output.value = JSON.stringify(parsed, null, 2);
  } catch (e) {
    output.value = 'Invalid JSON!';
  }
}

function minifyJSON() {
  const input = document.getElementById('jsonInput').value;
  const output = document.getElementById('jsonOutput');
  try {
    const parsed = JSON.parse(input);
    output.value = JSON.stringify(parsed);
  } catch (e) {
    output.value = 'Invalid JSON!';
  }
}

// --- 4. Text Diff ---
function compareTexts() {
  const t1 = document.getElementById('text1').value;
  const t2 = document.getElementById('text2').value;
  const res = document.getElementById('diffResult');
  if (t1 === t2) {
    res.innerText = 'متن‌ها کاملاً یکسان هستند.';
  } else {
    res.innerText = `تفاوت در طول متن:\nمتن اول: ${t1.length} کاراکتر\nمتن دوم: ${t2.length} کاراکتر`;
  }
}

// --- 5. Case Converter ---
function convertCase(type) {
  const input = document.getElementById('caseInput');
  let val = input.value;
  if (type === 'upper') val = val.toUpperCase();
  if (type === 'lower') val = val.toLowerCase();
  if (type === 'title') val = val.replace(/\b\w/g, l => l.toUpperCase());
  input.value = val;
  updateTextStats('caseInput', 'caseStats');
}

// --- 6. Password Generator ---
function generatePassword() {
  const len = parseInt(document.getElementById('passLength').value) || 12;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let pass = '';
  for (let i = 0; i < len; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('passOutput').value = pass;
}

// --- 7. Base64 ---
function processBase64(type) {
  const input = document.getElementById('cryptoInput').value;
  const out = document.getElementById('cryptoOutput');
  try {
    if (type === 'encode') out.innerText = btoa(input);
    else out.innerText = atob(input);
  } catch (e) {
    out.innerText = 'خطا در پردازش Base64!';
  }
}

// --- 8. BMI Calculator ---
function calculateBMI() {
  const w = parseFloat(document.getElementById('bmiWeight').value);
  const h = parseFloat(document.getElementById('bmiHeight').value) / 100;
  const res = document.getElementById('bmiResult');
  if (w > 0 && h > 0) {
    const bmi = parseFloat((w / (h * h)).toFixed(1));
    let status = '';
    if (bmi < 18.5) status = 'کمبود وزن (نیاز به افزایش وزن)';
    else if (bmi < 24.9) status = 'وزن نرمال و ایده‌آل';
    else if (bmi < 29.9) status = 'اضافه وزن';
    else status = 'چاقی';

    res.innerHTML = `<strong>شاخص BMI شما: ${bmi}</strong><br><span style="font-size: 13px; color: #4b5563;">وضعیت: ${status}</span>`;
  } else {
    res.innerText = 'لطفاً مقادیر معتبر وارد کنید.';
  }
}

// --- 9. Color & Aspect Ratio ---
function convertColor(hexValue) {
  const hex = hexValue.replace('#', '');
  if (hex.length !== 6) return;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const res = document.getElementById('colorResult');
  res.innerHTML = `<div style="display:flex; align-items:center; gap:10px;">
    <div style="width:24px; height:24px; background:#${hex}; border-radius:4px; border:1px solid #ccc;"></div>
    <div><strong>HEX: #${hex.toUpperCase()}</strong> | <strong>RGB: rgb(${r}, ${g}, ${b})</strong><br><span style="font-size: 12px; color: #4b5563;">کد رنگی آماده استفاده در CSS و گرافیک</span></div>
  </div>`;
}

function calcAspectRatio() {
  const w1 = parseFloat(document.getElementById('arW1').value);
  const h1 = parseFloat(document.getElementById('arH1').value);
  const w2 = parseFloat(document.getElementById('arW2').value);
  if (w1 > 0 && h1 > 0 && w2 > 0) {
    document.getElementById('arH2').value = Math.round((h1 / w1) * w2);
  }
}

// Helpers
function updateTextStats(inputId, statsId) {
  const text = document.getElementById(inputId).value || "";
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').length : 0;
  const el = document.getElementById(statsId);
  if (el) el.innerText = `Words: ${words} | Chars: ${chars} | Lines: ${lines}`;
}

function clearField(fieldId, statsId) {
  const el = document.getElementById(fieldId);
  if (el) el.value = '';
  if (statsId) updateTextStats(fieldId, statsId);
}

function copyToClipboard(id) {
  const el = document.getElementById(id);
  const val = el.value || el.innerText;
  navigator.clipboard.writeText(val);
  alert('کپی شد!');
}

document.addEventListener('DOMContentLoaded', () => {
  switchTab('calc', document.querySelector('.tab-btn'));
});
