with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ۱. جایگزینی فیلد نمایش با نمایشگر دوخطی (تاریخچه + عدد اصلی)
old_display = '<input type="text" class="input-field" id="calcDisplay" readonly style="margin-bottom: 12px; font-size: 18px; text-align: right;">'
new_display = '''<div id="calcDisplayContainer" style="min-height: 90px; max-height: 120px; background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 10px; margin-bottom: 12px; display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-end; overflow-y: auto;">
        <div id="calcHistory" style="font-size: 13px; color: var(--text-sub); line-height: 1.4; word-break: break-all; min-height: 18px;"></div>
        <div id="calcDisplay" style="font-size: 24px; font-weight: bold; color: var(--text); margin-top: 4px; word-break: break-all;">0</div>
      </div>'''

html = html.replace(old_display, new_display)

# ۲. تغییر چیدمان گرید دکمه‌ها (انتقال = به پایین و برجسته کردن +)
old_grid = '''<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
        <button class="btn" onclick="clearCalc()">C</button>
        <button class="btn" onclick="appendCalc('/')">/</button>
        <button class="btn" onclick="appendCalc('*')">*</button>
        <button class="btn" onclick="appendCalc('-')">-</button>
        
        <button class="btn" onclick="appendCalc('7')">7</button>
        <button class="btn" onclick="appendCalc('8')">8</button>
        <button class="btn" onclick="appendCalc('9')">9</button>
        <button class="btn" onclick="appendCalc('+')">+</button>
        
        <button class="btn" onclick="appendCalc('4')">4</button>
        <button class="btn" onclick="appendCalc('5')">5</button>
        <button class="btn" onclick="appendCalc('6')">6</button>
        <button class="btn" onclick="calculateResult()" style="grid-row: span 2; background: var(--primary); color: white;">=</button>
        
        <button class="btn" onclick="appendCalc('1')">1</button>
        <button class="btn" onclick="appendCalc('2')">2</button>
        <button class="btn" onclick="appendCalc('3')">3</button>
        
        <button class="btn" onclick="appendCalc('0')" style="grid-column: span 2;">0</button>
        <button class="btn" onclick="appendCalc('.')">.</button>
      </div>'''

new_grid = '''<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
        <button class="btn" onclick="clearCalc()">C</button>
        <button class="btn" onclick="appendCalc('/')">/</button>
        <button class="btn" onclick="appendCalc('*')">*</button>
        <button class="btn" onclick="appendCalc('-')">-</button>
        
        <button class="btn" onclick="appendCalc('7')">7</button>
        <button class="btn" onclick="appendCalc('8')">8</button>
        <button class="btn" onclick="appendCalc('9')">9</button>
        <button class="btn" onclick="appendCalc('+')" style="grid-row: span 2; background: #e0e7ff; color: #4338ca; font-size: 22px; font-weight: bold;">+</button>
        
        <button class="btn" onclick="appendCalc('4')">4</button>
        <button class="btn" onclick="appendCalc('5')">5</button>
        <button class="btn" onclick="appendCalc('6')">6</button>
        
        <button class="btn" onclick="appendCalc('1')">1</button>
        <button class="btn" onclick="appendCalc('2')">2</button>
        <button class="btn" onclick="appendCalc('3')">3</button>
        <button class="btn" onclick="calculateResult()" style="background: var(--primary); color: white; font-size: 20px;">=</button>
        
        <button class="btn" onclick="appendCalc('0')" style="grid-column: span 2;">0</button>
        <button class="btn" onclick="appendCalc('.')">.</button>
      </div>'''

html = html.replace(old_grid, new_grid)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Calculator layout updated successfully!")
