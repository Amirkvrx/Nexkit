with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target = '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">'
replacement = '<div class="calc-grid">'

if target in html:
    html = html.replace(target, replacement)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Calculator grid layout fixed!")
else:
    print("Target grid element not found.")
