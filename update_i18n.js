const fs = require('fs');

const jsContent = `
// --- Nexkit 12-Language Support Engine ---

const translations = {
  fa: {
    dir: "rtl",
    calc: "ماشین حساب", imgTool: "تبدیل عکس", textDiff: "مقایسه متن", caseConv: "فرمت حروف",
    json: "ابزار JSON", pass: "رمز عبور", crypto: "کدگذاری Base64", settings: "تنظیمات",
    searchPlaceholder: "🔍 جستجوی سریع ابزارها...", toolTab: "ابزار", guideTab: "راهنما",
    jsonGuideText: "راهنمای JSON:\\n۱. متن JSON را وارد کنید.\\n۲. دکمه Format یا Minify را بزنید.",
    diffGuideText: "راهنمای مقایسه متن:\\n۱. متن اول و دوم را وارد کنید.\\n۲. روی مقایسه کلیک کنید.",
    caseGuideText: "راهنمای حروف:\\n۱. متن را وارد کنید.\\n۲. حالت مورد نظر را انتخاب کنید.",
    imgGuideText: "راهنمای عکس:\\n۱. عکس را انتخاب کنید.\\n۲. فرمت و کیفیت را مشخص و دانلود کنید.",
    passGuideText: "راهنمای رمز:\\n۱. طول رمز را تعیین کنید.\\n۲. دکمه تولید رمز را بزنید.",
    cryptoGuideText: "راهنمای Base64:\\n۱. متن را وارد کنید.\\n۲. دکمه Encode یا Decode را بزنید."
  },
  en: {
    dir: "ltr",
    calc: "Calculator", imgTool: "Image Converter", textDiff: "Text Diff", caseConv: "Case Converter",
    json: "JSON Tools", pass: "Password Gen", crypto: "Base64", settings: "Settings",
    searchPlaceholder: "🔍 Search tools...", toolTab: "Tool", guideTab: "Guide",
    jsonGuideText: "JSON Guide:\\n1. Paste JSON.\\n2. Click Format or Minify.",
    diffGuideText: "Text Diff Guide:\\n1. Paste texts.\\n2. Click Compare.",
    caseGuideText: "Case Guide:\\n1. Enter text.\\n2. Select case type.",
    imgGuideText: "Image Guide:\\n1. Choose image.\\n2. Select format & quality.",
    passGuideText: "Password Guide:\\n1. Set length.\\n2. Click Generate.",
    cryptoGuideText: "Base64 Guide:\\n1. Paste text.\\n2. Click Encode/Decode."
  },
  es: {
    dir: "ltr",
    calc: "Calculadora", imgTool: "Convertidor Imagen", textDiff: "Comparar Texto", caseConv: "Formato Texto",
    json: "Herramientas JSON", pass: "Contraseñas", crypto: "Base64", settings: "Ajustes",
    searchPlaceholder: "🔍 Buscar herramientas...", toolTab: "Herramienta", guideTab: "Guía",
    jsonGuideText: "Guía JSON:\\n1. Pegue JSON.\\n2. Haga clic en Formatear o Minificar.",
    diffGuideText: "Guía de Texto:\\n1. Pegue textos.\\n2. Haga clic en Comparar.",
    caseGuideText: "Guía de Formato:\\n1. Ingrese texto.\\n2. Seleccione formato.",
    imgGuideText: "Guía de Imagen:\\n1. Elija imagen.\\n2. Seleccione formato y calidad.",
    passGuideText: "Guía de Contraseña:\\n1. Defina longitud.\\n2. Genere.",
    cryptoGuideText: "Guía Base64:\\n1. Ingrese texto.\\n2. Codifique/Decodifique."
  },
  ar: {
    dir: "rtl",
    calc: "الحاسبة", imgTool: "محول الصور", textDiff: "مقارنة النصوص", caseConv: "حالة الأحرف",
    json: "أدوات JSON", pass: "مولد كلمة السر", crypto: "ترميز Base64", settings: "الإعدادات",
    searchPlaceholder: "🔍 بحث سريع...", toolTab: "أداة", guideTab: "دليل",
    jsonGuideText: "دليل JSON:\\n١. أدخل نص JSON.\\n٢. اضغط تنسيق أو ضغط.",
    diffGuideText: "دليل المقارنة:\\n١. أدخل النصين.\\n٢. اضغط مقارنة.",
    caseGuideText: "دليل الأحرف:\\n١. أدخل النص.\\n٢. اختر الحالة المطلوبة.",
    imgGuideText: "دليل الصور:\\n١. اختر صورة.\\n٢. حدد الصيغة والجودة.",
    passGuideText: "دليل كلمة السر:\\n١. حدد الطول.\\n٢. اضغط إنشاء.",
    cryptoGuideText: "دليل Base64:\\n١. أدخل النص.\\n٢. اضغط تشفير/فك التشفير."
  },
  fr: {
    dir: "ltr",
    calc: "Calculatrice", imgTool: "Convertisseur Image", textDiff: "Compare Texte", caseConv: "Casse Texte",
    json: "Outils JSON", pass: "Mots de Passe", crypto: "Base64", settings: "Paramètres",
    searchPlaceholder: "🔍 Rechercher...", toolTab: "Outil", guideTab: "Guide",
    jsonGuideText: "Guide JSON:\\n1. Collez le JSON.\\n2. Cliquez sur Formater ou Minifier.",
    diffGuideText: "Guide Texte:\\n1. Collez les textes.\\n2. Cliquez sur Comparer.",
    caseGuideText: "Guide Casse:\\n1. Entrez le texte.\\n2. Choisissez le format.",
    imgGuideText: "Guide Image:\\n1. Choisissez une image.\\n2. Sélectionnez le format.",
    passGuideText: "Guide Mot de Passe:\\n1. Définissez la longueur.\\n2. Générez.",
    cryptoGuideText: "Guide Base64:\\n1. Entrez le texte.\\n2. Encodez ou Décodez."
  },
  de: {
    dir: "ltr",
    calc: "Rechner", imgTool: "Bild-Konverter", textDiff: "Textvergleich", caseConv: "Schreibweise",
    json: "JSON-Tools", pass: "Passwort-Gen", crypto: "Base64", settings: "Einstellungen",
    searchPlaceholder: "🔍 Suchen...", toolTab: "Tool", guideTab: "Anleitung",
    jsonGuideText: "JSON-Anleitung:\\n1. JSON einfügen.\\n2. Formatieren oder Minimieren klicken.",
    diffGuideText: "Textvergleich-Anleitung:\\n1. Texte einfügen.\\n2. Vergleichen klicken.",
    caseGuideText: "Schreibweise-Anleitung:\\n1. Text eingeben.\\n2. Modus wählen.",
    imgGuideText: "Bild-Anleitung:\\n1. Bild wählen.\\n2. Format & Qualität wählen.",
    passGuideText: "Passwort-Anleitung:\\n1. Länge festlegen.\\n2. Generieren.",
    cryptoGuideText: "Base64-Anleitung:\\n1. Text eingeben.\\n2. Kodieren/Dekodieren."
  },
  ru: {
    dir: "ltr",
    calc: "Калькулятор", imgTool: "Конвертер Изображений", textDiff: "Сравнение Текста", caseConv: "Регистр Текста",
    json: "Инструменты JSON", pass: "Генератор Паролей", crypto: "Base64", settings: "Настройки",
    searchPlaceholder: "🔍 Поиск...", toolTab: "Инструмент", guideTab: "Инструкция",
    jsonGuideText: "Инструкция JSON:\\n1. Вставьте JSON.\\n2. Нажмите Форматировать или Сжать.",
    diffGuideText: "Инструкция Сравнения:\\n1. Вставьте тексты.\\n2. Нажмите Сравнить.",
    caseGuideText: "Инструкция Регистра:\\n1. Введите текст.\\n2. Выберите регистр.",
    imgGuideText: "Инструкция Изображений:\\n1. Выберите фото.\\n2. Укажите формат.",
    passGuideText: "Инструкция Паролей:\\n1. Задайте длину.\\n2. Нажмите Создать.",
    cryptoGuideText: "Инструкция Base64:\\n1. Введите текст.\\n2. Кодировать/Декодировать."
  },
  zh: {
    dir: "ltr",
    calc: "计算器", imgTool: "图片转换器", textDiff: "文本对比", caseConv: "大小写转换",
    json: "JSON 工具", pass: "密码生成器", crypto: "Base64", settings: "设置",
    searchPlaceholder: "🔍 搜索工具...", toolTab: "工具", guideTab: "指南",
    jsonGuideText: "JSON 指南：\\n1. 粘贴 JSON。\\n2. 点击格式化或压缩。",
    diffGuideText: "文本对比指南：\\n1. 粘贴文本。\\n2. 点击对比。",
    caseGuideText: "大小写指南：\\n1. 输入文本。\\n2. 选择转换类型。",
    imgGuideText: "图片指南：\\n1. 选择图片。\\n2. 选择格式和质量。",
    passGuideText: "密码指南：\\n1. 设置长度。\\n2. 点击生成。",
    cryptoGuideText: "Base64 指南：\\n1. 输入文本。\\n2. 点击编码/解码。"
  },
  ja: {
    dir: "ltr",
    calc: "电卓", imgTool: "画像変換", textDiff: "テキスト比較", caseConv: "文字変換",
    json: "JSON ツール", pass: "パスワード生成", crypto: "Base64", settings: "設定",
    searchPlaceholder: "🔍 ツールを検索...", toolTab: "ツール", guideTab: "ガイド",
    jsonGuideText: "JSON ガイド:\\n1. JSONを貼り付け。\\n2. 成形または圧縮をクリック。",
    diffGuideText: "テキスト比較ガイド:\\n1. テキストを貼り付け。\\n2. 比較をクリック。",
    caseGuideText: "文字変換ガイド:\\n1. テキストを入力。\\n2. 形式を選択。",
    imgGuideText: "画像ガイド:\\n1. 画像を選択。\\n2. フォーマットを選択。",
    passGuideText: "パスワードガイド:\\n1. 長さを指定。\\n2. 生成をクリック。",
    cryptoGuideText: "Base64 ガイド:\\n1. テキストを入力。\\n2. エンコード/デコード。"
  },
  tr: {
    dir: "ltr",
    calc: "Hesap Makinesi", imgTool: "Görsel Dönüştürücü", textDiff: "Metin Karşılaştırma", caseConv: "Büyük/Küçük Harf",
    json: "JSON Araçları", pass: "Şifre Oluşturucu", crypto: "Base64", settings: "Ayarlar",
    searchPlaceholder: "🔍 Araçlarda ara...", toolTab: "Araç", guideTab: "Rehber",
    jsonGuideText: "JSON Rehberi:\\n1. JSON'u yapıştırın.\\n2. Biçimlendir veya Sıkıştır'a tıklayın.",
    diffGuideText: "Karşılaştırma Rehberi:\\n1. Metinleri yapıştırın.\\n2. Karşılaştır'a tıklayın.",
    caseGuideText: "Harf Rehberi:\\n1. Metni girin.\\n2. Dönüştürme türünü seçin.",
    imgGuideText: "Görsel Rehberi:\\n1. Görsel seçin.\\n2. Format ve kaliteyi belirleyin.",
    passGuideText: "Şifre Rehberi:\\n1. Uzunluğu ayarlayın.\\n2. Oluştur'a tıklayın.",
    cryptoGuideText: "Base64 Rehberi:\\n1. Metni girin.\\n2. Kodla/Çöz'e tıklayın."
  },
  it: {
    dir: "ltr",
    calc: "Calcolatrice", imgTool: "Convertitore Immagini", textDiff: "Confronta Testo", caseConv: "Maiuscole/Minuscole",
    json: "Strumenti JSON", pass: "Generatore Password", crypto: "Base64", settings: "Impostazioni",
    searchPlaceholder: "🔍 Cerca strumenti...", toolTab: "Strumento", guideTab: "Guida",
    jsonGuideText: "Guida JSON:\\n1. Incolla JSON.\\n2. Clicca Formatta o Minifica.",
    diffGuideText: "Guida Confronto:\\n1. Incolla i testi.\\n2. Clicca Confronta.",
    caseGuideText: "Guida Testo:\\n1. Inserisci testo.\\n2. Seleziona formato.",
    imgGuideText: "Guida Immagini:\\n1. Scegli immagine.\\n2. Seleziona formato e qualità.",
    passGuideText: "Guida Password:\\n1. Imposta lunghezza.\\n2. Clicca Genera.",
    cryptoGuideText: "Guida Base64:\\n1. Inserisci testo.\\n2. Clicca Codifica/Decodifica."
  },
  pt: {
    dir: "ltr",
    calc: "Calculadora", imgTool: "Conversor de Imagem", textDiff: "Comparar Texto", caseConv: "Maiúsculas/Minúsculas",
    json: "Ferramentas JSON", pass: "Gerador de Senhas", crypto: "Base64", settings: "Configurações",
    searchPlaceholder: "🔍 Buscar ferramentas...", toolTab: "Ferramenta", guideTab: "Guia",
    jsonGuideText: "Guia JSON:\\n1. Cole o JSON.\\n2. Clique em Formatar ou Compactar.",
    diffGuideText: "Guia Comparar:\\n1. Cole os textos.\\n2. Clique em Comparar.",
    caseGuideText: "Guia Formato:\\n1. Insira o texto.\\n2. Escolha o formato.",
    imgGuideText: "Guia Imagem:\\n1. Escolha a imagem.\\n2. Selecione formato e qualidade.",
    passGuideText: "Guia Senha:\\n1. Defina o tamanho.\\n2. Clique em Gerar.",
    cryptoGuideText: "Guia Base64:\\n1. Insira o texto.\\n2. Clique em Codificar/Decodificar."
  }
};

function setLanguage(lang) {
  const selectedLang = translations[lang] ? lang : 'fa';
  const langData = translations[selectedLang];
  localStorage.setItem('nexkit_lang', selectedLang);
  document.documentElement.lang = selectedLang;
  document.documentElement.dir = langData.dir;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (langData[key]) el.innerText = langData[key];
  });

  const searchInput = document.getElementById('quickSearch');
  if (searchInput && langData.searchPlaceholder) {
    searchInput.placeholder = langData.searchPlaceholder;
  }
  
  document.querySelectorAll('.sub-tab-tool').forEach(el => el.innerText = langData.toolTab);
  document.querySelectorAll('.sub-tab-guide').forEach(el => el.innerText = langData.guideTab);
}
`;

fs.appendFileSync('app.logic.js', jsContent);
console.log('12-Language Engine Added successfully!');
