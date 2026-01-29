/**
 * VANATA Co.,Ltd Website - Main JavaScript
 * Author: Nguyễn Lực
 * Created: January 28, 2026
 * Version: 1.1
 * © 2026 VANATA Co.,Ltd
 */

// JS: Điều khiển intro (vi) — Tiếng Việt:
// - Khi trang load, khóa scroll trang bên dưới và chơi animation chữ.
// - Người dùng có thể bỏ intro bằng click, scroll, hoặc phím (Enter/Space/ArrowDown).
const intro = document.getElementById('intro');
const mark = document.getElementById('mark');

// Hàm ẩn intro và thực hiện hiệu ứng split panel
function leaveIntro(){
  if(intro.classList.contains('is-leaving')) return; // tránh gọi nhiều lần
  if(autoLeaveTimer){ clearTimeout(autoLeaveTimer); autoLeaveTimer = null; }
  intro.classList.add('is-leaving');
  // Thêm class .split để hai panel trượt ra hai bên
  intro.classList.add('split');
  // Lắng nghe transition kết thúc trên hai panel, sau đó mở lại scroll và ẩn intro
  const left = intro.querySelector('.intro__panel--left');
  const right = intro.querySelector('.intro__panel--right');
  let done = 0;
  const finish = ()=>{
    done += 1;
    if(done >= 2){
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      intro.style.display = 'none';
    }
  };
  if(left) left.addEventListener('transitionend', finish, { once: true });
  if(right) right.addEventListener('transitionend', finish, { once: true });
  // Dự phòng: nếu transition không kích hoạt, ẩn intro sau 3200ms
  setTimeout(()=>{
    if(getComputedStyle(intro).display !== 'none'){
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      intro.style.display = 'none';
    }
  }, 5500);
}

// Khóa scroll khi intro hiện
// (Ngăn người dùng cuộn trang khi intro đang hiển thị)
document.documentElement.style.overflow='hidden';
document.body.style.overflow='hidden';

// Chơi animation chữ và tự tắt intro sau khi animation cuối cùng kết thúc
let autoLeaveTimer = null;
setTimeout(()=>{
  mark.classList.add('play');
  const last = mark.querySelector('.letter:last-child');
  if(last){
    // Tính tổng thời gian animation của ký tự cuối cùng
    const cs = window.getComputedStyle(last);
    const ad = cs.animationDelay || '0s';
    const dur = cs.animationDuration || '0s';
    const parseMs = (s) => { if(!s) return 0; const v = parseFloat(s); return s.indexOf('ms') > -1 ? v : v * 1000; };
    const total = parseMs(ad) + parseMs(dur);
    const buffer = 8180; // đệm để chữ hiển thị ổn
    autoLeaveTimer = setTimeout(()=> leaveIntro(), total + buffer);
  }else{
    autoLeaveTimer = setTimeout(()=> leaveIntro(), 1600);
  }
}, 120);

// Sự kiện cho phép người dùng bỏ intro sớm bằng chuột, phím, chạm
['wheel','touchstart'].forEach(e=>window.addEventListener(e, leaveIntro, {passive:true}));
window.addEventListener('keydown', e=>{ if(['Enter',' ','ArrowDown'].includes(e.key)) leaveIntro(); });
intro.addEventListener('click', leaveIntro);

