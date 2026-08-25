with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ۱. افزودن CSS برای ارتفاع ثابت کارت‌ها و استایل تب‌های خارج از کادر
custom_css = '''
    /* تنظیم ارتفاع یکسان برای جلوگیری از تغییر اندازه صفحه */
    .tool-card {
      min-height: 480px !important;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      position: relative;
    }

    /* سگمنت تب‌های خارج از کادر */
    .outer-subtabs {
      display: flex;
      gap: 6px;
      margin-bottom: 8px;
      justify-content: flex-start;
    }
    .outer-subtabs .sub-btn {
      padding: 6px 16px;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: #fff;
      font-size: 13px;
      cursor: pointer;
      color: var(--text-sub);
    }
    .outer-subtabs .sub-btn.active {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
    }
'''

html = html.replace('</style>', custom_css + '\n</style>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Layout and height fix script created!")
