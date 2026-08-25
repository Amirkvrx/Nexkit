import re

# ۱. بازنویسی و تنظیم دقیق index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# تعریف دقیق دکمه‌های ناوبری با IDهای یکسان
new_nav = '''<div class="nav-tabs" style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 15px; -webkit-overflow-scrolling: touch;">
      <button class="tab-btn active" onclick="switchTab('calc', this)" data-i18n="calc">ماشین حساب</button>
      <button class="tab-btn" onclick="switchTab('json', this)" data-i18n="json">ابزار JSON</button>
      <button class="tab-btn" onclick="switchTab('diff', this)" data-i18n="textDiff">مقایسه متن</button>
      <button class="tab-btn" onclick="switchTab('case', this)" data-i18n="caseConv">فرمت حروف</button>
      <button class="tab-btn" onclick="switchTab('pass', this)" data-i18n="pass">رمز عبور</button>
      <button class="tab-btn" onclick="switchTab('base64', this)" data-i18n="crypto">Base64</button>
      <button class="tab-btn" onclick="switchTab('bmi', this)" data-i18n="bmi">BMI</button>
      <button class="tab-btn" onclick="switchTab('color', this)" data-i18n="color">مبدل رنگ</button>
      <button class="tab-btn" onclick="switchTab('aspect', this)" data-i18n="aspect">نسبت تصویر</button>
    </div>'''

html = re.sub(r'<div class="nav-tabs".*?</div>', new_nav, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# ۲. بازنویسی تابع سوئیچ در app.logic.js
with open('app.logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

new_logic = '''
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
'''

with open('app.logic.js', 'w', encoding='utf-8') as f:
    f.write(js + '\n' + new_logic)

print("All tab IDs synced & logic updated successfully!")
