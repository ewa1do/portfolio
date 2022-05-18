'use strict';

const nav = document.querySelector('.nav');
const main = document.querySelector('main');
const hamburgerMenu = document.querySelector('.nav--hamburger');
const sections = document.querySelector('.nav--sections');
const sectionClone = [...sections.children];

const createUlMenu = function () {
  return `
    <ul class="res--menu__list">
      ${sectionClone
        .map((sec) => `<li class="res--menu__list--item">${sec.innerHTML}</li>`)
        .join('')}
    </ul>
  `;
};

const createResponsiveMenu = function () {
  const responsiveMenu = document.createElement('div');
  responsiveMenu.classList.add('res--menu');
  responsiveMenu.insertAdjacentHTML('afterbegin', createUlMenu());
  main.prepend(responsiveMenu);
};

const deleteResponsiveMenu = function () {
  Array.from(main.children).map((child) => {
    if (child.classList.contains('res--menu')) {
      child.remove();
    }
  });
};

const createHamburgerAnimation = function () {
  const [bar1, bar2, bar3] = [...hamburgerMenu.children];

  bar1.classList.toggle('rotate-bar-1');
  bar2.classList.toggle('rotate-bar-2');
  bar3.classList.toggle('hide-bar-animation');
};

const toggleResponsiveMenu = function (e) {
  nav.classList.toggle('active');
  createHamburgerAnimation();

  if (nav.classList.contains('active')) {
    createResponsiveMenu();
  } else {
    deleteResponsiveMenu();
  }
};

hamburgerMenu.addEventListener('click', function () {
  toggleResponsiveMenu();

  document.querySelector('.res--menu')?.addEventListener('click', function (e) {
    if (e.target.closest('span')) {
      createHamburgerAnimation();
      nav.classList.toggle('active');
      e.target.parentElement.parentElement.parentElement.parentElement.remove();
    }
  });
});
