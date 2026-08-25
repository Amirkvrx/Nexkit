with open('app.logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_bmi = '''function calculateBMI() {
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

new_bmi = '''function calculateBMI() {
  const w = parseFloat(document.getElementById('bmiWeight').value);
  const hCm = parseFloat(document.getElementById('bmiHeight').value);
  const h = hCm / 100;
  const res = document.getElementById('bmiResult');
  
  if (w > 0 && h > 0) {
    const bmi = parseFloat((w / (h * h)).toFixed(1));
    
    // محاسبه محدوده وزن نرمال (BMI 18.5 تا 24.9)
    const minIdealW = (18.5 * h * h).toFixed(1);
    const maxIdealW = (24.9 * h * h).toFixed(1);
    
    let status = '';
    let advice = '';
    
    if (bmi < 18.5) {
      const diff = (minIdealW - w).toFixed(1);
      status = 'کمبود وزن';
      advice = `جهت رسیدن به مرز وزن نرمال، نیاز به حداقل <strong>${diff} کیلوگرم افزایش وزن</strong> دارید.`;
    } else if (bmi <= 24.9) {
      status = 'وزن نرمال و ایده‌آل';
      advice = 'وزن شما در محدوده سلامت کامل قرار دارد.';
    } else if (bmi <= 29.9) {
      const diff = (w - maxIdealW).toFixed(1);
      status = 'اضافه وزن';
      advice = `جهت رسیدن به محدوده نرمال، نیاز به <strong>${diff} کیلوگرم کاهش وزن</strong> دارید.`;
    } else {
      const diff = (w - maxIdealW).toFixed(1);
      status = 'چاقی';
      advice = `جهت کاهش خطرات سلامتی، حداقل <strong>${diff} کیلوگرم کاهش وزن</strong> پیشنهاد می‌شود.`;
    }

    res.innerHTML = `
      <div style="line-height: 1.6;">
        <strong style="font-size: 16px;">شاخص BMI شما: ${bmi} (${status})</strong><br>
        <span style="font-size: 13px; color: #374151;">محدوده وزن ایده‌آل برای قد شما: ${minIdealW} تا ${maxIdealW} کیلوگرم</span><br>
        <span style="font-size: 13px; color: #2563eb;">💡 ${advice}</span>
      </div>
    `;
  } else {
    res.innerText = 'لطفاً مقادیر معتبر وارد کنید.';
  }
}'''

js = js.replace(old_bmi, new_bmi)

with open('app.logic.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("BMI detailed guide updated successfully!")
