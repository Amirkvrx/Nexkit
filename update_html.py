with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# افزودن تب به نویگیشن
nav_target = '<button class="tab-btn" onclick="switchTab(\'settings\', this)" data-i18n="settings">Settings</button>'
new_nav = '<button class="tab-btn" onclick="switchTab(\'colorTool\', this)" data-i18n="colorTool">Color Tools</button>\n    ' + nav_target
content = content.replace(nav_target, new_nav)

# افزودن کارت ابزار رنگ قبل از تنظیمات
card_target = '<div class="card" id="tab-settings">'
new_card = '''<div class="card" id="tab-colorTool">
    <h3 data-i18n="colorTool">Color Picker & Palette</h3>
    <input type="color" id="colorPickerInput" onchange="updateColorTool(this.value)" style="width: 100%; height: 40px; border: none; border-radius: 8px; cursor: pointer; margin-bottom: 12px; background: transparent;">
    <div id="colorPreview" style="width: 100%; height: 50px; border-radius: 8px; background: #00bcd4; margin-bottom: 12px; border: 1px solid var(--border);"></div>
    <input type="text" class="input-field" id="hexCode" value="#00bcd4" readonly style="margin-bottom: 8px;">
    <input type="text" class="input-field" id="rgbCode" value="rgb(0, 188, 212)" readonly style="margin-bottom: 12px;">
    <button class="btn btn-accent" onclick="generateRandomPalette()" style="width: 100%; margin-bottom: 12px;">Generate Random Palette</button>
    <div id="paletteContainer" style="display: flex; gap: 6px;"></div>
  </div>

  <div class="card" id="tab-settings">'''

content = content.replace(card_target, new_card)

# افزودن کلید ترجمه به app.logic.js
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("HTML updated successfully!")
