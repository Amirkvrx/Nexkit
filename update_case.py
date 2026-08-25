with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# جایگزینی کارت Case Converter با نسخه کامل دارای تب راهنما
old_case_card = '''  <!-- ابزار تغییر فرمت حروف -->
  <div class="card" id="tab-caseConv" style="display:none;">
    <h3 data-i18n="caseConv">Case Converter</h3>
    <textarea class="input-field" id="caseInput" placeholder="Enter text..." style="min-height: 80px;"></textarea>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <button class="btn" onclick="convertCase('upper')">UPPERCASE</button>
      <button class="btn" onclick="convertCase('lower')">lowercase</button>
      <button class="btn" onclick="convertCase('title')">Title Case</button>
      <button class="btn" onclick="convertCase('camel')">camelCase</button>
    </div>
  </div>'''

new_case_card = '''  <!-- ابزار تغییر فرمت حروف به همراه تب راهنما -->
  <div class="card" id="tab-caseConv" style="display:none;">
    <h3 data-i18n="caseConv">Case Converter</h3>
    <div class="sub-tabs">
      <button class="sub-tab-btn sub-tab-tool active" onclick="switchSubTab('caseConv', 'tool', this)">Tool</button>
      <button class="sub-tab-btn sub-tab-guide" onclick="switchSubTab('caseConv', 'guide', this)">Guide</button>
    </div>
    <div id="caseConv-tool" class="sub-pane">
      <textarea class="input-field" id="caseInput" placeholder="Enter text..." style="min-height: 80px;"></textarea>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px;">
        <button class="btn" onclick="convertCase('upper')">UPPERCASE</button>
        <button class="btn" onclick="convertCase('lower')">lowercase</button>
        <button class="btn" onclick="convertCase('title')">Title Case</button>
        <button class="btn" onclick="convertCase('camel')">camelCase</button>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn" onclick="copyToClipboard('caseInput')" style="flex: 1;">📋 Copy</button>
        <button class="btn" onclick="downloadAsFile('caseInput', 'converted-text.txt')" style="flex: 1;">💾 Download</button>
      </div>
    </div>
    <div id="caseConv-guide" class="sub-pane" style="display:none;">
      <div class="guide-content" style="white-space: pre-line;" data-i18n="caseGuideText">Guide text here...</div>
    </div>
  </div>'''

if old_case_card in html:
    html = html.replace(old_case_card, new_case_card)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Case Converter card updated successfully!")
else:
    print("Pattern not found, writing standard replacement.")