// Slider (hero): tạo dots và tự động chuyển slide
(function(){
  const slider=document.getElementById('heroSlider');
  if(!slider) return;
  const slides=Array.from(slider.querySelectorAll('.slide'));
  const dotsWrap=document.getElementById('sliderDots');
  let idx=0, timer=null;

  // Thêm stripe overlay cho mỗi slide nếu chưa có
  const STRIPE_COUNT = 7;
  slides.forEach(slide => {
    if (!slide.querySelector('.slide__stripes')) {
      const stripes = document.createElement('div');
      stripes.className = 'slide__stripes';
      for(let k=0;k<STRIPE_COUNT;k++){
        const stripe = document.createElement('div');
        stripe.className = 'slide__stripe';
        stripe.style.setProperty('--stripe-idx', k);
        stripes.appendChild(stripe);
      }
      slide.appendChild(stripes);
    }
  });

  // Chuyển đến slide thứ i với hiệu ứng stripe reveal mượt hơn
  function goTo(i){
    if(i === idx) return;
    const prev = slides[idx];
    const next = slides[i];
    // Đưa slide mới lên trên
    next.style.zIndex = 2;
    prev.style.zIndex = 1;
    // Đặt các stripe che ảnh mới
    const stripes = next.querySelectorAll('.slide__stripe');
    stripes.forEach((stripe, k) => {
      stripe.style.transition = 'transform 1.2s cubic-bezier(.86,0,.07,1)';
      stripe.style.transform = 'translateY(0)';
      stripe.style.background = '#101233';
    });
    next.classList.add('active');
    next.style.opacity = '0.2';
    prev.style.opacity = '1';
    // Animate stripe reveal lần lượt
    setTimeout(()=>{
      stripes.forEach((stripe, k) => {
        setTimeout(()=>{
          stripe.style.transform = 'translateY(-110%)';
        }, k*100);
      });
      // Crossfade + scale + blur đồng thời
      next.style.transition = 'opacity 1.2s cubic-bezier(.86,0,.07,1), transform 1.2s cubic-bezier(.86,0,.07,1), filter 1.2s cubic-bezier(.86,0,.07,1)';
      next.style.opacity = '1';
      next.style.transform = 'scale(1)';
      next.style.filter = 'blur(0)';
      prev.style.transition = 'opacity 1.2s cubic-bezier(.86,0,.07,1), transform 1.2s cubic-bezier(.86,0,.07,1), filter 1.2s cubic-bezier(.86,0,.07,1)';
      prev.style.opacity = '0';
      prev.style.transform = 'scale(1.04)';
      prev.style.filter = 'blur(8px)';
    }, 60);
    // Sau khi reveal xong, dọn dải và hoàn tất chuyển cảnh
    setTimeout(()=>{
      stripes.forEach(stripe=>{
        stripe.style.transition = '';
        stripe.style.transform = '';
        stripe.style.background = 'transparent';
      });
      prev.classList.remove('active');
      next.style.zIndex = '';
      prev.style.zIndex = '';
      prev.style.opacity = '';
      prev.style.transform = '';
      prev.style.filter = '';
      next.style.opacity = '';
      next.style.transform = '';
      next.style.filter = '';
      Array.from(dotsWrap.children).forEach((d,j)=>d.classList.toggle('active', j===i));
      idx=i;
    }, 100*STRIPE_COUNT+1200);
  }
  function next(){ goTo((idx+1)%slides.length); }

  // Tạo các nút chấm điều hướng cho slider
  slides.forEach((_s,i)=>{
    const d=document.createElement('button');
    d.className='slider__dot'+(i===0?' active':'');
    d.setAttribute('aria-label','Go to slide '+(i+1));
    d.addEventListener('click', ()=>{ goTo(i); reset(); });
    dotsWrap.appendChild(d);
  });

  // Reset lại timer tự động chuyển slide
  function reset(){ clearInterval(timer); timer = setInterval(next, 5000); }
  // Chạy slider ngay khi trang load, không chờ delay
  setTimeout(next, 10);
  reset();
})();

// Mobile nav toggle: mở/đóng menu trên mobile
(function(){
  const toggle = document.getElementById('navToggle');
  const header = document.querySelector('.site-header');
  if(!toggle || !header) return;
  toggle.addEventListener('click', ()=>{
    const open = header.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Đóng menu khi người dùng click vào link
  document.querySelectorAll('.main-nav a').forEach(a => {
    a.addEventListener('click', ()=>{ header.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); });
  });
})();

// Header theme switch on scroll
(function() {
  const header = document.querySelector('.site-header');
  const banner = document.querySelector('.banner');
  function updateHeaderTheme() {
    if (!header || !banner) return;
    const bannerRect = banner.getBoundingClientRect();
    if (bannerRect.bottom > 72) {
      header.classList.add('hero-theme');
      header.classList.remove('solid-theme');
    } else {
      header.classList.remove('hero-theme');
      header.classList.add('solid-theme');
    }
  }
  window.addEventListener('scroll', updateHeaderTheme);
  window.addEventListener('resize', updateHeaderTheme);
  document.addEventListener('DOMContentLoaded', updateHeaderTheme);
})();
