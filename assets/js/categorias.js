document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector("#horizontal-wrapper");

  if (wrapper) {
    console.log("Motor de scroll horizontal inicializado.");

    // Escuchamos el evento de la rueda del ratón
    window.addEventListener(
      "wheel",
      (e) => {
        // --- FILTRO PARA RESPONSIVE ---
        // Si la pantalla es menor a 1024px, no bloqueamos el scroll vertical
        if (window.innerWidth < 1024) return;

        // Detectamos si el ratón está sobre una descripción de proyecto
        const isOverDescription = e.target.closest(".project-description");

        if (isOverDescription) {
          // Si hay texto suficiente para hacer scroll, dejamos que el navegador
          // haga scroll vertical normal dentro de la caja y paramos aquí.
          if (isOverDescription.scrollHeight > isOverDescription.clientHeight) {
            return;
          }
        }

        // Si no estamos en el texto, convertimos el scroll vertical en horizontal
        if (e.deltaY !== 0) {
          e.preventDefault(); // Evita el movimiento vertical de la página
          wrapper.scrollLeft += e.deltaY * 1.5; // Ajusta el 1.5 para la velocidad
        }
      },
      { passive: false }
    );
  } else {
    console.error("No se encontró el contenedor #horizontal-wrapper");
  }

  // --- ANIMACIÓN DE SVG REBOTANDO (DENTRO DEL DOMCONTENTLOADED) ---
  // He añadido selectores alternativos por si los IDs cambian en el nav horizontal
  const container =
    document.getElementById("nav-container") ||
    document.querySelector(".nav-vertical");
  const item =
    document.getElementById("svg-animado") ||
    document.querySelector(".svg-rebotando");

  if (container && item) {
    let posX = Math.random() * 50;
    let posY = Math.random() * 50;
    let rotation = 0;

    let velX = 0.8;
    let velY = 0.8;
    let rotationVel = 1;

    const MAX_VEL_MOV = 1.5;
    const MIN_VEL_MOV = 0.4;
    const MAX_VEL_ROT = 1;
    const MIN_VEL_ROT = 0.5;

    function update() {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const itemWidth = item.offsetWidth;
      const itemHeight = item.offsetHeight;

      posX += velX;
      posY += velY;
      rotation += rotationVel;

      if (posX + itemWidth >= containerWidth || posX <= 0) {
        velX = -velX * (0.6 + Math.random() * 0.4);
        velX = Math.max(Math.min(velX, MAX_VEL_MOV), -MAX_VEL_MOV);
        if (Math.abs(velX) < MIN_VEL_MOV) velX = Math.sign(velX) * MIN_VEL_MOV;

        rotationVel =
          (Math.random() > 0.5 ? 1 : -1) *
          (Math.random() * (MAX_VEL_ROT - MIN_VEL_ROT) + MIN_VEL_ROT);

        posX = posX <= 0 ? 0 : containerWidth - itemWidth;
      }

      if (posY + itemHeight >= containerHeight || posY <= 0) {
        velY = -velY * (0.6 + Math.random() * 0.4);
        velY = Math.max(Math.min(velY, MAX_VEL_MOV), -MAX_VEL_MOV);
        if (Math.abs(velY) < MIN_VEL_MOV) velY = Math.sign(velY) * MIN_VEL_MOV;

        rotationVel =
          (Math.random() > 0.5 ? 1 : -1) *
          (Math.random() * (MAX_VEL_ROT - MIN_VEL_ROT) + MIN_VEL_ROT);

        posY = posY <= 0 ? 0 : containerHeight - itemHeight;
      }

      item.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`;
      requestAnimationFrame(update);
    }
    update();
  }
});

/**
 * Función para mover los slides del carrusel.
 * Se define fuera del DOMContentLoaded para que sea accesible desde el 'onclick' del HTML.
 */
function moveSlide(direction, btn) {
  const container =
    btn.closest(".carrusel-container") || btn.closest(".project-card");
  if (!container) return;

  const slides = container.querySelectorAll(".carrusel-slide");
  if (slides.length === 0) return;

  let currentIndex = Array.from(slides).findIndex((slide) =>
    slide.classList.contains("active")
  );

  // Si por alguna razón no hay ninguna activa, activamos la primera
  if (currentIndex === -1) currentIndex = 0;

  slides[currentIndex].classList.remove("active");

  currentIndex += direction;
  if (currentIndex >= slides.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = slides.length - 1;

  slides[currentIndex].classList.add("active");
}
