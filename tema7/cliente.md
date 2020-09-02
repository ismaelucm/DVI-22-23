---
title: Cliente de red
---

# El juego de verdad

---

El cliente estará en una página (un archivo `.html`), como siempre

---

Iniciamos una página HTML normal:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Cliente del juego</title>
</head>
<body>
```

---

El servidor que hemos creado no sólo nos sirve la página web, sino también la librería

Esto nos asegura no tener diferentes versiones entre cliente y servidor

---

Añadimos esta línea a nuestro `<body>`{.html}

```html
<script src="/socket.io/socket.io.js"></script>
```

<small>La ruta la crea automáticamente el servidor con `socket.io`, no hay que tener el archivo</small>

---

Creamos dos botones y un párrafo para la interfaz, y cogemos sus referencias para manejarlos desde JavaScript:

```html
<button id="armas">Pedir precios de armas</button>
<button id="comida">Pedir precios de comida</button>

<p id="lista"></p>

<script>
  const armas = document.getElementById("armas");
  const comida = document.getElementById("comida");
  const muestra = document.getElementById("lista");
</script>
```

---
  
Iniciamos la conexión con la dirección y el puerto (que tiene que ser el mismo que el del servidor)

```html
<script>
  const direccion = 'localhost';
  const puerto = 3000;
  const socket = io('http://' + direccion + ':' + puerto);
</script>
```

---

Es más cómodo definir el puerto *sólo en 1 sitio* (en vez de poner `const port=3000`{.js} en cliente y servidor), e importar el módulo

---

Cada botón va a enviar un mensaje del mismo tipo (`'precios'`{.js}), con un objeto adicional particular:

```html
<script>
  armas.onclick = () => socket.emit('precios', 'armas');
  comida.onclick = () => socket.emit('precios', 'comida');
</script>
```

---

Cuando llegue la lista, la mostramos en el párrafo `muestra`{.html}:

```html
  <script>
    socket.on('respuesta', lista => {
      // `JSON.stringify` convierte un JSON a string para
      // poder mostrarlo
      muestra.innerHTML = JSON.stringify(lista)
    });
  </script>
 </body>
</html>
```