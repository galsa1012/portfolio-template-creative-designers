Creame un plan de desarrrollo para poner un svg reborando en el interior de la nav bar que cambie ligeramente su velocidad al rebotar y su rotación

1. Fase de Estructura (HTML)
   El objetivo es crear un "escenario" donde el SVG pueda moverse sin interferir con los enlaces de navegación.

HTML

<nav class="nav-vertical">
  <div class="nav-logo">GRAPHIC <span class="apellidos">DESIGN</span></div>
  
  <div class="rebote-container" id="nav-container">
    <img src="assets/iconos/yo.svg" class="svg-rebotando" id="svg-animado" alt="Avatar" />
  </div>

  <ul class="nav-links-vertical">
    <li><a href="index.html">← Home</a></li>
  </ul>
</nav>
id="nav-container": Es la caja que define los límites de los choques.

id="svg-animado": El objeto que JavaScript manipulará.

pointer-events: none (en CSS): Es vital para que el usuario pueda hacer clic en los enlaces aunque el SVG pase por encima.

2. Fase de Estilo (CSS)
   Configuramos las dimensiones y preparamos al navegador para una animación fluida.

CSS

.rebote-container {
position: absolute; /_ Se despega del flujo normal para no mover los textos _/
inset: 0; /_ Cubre toda la nav de arriba a abajo _/
z-index: 0; /_ Por detrás de los enlaces _/
pointer-events: none;
overflow: hidden; /_ Esconde el SVG si intenta salirse por un milisegundo _/
}

.svg-rebotando {
position: absolute;
width: 80px; /_ Control de tamaño principal _/
height: auto;
will-change: transform; /_ Avisa a la GPU para que la animación no de tirones _/
transform-origin: center center; /_ El eje de rotación es su propio centro _/
transition: none !important; /_ Evita conflictos entre CSS y JS _/
} 3. Fase de Lógica (JavaScript)
Aquí es donde ocurre la "magia". El script funciona como un bucle infinito que calcula la posición 60 veces por segundo.

A. Variables de Estado
Definimos la posición actual, la velocidad de avance (velX/Y) y la velocidad de giro (rotationVel).

B. Detección de Colisiones
En cada fotograma, comprobamos si los bordes del SVG han tocado los bordes del contenedor:

Si toca borde Derecho/Izquierdo: Invierte velX y cambia la rotación.

Si toca borde Superior/Inferior: Invierte velY y cambia la rotación.

C. Aleatoriedad Controlada
Para que no sea aburrido, al chocar multiplicamos la velocidad por un factor aleatorio y limitamos el resultado con MAX_VELOCIDAD.

4. Código Final Integrado (JS)
   JavaScript

document.addEventListener('DOMContentLoaded', () => {
const container = document.getElementById('nav-container');
const item = document.getElementById('svg-animado');

    if (!container || !item) return;

    // 1. Valores iniciales
    let posX = Math.random() * 50;
    let posY = Math.random() * 50;
    let rotation = 0;

    let velX = 0.8;
    let velY = 0.8;
    let rotationVel = 1;

    // 2. Límites de velocidad (Ajustables)
    const MAX_VEL_MOV = 1.5;
    const MIN_VEL_MOV = 0.4;
    const MAX_VEL_ROT = 3;

    function update() {
        // 3. Obtener dimensiones actuales (por si se redimensiona la ventana)
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const itemWidth = item.offsetWidth;
        const itemHeight = item.offsetHeight;

        // 4. Actualizar valores
        posX += velX;
        posY += velY;
        rotation += rotationVel;

        // 5. Lógica de Rebote Horizontal
        if (posX + itemWidth >= containerWidth || posX <= 0) {
            velX = -velX * (0.6 + Math.random() * 0.4); // Invertir y aleatorizar
            velX = Math.max(Math.min(velX, MAX_VEL_MOV), -MAX_VEL_MOV); // Limitar
            rotationVel = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * MAX_VEL_ROT); // Nueva rotación
            posX = posX <= 0 ? 0 : containerWidth - itemWidth; // Corregir posición
        }

        // 6. Lógica de Rebote Vertical
        if (posY + itemHeight >= containerHeight || posY <= 0) {
            velY = -velY * (0.6 + Math.random() * 0.4);
            velY = Math.max(Math.min(velY, MAX_VEL_MOV), -MAX_VEL_MOV);
            rotationVel = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * MAX_VEL_ROT);
            posY = posY <= 0 ? 0 : containerHeight - itemHeight;
        }

        // 7. Renderizado (Usamos transform para máximo rendimiento)
        item.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`;

        // 8. Siguiente fotograma
        requestAnimationFrame(update);
    }

    update();

});
