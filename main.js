'use strict';

// navbar--view
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY > navbarHeight){
    navbar.classList.add('navbar--view');
  } else {
    navbar.classList.remove('navbar--view');
  }
});

// navbar__menu--select
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
  const target = e.target;
  const type = target.dataset.type;

  if(type == null){
    return;
  }

  scrollIntoView(type);
  navbarMenu.classList.remove('active');
});


// toogle button
const toogleBtn = document.querySelector('.navbar__toogle-btn');
toogleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
});

// arrow-up
const arrowUp = document.querySelector('.arrow__up');
arrowUp.addEventListener('click', () => {
  scrollIntoView('#home');
});

// arrow-up view
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if(window.scrollY > homeHeight / 2){
    arrowUp.classList.add('active');
  } else {
    arrowUp.classList.remove('active');
  }
});

const contact = document.querySelector('.home__contact');
contact.addEventListener('click', () => {
  scrollIntoView('#contact');
});

function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

// home view
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// project catergory
const category = document.querySelector('.project__categories');
const projectActive = document.querySelector('.project__active');
const projects = document.querySelectorAll('.projects');
category.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  if(filter == null){
    return;
  }

  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target = e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add('selected');

  projectActive.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if(filter === '*' || filter === project.dataset.link){
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectActive.classList.remove('anim-out');
  }, 300);
});

// intersectionObserver
const sectionIds = ['#home', '#about', '#skills', '#project', '#contact'];

const sections = sectionIds.map((id) => document.querySelector(id)); // 관찰용
const navItems = sectionIds.map((id) => document.querySelector(`[data-type="${id}"]`));

// navbar active
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected){
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const callback = ((entries, observer) => {
  entries.forEach((entry) => {
    if(!entry.isIntersecting && entry.intersectionRatio > 0){
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if(entry.boundingClientRect.y < 0){
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
});

window.addEventListener('wheel', () => {
  if(window.scrollY === 0){
    selectedNavIndex = 0;
  } else if(Math.round(window.scollY + window.innerHeight) === document.body.clientHeight){
    selectedNavIndex = navItems.length - 1;
  } 
  selectNavItem(navItems[selectedNavIndex]);
});

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
}

const observer = new IntersectionObserver(callback, options);
const projectDescription = document.querySelector('.projectDescription');
sections.forEach(section => {
  observer.observe(section);
});

