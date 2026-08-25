with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# افزودن رویداد oninput و نمایشگر آمار به ابزار Case Converter
target = '<textarea class="input-field" id="caseInput" placeholder="Enter text..." style="min-height: 80px;"></textarea>'
replacement = '''<textarea class="input-field" id="caseInput" placeholder="Enter text..." style="min-height: 80px;" oninput="updateTextStats('caseInput', 'caseStats')"></textarea>
      <div id="caseStats" style="font-size: 12px; color: var(--text-sub, #666); margin-bottom: 8px; font-family: monospace;">Words: 0 | Chars: 0 | Lines: 0</div>'''

if target in html:
    html = html.replace(target, replacement)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Live stats added to Case Converter!")
else:
    print("Target tag not found.")
