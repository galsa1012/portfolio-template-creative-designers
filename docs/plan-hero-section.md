Explicación Técnica del Hero

1. El Contenedor de doble columna (CSS Flexbox)
   Para lograr que la ilustración esté a la izquierda y el texto a la derecha, convertimos el contenedor en una "caja flexible".

CSS

.hero-layout {
display: flex; /_ Activa el modo de dos columnas _/
align-items: center; /_ Centra verticalmente el dibujo con el texto _/
gap: 40px; /_ Crea el "aire" o espacio entre ambas partes _/
}
.hero-illustration: Tiene un flex: 1, lo que significa que ocupa la mitad del espacio disponible para tu dibujo.

.hero-content: También tiene flex: 1, ocupando la otra mitad para tu información.

2. El Espacio para el SVG (Ilustración)
   Hemos preparado el hueco para que el SVG de Illustrator sea fluido.

CSS

.hero-illustration svg {
width: 100%; /_ El dibujo se estira hasta llenar su columna _/
height: auto; /_ Mantiene las proporciones para no deformarse _/
max-width: 500px; /_ Evita que en pantallas enormes el dibujo sea gigante _/
}
Nota técnica: Al usar SVG en lugar de PNG, la web cargará más rápido y tu dibujo se verá perfecto (sin píxeles) en cualquier pantalla.

3. Estructura del Título (El nombre "ALONSO")
   Aquí aplicamos diseño editorial mediante HTML y CSS para que el nombre tenga fuerza visual.

<br> (Salto de línea): Lo usamos para forzar que los apellidos bajen, creando un diseño en bloque que es más fácil de equilibrar con un dibujo al lado.

white-space: nowrap: Esta es la regla "mágica" que añadimos a los apellidos. Impide que el navegador separe "Gallego" de "Sánchez" aunque el espacio sea estrecho. Los mantiene como una unidad.

4. Control de Espacios y Proximidad
   Para que el subtítulo ("Front-End Designer...") no quedara muy lejos del nombre, ajustamos los márgenes:

CSS

.hero-title {
margin-bottom: 5px; /_ Reducimos el espacio de abajo del título _/
line-height: 1.1; /_ Juntamos la línea de ALONSO con la de GALLEGO _/
} 5. Adaptabilidad (Responsive)
El código incluye un "Plan B" para móviles. Cuando la pantalla es pequeña, las columnas dejan de estar una al lado de la otra y se ponen una sobre otra.

CSS

@media (max-width: 768px) {
.hero-layout {
flex-direction: column; /_ Apila ilustración arriba y texto abajo _/
text-align: center; /_ Centra todo para que se vea bien en el móvil _/
}
}
