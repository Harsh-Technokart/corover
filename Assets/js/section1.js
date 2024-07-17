const spanT = document.querySelector(".hero h1 span");
const spants = [
  "Virtual Assistants",
  "Chat Bots",
  "Video Bots",
  "Voice Bots",
  "WhatsApp Bots",
];
var spani = 0;
setInterval(() => {
  spanT.style.opacity = "0";
  setTimeout(() => {
    spani = (spani + 1) % 5;
    spanT.innerHTML = spants[spani];
  }, 200);

  setTimeout(() => {
    spanT.style.opacity = "1";
  }, 400);
}, 3500);

const elementIsVisible = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// true - (partially visible)

const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");
const section3 = document.querySelector(".section3");
const section4 = document.querySelector(".section4");
const section5 = document.querySelector(".section5");
const section6 = document.querySelector(".section6");
const section7 = document.querySelector(".section7");
const section8 = document.querySelector(".section8");
const section9 = document.querySelector(".semiFooter");
document.body.onscroll = () => {
  // if (window.innerWidth > 640) {
  //   return;
  // }

  if (
    elementIsVisible(document.querySelector(".hero"))
    // elementIsVisible(section2) ||
    // elementIsVisible(section4) ||
    // elementIsVisible(section3) ||
    // elementIsVisible(section5) ||
    // elementIsVisible(section6) ||
    // elementIsVisible(section7) ||
    // elementIsVisible(section8) ||
    // elementIsVisible(section9)
  ) {
    document.querySelector("header").style.borderBottom = "1px solid white";
  } else
    document.querySelector("header").style.borderBottom = "1px solid gainsboro";
};

var swiper = new Swiper(".mySwiper", {
  slidesPerView: window.innerWidth < 640 ? 3 : 6,
  rewind: true,
  //   spaceBetween: 30,
  //   centeredSlides: true,
  //   freeMode: true,
  freeModeMomentum: false,
  //   mousewheelControl: true,
  keyboardControl: true,
  speed: 3000,
  autoplay: {
    delay: 1,
    disableOnInteraction: false,
  },
  loop: true,
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //     renderBullet: function (index, className) {
  //       return (
  //         '<span style="background:red; display:inline-block; width:50px; border-radius:4px; height:5px;" class="' +
  //         className +
  //         '">' +
  //         "</span>"
  //       );
  //     },
  //   },
});

window.onresize = (e) => {
  swiper = new Swiper(".mySwiper", {
    slidesPerView: window.innerWidth < 640 ? 3 : 6,
    rewind: true,
    //   spaceBetween: 30,
    //   centeredSlides: true,
    freeMode: true,
    freeModeMomentum: false,
    // mousewheelControl: true,
    keyboardControl: true,
    speed: 3000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    loop: true,
    //   pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    //     renderBullet: function (index, className) {
    //       return (
    //         '<span style="background:red; display:inline-block; width:50px; border-radius:4px; height:5px;" class="' +
    //         className +
    //         '">' +
    //         "</span>"
    //       );
    //     },
    //   },
  });
};
