with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# تعریف استایل کامل و مدرن
style_block = '''<style>
  :root {
    --bg: #f8fafc;
    --card-bg: #ffffff;
    --text: #0f172a;
    --text-sub: #64748b;
    --border: #e2e8f0;
    --primary: #2563eb;
    --btn-bg: #f1f5f9;
    --btn-hover: #e2e8f0;
  }
  body {
    margin: 0;
    padding: 16px;
    font-family: system-ui, -apple-system, sans-serif;
    background-color: var(--bg);
    color: var(--text);
  }
  .container { max-width: 600px; margin: 0 auto; }
  .card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    margin-bottom: 16px;
  }
  .input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg);
    color: var(--text);
    box-sizing: border-box;
    margin-bottom: 8px;
  }
  .btn {
    padding: 10px 14px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--btn-bg);
    color: var(--text);
    cursor: pointer;
    font-weight: 500;
  }
  .btn:hover { background: var(--btn-hover); }
  .btn-accent { background: var(--primary); color: #fff; border: none; }
  .tab-btn {
    white-space: nowrap;
    padding: 8px 14px;
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--card-bg);
    color: var(--text);
    cursor: pointer;
  }
  .tab-btn.active { background: var(--primary); color: #fff; border-color: var(--primary); }
  .calc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    direction: ltr !important;
  }
</style>'''

# جایگزینی یا افزودن استایل در head
if '</head>' in html:
    html = html.replace('</head>', f'{style_block}\n</head>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Modern inline style embedded successfully!")
