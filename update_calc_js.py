with open('app.logic.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_logic = '''function appendCalc(val) {
  const display = document.getElementById('calcDisplay');
  display.value += val;
}

function clearCalc() {
  document.getElementById('calcDisplay').value = '';
}

function calculateResult() {
  const display = document.getElementById('calcDisplay');
  try {
    display.value = eval(display.value);
  } catch (e) {
    display.value = 'خطا';
  }
}'''

new_logic = '''let calcExpr = '';

function appendCalc(val) {
  const display = document.getElementById('calcDisplay');
  if (display.innerText === '0' || display.innerText === 'خطا') {
    calcExpr = val;
  } else {
    calcExpr += val;
  }
  display.innerText = calcExpr;
}

function clearCalc() {
  calcExpr = '';
  document.getElementById('calcDisplay').innerText = '0';
  document.getElementById('calcHistory').innerText = '';
}

function calculateResult() {
  const display = document.getElementById('calcDisplay');
  const history = document.getElementById('calcHistory');
  try {
    const res = eval(calcExpr);
    history.innerHTML += `<div>${calcExpr} = ${res}</div>`;
    calcExpr = res.toString();
    display.innerText = res;
    // اسکرول خودکار تاریخچه به پایین
    const container = document.getElementById('calcDisplayContainer');
    container.scrollTop = container.scrollHeight;
  } catch (e) {
    display.innerText = 'خطا';
    calcExpr = '';
  }
}'''

js = js.replace(old_logic, new_logic)

with open('app.logic.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Calculator logic updated successfully!")
