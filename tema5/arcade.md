---
title: El motor físico Arcade
...


# El motor físico

---

El motor físico se encarga de las colisiones y del movimiento


Es una librería que proporciona una simulación aproximada de un cierto sistema de física como cuerpos rígidos, cuerpos blandos, fluidos, colisiones, telas...

---

Se usa en videojuegos y simulación

En la mayoría de los juegos, la velocidad de ejecución es más importante que la precisión de la simulación 

Por tanto se busca hacer aproximaciones

---


## Algunos motores físicos 3D

- `PhysX`: propiedad de Nvidia y disponible en Unreal Engine y Unity
- `Hawok`: antes propiedad de Intel, ahora adquirido por Microsoft

---


## Algunos motores físicos 2D

- `Box2D`: Cocos, Unity, Construct 2 (Angry Birds, Limbo)
- `Chipmunk:` Cocos, Wii






















# Físicas en Phaser

---


O mejor dicho: **los motores físicos de Phaser**

---

En Phaser hay dos motores físicos disponibles:

- **Arcade**
- **Matter.js**

---

## Arcade physics


Pensado para tratar colisiones AABB (axis-aligned bounded rectangles): para manejar objetos sin rotaciones

Sólo se comprueba si existen colisiones (solapamiento o overlapping) entre dos rectángulos

Tiene problemas con las áreas transparentes

Está pensado para juegos sencillos

---

## Matter.js

[Matter.js](http://brm.io/matter-js/) admite rotaciones y formas más complejas (cuestas)

Tiene más precisión, pero es más lento

Tiene un modelo de física mucho más avanzado, *springs* (muelles), polígonos, fuerzas, restricciones...

Angry Birds usaría este motor























# Colisiones


## ¿Qué es una colisión?


Cuando dos *bounding boxes* están solapados

Un **bounding box** es una caja que representa el objeto (lo simplifica). El tamaño por defecto del bounding box de Phaser es el tamaño del sprite

---

![Bounding box](custom-physics-aabb.png)

---


![Overlapping entre bounding boxes](custom-physics-least-overlap.png)


## ¿Cómo se calcula la colisión?


Las colisiones más sencillas son colisiones AABB que se pueden calcular de la siguiente manera:

```js
function AABBvsAABB(a, b) {
    if(a.max.x < b.min.x || a.min.x > b.max.x) 
        return false;
    else if(a.max.y < b.min.y || a.min.y > b.max.y) 
        return false;
    else
        return true
}
```

---

Phaser hace este cálculo por nosotros

































# El motor físico Arcade


## Inicialización del motor Arcade


<!-- [Ejemplo del uso del motor arcade](https://phaser.io/sandbox/edit/rGYAfFoJ) -->


Para iniciar el motor de fisica:

```js
const config = {
    // ...
    physics: {
        default: 'arcade', // elegir motor
        arcade: { // propiedades del motor
            gravity: { y: 300 },
            debug: false // true para ver info
        }
    },
    // ...
};
const game = new Phaser.Game(config);
```

---

## Agregar entidades a la física


```js
// `this` es una `Scene`
this.player = this.add.sprite(100, 200, 'dude');
this.physics.add.existing(this);
```

o

```js
this.player = this.physics.add.sprite(100, 450, 'dude');
```

---

Esto hace que el `Sprite`{.js} **tenga la propiedad [`body`{.js}](https://newdocs.phaser.io/docs/3.55.2/Phaser.Physics.Arcade.Body) de Arcade**

---

## Colisionar con los límites del del mundo


```js
// `this` es un `Sprite` con físicas
this.body.setCollideWorldBounds();
```

<small>Atención a la propiedad `body`{.js} aquí</small>

---

Para saber si colisionamos con cualquier suelo:

```js
this.body.onFloor()
```

<small>Muy útil para no saltar infinitamente</small>


---

## Grupos físicos

Los [Group](https://newdocs.phaser.io/docs/3.55.2/Phaser.Physics.Arcade.Group) son grupos como los de Phaser (los "normales"), pero se usan para manejar grupos de colisiones (entre otras cosas)

Una entidad creada por un grupo físico *tendrá física*

---

```js
// `this` es una escena
this.platforms = this.physics.add.group();
```

<small>Atención a la propiedad `physics`{.js} aquí</small>

---

Los grupos creados con `physics.add.group()`{.js} son dinámicos


Los grupos creados con `physics.add.staticGroup()`{.js} son estáticos (entidades que no se mueven, pero que tienen *colisión*)

---


## Crear elementos en un grupo


Creamos sprites usando el método [`create()`{.js}](https://newdocs.phaser.io/docs/3.55.2/Phaser.Physics.Arcade.Group#create):


```js
// preload
this.load.image('platform', 'platform.png');
```
```js
// create
this.platforms = this.physics.add.staticGroup();
this.platforms.create(500, 150, 'platform');
this.platforms.create(-200, 300, 'platform');
this.platforms.create(400, 450, 'platform');
```


---

O podemos añadir nuestros propios GameObjects con `add()`{.js} y `addMultiple()`{.js} (como en los grupos)

---

Podemos hacer que las colisiones *no muevan un objeto* con:

```js
platform.setImmovable(true);
```

<small>El objeto se puede mover, pero las colisiones no lo "empujarán"</small>

---


Para activar la detección de colisiones hay que crear un [`collider`{.js}](https://newdocs.phaser.io/docs/3.55.2/Phaser.Physics.Arcade.Factory#collider):

```js
this.physics.add.collider(player, group);
```

---

Si queremos que nos avisen si se produce una colisión hay que incluir un _callback_:

```js
// create
this.physics.add.collider(player, group, onCollision);

// el método recibe dos parámetros, son los objetos que han colisionado
function onCollision(obj1, obj2) {
    // hacer algo
}
```

---

O con una función anónima (recordad el comportamiento del `this`{.js}):

```js
// create
this.physics.add.collider(player, group, (o1, o2) => {
    // hacer algo
});
```


---

`collide()`{.js} (¡no `add.collider()`{.js}!) devuelve un booleano que indica si ha habido colisión:

```js
// en update, donde this es una Scene
if(this.physics.collide(this.player, this.platform)) {
    textInfo.text = "Hay colisión";
}
```






















# Solapamiento

---

Muchas veces queremos saber si hay *solapamiento*, pero sin que haya efectos físicos

---

Para estos casos, usamos [`overlap`{.js}](https://newdocs.phaser.io/docs/3.55.2/Phaser.Physics.Arcade.Factory#overlap) donde usábamos `collider`{.js}

```js
// create
this.physics.add.overlap(player, group, (o1, o2) => {
    // o1 y o2 se están tocando
});
```

---


```js
// en update donde this es una Scene
if(this.physics.overlap(this.player, this.platform)) {
    textInfo.text = "Hay solape";
}
```

---

## Objetos "invisibles" o triggers

Se pueden crear con `add.zone()`{.js}, de la escena, y luego lo añadimos a las físicas:

```js
// x, y, width, height
let trigger = this.add.zone(300, 200, 200, 200);
this.physics.world.enable(trigger);
trigger.body.setAllowGravity(false);
trigger.body.moves = false;
```
