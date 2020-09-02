---
title: Servidor de red
---


# Implementación de un servidor para juegos en navegador

---

El servidor será un programa en `node.js` que estará ejecutándose siempre

No podrá estar alojado en GitHub, ya que no es una página web, sino un programa

---

Podemos alojarlo en un ordenador nuestro, o en algún servicio de alojamiento ([Heroku](https://www.heroku.com/), [Red Hat OpenShift](https://www.openshift.com/))

---

Para probar en local, lo ejecutamos en nuestro ordenador

Podemos detener el servidor **con `Ctrl-C`**

---

En la Facultad podemos ver la IP con:

```
ipconfig /all
```

Será **147.96.xxx.xxx**












# WebSockets

---

*WebSockets* es un estándar de comunicación sobre *TCP* para navegadores

<small>Aunque puede ser usado por cualquier programa</small>

---

No es la única manera de comunicarse con un navegador, hay varias

---

Dejaremos que una librería decida cuál es la mejor manera de comunicarse...

















# `socket.io`

---

Usaremos `socket.io`, una librería de JavaScript para red

---

Tanto el servidor como el cliente estarán accesibles a través de `socket.io`, con lo que no usaremos GitHub para servir la página

---

## Servidor HTTP

Lo primero que tendremos es un servidor HTTP que nos habilitará el protocolo básico

---

## Servidor de aplicaciones

También crearemos un servidor de aplicaciones web

Esto no es más que una capa por encima de HTTP para gestionar mejor las URLs y lo que devuelven

---

## Servidor de conexión

Por último, tendremos el servidor del juego en sí

---

Pero todo esto son sólo 3 líneas de código =)












# Desplegando el servidor

---

Tenemos que usar `node.js`, y su gestor de paquetes (`npm`), que se encargará de instalar todo

---

Los proyectos (la información de paquetes y versiones) se guarda en `package.json`, que debería estar en el repositorio de versiones

---

`npm` gestiona `package.json` por nosotros

---

## Iniciar el proyecto

```bash
npm init # Pregunta datos y crea `package.json`
npm install --save express socket.io # Instala las librerías necesarias y lo añade a `package.json`
```

`npm install` instala el paquete, y `--save` hace que se guarde la información en `package.json`

---

En `node.js` importamos los módulos/paquetes con `require`{.js} en vez de hacerlo con `import`{.js}

---

El código de nuestro servidor estará en un archivo JavaScript para `node.js` (**no para el navegador**)

---

En ese archivo (`server.js`, por ejemplo), primero tenemos que usar algunos módulos que hemos instalado con `npm`:

```js
const app = require('express')(); // servidor de aplicaciones
const http = require('http').createServer(app); // servidor HTTP
const io = require('socket.io')(http); // Importamos `socket.io`
```

---

Después, creamos un par de variables (esto es opcional):

```js
const port = 3000; // El puerto
var clients = [];
```

---

Luego le decimos al servidor que cuando accedan por HTTP, les devuelva la página web del cliente:

```js
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client.html');
});
```

<small>Así, al acceder a la IP/URL, veremos directamente el juego</small>

---

Con sólo este código, ya podemos centrarnos en la lógica del servidor de juego

---

## Responder a mensajes

`socket.io` tiene, en el objeto `io`{.js}, un método para reaccionar antes solicitudes de conexión de un cliente:

```js
io.on('connection', socket => {
  console.log('a user connected');
  clients.push(socket); // metemos el socket en el array
```

---

*Dentro del callback de `on()`{.js}*, tenemos ahora la variable `socket`{.js} que nos ha llegado como parámetro

---

Con la variable `socket`{.js} vamos a reaccionar a diferentes eventos

---

Por ejemplo, cuando un cliente se desconecta:

```js
  socket.on('disconnect', () => {
    console.log('a user disconnected');
    clients.splice(clients.indexOf(socket), 1); // lo sacamos del array
  });
```

---

O cuando nos envían el mensaje `'precios'`{.js}, con los datos en el objeto `mensaje`{.js}

```js
  socket.on('precios', mensaje => {
    let lista = 
        mensaje === 'armas' ?
           {espada: 400, escudo: 200} :
           {naranja: 10, limon: 15};
        
    // para enviar algo, usamos `emit`
    // que tiene un nombre de mensaje,
    // y un objeto
    socket.emit('respuesta', lista);
  });
});
```

---

Como vemos, para enviar mensajes por un `socket`{.js} necesitamos el método `emit()`{.js}, con 2 parámetros:

- Un `string`{.js} con el tipo de mensaje
- Un objeto JavaScript con todo lo que queramos mandar

---

## Arrancando el servidor realmente

Ahora, para cerrar el archivo, creamos el servidor web que estará escuchando en el puerto que hayamos elegido:

```js
// Creación del servidor en sí (por HTTP)
http.listen(port, () => {
  console.log('Servidor escuchando en el puerto', port);
});
```

---

## Ejecutar el servidor

Y, dentro de la carpeta inicializada con el proyecto y el archivo `package.json`:

```bash
node server.js
```

---

## Servir contenido extra

Para servir archivos que estén en una carpeta (assets, hojas de estilo): `app.use(express.static(__dirname + '/public'))`{.js}

