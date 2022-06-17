const navLinks = document.getElementById("navLinks");
console.log(navLinks);

const hideMenu = () => {
  navLinks.style.right = "-200px";
  document.querySelector(".backdrop").className = "backdrop";
};

const showMenu = () => {
  navLinks.style.right = "0";
  document.querySelector(".backdrop").className = "backdrop active";
};
