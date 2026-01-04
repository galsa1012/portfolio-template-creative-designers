No he sido capaz de implementar el scroll horizontal en el html de los trabajos específicos de grado, estuve varios dias, casi una semana intentando hacer que funcionase el scroll horizontal, horas y horas cada día, hubo un punto en el que conseguí que funcionase pulsando el shift, pero luego metí las tarjetas de los trabajos en lel body y dejó de funcionar, asi qué al final acabé desistiendo ya que se me venía la entrega encima, lo que acabé haciendo fue implementar las fotografías de ejemplo y textos en las tarjetas para dar a entender como quedaría esa parte del portfolio web. Finalmente no se cómo la verdad, he conseguido que funcione el scroll.

Memoria Técnica: Implementación de Scroll Horizontal Adaptativo
El objetivo era transformar un flujo de lectura vertical estándar en una experiencia de galería horizontal (tipo "tira de película") donde el usuario avanza lateralmente usando la rueda del ratón.

1. La Estructura (HTML)
   El secreto aquí es el encapsulamiento total. Para que el scroll sea continuo, todos los elementos deben vivir dentro de un único "contenedor maestro".

Contenedor #horizontal-wrapper: Actúa como la "cinta" sobre la que se pegan las fotos.

Elementos hijos (.project-card): Son las piezas que se desplazan.

Sección de Contacto: Se integra como la última pieza de la tira, asegurando que el usuario llegue a ella tras recorrer todos los proyectos.

2. El Motor Visual (CSS)
   Para romper el comportamiento natural de la web (que apila cosas una debajo de otra), usamos Flexbox.

CSS

#horizontal-wrapper {
display: flex; /_ Alinea los hijos en fila _/
flex-wrap: nowrap; /_ Obliga a que NADA baje a la siguiente línea _/
width: 100vw; /_ El contenedor ocupa el ancho de la pantalla _/
height: 100vh; /_ Y el alto total _/
overflow-x: auto; /_ Permite el desbordamiento horizontal _/
overflow-y: hidden; /_ Bloquea el scroll vertical sobrante _/
}

.project-card {
flex: 0 0 400px; /_ Evita que las tarjetas se "encojan" para caber _/
} 3. La Interacción (JavaScript)
Dado que los ratones convencionales solo emiten señales verticales (deltaY) al mover la rueda, necesitamos un "traductor" que convierta ese movimiento en desplazamiento horizontal (scrollLeft).

El código explicado:

Captura el evento wheel: Detecta cuándo el usuario mueve la rueda.

e.preventDefault(): Anula cualquier intento del navegador de mover la página hacia arriba o abajo.

Redirección de fuerza: Toma el valor de deltaY (fuerza de la rueda) y se lo suma a la posición horizontal del contenedor.

JavaScript

window.addEventListener("wheel", (e) => {
if (e.deltaY !== 0) {
e.preventDefault(); // Detiene el scroll vertical
wrapper.scrollLeft += e.deltaY; // Mueve el contenedor a los lados
}
}, { passive: false });
Resumen de los intentos de ajuste
Durante el desarrollo, intentamos resolver los siguientes conflictos:

Conflicto de Grid: Tenías un estilo display: grid que chocaba con el flex necesario para el scroll horizontal. Intentamos unificarlo a Flexbox.

Cierre de etiquetas: Las tarjetas del final se quedaban fuera del contenedor principal, por lo que el JavaScript no las detectaba. Se movieron dentro del main.

Padding de la Nav: Al tener una barra lateral fija (position: fixed), tuvimos que añadir un padding-left al contenedor para que la primera tarjeta no quedara tapada por el menú.
