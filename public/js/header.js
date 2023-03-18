let prevScrollPos = window.pageYOffset;
window.onscroll = function() {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    document.querySelector('.header').classList.remove('hide-header');
  } else {
    document.querySelector('.header').classList.add('hide-header');
  }
  prevScrollPos = currentScrollPos;
}
