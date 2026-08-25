import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# تعریف راهنماها برای ابزارها
guides = {
    'calc': 'راهنما:\\nاز دکمه‌های عددی و عملیات ریاضی (+، -، *، /) برای محاسبات سریع استفاده کنید. دکمه C ورودی را پاک می‌کند.',
    'json': 'راهنما:\\nکد JSON خود را در باکس وارد کنید. دکمه Format آن را مرتب و خوانا می‌کند و دکمه Minify فواصل اضافی را برای کاهش حجم پاک می‌کند.',
    'diff': 'راهنما:\\nدو متن مورد نظر خود را در دو باکس قرار دهید و دکمه مقایسه را بزنید تا تفاوت‌های طولی و متنی آن‌ها مشخص شود.',
    'case': 'راهنما:\\nمتن خود را وارد کنید و یکی از حالت‌های UPPERCASE (حروف بزرگ)، lowercase (حروف کوچک) یا Title Case (حرف اول بزرگ) را انتخاب کنید.',
    'pass': 'راهنما:\\nطول رمز عبور مورد نظر را مشخص کرده و دکمه تولید رمز را بزنید تا یک پسورد امن و تصادفی ایجاد شود.',
    'base64': 'راهنما:\\nمتن عادی را وارد کنید و Encode را بزنید تا به کد Base64 تبدیل شود، یا کد Base64 را وارد کرده و Decode را بزنید تا متن اصلی استخراج شود.',
    'bmi': 'راهنما:\\nوزن (کیلوگرم) و قد (سانتی‌متر) خود را وارد کنید تا شاخص توده بدنی (BMI) و محدوده وزن ایده‌آل شما محاسبه شود.',
    'color': 'راهنما:\\nرنگ مورد نظر را از رنگ‌پیکر انتخاب کنید یا کد HEX را بنویسید تا فرمت‌های RGB و HEX استخراج شوند.',
    'aspect': 'راهنما:\\nابعاد اصلی (عرض و ارتفاع اول) و عرض جدید را وارد کنید تا ارتفاع جدید متناسب با نسبت تصویر محاسبه شود.'
}

for tool_id, guide_text in guides.items():
    pattern = rf'(<div class="card tool-card" id="tab-{tool_id}".*?>\s*<h3>.*?</h3>)'
    
    subtab_html = f'''\\1
      <div class="sub-tabs" style="display: flex; gap: 8px; margin-bottom: 12px;">
        <button class="btn sub-tab-tool active" style="padding: 4px 12px; font-size: 12px;" onclick="switchSubTab('{tool_id}', 'tool', this)">ابزار</button>
        <button class="btn sub-tab-guide" style="padding: 4px 12px; font-size: 12px;" onclick="switchSubTab('{tool_id}', 'guide', this)">آموزش استفاده</button>
      </div>
      <div id="{tool_id}-guide" style="display:none; padding: 10px; background: var(--bg); border-radius: 8px; font-size: 13px; line-height: 1.6; color: var(--text-sub);">
        {guide_text}
      </div>'''
    
    html = re.sub(pattern, subtab_html, html)

# پیچیدن بخش اصلی ابزارها در یک container جهت سوییچ بین ابزار و راهنما
for tool_id in guides.keys():
    if tool_id == 'calc':
        html = html.replace('<input type="text" class="input-field" id="calcDisplay"', f'<div id="{tool_id}-tool"><input type="text" class="input-field" id="calcDisplay"')
        html = html.replace('</div>\n    </div>\n\n    <!-- 2. JSON -->', '</div></div>\n    </div>\n\n    <!-- 2. JSON -->')
    elif tool_id == 'json':
        html = html.replace('<textarea class="input-field" id="jsonInput"', f'<div id="{tool_id}-tool"><textarea class="input-field" id="jsonInput"')
        html = html.replace('</div>\n\n    <!-- 3. Diff -->', '</div></div>\n\n    <!-- 3. Diff -->')
    elif tool_id == 'diff':
        html = html.replace('<textarea class="input-field" id="text1"', f'<div id="{tool_id}-tool"><textarea class="input-field" id="text1"')
        html = html.replace('</div>\n\n    <!-- 4. Case Converter -->', '</div></div>\n\n    <!-- 4. Case Converter -->')
    elif tool_id == 'case':
        html = html.replace('<textarea class="input-field" id="caseInput"', f'<div id="{tool_id}-tool"><textarea class="input-field" id="caseInput"')
        html = html.replace('</div>\n\n    <!-- 5. Password Generator -->', '</div></div>\n\n    <!-- 5. Password Generator -->')
    elif tool_id == 'pass':
        html = html.replace('<div style="display: flex; gap: 8px; margin-bottom: 10px;">\n        <input type="number" id="passLength"', f'<div id="{tool_id}-tool"><div style="display: flex; gap: 8px; margin-bottom: 10px;">\n        <input type="number" id="passLength"')
        html = html.replace('</div>\n\n    <!-- 6. Base64 -->', '</div></div>\n\n    <!-- 6. Base64 -->')
    elif tool_id == 'base64':
        html = html.replace('<textarea class="input-field" id="cryptoInput"', f'<div id="{tool_id}-tool"><textarea class="input-field" id="cryptoInput"')
        html = html.replace('</div>\n\n    <!-- 7. BMI -->', '</div></div>\n\n    <!-- 7. BMI -->')
    elif tool_id == 'bmi':
        html = html.replace('<input type="number" id="bmiWeight"', f'<div id="{tool_id}-tool"><input type="number" id="bmiWeight"')
        html = html.replace('</div>\n\n    <!-- 8. Color Converter -->', '</div></div>\n\n    <!-- 8. Color Converter -->')
    elif tool_id == 'color':
        html = html.replace('<input type="color" id="colorPicker"', f'<div id="{tool_id}-tool"><input type="color" id="colorPicker"')
        html = html.replace('</div>\n\n    <!-- 9. Aspect Ratio -->', '</div></div>\n\n    <!-- 9. Aspect Ratio -->')
    elif tool_id == 'aspect':
        html = html.replace('<div style="display: flex; gap: 8px; margin-bottom: 8px;">\n        <input type="number" id="arW1"', f'<div id="{tool_id}-tool"><div style="display: flex; gap: 8px; margin-bottom: 8px;">\n        <input type="number" id="arW1"')
        html = html.replace('</div>\n\n    <!-- Bottom Ad -->', '</div></div>\n\n    <!-- Bottom Ad -->')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Subtabs (Tool/Guide) injected into all tools successfully!")
