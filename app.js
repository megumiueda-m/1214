//ハンバーガーメニュー
const button = document.querySelector('.hamburger');
const nav = document.querySelector('.mb_nav');
const anchors = document.querySelectorAll('.mb_nav a'); // メニュー内のアンカーリンクを取得

button.addEventListener('click', function() {
  button.classList.toggle('open');
  nav.classList.toggle('open');
});
// アンカーリンクをクリックしたときにメニューを閉じる処理
anchors.forEach(anchor => {
  anchor.addEventListener('click', function() {
    button.classList.remove('open'); // ハンバーガーボタンを閉じる
    nav.classList.remove('open');   // メニューを閉じる
  });
});
// JavaScriptは「いつ」アニメーションを発動するかだけを制御
const elements = document.querySelectorAll('.slide-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

elements.forEach(el => observer.observe(el));




// 症例アコーディオンメニュー
document.querySelectorAll('.cardiology__accordion').forEach((accordion) => {
  const props = {
    isAnimating: false,
    slideDuration: 400,
    slideEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    lis: accordion.querySelectorAll('li'),
  };

  function answerShow(li) {
    props.isAnimating = true;

    // 他のliを閉じる
    props.lis.forEach((otherLi) => {
      if (otherLi !== li && otherLi.classList.contains('is-open')) {
        answerHide(otherLi);
      }
    });

    li.classList.add('is-open');

    const answer = li.querySelector('.accordion-a');
    answer.style.display = 'block';
    const startHeight = 0;
    const endHeight = answer.scrollHeight;
    
    answer.animate([
      { height: `${startHeight}px` },
      { height: `${endHeight}px` }
    ], {
      duration: props.slideDuration,
      easing: props.slideEasing
    }).onfinish = () => {
      answer.style.height = '';
      props.isAnimating = false;
    };
  }

  function answerHide(li) {
    props.isAnimating = true;
    li.classList.remove('is-open');

    const answer = li.querySelector('.accordion-a');
    
    const startHeight = answer.scrollHeight;
    const endHeight = 0;
    
    answer.animate([
      { height: `${startHeight}px` },
      { height: `${endHeight}px` }
    ], {
      duration: props.slideDuration,
      easing: props.slideEasing
    }).onfinish = () => {
      answer.style.display = '';
      answer.style.height = '';
      props.isAnimating = false;
    };
  }

  props.lis.forEach((li) => {
    li.querySelector('.accordion-q button').addEventListener('click', () => {
      if (!props.isAnimating) {
        if (!li.classList.contains('is-open')) {
          answerShow(li);
        } else {
          answerHide(li);
        }
      }
    });
  });
});


// 院内設備アコーディオンメニュー
document.querySelectorAll('.js-accordion-item').forEach((item) => {
  const btn = item.querySelector('.js-accordion-btn');
  const answer = item.querySelector('.accordion-a');
  let isAnimating = false;

  btn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    const isOpen = item.classList.contains('is-open');

    if (!isOpen) {
      // ===== 開く =====
      item.classList.add('is-open');
      answer.style.display = 'block';
      answer.style.height = '0px';

      requestAnimationFrame(() => {
        const height = answer.scrollHeight;

        answer.animate(
          [{ height: '0px' }, { height: `${height}px` }],
          { duration: 400, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)' }
        ).onfinish = () => {
          answer.style.height = '';
          isAnimating = false;
        };
      });

    } else {
      // ===== 閉じる =====
      const height = answer.scrollHeight;
      item.classList.remove('is-open');

      answer.animate(
        [{ height: `${height}px` }, { height: '0px' }],
        { duration: 400, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)' }
      ).onfinish = () => {
        answer.style.display = 'none';
        answer.style.height = '';
        isAnimating = false;
      };
    }
  });
});


