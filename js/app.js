const sections = Array.from(document.getElementsByTagName('section'));
const heading = document.getElementById('heading');
const navList = document.getElementById('nav-list');

/**
 * jQuery using to Scroll to element
 */
function scrollTo(target) {
  $('html,body').animate({
    scrollTop: target ? target.offset().top : 0
  }, 'slow');
}

/**
 * creating navbar
 */

function Navbar() {
  const brandLink = document.createElement('li');
  brandLink.innerText = 'Chandigarh';
  brandLink.className = 'menu-link';
  brandLink.onclick = () => scrollTo();
  navList.appendChild(brandLink);
  sections.forEach(section => {
    if (!section.dataset || !section.dataset.nav) return;
    const item = document.createElement('li');
    item.innerText = section.dataset.nav;
    item.className = 'menu-link';
    item.onclick = () => scrollTo($(`#${section.id}`));
    navList.appendChild(item);
  });
}
Navbar();



/**
 * Function called on each scroll event.
 */
function focusOnScroll() {
  sections.forEach(section => section.classList.remove('section-active'));
  if (isElementInViewport(heading)) {
    navList.childNodes[0].classList.add('nav-active');
    navList.childNodes.forEach((navLink, index) =>
      index && navLink.classList.remove('nav-active'));
  } else {
    const actIndex = sections.findIndex(section => isElementInViewport(section.childNodes[1].childNodes[1]));
    const actSection = sections[actIndex];
    const actLink = navList.childNodes[actIndex + 1];
    actSection && actSection.classList.add('section-active');
    actLink && actLink.classList.add('nav-active');
    navList.childNodes.forEach((navLink, index) =>
      index !== (actIndex + 1) && navLink.classList.remove('nav-active'));
  }
}

window.onscroll = focusOnScroll;

/**
 * Using getBoundingClientRect() to see weather element is in viewport or not.
 */
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

focusOnScroll();
