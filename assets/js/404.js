window.onload = () => {
  const stage = document.getElementById("escenario-404");
  const item = document.getElementById("objeto-movil");

  if (!stage || !item) return;

  let posX = 100,
    posY = 100;
  let velX = 2,
    velY = 2;
  let rotation = 0;

  let isDragging = false;
  let lastMouseX, lastMouseY;

  // Configuración de la física
  const friction = 0.98; // Cuanto más bajo, más rápido se frena (0.98 es suave)
  const minSpeed = 2; // La velocidad constante a la que siempre volverá
  const maxLaunchSpeed = 20; // Límite para que no desaparezca de la vista

  item.addEventListener("mousedown", (e) => {
    isDragging = true;
    item.style.cursor = "grabbing";
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;
    posX += deltaX;
    posY += deltaY;
    velX = deltaX;
    velY = deltaY;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    item.style.cursor = "grab";

    // Limitamos el impulso inicial
    velX = Math.max(Math.min(velX, maxLaunchSpeed), -maxLaunchSpeed);
    velY = Math.max(Math.min(velY, maxLaunchSpeed), -maxLaunchSpeed);
  });

  function animate() {
    const sW = stage.clientWidth;
    const sH = stage.clientHeight;
    const iW = item.offsetWidth;
    const iH = item.offsetHeight;

    if (!isDragging) {
      // 1. Aplicamos fricción para reducir la velocidad del lanzamiento
      velX *= friction;
      velY *= friction;

      // 2. Si la velocidad baja del mínimo, la mantenemos constante
      // Esto asegura que nunca se pare
      if (Math.abs(velX) < minSpeed) velX = velX > 0 ? minSpeed : -minSpeed;
      if (Math.abs(velY) < minSpeed) velY = velY > 0 ? minSpeed : -minSpeed;

      posX += velX;
      posY += velY;
      rotation += velX * 0.5;

      // Rebotes
      if (posX + iW >= sW || posX <= 0) {
        velX *= -1;
        posX = posX <= 0 ? 0 : sW - iW;
      }
      if (posY + iH >= sH || posY <= 0) {
        velY *= -1;
        posY = posY <= 0 ? 0 : sH - iH;
      }
    } else {
      // Mantener dentro de límites mientras arrastras
      if (posX < 0) posX = 0;
      if (posY < 0) posY = 0;
      if (posX + iW > sW) posX = sW - iW;
      if (posY + iH > sH) posY = sH - iH;
    }

    item.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`;
    requestAnimationFrame(animate);
  }

  animate();
};
