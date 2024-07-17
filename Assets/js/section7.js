var active2 = 0;
var videos = [...document.querySelectorAll(".section7 > .container2 > div")];

var nextButton4 = document.querySelector(".section7 .next-btn");
var prevButton4 = document.querySelector(".section7 .prev-btn");
var d;
var closeBtn;
nextButton4.addEventListener("click", () => {
  active2++;
  active2 = active2 % 3;
  videos.forEach((p) => (p.style.display = "none"));
  videos[active2].style.display = "block";
});

prevButton4.addEventListener("click", () => {
  active2--;
  if (active2 < 0) active2 = 3 + active2;
  videos.forEach((p) => (p.style.display = "none"));
  videos[active2].style.display = "block";
});

function handleVideoClick(v) {
  let src = v.getAttribute("data-src");

  d = document.createElement("div");
  d.className = "iframe-video";
  d.innerHTML =
    `<iframe  src="` +
    src +
    `" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> <img src="https://cdn.jsdelivr.net/gh/corover/assets@latest/askdisha-bucket/close.png"/> `;
  document.body.appendChild(d);

  closeBtn = document.querySelector(".iframe-video > img");
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(d);
  });
}

var videoDivs = [...document.querySelectorAll(".section7  .video")];

videoDivs.forEach((vid) => {
  vid.addEventListener("click", () => handleVideoClick(vid));
});
