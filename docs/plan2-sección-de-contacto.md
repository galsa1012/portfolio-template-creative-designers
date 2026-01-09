creame un plan para poner los logotipos de estas apps, ara que al hacer scroll aparezcan los nombres y cambie el color

- Plan de Implementación: Sección de Contacto Interactiva
  Este apartado detalla el proceso de creación de la sección de contacto, priorizando la ligereza técnica, la escalabilidad visual y la experiencia de usuario (UX).

1. Análisis y Selección de Tecnología  
   Para los iconos de las redes sociales, se evaluaron tres opciones: PNG, Icon Fonts y SVG.

Decisión: Se seleccionó SVG (Scalable Vector Graphics) en línea.

Justificación: \* Calidad: Al ser vectores, mantienen la nitidez en cualquier resolución (pantallas Retina/4K).

Rendimiento: El código se incluye directamente en el HTML, ahorrando peticiones HTTP al servidor.

Control: Permite manipular colores y animaciones directamente desde CSS mediante la propiedad currentColor.

2. Estructura Semántica (HTML)
   Se diseñó una estructura donde cada icono es un enlace independiente. Se añadió una etiqueta <span> con la clase .tooltip para mejorar la comunicación visual.

HTML

<div class="social-links">
  <a href="#" target="_blank" aria-label="LinkedIn">
    <svg>...</svg> 
    <span class="tooltip">LinkedIn</span>
  </a>
</div>
3. Arquitectura de Estilos (CSS)
El objetivo fue crear una interfaz minimalista que solo muestre información textual bajo demanda del usuario.

A. Posicionamiento Relativo/Absoluto
Se aplicó position: relative a los enlaces (<a>) para que actúen como contenedores de referencia. Esto permite que el .tooltip (con position: absolute) se posicione exactamente debajo de cada icono, independientemente del tamaño de la pantalla.

B. Micro-interacciones y Feedback Visual
Para mejorar la experiencia de usuario, se implementaron dos estados:

Estado Inicial: Los iconos tienen un color neutro y el texto tiene opacity: 0.

Estado Hover: \* El icono cambia a negro (#000) para indicar que es interactivo.

Se aplica una transformación de movimiento (translateY(-5px)) para dar sensación de relieve.

El texto aparece mediante una transición suave de opacidad y posición.

CSS

/_ Ejemplo del motor de la animación _/
.social-links a:hover svg {
color: #000;
transform: translateY(-5px); /_ Desplazamiento vertical _/
}

.social-links a:hover .tooltip {
opacity: 1; /_ Aparición gradual _/
bottom: -20px; /_ Sincronización del movimiento con el icono _/
} 4. Conclusión del Proceso
El resultado es una sección de contacto que cumple con los estándares modernos: accesible, ligera y con una estética cuidada que no distrae del contenido principal del portfolio (ilustración y diseño), pero que demuestra habilidades técnicas en desarrollo Frontend.
