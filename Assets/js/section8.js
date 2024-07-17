var swiperFeatures = new Swiper(".swiper-features", {
  slidesPerView: 1,
  rewind: true,
  //   spaceBetween: 30,
  //   centeredSlides: true,
  //   freeMode: true,
  freeModeMomentum: false,
  //   mousewheelControl: true,
  keyboardControl: true,
  // speed: 3000,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span style="background:var(--primary-color); display:inline-block; width:20px; border-radius:4px; height:2px;" class="' +
        className +
        '">' +
        "</span>"
      );
    },
  },
});
