with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_select = '''      <select id="langSelector" onchange="setLanguage(this.value)" class="theme-btn" style="cursor: pointer; padding: 6px 10px;">
        <option value="en">English</option>
        <option value="fa">فارسی</option>
      </select>'''

new_select = '''      <select id="langSelector" onchange="setLanguage(this.value)" class="theme-btn" style="cursor: pointer; padding: 6px 10px;">
        <option value="fa">فارسی (Persian)</option>
        <option value="en">English</option>
        <option value="es">Español (Spanish)</option>
        <option value="ar">العربية (Arabic)</option>
        <option value="fr">Français (French)</option>
        <option value="de">Deutsch (German)</option>
        <option value="ru">Русский (Russian)</option>
        <option value="zh">中文 (Chinese)</option>
        <option value="ja">日本語 (Japanese)</option>
        <option value="tr">Türkçe (Turkish)</option>
        <option value="it">Italiano (Italian)</option>
        <option value="pt">Português (Portuguese)</option>
      </select>'''

if old_select in html:
    html = html.replace(old_select, new_select)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("12-language selector injected!")
else:
    print("Selector target mismatch.")
