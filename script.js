document.addEventListener('DOMContentLoaded', () => {
  /* ---------- 基本取得 ---------- */
  const heroSection = document.querySelector('#hero');
  const dots        = document.querySelectorAll('.p-hero__dot');
  const header      = document.querySelector('#header');

  /* ---------- スライダー設定 ---------- */
  let currentSlide = 0;
  const slides = [
    'image/img_hero1_pc.jpg',
    'image/img_hero2_pc.jpg',
    'image/img_hero3_pc.jpg'
  ];

  /* ---------- パララックス関数 ---------- */
  function onScrollParallax() {
    const heroHeight = heroSection.offsetHeight;
    const scrollY    = window.pageYOffset;

    if (scrollY < heroHeight) {
      // 画像をゆっくり「上へ」動かす  ← ★ 符号をマイナスに変更
      heroSection.style.backgroundPositionY = `${-(scrollY * 0.5)}px`;
    } else {
      heroSection.style.backgroundPositionY = `${-(heroHeight * 0.5)}px`;
    }
  }

  /* ---------- スクロールイベント最適化 ---------- */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScrollParallax();
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ---------- スライド切り替え ---------- */
  function updateSlide(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    heroSection.style.opacity = '0';
    setTimeout(() => {
      heroSection.style.backgroundImage = `url(${slides[index]})`;
      heroSection.style.opacity = '1';
      onScrollParallax();          // 画像変更後にパララックスを再計算
    }, 300);
  }

  /* ドットクリック */
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateSlide(currentSlide);
    });
  });

  /* 自動切り替え */
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide(currentSlide);
  }, 5000);

  /* ---------- 初期化 ---------- */
  heroSection.style.backgroundImage = `url(${slides[0]})`;
  onScrollParallax();                     // 初回位置調整
  header.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'; // 透過 0.7 固定
});