with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# افزودن دکمه تب تولید رمز عبور
nav_target = '<button class="tab-btn" onclick="switchTab(\'settings\', this)" data-i18n="settings">Settings</button>'
new_nav = '<button class="tab-btn" onclick="switchTab(\'pass\', this)" data-i18n="pass">Password</button>\n    ' + nav_target
html = html.replace(nav_target, new_nav)

# افزودن کارت ابزار جدید قبل از تنظیمات
card_target = '<!-- تنظیمات -->'
new_card = '''<!-- ابزار تولید رمز عبور به همراه تب راهنما -->
  <div class="card" id="tab-pass" style="display:none;">
    <h3 data-i18n="pass">Password Generator</h3>
    <div class="sub-tabs">
      <button class="sub-tab-btn sub-tab-tool active" onclick="switchSubTab('pass', 'tool', this)">Tool</button>
      <button class="sub-tab-btn sub-tab-guide" onclick="switchSubTab('pass', 'guide', this)">Guide</button>
    </div>
    <div id="pass-tool" class="sub-pane">
      <div style="display: flex; gap: 8px; margin-bottom: 12px;">
        <input type="number" id="passLength" class="input-field" value="12" min="6" max="32" style="width: 80px; margin-bottom:0;">
        <button class="btn btn-accent" onclick="generatePassword()" style="flex: 1;">Generate</button>
      </div>
      <div style="display: flex; gap: 8px;">
        <input type="text" id="passOutput" class="input-field" readonly style="margin-bottom:0; flex:1;">
        <button class="btn" onclick="copyToClipboard('passOutput')">📋 Copy</button>
      </div>
    </div>
    <div id="pass-guide" class="sub-pane" style="display:none;">
      <div class="guide-content" style="white-space: pre-line;" data-i18n="passGuideText">Guide text here...</div>
    </div>
  </div>

  <!-- تنظیمات -->'''

html = html.replace(card_target, new_card)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Password generator tool added!")
