var swiperTexts2 = [
  ...document.querySelectorAll(".swiper-tabs2 .swiper-slide p"),
];

var activeIndex2 = 0;
var numberOfSlides2 = swiperTexts2.length;

var nextButton2 = document.querySelector(".swiper-tabs2 .next-btn");
var prevButton2 = document.querySelector(".swiper-tabs2 .prev-btn");
var swiperTab2 = new Swiper(".swiper-tabs2", {
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
      activeIndex2 = e.clickedIndex;
      swiperTabContent2.slideTo(e.clickedIndex);
      swiperTexts2.forEach((p) => (p.className = ""));
      swiperTexts2[e.clickedIndex].className = "selected-tab";
    },
  },

  navigation: {
    nextEl: ".next-btn",
    prevEl: ".prev-btn",
  },
  centeredSlides: true,
  centeredSlidesBounds: true,
});

nextButton2.addEventListener("click", () => {
  activeIndex2++;
  activeIndex2 = activeIndex2 % numberOfSlides2;
  swiperTab2.slideTo(activeIndex2);
  swiperTabContent2.slideTo(activeIndex2);
  swiperTexts2.forEach((p) => (p.className = ""));
  swiperTexts2[activeIndex2].className = "selected-tab";
});

prevButton2.addEventListener("click", () => {
  activeIndex2--;
  activeIndex2 = activeIndex2 % numberOfSlides2;
  if (activeIndex2 < 0) activeIndex = numberOfSlides2 + activeIndex2;
  swiperTab2.slideTo(activeIndex2);
  swiperTabContent2.slideTo(activeIndex2);
  swiperTexts2.forEach((p) => (p.className = ""));
  swiperTexts2[activeIndex2].className = "selected-tab";
});

window.onload = () => {
  swiperTab2.update();
};

var swiperTabContent2 = new Swiper(".swiper-tab-contents2", {
  slidesPerView: 1,
  centeredSlides: true,
  centeredSlidesBounds: true,
  observer: true,
  observeParents: true,
  on: {
    slideChange: function (e) {
      activeIndex2 = e.activeIndex;
      swiperTab2.slideTo(e.activeIndex);
      swiperTexts2.forEach((p) => (p.className = ""));
      swiperTexts2[e.activeIndex].className = "selected-tab";
    },
  },
});
