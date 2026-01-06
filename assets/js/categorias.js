document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector("#horizontal-wrapper");

  if (wrapper) {
    console.log("Motor de scroll horizontal activo.");

    // Escuchamos el evento de la rueda del ratón
    window.addEventListener(
      "wheel",
      (e) => {
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
          console.log("Moviendo scroll:", wrapper.scrollLeft);
        }
      },
      { passive: false }
    ); // 'passive: false' es obligatorio para usar preventDefault()
  } else {
    console.error("No se encontró el contenedor #horizontal-wrapper");
  }
});

function moveSlide(direction, btn) {
  // Buscamos el contenedor del carrusel donde se hizo clic
  const container = btn.closest(".carrusel-container");
  const slides = container.querySelectorAll(".carrusel-slide");

  // Encontrar el índice de la imagen que tiene la clase 'active'
  let currentIndex = Array.from(slides).findIndex((slide) =>
    slide.classList.contains("active")
  );

  // Quitar clase activa a la actual
  slides[currentIndex].classList.remove("active");

  // Calcular nuevo índice (bucle infinito)
  currentIndex += direction;
  if (currentIndex >= slides.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = slides.length - 1;

  // Añadir clase activa a la nueva imagen
  slides[currentIndex].classList.add("active");
}

// Animación de SVG rebotando y rotando dentro del contenedor
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("nav-container");
  const item = document.getElementById("svg-animado");

  if (!container || !item) return;

  let posX = Math.random() * 50;
  let posY = Math.random() * 50;
  let rotation = 0; // Ángulo inicial

  // Velocidades de movimiento (lentas)
  let velX = 0.8;
  let velY = 0.8;
  // Velocidad de rotación inicial
  let rotationVel = 1;

  const MAX_VEL_MOV = 1.5;
  const MIN_VEL_MOV = 0.4;
  const MAX_VEL_ROT = 1; // Límite de qué tan rápido puede girar
  const MIN_VEL_ROT = 0.5; // Para que no deje de girar del todo

  function update() {
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const itemWidth = item.offsetWidth;
    const itemHeight = item.offsetHeight;

    posX += velX;
    posY += velY;
    rotation += rotationVel; // El icono gira constantemente

    // Rebote Horizontal + Cambio Rotación
    if (posX + itemWidth >= containerWidth || posX <= 0) {
      velX = -velX * (0.6 + Math.random() * 0.4);
      velX = Math.max(Math.min(velX, MAX_VEL_MOV), -MAX_VEL_MOV);
      if (Math.abs(velX) < MIN_VEL_MOV) velX = Math.sign(velX) * MIN_VEL_MOV;

      // CAMBIO DE ROTACIÓN AL CHOCAR
      rotationVel =
        (Math.random() > 0.5 ? 1 : -1) *
        (Math.random() * (MAX_VEL_ROT - MIN_VEL_ROT) + MIN_VEL_ROT);

      posX = posX <= 0 ? 0 : containerWidth - itemWidth;
    }

    // Rebote Vertical + Cambio Rotación
    if (posY + itemHeight >= containerHeight || posY <= 0) {
      velY = -velY * (0.6 + Math.random() * 0.4);
      velY = Math.max(Math.min(velY, MAX_VEL_MOV), -MAX_VEL_MOV);
      if (Math.abs(velY) < MIN_VEL_MOV) velY = Math.sign(velY) * MIN_VEL_MOV;

      // CAMBIO DE ROTACIÓN AL CHOCAR
      rotationVel =
        (Math.random() > 0.5 ? 1 : -1) *
        (Math.random() * (MAX_VEL_ROT - MIN_VEL_ROT) + MIN_VEL_ROT);

      posY = posY <= 0 ? 0 : containerHeight - itemHeight;
    }

    // IMPORTANTE: Aplicamos translate y rotate juntos
    item.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`;

    requestAnimationFrame(update);
  }

  update();
});
