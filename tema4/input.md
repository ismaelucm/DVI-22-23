---
title: Entrada en Phaser
---

# Teclado

---

La gestión del teclado se hace a través de [`scene.input`{.js}](https://newdocs.phaser.io/docs/3.55.2/Phaser.Input.InputPlugin)

---

Para "registrar" una tecla, y poder usarla después:

```js
// Si this es un sprite...
this.w = this.scene.input.keyboard.addKey('W');
```

---

Una vez que existe la tecla (`this.w`{.js}), podemos hacerle preguntas activamente en el `update`{.js}:

```js
// En el preUpdate...
if(this.w.isDown) {};
if(this.w.isUp) {};
```

---

O, en vez de preguntar, registramos un *callback*:

```js
// Solo una vez (no en el update)
this.w.on('down', event => { ... });
this.w.on('up', event => { ... });
```

---

Una tecla que esté pulsándose siempre (es decir, que no se suelte), dirá que `isDown`{.js} es `true`{.js} en cada ciclo

---

Para evitar esto, si sólo queremos reaccionar ante un clic:

```js
if (Phaser.Input.Keyboard.JustDown(this.w)) {}
```

---

Hay más maneras de usar las teclas, [mirad la API](https://newdocs.phaser.io/docs/3.55.2/Phaser.Input.Keyboard)



















# Cursores

---

 Usar los *arriba*, *abajo*, *izquierda* y *derecha* es tan común, que existe:

```js
// this es una scene
this.cursors = this.input.keyboard.createCursorKeys();
```

---

Con esto, se nos define un objeto con las 4 direcciones (más `space` y `shift`):

```js
// En el update de scene
if (this.cursors.up.isDown && this.body.onFloor()) {
  this.body.setVelocityY(this.jumpSpeed);
}
if (this.cursors.left.isDown) {
  this.body.setVelocityX(-this.speed);
}
else if (this.cursors.right.isDown) {
  this.body.setVelocityX(this.speed);
}
else {
  this.body.setVelocityX(0);
}
if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
  // Shoot once on keydown
} 

```

---

Si quiero usar otros cursores, es cuestión de devolver un objeto con las mismas propiedades:

```js
this.cursorsZXSpectrum = this.scene.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.Q,
    down: Phaser.Input.Keyboard.KeyCodes.A,
    left: Phaser.Input.Keyboard.KeyCodes.O,
    right: Phaser.Input.Keyboard.KeyCodes.P,
    fire: Phaser.Input.Keyboard.KeyCodes.SPACE,
  });
```

---


Y, como habréis imaginado, los identificadores de las teclas están en [`Phaser.Input.Keyboard.KeyCodes`{.js}](https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.KeyCodes.html)














# Gamepads

---

Usar gamepads es igual de fácil que usar el teclado, pero ya hay muchas dependencias y diferencias

**No todo va a funcionar tan bien y es posible que haya errores de detección**


---

Primero, lo activamos en la configuración del juego:

```js
const config = {
    input: {
        gamepad: true
    },
};

const game = new Phaser.Game(config);
```

---

Después, sólo tenemos que leer los datos, como en el teclado:

```js
// this es un GameObject
let pad = this.scene.input.gamepad.getPad(0);
let ejexIzda = pad.leftStick.x; // ¡número real!
let cruzDerecha = pad.right;
let botonA = pad.A;
```

---

Para saber si hay un pad conectado, sólo tenemos que ver si `gamepad.getPad(0);`{.js} devuelve algo apropiado (con `axis.length > 0`{.js}):

```js
let pad = this.scene.input.gamepad.getPad(0);
if(pad && pad.axis.length) {
  console.log("hay algo conectado");
}
```

---

Pero podemos hacerlo más fácil:

```js
let padExiste = pad && pad.axis.length
let ejexIzda = padExiste && pad.leftStick.x;
```

<small>Si no hay pad, no dará excepción</small>


---


## Reaccionar a varias entradas

Es muy posible que queramos que nuestro juego funcione tanto con pad como con teclado

---

Para no complicarnos mucho, simplemente hacemos:

```js
let pad = this.scene.input.gamepad.getPad(0);
let padExiste = pad && pad.axes.length;
let leftPad = padExiste && (pad.leftStick.x < 0 || pad.left);

// esta variable es `true` si alguna opción es `true`
let goLeft = leftPad 
           || this.cursors.left.isDown 
           || this.cursorsZXSpectrum.left.isDown
           || this.cursorsArrows.left.isDown;

if (goLeft) { this.goLeft(); }
```















# Ratón

---

Phaser nos permite usar el cursor del ratón para entrada de forma sencilla

---

Podemos saber la posición `x`{.js} es `y`{.js} del puntero en todo momento:


```js
// this es una scene
let pointer = this.input.activePointer;

console.log("Coordenada X", pointer.worldX);
console.log("Coordenada Y", pointer.worldY);
console.log("Está pulsado:", pointer.isDown);
```

---

Para reacciones ante un evento del ratón:

```js
this.input.on('pointerup', pointer => {
  if (pointer.leftButtonReleased()) {
    // se ha soltado el botón izquierdo
  }
);
```

También hay `'pointerdown'`{.js}, `'wheel'`{.js}, `'gameobjectover'`{.js} y [otros muchos eventos a los que suscribirnos](https://newdocs.phaser.io/docs/3.55.2/Phaser.Input.Events)

---

Los `Sprite`{.js}s que se marcan con `setInteractive()`{.js} pueden recibir eventos del ratón:

```js
// en el preload
this.load.image('rock', 'rock.png');

// en el create
this.sprite = this.add.sprite(400, 300, 'rock').setInteractive();
```

---

Una vez que un `Sprite`{.js} es interactivo, registramos con *callbacks* el comportamiento cuando se hace clic sobre ellos:


```js
this.sprite.on('pointerdown', pointer => {
    // hacer algo
});
```

---

Para hacer que el menú contextual de la página web no se muestre con el botón derecho:

```js
scene.input.mouse.disableContextMenu();
```

---

Para que el ratón no salga del área de juego:

```js
this.input.on('pointerdown', pointer => {
    this.input.mouse.requestPointerLock();
}, this);
```

<small>`requestPointerLock()`{.js} sólo funciona si se le llama como resultado a un evento lanzado por el usuario, por protección de los navegadores</small>