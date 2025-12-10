// Activer le mode JS (permet au CSS de gérer les effets reveal)
document.documentElement.classList.add('js');

// ===== Effet machine à écrire =====
function typeWriter(text, elementId, delay = 70, callback = null) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = ""; // reset le texte pour éviter les doublons
  let i = 0;

  function typing() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typing, delay);
    } else if (callback) {
      callback();
    }
  }
  typing();
}

window.addEventListener("load", () => {
  // Première phrase
  typeWriter("Bienvenue sur Tropez AI", "line1", 70, () => {
    // Deuxième phrase après une petite pause
    setTimeout(() => {
      typeWriter("Votre conciergerie intelligente à Saint-Tropez", "line2", 55);
    }, 700);
  });

  // ===== Effet Reveal (IntersectionObserver) =====
  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target); // on arrête d’observer une fois révélé
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback : tout révéler directement
    reveals.forEach(el => el.classList.add("active"));
  }
});





