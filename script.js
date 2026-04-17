function setLang(lang) {
    document.body.className = 'lang-' + lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === lang);
    });
    document.documentElement.lang = lang;
  }