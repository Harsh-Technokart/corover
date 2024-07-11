let footerLinks = [...document.querySelectorAll("footer .column > div")];
footerLinks = footerLinks.slice(1);

const handleFooterLinkClick = (link) => {
  if (window.innerWidth < 801) {
    if (link.className === "selected-footer-link") link.className = "";
    else link.className = "selected-footer-link";
    footerLinks.forEach((l) => {
      if (l !== link) l.className = "";
    });
  }
};

footerLinks.forEach((link, index) => {
  link.addEventListener("click", () => handleFooterLinkClick(link));
});
