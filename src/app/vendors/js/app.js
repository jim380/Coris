const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".main-nav");
const links = document.querySelectorAll(".main-nav li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
});
