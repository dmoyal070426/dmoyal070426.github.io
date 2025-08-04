// Typing effect
const text = "Dilip Moyal";
let index = 0;
function typeWriter() {
  if (index < text.length) {
    document.getElementById("typed-text").innerHTML += text.charAt(index);
    index++;
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
