with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ۱. افزودن دکمه تب BMI به نویگیشن
nav_target = '<button class="tab-btn" onclick="switchTab(\'settings\', this)" data-i18n="settings">Settings</button>'
new_nav = '<button class="tab-btn" onclick="switchTab(\'bmi\', this)" data-i18n="bmi">BMI</button>\n    ' + nav_target
html = html.replace(nav_target, new_nav)

# ۲. افزودن کارت BMI و بنرهای تبلیغاتی AdSense
card_target = '<!-- تنظیمات -->'
new_card = '''<!-- جایگاه تبلیغاتی بالای ابزارها (AdSense Container Top) -->
  <div class="ad-banner-container" style="text-align: center; margin-bottom: 16px; min-height: 90px; background: var(--bg); border: 1px dashed var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
    <!-- گوگل ادسنس پس از تایید در این قسمت قرار می‌گیرد -->
    <span style="font-size: 12px; opacity: 0.5;">Advertisement Space (Responsive)</span>
  </div>

  <!-- ابزار BMI به همراه تب راهنما -->
  <div class="card" id="tab-bmi" style="display:none;">
    <h3 data-i18n="bmi">BMI Calculator</h3>
    <div class="sub-tabs">
      <button class="sub-tab-btn sub-tab-tool active" onclick="switchSubTab('bmi', 'tool', this)">Tool</button>
      <button class="sub-tab-btn sub-tab-guide" onclick="switchSubTab('bmi', 'guide', this)">Guide</button>
    </div>
    <div id="bmi-tool" class="sub-pane">
      <div style="display: flex; gap: 8px; margin-bottom: 12px;">
        <input type="number" id="bmiWeight" class="input-field" placeholder="Weight (kg)" style="margin-bottom:0; flex:1;">
        <input type="number" id="bmiHeight" class="input-field" placeholder="Height (cm)" style="margin-bottom:0; flex:1;">
      </div>
      <button class="btn btn-accent" onclick="calculateBMI()" style="width: 100%; margin-bottom: 12px;">Calculate BMI</button>
      <div style="display: flex; gap: 8px; align-items: center;">
        <p id="bmiResult" style="font-family: monospace; background: var(--bg); padding: 10px; border-radius: 8px; border: 1px solid var(--border); flex: 1; margin: 0;">Result...</p>
        <button class="btn" onclick="copyToClipboard('bmiResult')">📋 Copy</button>
      </div>
    </div>
    <div id="bmi-guide" class="sub-pane" style="display:none;">
      <div class="guide-content" style="white-space: pre-line;" data-i18n="bmiGuideText">Guide text here...</div>
    </div>
  </div>

  <!-- تنظیمات -->'''

html = html.replace(card_target, new_card)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("BMI calculator and AdSense spaces injected successfully!")
