/* ==========================================================================
   Sevengül Hukuki Danışmanlık ve Avukatlık Bürosu
   İnteraktif Arayüz, Hesaplama & Animasyon Mantığı (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initIntroScreen();
  initThemeToggle();
  initMobileNav();
  initFaqAccordion();
  initQuickCalculator();
  initContactForm();
  initScrollEffects();
});

/* --------------------------------------------------------------------------
   1. SİNEMATİK AÇILIŞ ANİMASYONU (INTRO SCREEN)
   -------------------------------------------------------------------------- */
function initIntroScreen() {
  const introScreen = document.getElementById('introScreen');
  const skipIntroBtn = document.getElementById('skipIntroBtn');

  if (!introScreen) return;

  // Otomatik kapanma (2.8 saniye sonra)
  const autoCloseTimer = setTimeout(() => {
    closeIntro();
  }, 2800);

  function closeIntro() {
    clearTimeout(autoCloseTimer);
    introScreen.classList.add('fade-out');
    setTimeout(() => {
      introScreen.style.display = 'none';
    }, 800);
  }

  if (skipIntroBtn) {
    skipIntroBtn.addEventListener('click', closeIntro);
  }
}

/* --------------------------------------------------------------------------
   2. TEMA DEĞİŞTİRİCİ (KOYU / AÇIK TEMA)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  const themeIcon = themeToggleBtn.querySelector('.theme-icon');
  const savedTheme = localStorage.getItem('sevengul_theme') || 'dark';

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeIcon) themeIcon.textContent = '🌙';
  }

  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('sevengul_theme', 'dark');
      if (themeIcon) themeIcon.textContent = '🌙';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('sevengul_theme', 'light');
      if (themeIcon) themeIcon.textContent = '☀️';
    }
  });
}

/* --------------------------------------------------------------------------
   3. MOBİL MENÜ TOGGLE
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const navToggleBtn = document.getElementById('navToggleBtn');
  const mainNav = document.getElementById('mainNav');

  if (!navToggleBtn || !mainNav) return;

  navToggleBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // Menüdeki linke tıklandığında menüyü kapat
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });
}

/* --------------------------------------------------------------------------
   4. SSS (SIKÇA SORULAN SORULAR) ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Diğerlerini kapat
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
        }
      });

      // Mevcut olanı aç/kapat
      item.classList.toggle('open', !isOpen);
    });
  });
}

/* --------------------------------------------------------------------------
   5. LEXCALC HIZLI AAÜT VEKALET ÜCRETİ HESAPLAYICI
   -------------------------------------------------------------------------- */
function initQuickCalculator() {
  const inputDava = document.getElementById('quickDavaDegeri');
  const selectMahkeme = document.getElementById('quickMahkeme');
  const displayResult = document.getElementById('quickResultDisplay');

  if (!inputDava || !selectMahkeme || !displayResult) return;

  // 2026 Resmi AAÜT Kademeli Dilimleri
  const aautTiers = [
    { limit: 400000, rate: 0.16 },       // İlk 400.000 TL için %16
    { limit: 800000, rate: 0.15 },       // Sonraki 400.000 TL için %15
    { limit: 1600000, rate: 0.14 },      // Sonraki 800.000 TL için %14
    { limit: 3200000, rate: 0.11 },      // Sonraki 1.600.000 TL için %11
    { limit: 6400000, rate: 0.08 },      // Sonraki 3.200.000 TL için %8
    { limit: 12800000, rate: 0.05 },     // Sonraki 6.400.000 TL için %5
    { limit: Infinity, rate: 0.02 }      // Üzeri için %2
  ];

  const maktuTabanlar = {
    asliye: 35000,
    sulh: 22000,
    tuketici: 18000,
    idare: 42000
  };

  function calculate() {
    let val = parseFloat(inputDava.value);
    if (isNaN(val) || val <= 0) {
      val = 0;
    }

    let remaining = val;
    let nispiFee = 0;
    let previousLimit = 0;

    for (const tier of aautTiers) {
      const tierCapacity = tier.limit === Infinity ? remaining : tier.limit - previousLimit;
      const taxable = Math.min(remaining, tierCapacity);

      if (taxable > 0) {
        nispiFee += taxable * tier.rate;
        remaining -= taxable;
        previousLimit = tier.limit;
      }

      if (remaining <= 0) break;
    }

    const selectedMaktu = maktuTabanlar[selectMahkeme.value] || 35000;
    const finalFee = Math.max(nispiFee, selectedMaktu);

    displayResult.textContent = formatCurrency(finalFee);
  }

  function formatCurrency(num) {
    return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
  }

  inputDava.addEventListener('input', calculate);
  selectMahkeme.addEventListener('change', calculate);

  // İlk hesaplama
  calculate();
}

/* --------------------------------------------------------------------------
   6. İLETİŞİM FORMU SİMÜLASYONU
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusMsg = document.getElementById('formStatusMsg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const adSoyad = document.getElementById('formAdSoyad').value;
    const telefon = document.getElementById('formTelefon').value;
    const konu = document.getElementById('formDavaTuru').value;
    const mesaj = document.getElementById('formMesaj').value;

    if (statusMsg) {
      statusMsg.style.display = 'block';
      statusMsg.style.color = 'var(--gold)';
      statusMsg.textContent = 'Talebiniz kaydediliyor, lütfen bekleyiniz...';

      setTimeout(() => {
        statusMsg.style.color = '#10B981';
        statusMsg.innerHTML = `✅ <strong>Sayın ${adSoyad}</strong>, danışmanlık talebiniz başarıyla alındı. Avukatlarımız en kısa sürede <strong>${telefon}</strong> numarası üzerinden sizinle irtibata geçecektir.`;
        form.reset();
      }, 1000);
    }
  });
}

/* --------------------------------------------------------------------------
   7. SCROLL ETKİLERİ & YUKARI ÇIK BUTONU
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const scrollTopBtn = document.getElementById('scrollToTopBtn');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav.main-nav a');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Yukarı çık butonu görünürlüğü
    if (scrollTopBtn) {
      if (scrollPos > 400) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }

    // ScrollSpy (Menü linkini aktif etme)
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
