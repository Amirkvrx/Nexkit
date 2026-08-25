with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ۱. افزودن دکمه Clear به ابزار Case Converter
target_case = '<button class="btn" onclick="copyToClipboard(\'caseInput\')" style="flex: 1;">📋 Copy</button>'
replace_case = '''<button class="btn" onclick="clearField('caseInput', 'caseStats')" style="flex: 1;">🗑️ Clear</button>
          <button class="btn" onclick="copyToClipboard('caseInput')" style="flex: 1;">📋 Copy</button>'''
html = html.replace(target_case, replace_case)

# ۲. افزودن دکمه Clear به ابزار Base64
target_base64 = '<button class="btn" onclick="copyToClipboard(\'cryptoOutput\')" style="flex: 1;">📋 Copy</button>'
replace_base64 = '''<button class="btn" onclick="clearField('cryptoInput', 'cryptoStats')" style="flex: 1;">🗑️ Clear</button>
          <button class="btn" onclick="copyToClipboard('cryptoOutput')" style="flex: 1;">📋 Copy</button>'''
html = html.replace(target_base64, replace_base64)

# ۳. افزودن جایگاه تبلیغاتی پایینی قبل از بسته‌شدن کانتینر اصلی
target_bottom = '  </div>\n\n  <script src="app.logic.js"></script>'
replace_bottom = '''  <!-- Responsive Ad Unit Bottom -->
    <div class="ad-banner-container" style="text-align: center; margin-top: 20px; padding: 15px; background: var(--card-bg, #f4f4f5); border: 1px dashed var(--border, #ccc); border-radius: 8px;">
      <span style="font-size: 12px; color: #888;">Advertisement Space (Footer Responsive)</span>
    </div>
  </div>

  <script src="app.logic.js"></script>'''
html = html.replace(target_bottom, replace_bottom)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Clear buttons and bottom AdSense placement successfully added!")
