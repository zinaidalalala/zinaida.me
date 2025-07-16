document.addEventListener('DOMContentLoaded', () => {
  let language = localStorage.getItem('language') || 'en';

  async function loadLanguage(lang) {
    try {
      const response = await fetch(`./js/json/${lang}.json`);
      const translations = await response.json();
      applyTranslations(translations);
      restartTypewriter();
    } catch (error) {
      console.error('Error loading language:', error);
    }
  }

  function applyTranslations(translations) {
    document.querySelectorAll('[data-translate]').forEach((el) => {
      const key = el.getAttribute('data-translate');
      if (translations[key]) {
        const text = translations[key];
        el.innerHTML = text;
      }
    });

    text = translations['main_title'] || text;
  }

  function restartTypewriter() {
    if (element) {
      element.innerHTML = '';
      typeWriter(element, text);
    }
  }

  function stopTypewriter() {
    if (typewriterIntervalId) {
      clearInterval(typewriterIntervalId);
      typewriterIntervalId = null;
    }
  }

  document.getElementById('languageSwitcher').addEventListener('change', function () {
    const selectedLanguage = this.value;
    localStorage.setItem('language', selectedLanguage);
    stopTypewriter();
    loadLanguage(selectedLanguage);
  });

  loadLanguage(language);
});

let element = document.querySelector('.main-title-span');
let text = ' I am Zinaida, Frontend Developer';
let typewriterIntervalId;

function typeWriter(element, text, delay = 100) {
  let i = 0;
  typewriterIntervalId = setInterval(function () {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typewriterIntervalId);
      typewriterIntervalId = null; 
    }
  }, delay);
}
