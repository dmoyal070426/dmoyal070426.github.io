// Typing effect
const text = "Dilip Moyal";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("typed-text").textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 150);
  }
}
window.onload = typeWriter;

// Resume popup
function openPopup() {
  document.getElementById("popup").style.display = "flex";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
// Preloader fade-out
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 600);
});
// Testimonials Carousel
let testimonialIndex = 0;
const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.remove("active");
    testimonial.style.opacity = 0;
  });
  testimonials[index].classList.add("active");
  testimonials[index].style.opacity = 1;
}

function nextTestimonial() {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
}

function prevTestimonial() {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(testimonialIndex);
}

nextBtn.addEventListener("click", nextTestimonial);
prevBtn.addEventListener("click", prevTestimonial);

// Auto-slide every 5 seconds
setInterval(nextTestimonial, 5000);

// Initial load
showTestimonial(testimonialIndex);
