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
