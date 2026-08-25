with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ۱. افزودن دکمه‌های ناوبری جدید
nav_target = '<button class="tab-btn" onclick="switchTab(\'bmi\', this)" data-i18n="bmi">BMI</button>'
new_nav_btns = '''<button class="tab-btn" onclick="switchTab('bmi', this)" data-i18n="bmi">BMI</button>
      <button class="tab-btn" onclick="switchTab('color', this)" data-i18n="color">Color</button>
      <button class="tab-btn" onclick="switchTab('aspect', this)" data-i18n="aspect">Aspect Ratio</button>'''
html = html.replace(nav_target, new_nav_btns)

# ۲. افزودن کارت‌های ابزار Color و Aspect Ratio
card_target = '<!-- Responsive Ad Unit Bottom -->'
new_cards = '''<!-- 8. Card Color Converter -->
    <div class="card tool-card" id="tab-color" style="display:none;">
      <h3 data-i18n="color">Color Code Converter</h3>
      <div class="sub-tabs" style="margin-bottom: 10px;">
        <button class="btn sub-tab-tool active" onclick="switchSubTab('color', 'tool', this)">Tool</button>
        <button class="btn sub-tab-guide" onclick="switchSubTab('color', 'guide', this)">Guide</button>
      </div>
      <div id="color-tool">
        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 12px;">
          <input type="color" id="colorPicker" value="#2563eb" oninput="convertColor(this.value)" style="width: 50px; height: 40px; border: none; cursor: pointer; background: none;">
          <input type="text" id="hexInput" class="input-field" value="#2563eb" oninput="convertColor(this.value)" placeholder="#2563eb" style="margin-bottom:0; flex:1;">
        </div>
        <div id="colorResult" style="font-family: monospace; background: var(--bg); padding: 10px; border-radius: 8px; border: 1px solid var(--border); margin-bottom: 10px;">HEX: #2563EB  |  RGB: rgb(37, 99, 235)</div>
        <button class="btn" onclick="copyToClipboard('colorResult')" style="width: 100%;">📋 Copy Code</button>
      </div>
      <div id="color-guide" style="display:none;">
        <div class="guide-content" style="white-space: pre-line;" data-i18n="colorGuideText">Color Guide...</div>
      </div>
    </div>

    <!-- 9. Card Aspect Ratio Calculator -->
    <div class="card tool-card" id="tab-aspect" style="display:none;">
      <h3 data-i18n="aspect">Aspect Ratio Calculator</h3>
      <div class="sub-tabs" style="margin-bottom: 10px;">
        <button class="btn sub-tab-tool active" onclick="switchSubTab('aspect', 'tool', this)">Tool</button>
        <button class="btn sub-tab-guide" onclick="switchSubTab('aspect', 'guide', this)">Guide</button>
      </div>
      <div id="aspect-tool">
        <div style="display: flex; gap: 8px; margin-bottom: 8px; align-items: center;">
          <input type="number" id="arW1" class="input-field" placeholder="W1 (e.g. 1920)" value="1920" style="margin-bottom:0; flex:1;">
          <span>:</span>
          <input type="number" id="arH1" class="input-field" placeholder="H1 (e.g. 1080)" value="1080" style="margin-bottom:0; flex:1;">
        </div>
        <div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center;">
          <input type="number" id="arW2" class="input-field" placeholder="W2 (e.g. 1280)" oninput="calcAspectRatio()" style="margin-bottom:0; flex:1;">
          <span>:</span>
          <input type="number" id="arH2" class="input-field" placeholder="H2 (Auto)" readonly style="margin-bottom:0; flex:1; background: var(--bg);">
        </div>
        <button class="btn btn-accent" onclick="calcAspectRatio()" style="width: 100%;">Calculate New Height</button>
      </div>
      <div id="aspect-guide" style="display:none;">
        <div class="guide-content" style="white-space: pre-line;" data-i18n="aspectGuideText">Aspect Guide...</div>
      </div>
    </div>

    <!-- Responsive Ad Unit Bottom -->'''

html = html.replace(card_target, new_cards)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("New tools (Color & Aspect Ratio) added successfully!")
