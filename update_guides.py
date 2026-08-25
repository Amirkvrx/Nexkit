with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# جایگزینی کارت JSON با نسخه دارای تب راهنما
old_json_card = '''  <div class="card" id="tab-json">
    <h3 data-i18n="json">JSON Formatter</h3>
    <textarea class="input-field" id="jsonInput" placeholder="Paste unformatted JSON..."></textarea>
    <button class="btn btn-accent" onclick="formatJSON()" style="width: 100%; margin-bottom: 12px;">Format JSON</button>
    <pre id="jsonOutput" style="background: var(--bg); padding: 10px; border-radius: 8px; border: 1px solid var(--border); font-size: 12px; overflow-x: auto;"></pre>
  </div>'''

new_json_card = '''  <div class="card" id="tab-json">
    <h3 data-i18n="json">JSON Tools</h3>
    <div class="sub-tabs">
      <button class="sub-tab-btn active" onclick="switchSubTab('json', 'tool', this)">Tool / ابزار</button>
      <button class="sub-tab-btn" onclick="switchSubTab('json', 'guide', this)">Guide / راهنما</button>
    </div>
    
    <div id="json-tool" class="sub-pane">
      <textarea class="input-field" id="jsonInput" placeholder="Paste unformatted JSON..." style="min-height: 80px;"></textarea>
      <div style="display: flex; gap: 8px; margin-bottom: 12px;">
        <button class="btn btn-accent" onclick="formatJSON()" style="flex: 1;">Format</button>
        <button class="btn" onclick="minifyJSON()" style="flex: 1;">Minify</button>
      </div>
      <pre id="jsonOutput" style="background: var(--bg); padding: 10px; border-radius: 8px; border: 1px solid var(--border); font-size: 12px; overflow-x: auto; min-height: 40px;">Output...</pre>
    </div>
    
    <div id="json-guide" class="sub-pane" style="display: none;">
      <div class="guide-content">
        <strong>راهنمای استفاده از ابزار JSON:</strong><br>
        این ابزار داده‌های ساختاریافته JSON شما مرتب (Prettify) یا فشرده (Minify) می‌کند.<br>
        1. متن JSON خود را در کادر ابزار وارد کنید.<br>
        2. دکمه Format را بزنید تا خطاها رفع و ساختار خوانا شود.
      </div>
    </div>
  </div>'''

if old_json_card in html:
    html = html.replace(old_json_card, new_json_card)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("JSON card updated with guide tabs!")
else:
    print("Card structure mismatch, skipping automated replacement.")
