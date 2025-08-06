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

window.addEventListener("load", () => {
  typeWriter();

  // Preloader fade-out
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 600);

  // Initialize first testimonial
  showTestimonial(testimonialIndex);

  // Auto-slide testimonials
  setInterval(nextTestimonial, 5000);
});

// Resume popup
function openPopup() {
  document.getElementById("popup").style.display = "flex";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Dark Mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

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

if (prevBtn && nextBtn) {
  nextBtn.addEventListener("click", nextTestimonial);
  prevBtn.addEventListener("click", prevTestimonial);
}

// Form Submit via EmailJS
(function () {
  emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
})();

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const status = document.getElementById("form-status");

    emailjs.sendForm("service_ee3dnnz", "template_qx97hfw", this)
      .then(function () {
        status.innerHTML = "✅ Message sent successfully!";
        status.style.color = "green";
        contactForm.reset();
      }, function (error) {
        status.innerHTML = "❌ Failed to send message. Try again.";
        status.style.color = "red";
      });
  });
}

// Optional: Thank-you popup (instead of redirect)
function showThankYouPopup() {
  alert("Thank you for contacting me!");
}
