---
title: Creación de páginas web
---


# ¿Por qué?

---

Si queréis publicar juegos en la web, _necesitáis_ saber cómo funciona un navegador, y cómo funciona la web

---

## ¿Por qué conocer tecnologías web?

- Como poco, vuestro juego deberá estar contenido en una página web (HTML), que tendrá cierta apariencia (CSS)
- Es útil para implementar cosas como un botón de fullscreen, o una splash screen, o usar fuentes custom en vuestros juegos
- Si tenéis un bug, necesitáis conocimientos de APIs Web para poder depurar con éxito (la API de Gamepad, o WebGL)
- Si queréis modificar el engine o framework para añadir features o arreglar un bug

# Navegadores

## Navegadores

- Son programas que permiten acceder a la Web
- ¡No todos los navegadores son iguales!
    - No todos incluyen el mismo motor de renderizado: Gecko (Firefox), Blink (Chrome, Opera), WebKit (Apple Safari)
    - No todos incluyen la misma VM de JavaScript: SpiderMonkey (Firefox), V8 (Chrome), JavascriptCore (Apple Safari)

## Muchos, y con particularidades

- Hay consideraciones técnicas a tener en cuenta, tanto a nivel de interfaz como de seguridad
- ¡Herramientas de desarrollo! depurador, profiler, network requests, etc

## ¿Cómo detectar qué soporta cada navegador?

