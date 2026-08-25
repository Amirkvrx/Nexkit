with open('app.logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

# ۱. به‌روزرسانی BMI با تحلیل وضعیت
old_bmi = '''function calculateBMI() {
  const w = parseFloat(document.getElementById('bmiWeight').value);
  const h = parseFloat(document.getElementById('bmiHeight').value) / 100;
  const res = document.getElementById('bmiResult');
  if (w > 0 && h > 0) {
    const bmi = (w / (h * h)).toFixed(1);
    res.innerText = `شاخص BMI شما: ${bmi}`;
  } else {
    res.innerText = 'لطفاً مقادیر معتبر وارد کنید.';
  }
}'''

new_bmi = '''function calculateBMI() {
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
}'''

# ۲. به‌روزرسانی مبدل رنگ با پیش‌نمایش
old_color = '''function convertColor(hexValue) {
  const hex = hexValue.replace('#', '');
  if (hex.length !== 6) return;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  document.getElementById('colorResult').innerText = `HEX: #${hex.toUpperCase()} | RGB: rgb(${r}, ${g}, ${b})`;
}'''

new_color = '''function convertColor(hexValue) {
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
}'''

js = js.replace(old_bmi, new_bmi).replace(old_color, new_color)

with open('app.logic.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Result interpretation guides added successfully!")
