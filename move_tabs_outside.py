import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# حذف sub-tabs قدیمی از داخل کارت‌ها و انتقال به قبل از card
tools = ['calc', 'json', 'diff', 'case', 'pass', 'base64', 'bmi', 'color', 'aspect']

for tool_id in tools:
    # الگوی تمیزکاری داخل کارت
    old_subtab_pattern = rf'<div class="sub-tabs".*?</div>\s*<div id="{tool_id}-guide"'
    html = re.sub(old_subtab_pattern, f'<div id="{tool_id}-guide"', html, flags=re.DOTALL)

    # افزودن تب‌های خارج از کارت دقیقاً قبل از <div class="card tool-card" id="tab-tool_id">
    target_card = f'<div class="card tool-card" id="tab-{tool_id}"'
    outer_tabs_html = f'''<div class="outer-subtabs" id="outer-tabs-{tool_id}">
  <button class="sub-btn active" onclick="switchSubTab('{tool_id}', 'tool', this)">🛠 ابزار</button>
  <button class="sub-btn" onclick="switchSubTab('{tool_id}', 'guide', this)">📖 راهنما</button>
</div>
<div class="card tool-card" id="tab-{tool_id}"'''
    
    html = html.replace(target_card, outer_tabs_html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Tabs moved outside of cards successfully!")
