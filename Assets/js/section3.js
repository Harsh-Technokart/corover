var swiperTexts = [
  ...document.querySelectorAll(".swiper-tabs .swiper-slide p"),
];

var activeIndex = 0;
var numberOfSlides = swiperTexts.length;

var nextButton = document.querySelector(".swiper-tabs .next-btn");
var prevButton = document.querySelector(".swiper-tabs .prev-btn");
var swiperTab = new Swiper(".swiper-tabs", {
  slidesPerView: window.innerWidth < 640 ? 1 : 5,
  // initialSlide: 3,
  // slidesPerGroup: 1,
  // rewind: true,
  spaceBetween: 10,
  observer: true,
  observeParents: true,
  freeModeMomentum: false,
  mousewheelControl: false,
  on: {
    click: (e) => {
      e.slideTo(e.clickedIndex);
      activeIndex = e.clickedIndex;
      swiperTabContent.slideTo(e.clickedIndex);
      swiperTexts.forEach((p) => (p.className = ""));
      swiperTexts[e.clickedIndex].className = "selected-tab";
    },
  },

  navigation: {
    nextEl: ".next-btn",
    prevEl: ".prev-btn",
  },
  centeredSlides: true,
  centeredSlidesBounds: true,
});

nextButton.addEventListener("click", () => {
  activeIndex++;
  activeIndex = activeIndex % numberOfSlides;
  swiperTab.slideTo(activeIndex);
  swiperTabContent.slideTo(activeIndex);
  swiperTexts.forEach((p) => (p.className = ""));
  swiperTexts[activeIndex].className = "selected-tab";
});

prevButton.addEventListener("click", () => {
  activeIndex--;
  activeIndex = activeIndex % numberOfSlides;
  if (activeIndex < 0) activeIndex = numberOfSlides + activeIndex;
  swiperTab.slideTo(activeIndex);
  swiperTabContent.slideTo(activeIndex);
  swiperTexts.forEach((p) => (p.className = ""));
  swiperTexts[activeIndex].className = "selected-tab";
});

// swiperTab.on("slideChange", function () {
//   // alert(swiperTab.realIndex - 1);
//   swiperTabContent.slideTo(swiperTab.realIndex - 1);
//   swiperTexts.forEach((p) => (p.className = ""));
//   swiperTexts[swiperTab.realIndex - 1].className = "selected-tab";
// });

// var nextButton = document.querySelector(".swiper-tabs .swiper-button-next");
// var prevButton = document.querySelector(".swiper-tabs .swiper-button-prev");

// prevButton.addEventListener("click", () => {
//   let t = swiperTab.realIndex - 1;
//   swiperTab.slideTo(t - 1);
//   alert(swiperTab.realIndex);
// });

// nextButton.addEventListener("click", () => {
//   let t = swiperTab.realIndex - 1;
//   swiperTab.slideTo(t + 1);
//   alert(swiperTab.realIndex);
// });

window.onload = () => {
  swiperTab.update();
};

var swiperTabContent = new Swiper(".swiper-tab-contents", {
  slidesPerView: 1,
  centeredSlides: true,
  centeredSlidesBounds: true,
  observer: true,
  observeParents: true,

  on: {
    slideChange: function (e) {
      activeIndex = e.activeIndex;
      swiperTab.slideTo(e.activeIndex);
      swiperTexts.forEach((p) => (p.className = ""));
      swiperTexts[e.activeIndex].className = "selected-tab";
    },
  },
});

// window.onresize = (e) => {
//   swiper = new Swiper(".mySwiper", {
//     slidesPerView: window.innerWidth < 640 ? 3 : 6,
//     rewind: true,
//     //   spaceBetween: 30,
//     //   centeredSlides: true,
//     freeMode: true,
//     freeModeMomentum: false,
//     // mousewheelControl: true,
//     keyboardControl: true,
//     speed: 3000,
//     autoplay: {
//       delay: 1,
//       disableOnInteraction: false,
//     },
//     loop: true,
//     //   pagination: {
//     //     el: ".swiper-pagination",
//     //     clickable: true,
//     //     renderBullet: function (index, className) {
//     //       return (
//     //         '<span style="background:red; display:inline-block; width:50px; border-radius:4px; height:5px;" class="' +
//     //         className +
//     //         '">' +
//     //         "</span>"
//     //       );
//     //     },
//     //   },
//   });
// };
