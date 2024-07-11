var active = 0;
var testimonials = [...document.querySelectorAll(".section6 .testimonial")];

var nextButton3 = document.querySelector(".section6 .next-btn");
var prevButton3 = document.querySelector(".section6 .prev-btn");

nextButton3.addEventListener("click", () => {
  active++;
  active = active % 3;
  testimonials.forEach((p) => (p.style.display = "none"));
  testimonials[active].style.display = "flex";
});

prevButton3.addEventListener("click", () => {
  active--;
  if (active < 0) active = 3 + active;
  testimonials.forEach((p) => (p.style.display = "none"));
  testimonials[active].style.display = "flex";
});
