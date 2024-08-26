document.addEventListener('DOMContentLoaded', () => {
  let language = localStorage.getItem('language') || 'en';

  async function loadLanguage(lang) {
    try {
      const response = await fetch(`./js/json/${lang}.json`);
      const translations = await response.json();
      applyTranslations(translations);
      restartTypewriter(); // Запуск анимации текста после загрузки языка
    } catch (error) {
      console.error('Error loading language:', error);
    }
  }

  function applyTranslations(translations) {
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    // Применение перевода к тексту для анимации
    text = translations['main_title'] || text; // Используйте переведённый текст, если он доступен
  }

  function restartTypewriter() {
    if (element) {
      element.innerHTML = ''; // Очистка содержимого элемента
      typeWriter(element, text); // Запуск анимации текста заново
    }
  }

  function stopTypewriter() {
    if (typewriterIntervalId) {
      clearInterval(typewriterIntervalId); // Остановка текущей анимации
      typewriterIntervalId = null; // Сброс идентификатора интервала
    }
  }

  document.getElementById('languageSwitcher').addEventListener('change', function () {
    const selectedLanguage = this.value;
    localStorage.setItem('language', selectedLanguage);
    stopTypewriter(); // Остановка текущей анимации текста
    loadLanguage(selectedLanguage); // Загрузка нового языка
  });

  // Загружаем начальный язык при загрузке страницы
  loadLanguage(language);
});

let element = document.querySelector('.main-title-span');
let text = 'I am Zinaida, Frontend Developer'; // Изначальный текст для анимации
let typewriterIntervalId; // Идентификатор интервала для анимации текста

function typeWriter(element, text, delay = 100) {
  let i = 0;
  typewriterIntervalId = setInterval(function () {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typewriterIntervalId); // Остановка интервала после завершения анимации
      typewriterIntervalId = null; // Сброс идентификатора интервала
    }
  }, delay);
}
