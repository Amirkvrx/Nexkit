with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# افزودن دکمه دانلود به بخش JSON
old_json_btns = '<button class="btn" onclick="minifyJSON()" style="flex: 1;">Minify</button>'
new_json_btns = '<button class="btn" onclick="minifyJSON()" style="flex: 1;">Minify</button>\n        <button class="btn" onclick="downloadAsFile(\'jsonOutput\', \'formatted.json\')">💾 Download JSON</button>'
html = html.replace(old_json_btns, new_json_btns)

# افزودن دکمه دانلود به بخش Text Diff
old_diff_btn = '<button class="btn btn-accent" onclick="compareTexts()" style="width: 100%; margin-bottom: 12px;">Compare Texts</button>'
new_diff_btn = '<button class="btn btn-accent" onclick="compareTexts()" style="width: 100%; margin-bottom: 12px;">Compare Texts</button>\n      <button class="btn" onclick="downloadAsFile(\'diffResult\', \'diff-result.txt\')" style="width: 100%; margin-bottom: 12px;">💾 Download Result</button>'
html = html.replace(old_diff_btn, new_diff_btn)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Download buttons added successfully!")
