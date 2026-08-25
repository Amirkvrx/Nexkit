with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# افزودن دکمه تب Base64 به نویگیشن
nav_target = '<button class="tab-btn" onclick="switchTab(\'settings\', this)" data-i18n="settings">Settings</button>'
new_nav = '<button class="tab-btn" onclick="switchTab(\'crypto\', this)" data-i18n="crypto">Base64</button>\n    ' + nav_target
html = html.replace(nav_target, new_nav)

# افزودن کارت کامل Base64 با تب راهنما قبل از تنظیمات
card_target = '<!-- تنظیمات -->'
new_card = '''<!-- ابزار Base64 به همراه تب راهنما -->
  <div class="card" id="tab-crypto" style="display:none;">
    <h3 data-i18n="crypto">Base64 Encoder / Decoder</h3>
    <div class="sub-tabs">
      <button class="sub-tab-btn sub-tab-tool active" onclick="switchSubTab('crypto', 'tool', this)">Tool</button>
      <button class="sub-tab-btn sub-tab-guide" onclick="switchSubTab('crypto', 'guide', this)">Guide</button>
    </div>
    <div id="crypto-tool" class="sub-pane">
      <textarea class="input-field" id="cryptoInput" placeholder="Enter text to encode/decode..." style="min-height: 70px;"></textarea>
      <div style="display: flex; gap: 8px; margin-bottom: 12px;">
        <button class="btn btn-accent" onclick="processBase64('encode')" style="flex: 1;">Encode</button>
        <button class="btn" onclick="processBase64('decode')" style="flex: 1;">Decode</button>
      </div>
      <div style="position: relative;">
        <p id="cryptoOutput" style="font-family: monospace; background: var(--bg); padding: 10px; border-radius: 8px; border: 1px solid var(--border); word-break: break-all; min-height: 40px;">Output...</p>
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <button class="btn" onclick="copyToClipboard('cryptoOutput')" style="flex: 1;">📋 Copy</button>
          <button class="btn" onclick="downloadAsFile('cryptoOutput', 'base64-result.txt')" style="flex: 1;">💾 Download</button>
        </div>
      </div>
    </div>
    <div id="crypto-guide" class="sub-pane" style="display:none;">
      <div class="guide-content" style="white-space: pre-line;" data-i18n="cryptoGuideText">Guide text here...</div>
    </div>
  </div>

  <!-- تنظیمات -->'''

html = html.replace(card_target, new_card)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Base64 tool card updated successfully!")
