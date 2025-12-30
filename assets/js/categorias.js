document.addEventListener("DOMContentLoaded"),
  () => {
    const wrapper = document.querySelector("#horizontal-wrapper");
  };
if (wrapper) {
  console.log("Archivo categorias.js cargado y contenedor encontrado.");
}
window.addEventListener(
  "wheel",
  (e) => {
    const container = document.getElementById("horizontal-wrapper");
    if (container) {
      // Si el usuario mueve la rueda arriba/abajo, movemos el contenedor izquierda/derecha
      container.scrollLeft += e.deltaY * 1.2;
      // Solo bloqueamos el scroll si hay movimiento
      if (e.deltaY !== 0) e.preventDefault();
    }
  },
  { passive: false }
);
