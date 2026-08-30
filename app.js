document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('mainNav');
  var navToggle = document.getElementById('navToggleBtn');
  var themeToggle = document.getElementById('themeToggleBtn');
  var topButton = document.getElementById('scrollToTopBtn');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(nav.classList.contains('open')));
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('light-theme');
      var icon = themeToggle.querySelector('.theme-icon');
      if (icon) icon.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    });
  }

  document.querySelectorAll('.faq-question').forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.closest('.faq-item');
      if (item) item.classList.toggle('active');
    });
  });

  if (topButton) {
    window.addEventListener('scroll', function () {
      topButton.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    topButton.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = document.getElementById('formAdSoyad').value.trim();
      var phone = document.getElementById('formTelefon').value.trim();
      var topicSelect = document.getElementById('formDavaTuru');
      var topic = topicSelect.options[topicSelect.selectedIndex].text;
      var message = document.getElementById('formMesaj').value.trim();
      var subject = 'Web Sitesi Hukuki Danışma Talebi - ' + name;
      var body = [
        'Ad Soyad: ' + name,
        'Telefon: ' + phone,
        'Hukuki Konu: ' + topic,
        '',
        'Uyuşmazlık Özeti / Mesaj:',
        message
      ].join('\n');
      var status = document.getElementById('formStatusMsg');
      if (status) {
        status.style.display = 'block';
        status.textContent = 'E-posta uygulamanız açılıyor. Lütfen hazırlanan mesajı gönderin.';
      }
      window.location.href = 'mailto:muratsevengul70@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  var reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = document.getElementById('reviewName').value.trim();
      var rating = document.getElementById('reviewRating').value;
      var message = document.getElementById('reviewMessage').value.trim();
      var subject = 'Web Sitesi Yorum ve Değerlendirme - ' + name;
      var body = [
        'Ad: ' + name,
        'Değerlendirme: ' + rating + ' / 5 yıldız',
        '',
        'Yorum:',
        message
      ].join('\n');
      var status = document.getElementById('reviewStatusMsg');
      if (status) status.textContent = 'E-posta uygulamanız açılıyor. Lütfen hazırlanan yorumu gönderin.';
      window.location.href = 'mailto:muratsevengul70@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
});
