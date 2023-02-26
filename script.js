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
  if (e.target.classList.contains('nav_links')) {
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

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.obeserve(header);
