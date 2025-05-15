/**********************************
 * パララックス処理
 **********************************/

// 背景パララックスの位置を更新
function updateParallax() {
  const parallaxEls = document.querySelectorAll('.js-parallax');
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0.5;
    const rect  = el.getBoundingClientRect();
    const offset = -(rect.top * speed);
    el.style.backgroundPositionY = `${offset}px`;
  });
}

// スクロールイベントにパララックス処理を紐づけ
function initParallax() {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });

  updateParallax(); // 初期位置合わせ
}


/**********************************
 * ヒーロースライダー処理
 **********************************/

function initHeroSlider() {
  const heroSection = document.querySelector('#hero');
  const dots = document.querySelectorAll('.p-hero__dot');
  const slides = [
    'image/img_hero1_pc.jpg',
    'image/img_hero2_pc.jpg',
    'image/img_hero3_pc.jpg'
  ];

  if (!heroSection) return;

  let currentSlide = 0;

  function updateSlide(index) {
    // ドットの切り替え
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');

    // フェードしながら画像切り替え
    heroSection.style.opacity = '0';
    setTimeout(() => {
      heroSection.style.backgroundImage = `url(${slides[index]})`;
      heroSection.style.opacity = '1';

      // パララックス位置も再調整
      updateParallax();
    }, 300);
  }

  // ドットクリックでスライド切り替え
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateSlide(currentSlide);
    });
  });

  // 自動スライド切り替え（5秒ごと）
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlide(currentSlide);
  }, 5000);

  // 初期表示
  heroSection.style.backgroundImage = `url(${slides[0]})`;
  updateSlide(currentSlide);
}


/**********************************
 * 初期化処理（DOM読み込み後に実行）
 **********************************/
document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initHeroSlider();
});