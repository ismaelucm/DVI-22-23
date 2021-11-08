---
title: Eventos y temporizadores
---


# Eventos


---

Parte de la ejecución de Phaser está dirigida por **eventos**

Un evento es un aviso de que algo ha ocurrido

Creamos **callbacks** o funciones que se ejecutarán en respuesta a estos eventos

---

## Algunos eventos en Phaser

- Input: Teclado (`'down'`{.js}, `'up'`{.js}...), ratón (`'pointerdown'`{.js}, `'wheel'`{.js}...)
- Física en Arcade: `'collider'`{.js}, `'overlap'`{.js}...
- Física en Matter: `'collisionstart'`{.js}, `'collisionend'`{.js} 
- Animaciones de sprites: `'animationrepeat'`{.js}, `'animationcomplete'`{.js}...
- Sonido: `'stop'`{.js}...

---

Pero hay muchos más eventos en Phaser: [Mirar en Events](https://newdocs.phaser.io/docs/3.55.2/events)

---

## Suscripción a eventos

Para responder a estos eventos nos tenemos que **suscribir** a ellos, es decir, debemos indicar qué funciones queremos que se ejecuten cuando se produzcan estos eventos.

---

En ocasiones, no somos conscientes de esta suscripción:

- `init`, `create`, `update`... son las funciones que se ejecutarán en respuesta a los eventos del mismo nombre en la escena.
- `add.collider` o `add.overlap` (al usar el motor de física de Arcade) tienen como parámetro el callback que se ejecutará en respuesta a los eventos de `collide` y `overlap`

---

En otras ocasiones, nos suscribimos mediante las funciones `on` (y nos desenganchamos usando `off`) y `once` (solo escuchamos una vez el evento):

```js
// cuando se inicia la colisión
this.matter.world.on('collisionstart', 
    (evento, cuerpo1, cuerpo2) => {
    // hacer algo
});
// Suscripción a sonidos
this.explosion = scene.sound.add("explosion", config);
this.explosion.once("stop", (music) => {
    // ...
});
```

---

En general, la suscripción se hace **una sola vez**, generalmente en el `create` de las escenas o en el constructor de los Gameobjects.

> ¡Cuidado con suscripciones en el `update` (se añade una función nueva a la que llamar en cada tick)!

---

## Eventos propios

Podemos crear nuestros propios eventos y suscribirnos a ellos:

```js
// En el create de Scene 
this.events.on('playerdead', gameOver);
...
// En otro punto de nuestro juego (this es la escena)
this.events.emit('playerdead');

function gameOver() {
    // Fin de la partida
    // Se ejecuta cuando el jugador haya muerto
}
```

--- 

Podemos enviar parámetros al emitir un evento:

```js

// enviamos las coordenadas en las que murió el jugador
this.events.emit('playerdead', this.player.x, this.player.y);

function gameOver(x, y) {
    // Fin de la partida
    // Se ejecuta cuando el jugador haya muerto
    // Recibimos las coordenadas del jugador
}
```


# Temporizadores

---

Para hacer que una acción se produzca pasado un cierto tiempo usamos los [temporizadores (o relojes) de Phaser](https://newdocs.phaser.io/docs/3.55.2/Phaser.Time.Clock)

Crearemos un evento que se ejecute pasado un tiempo y nos suscribiremos a él

> ¡Cuidado, no usar los métodos del navegador `setTimeout` y `setInterval`!

---

Para una acción diferida que se ejecuta una vez:

```js
/// this es Scene
let timer = this.time.addEvent( {
        delay: 2000, 
        callback: onEvent,
        callbackScope: this 
});

onEvent() {
    // ejecuta algo dentro de 2000ms (2s)
}

```

---

Para una acción que se repite en el tiempo:

```js
// this es Scene
let timer = this.time.addEvent( {
        delay: 2000, 
        callback: onEvent,
        callbackScope: this,
        loop: true
});

onEvent() {
    // ejecuta esto cada 2000ms (2s)
}

// Para dejar de usarlo
this.time.removeEvent(timer);
```

---

Los temporizadores se pueden detener, cambiar la escala de tiempo...

[Estudiad su API](https://newdocs.phaser.io/docs/3.55.2/Phaser.Time.Clock)






