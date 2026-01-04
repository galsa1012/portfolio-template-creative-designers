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
