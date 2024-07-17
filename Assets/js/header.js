const desktopLinks = [...document.querySelectorAll("header nav.desktop li")];
const navMenus = [...document.querySelectorAll("header .nav-menu")];
const handleDeskTopLinkClick = (link) => {
  if (window.innerWidth > 1100)
    navMenus.forEach((menu) => {
      if (menu.id === link.innerHTML.toLowerCase()) {
        menu.style.display = "grid";
      } else menu.style.display = "none";
    });
};

const handleMobileLinkClick = (link) => {
  if (window.innerWidth < 1101) {
    desktopLinks.forEach((link) => {
      link.className = "";
    });

    navMenus.forEach((menu) => {
      if (menu.id === link.innerHTML.toLowerCase()) {
        if (menu.style.display === "block") {
          link.className = "";
          menu.style.display = "none";
        } else {
          menu.style.display = "block";
          link.className = "selected-link";
        }
      } else menu.style.display = "none";
    });
  }
};

desktopLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => handleDeskTopLinkClick(link));

  link.addEventListener("click", () => handleMobileLinkClick(link));
});

const header = document.getElementsByTagName("header")[0];

header.addEventListener("mouseleave", () => {
  navMenus.forEach((menu) => {
    if (window.innerWidth > 1100) menu.style.display = "none";
  });
});

const hamburger = document.querySelector("header .hamburger");
const closeBtnHam = document.querySelector(".hamburger-close");

const nav = document.querySelector("header nav");
hamburger.addEventListener("click", () => {
  nav.style.display = "block";
  hamburger.style.display = "none";
  closeBtnHam.style.display = "block";
  document.getElementsByTagName("html")[0].style.overflow = "hidden";
});

closeBtnHam.addEventListener("click", () => {
  nav.style.display = "none";
  hamburger.style.display = "block";
  closeBtnHam.style.display = "none";
  document.getElementsByTagName("html")[0].style.overflow = "auto";
});
