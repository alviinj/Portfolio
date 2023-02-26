'use strict';

const btnScrollTo = document.querySelector('.btn-scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.skills_tab');
const tabsContainer = document.querySelector('.skills_tab-container');
const tabsContent = document.querySelectorAll('.skills_content');

btnScrollTo.addEventListener('click', function (e) {
  const s1Coords = section1.getBoundingClientRect();
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

document.querySelector('.nav_links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav_link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

//tabbed compoment
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.skills_tab');

  //guard clause
  if (!clicked) return;

  //remove active tab
  tabs.forEach(t => t.classList.remove('skills_tab--active'));
  tabsContent.forEach(c => c.classList.remove('skills_content--active'));

  //activate tab
  clicked.classList.add('skills_tab--active');

  //activate content area
  document
    .querySelector(`.skills_content--${clicked.dataset.tab}`)
    .classList.add('skills_content--active');
});

//menu fade animations
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav_link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav_link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
  }
};
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

//sticky navigation bar
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//slider component
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider_btn--left');
  const btnRight = document.querySelector('.slider_btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots_dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots_dot')
      .forEach(dot => dot.classList.remove('dots_dot--active'));
    document
      .querySelector(`.dots_dot[data-slide="${slide}"]`)
      .classList.add('dots_dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //event handlers
  btnLeft.addEventListener('click', prevSlide);
  btnRight.addEventListener('click', nextSlide);

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots_dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
