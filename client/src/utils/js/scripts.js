let nav = document.getElementsByClassName('menu');
for (let i = 0; i < nav.length; i++) {
  nav[i].addEventListener('click', function() {
    document.getElementById('navbar').classList.toggle('active');
  });
}

window.onscroll = function() {
  navBarHideOnscroll();
};

function navBarHideOnscroll() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.querySelector('.nav-container').style.top = '-69px';
    document.querySelector('.nav-container-sticky').style.top = '0px';
  } else {
    document.querySelector('.nav-container').style.top = '50px';
    document.querySelector('.nav-container-sticky').style.top = '-69px';
  }
}
