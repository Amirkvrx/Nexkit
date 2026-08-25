with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target = '<textarea class="input-field" id="cryptoInput" placeholder="Enter text..." style="min-height: 70px;"></textarea>'
replacement = '''<textarea class="input-field" id="cryptoInput" placeholder="Enter text..." style="min-height: 70px;" oninput="updateTextStats('cryptoInput', 'cryptoStats')"></textarea>
        <div id="cryptoStats" style="font-size: 12px; color: var(--text-sub, #666); margin-bottom: 8px; font-family: monospace;">Words: 0 | Chars: 0 | Lines: 0</div>'''

if target in html:
    html = html.replace(target, replacement)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Base64 stats injected!")