- [caniuse.com](http://caniuse.com), rápida e intuitiva
- [MDN](http://developer.mozilla.org), tiene detalles concretos sobre la implementación y diferencias entre navegadores

# Documentos web e Internet

## Una página web no tiene por qué estar en Internet

El navegador entiende HTML, CSS y JS, es decir, es como un visor de PDF

Se pueden crear y abrir en local documentos HTML

![Chrome y Firefox, al abrir un documento local](./navegador-fichero.png)

---

## El navegador es un visor que se conecta

**Además** de mostrar documentos web y ejecutar JS, es capaz de que le pidamos HTMLs, JSs y CSSs que están en Internet

Se conecta con otro ordenador, le pide archivos, se los descarga, y los muestra

De hecho, se los puede descargar a un directorio local

---

![Chrome y Firefox, al conectarse a un servidor](./navegador-servidor.png)

# Redes y protocolos

## Una red son ordenadores conectados entre sí

Y nada más. Internet es una red más, en la que muchos ordenadores de todo el mundo están conectados

## Internet no es la web

Internet en la gran conexión mundial de ordenadores

La web es el conjunto de páginas

VoIP, servicios de streaming, juegos online... Todo eso también es Internet, pero no es *la web*

## Servidores

Un servidor es sólo un ordenador conectado a la red que tiene un programa que escucha y da algún servicio

También se llama servidor al programa que da dicho servicio en la red

No tienen necesariamente un hardware especial

## Un protocolo es una manera de comunicar dos ordenadores

Es decir, un lenguaje común que ambos extremos conocen

La información (archivos, vídeos...) se distribuye usando *protocolos*

## Hypertext Transfer Protocol

Más conocido como HTTP

Es el protocolo que se usa en la web

Muy simple, sin estado:

- CLIENTE: "quiero ver que tienes"
- SERVIDOR: "toma estos **archivos**"

## Servidor web

Es sólo un programa:

- Conectado a una red
- Que entiende y habla HTTP
- Que, cuando se le pide una página, devuelve archivos de la web

[Por extensión, llamamos servidor tanto a la máquina como al programa]{.fragment}

## Servidor local

Como un servidor web es sólo un programa, puedo **ejecutarlo en mi ordenador** y **conectarme a él en local**

Porque TCP (el "sistema" que usa Internet) permite conectarme a mi propia máquina con la *dirección local*:

- `localhost`
- `127.0.0.1`

(En realidad es más complejo que esto)

# ¿Qué pasa cuando accedéis a una web en un navegador?

## 1. Petición HTTP GET a un servidor

![Petición HTTP GET](request_dance_step1.png)

Se hace un HTTP GET a una URL, y si el recurso existe (y no está cacheado), el servidor lo retorna

## 2. Descarga de archivos

![Descarga de archivos](request_dance_step2.png)

Los archivos HTML pueden hacer referencia a otros recursos... que el navegador deberá pedir al servidor

Mientras tanto, se va renderizando el HTML descargado

## 3. Carga finalizada

Cuando todas las imágenes, scripts, CSS, etc. se han cargado, se dispara el **evento `load`** de `window` (lo veremos más tarde)


## Los 3 lenguajes de la web

- Documento y estructura: *HTML*
- Apariencia: *CSS*
- Lógica: *JavaScript*

# HTML

## Hypertext Markup Language

- Representa el **contenido** de una página: párrafos, títulos, imágenes, vídeos, elementos de canvas, etc

- Es un lenguaje de **marcado (no de programación)** basado en etiquetas:

```html
<h1>Esto es un título</h1>
```

## HTML es un lenguaje de *marcado*

Es decir, *no se puede programar sólo con HTML*

## Documentos HTML

Una página HTML es un archivo de *texto plano* que contiene la descripción de un documento

## Ejemplo de página web

```html
<!DOCTYPE html> <!-- establece el tipo de HTML -->
<html lang="es"> <!-- abre la página -->
<head> <!-- `head` son los datos del documento -->
  <meta charset="UTF-8">
  <title>Título</title>
</head>
<body> <!-- cuerpo del documento, lo que se ve -->
  Contenido
</body>
</html> <!-- cierra la página -->
```

## La estructura se hace con *etiquetas*

Las etiquetas se definen entre ángulos: `<etiqueta>`{.html}

---

(Casi) todas las etiquetas se abren y cierran, y afectan al contenido encerrado:

```html
<strong>texto con fuerza</strong>
```

---

Se pueden anidar:

```html
<strong>texto con fuerza y <em>énfasis</em>, hay de todo</strong>
```

## Comentarios

Se encierran en `<!-- ... -->`{.html}


# CSS


## Al principio, no había separación

HTML permite establecer las propiedades de apariencia de los elementos

```html
<h1 style="color: red;">Título en color rojo</h1>
...
<h1 style="color: red;">Otro título en color rojo</h1>
```

Pero esto significaba tener que cambiar los colores a todos los botones, párrafos, títulos...

Era difícil mantener una estética correcta

## Cascade Style Sheets

CSS se creó para establecer la apariencia de los elementos de forma unificada, en un sólo conjunto de archivos

Una hoja de estilos es un archivo de texto que contiene, para cada tipo de elemento, la apariencia apropiada

---


- Nos permite personalizar la **apariencia** de los elementos HTML: colores, fondos, bordes, posición, columnas, tamaños..

- Es un lenguage **declarativo** basado en reglas:

```css
h1 {
  color: red;
}
```

# JavaScript

---

Sirve para dotar de lógica a un documento

Un archivo HTML es un documento, *no un programa* (como un PDF o un archivo de Word)

En un momento concreto de la historia de los navegadores, se incluyó la posibilidad de crear lógica con JavaScript

---

- Nos permite implementar **comportamiento** y **lógica**

- Es un **lenguaje dinámico** orientado a prototipos, con características funcionales

```javascript
console.log("Hello, world!");
```

---

## Ejemplo HTML, CSS y JS

([En](ejemplo.html) [archivos](ejemplo.css) [externos](ejemplo.js))


# Cómo incluir JavaScript en una web


## Estructura básica de un documento HTML

```html
<!doctype html>
<html>
  <!-- el head es metadata -->
  <head>
    <title>Cancamusa</title>
    <meta charset="utf-8">
  </head>
  <!-- el body es contenido -->
  <body>
    <h1>Monkey Island</h1>
    <p>Mira detrás de ti, ¡un mono de tres cabezas!</p>
  </body>
</html>
```


## ¿Dónde va el código JavaScript?

- Podemos incluir JavaScript tanto en el `<head>` como en el `<body>`
- Pero tened en cuenta el flujo de carga de una web
    - En el `<head>` se iniciará la carga antes que el resto de recursos... pero bloqueará el renderizado mientras se ejecuta
    - Al final de `<body>` permitirá que se renderice la web... pero tardará más en ejecutarse

<small>Esto es una simplificación, info más completa en [este artículo de Jake Archibald](https://www.html5rocks.com/en/tutorials/speed/script-loading/)</small>


## Scripts inline

Podemos incluir código JavaScript inline en el HTML con la etiqueta `<script>`

```html
<script>
    console.log("Hello, world!");
</script>
```


## Scripts externos

Podemos incluir archivos JavaScript con la etiqueta `<script>` también:

```html
<script src="js/game.js"></script>
```



# Cómo se ejecuta JavaScript


## Modelo asíncrono

- Mientras JavaScript se está ejecutando, **bloquea todo lo demás** (incluida la UI)
- La manera de programar JavaScript en la Web es **subscribiéndonos a eventos** (o usando **callbacks**) y ejecutando código sólo cuando esos eventos se disparan
- Si los eventos no se disparan, o los callbacks no se llaman, no se ejecuta código


## Un solo hilo

- Los callbacks de los eventos se ejecutan **de uno en uno**
- Los callbacks se ejecutan inmediatamente cuando el evento se dispara (el resto del código espera su finalización)

## Ejemplo: Final de carga de una página

Cuando todas las imágenes, scripts, CSS, etc. se han cargado, se dispara el **evento `load`** de `window`

Es muy común incluir el código que inicializa la ejecución del programa en el _handler_ de ese evento

```javascript
window.onload = function () {
  // hello world
};
```

## Ejemplo: Callback para un botón

```javascript
// Handler o función que se ejecutará 
// en respuesta a un evento
button.onclick = function (evt) {
    console.log("Click");
}

// ..
// Disparo el evento (similar a que el usuario
// hubiese pulsado el botón)
button.click();
// el botón no se desactiva hasta que el handler de "click"
// haya acabado de ejecutarse
button.disabled = true;
```

<small>[Snippet de código](https://jsfiddle.net/1wqevdob/)</small>


