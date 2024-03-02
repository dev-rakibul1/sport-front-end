const nav = document.getElementById("nav");

window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;

  if (scrollPosition > 100) {
    nav.classList.add("navbar-light");
    nav.classList.add("bg-light");
  } else {
    nav.classList.remove("navbar-light");
    nav.classList.remove("bg-light");
  }
});
