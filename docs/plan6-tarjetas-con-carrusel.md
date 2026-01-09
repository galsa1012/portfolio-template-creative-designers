Creame un plan de desarrollo para crear unas tarjetas con un carrusel de imagenes en el interior donde puedas pasar de imagenes y al hacer scroll te aparezcan las flechas para pasar de imagenes y el txto con scroll dentro de la tarjeta.

Este es el plan detallado de la arquitectura de tu portafolio. Está dividido en tres pilares: la estructura visual (Grid), el componente interactivo (Carrusel) y la experiencia de usuario (Scroll).

Paso 1: La Estructura del Contenedor (Layout Horizontal)
El objetivo es que la página no baje, sino que se extienda infinitamente hacia la derecha.

El Wrapper (#horizontal-wrapper): Se configura con display: flex y flex-wrap: nowrap. Esto obliga a todas las secciones de categorías a ponerse una al lado de la otra en una sola línea.

La Sección (.category-section): Usamos flex: 0 0 auto. Al no tener un ancho fijo bloqueado, la sección puede ensancharse tanto como necesite su contenido interno (el Grid).

Paso 2: El Grid de Dos Filas (Distribución de Tarjetas)
Aquí es donde organizamos las tarjetas en dos niveles (arriba y abajo) centrados en la pantalla.

grid-template-rows: repeat(2, 400px): Definimos que siempre existan dos filas con una altura fija (en este caso 400px).

grid-auto-flow: column: Es la pieza clave. Por defecto, CSS Grid llena las filas hacia abajo. Con este comando, le decimos que llene la primera columna (arriba y abajo) y luego salte a crear una nueva columna a la derecha.

gap: 50px 30px: Controlamos el aire. El primer número separa la fila superior de la inferior, y el segundo separa las tarjetas lateralmente.

justify-content: center: Aplicado en la sección padre, hace que este bloque de dos filas flote justo en el medio del alto de la pantalla.

Paso 3: La Tarjeta con Carrusel (Componente Multimedia)
Cada tarjeta es un contenedor independiente que guarda varias capas.

Capas de Imagen (.carrusel-slide): Todas las imágenes están en el mismo sitio (position: absolute). Jugamos con la opacity. La que tiene la clase .active tiene opacidad 1, las demás 0.

Botones Invisibles (.carrusel-btn): Están posicionados sobre la imagen pero con opacity: 0. Solo aparecen cuando el usuario hace hover sobre la tarjeta. Se les quita el fondo y el borde para que solo se vea la flecha pura.

Efecto Visual: Al hacer hover, aplicamos un blur(2px) a las imágenes para que el texto que aparece encima sea legible.

Paso 4: Contenido Dinámico y Scroll Interior
Queremos mostrar información detallada sin que la tarjeta ocupe toda la pantalla.

El Contenedor de Texto (.project-content): Aparece desde abajo con una transición de translateY y un degradado negro (linear-gradient) para asegurar que el texto blanco se lea sobre cualquier foto.

Scroll Independiente (.project-description):

Le damos una height fija (ej. 80px).

Activamos overflow-y: auto.

overscroll-behavior: contain: Esta es la propiedad más importante. Evita que, al llegar al final del texto, el scroll "se escape" y empiece a mover la página entera.

Paso 5: Inteligencia con JavaScript (El Motor)
El código JS actúa como un director de orquesta para resolver conflictos de movimiento.

Conversión de Scroll: Detecta la rueda del ratón (wheel). Si el usuario mueve la rueda hacia abajo, el JS lo traduce en movimiento hacia la derecha (scrollLeft).

Detección de "Zona de Texto": Antes de mover la página, el JS pregunta: ¿El ratón está sobre la descripción?. Si es así, y el texto tiene scroll, el JS se detiene y permite que el usuario lea el texto. Si el ratón sale del texto, el JS vuelve a mover la página lateralmente.

Gestión de Carruseles: Mediante un forEach, el código busca los botones prev y next de cada tarjeta por separado, permitiendo que cada proyecto cambie de foto sin afectar a los demás.
