---
title: Físicas avanzadas y Matter.js
...

# Qué es Matter.js

---

[Matter.js](http://brm.io/matter-js/) es un motor físico 2D *independiente de Phaser*, para la web


---

Para usarlo, simplemente lo habilitamos en la configuración del juego:

```js
var config = {
    physics: {
        default: 'matter',
        matter: {
            // ...
        }
    },
};


const game = new Phaser.Game(config);
```

---

A partir de ese momento, todas las `Scene`{.js} tendrán una propiedad `matter`{.js} a través de la cual podemos acceder al motor físico:


```js
//create
this.load.image('roca', 'roca.png');
```

```js
// update
this.matter.add.image(100, -100, 'roca');
```

---

*Matter.js* es mucho más complejo y potente que *Arcade*, pero también tiene bastantes más requisitos de procesador


---

Podemos establecer propiedades físicas más complejas:

```js
nave = this.matter.add.image(100, 100, 'nave');
```

```js
nave.setFrictionAir(0.1); //  fricción
nave.setMass(50);  // masa
nave.setFixedRotation(); // inercia infinita
nave.setAngularVelocity(-0.1); // velocidad angular
nave.thrust(0.1); // empuje
nave.setVelocity(16, 0); // x e y
nave.applyForce({15, 24}); // un vector

```

---

## Velocidad


La **velocidad** es una magnitud física vectorial que expresa la distancia recorrida de un objeto por unidad de tiempo

Se puede modificar en el `GameObject`{.js} que haya sido creado con *Matter.js*

```js
sprite = this.matter.add.sprite(100, 100, 'nave');
sprite.setVelocity(x, y);
```

---

Si aplicamos una velocidad a un objeto físico este se moverá hacia la dirección indicada con la magnitud indicada

---

## Aplicando fuerzas

---

Una **fuerza** es todo agente capaz de modificar la cantidad de movimiento de un objeto

Se aplica la segunda Ley de Newton:

$$F = m \times a$$


---

```js
sprite.applyForce({x: 100, y: 0});
```

O con funciones más cómodas, que tienen en cuenta la orientación del `GameObject`{.js}:

```js
sprite.thrust(19);
sprite.thrustLeft(14);
sprite.thrustBack(5);
```


---

## Aplicando impulsos

Un impulso es una fuerza que se ejerce en un momento puntual pero que cesa y su efecto (la aceleración) sólo ocurre un instante

Con *Matter.js*, lo haremos usado `applyForce()`{.js} sólo un instante

---

## Gravedad

La gravedad es un tipo de fuerza constante hacia una dirección. Normalmente hacia abajo:

```js
new Phaser.Game({
    physics: {
        default: 'matter',
        matter: {
            gravity: {
              x: 0,
              y: 0
            }
        }
    },
```


---

Los objetos pueden tener *bounding boxes* más elaboradas y podemos cambiarla:

```js
let rect = this.matter.add.image(200, 50, 'blue');

rect.setBody({
        type: 'rectangle',
        width: 128,
        height: 128
    });
```

---

## Formas

Cada forma tiene sus propiedades particulares (por ejemplo, `'fromVertices'`{.js} tiene un array de `points=[{x, y}, {x, y}, ..., {x, y}]`{.js})

- `'rectangle'`{.js}
- `'circle'`{.js}
- `'trapezoid'`{.js}
- `'polygon'`{.js}
- `'fromVertices'`{.js}
















# Detección de colisiones

---

Para detectar colisiones o solapamientos, tenemos eventos:

```js
// cuando se inicia la colisión
this.matter.world.on('collisionstart', 
    (evento, cuerpo1, cuerpo2) => {
    // hacer algo
});

// cuando termina la colisión
this.matter.world.on('collisionend', 
    (evento, cuerpo1, cuerpo2) => {
    // hacer algo
});
```









# Restricciones o *constraints*

---

Una *constraint* es una restricción sobre la distancia a la que tienen que estar dos objetos

También se les llama *muelles* (*springs*)

---

Los muelles siguen la ley de [Hooke](https://es.wikipedia.org/wiki/Ley_de_elasticidad_de_Hooke) donde la fuerza $F$:

$$F=-k \times X$$

- $k$: constante de elasticidad **stiffness**
- $X$: longitud

---

Derivado de esta ley tenemos el movimiento armónico oscilante

La **amortiguación** es una fuerza que va en dirección contraria al movimiento

La resistencia que hace que el movimiento sea oscilante

Cuanto más estirado esté el muelle, más fuerza de amortiguación se genera

---

Para crear una unión o muelle en *Matter.js*:

```js
scene.matter.add.constraint(obj1,
                            obj2,
                            50, // distancia
                            0.5 // rigidez de la unión
                            );
```

---


<script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.19.0/phaser.min.js" integrity="sha256-kF1kZP3VeVryJL2hSRtuAu34Fva0NKx/7IfxsD+Hl2Q=" crossorigin="anonymous"></script>


<small>[En este ejemplo](https://codepen.io/gjimenezucm/pen/jOmBPqm), haciendo clic, se aplica impulso a una de las bolas</small>

<canvas id="ejemplo1" />


<script>
new Phaser.Game({
    type: Phaser.WEBGL,
    // renderType: CONST.CANVAS,
    width: 800,
    height: 600,
    backgroundColor: '#1b1464',
    // parent: 'phaser-example',
    canvas: document.getElementById('ejemplo1'),
    physics: {
        default: 'matter',
        matter: {
            // gravity: {
            //     x: 0,
            //     y: 0
            // }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
});

function preload ()
{
    this.load.setBaseURL('https://labs.phaser.io');
    this.load.image('block', 'assets/sprites/block.png');
    this.load.image('ball', 'assets/sprites/shinyball.png');
}

function create ()
{


    this.matter.world.setBounds();
    var ballA = this.matter.add.image(420, 100, 'ball', null, { shape: 'circle', friction: 0.005, restitution: 0.6 });
    var ballB = this.matter.add.image(400, 200, 'ball', null, { shape: 'circle', friction: 0.005, restitution: 0.6 });

    this.matter.add.constraint(ballA, ballB, 200, 0);

    this.input.on('pointerdown', pointer => {
        ballA.thrust(0.1);
    });
}
</script>











# Sensores

---

En *Matter.js*, los "sensores" se pueden usar para detectar overlapping

---

Son cuerpos que no colisionan, pero que tienen área y forma y que desencadenan eventos `'collisionstart'`{.js}

---

Se activan creando formas (`circle`{.js}), y poniendo su propiedad `isSensor`{.js} a `true`{.js}:

```js
let sensor = Bodies.circle(100, 100, 24, {isSensor: true});
```








# Cuerpos compuestos

---

*Matter.js* ofrece soporte para cuerpos compuestos, que están formados por varias formas físicas (**con o sin colisión**)

---

```js
// `circle` y `rect` son cuerpos con coordenadas relativas
// al cuerpo al que los "enganchamos"
let compuesto = Phaser.Physics.Matter.Matter.Body.create({
    parts: [ rect, circle ],
    inertia: Infinity
});
```

---

Una vez que tenemos un cuerpo físico, se lo podemos asignar a una imagen:

```js
this.player = this.matter.add.image(0, 0, 'imagen');
// hemos creado `compuesto` antes
this.player.setExistingBody(compuesto);
```
















# Grupos de colisión

---

Los grupos de colisión permiten que una entidad sólo colisione con algunos objetos, mientras que otra entidad colisione con otros

---

Para crear una nueva "categoría" o grupo de colisión con *Matter.js*, hacemos:

```js
// creamos 2 categorías
const c1 = this.matter.world.nextCategory();
const c2 = this.matter.world.nextCategory();
```
---

Y se las asignamos a los objetos directamente


```js
roca1.setCollisionCategory(c1);

roca2.setCollisionCategory(c2);

// `roca3` no va a colisionar con `roca2` 
roca3.setCollidesWith([ c1 ]);
```


















# Cambiar el funcionamiento del motor

## Pausar y continuar las físicas

```js
scene.matter.world.pause();
scene.matter.world.resume();
```


---

## Entidades que se duermen

Muchos motores físicos permiten "dormir" a las entidades, de forma que no consuman recursos

---

Bien usado, se puede conseguir una ganancia muy grande en ciertos casos

---

Se habilita la funcionalidad al crear el juego:

```js
var config = {
        physics: {
            matter: {
                enableSleeping: true
            }
        }
}
```

---

Para que los objetos se duerman automáticamente, se puede establecer que si pasan $x$ ciclos sin cambiar prácticamente, se active el modo "dormir":

```js
sprite.setSleepThreshold(15);
```

---

*Matter.js* también nos permite actuar cuando un objeto se duerma o se despierte:

```js
scene.matter.world.on('sleepstart', (event, body) => {
});
```

```js
scene.matter.world.on('sleepend', (event, body) => {
});
```




























# Kinematic Bodies

---

## Cuerpos Kinemáticos Vs Cuerpos Físicos

**Kinematic bodies** son cuerpos que están en la física, pero que queremos mover nosotros por código

<small>Típicamente las plataformas de los juegos de plataforma</small>

---

En un juego normal, no queremos usar la física para mover un objeto controlado por el jugador o por la IA ya que esto puede provocar muchos problemas

La física es difícil de controlar y produce errores de redondeo

Lo más razonable para garantizar las mecánicas es moverlo nosotros con la lógica del juego

---

Para esto, tenemos que activar y desactivar propiedades físicas de los objetos, según necesitemos (dependerá del comportamiento que queramos)

















# ¿Se pueden mezclar distintos motores?

---

**Sí**, se puede

---

Lo primero, los activamos:

```js
const config = {
    physics: {
        arcade: {
            gravity: { y: 200 }
        },
        matter: {
            gravity: { y: 0.5 }
        }
    }
};

const game = new Phaser.Game(config);
```

---

Y, después, sólo hay que llamar a `scene.physics`{.js} o a `scene.matter`{.js} de forma normal:

```js
//  `this` es un `Scene`
this.matterImage = this.matter.add.image(400, -100, 'block');
this.arcadeImage = this.physics.add.image(400, 100, 'fuji');
```

---

## Pero...

Los objetos de *Arcade* y los de *Matter.js* corren en dos entornos diferentes, no se pueden juntar

Si necesitamos físicas complejas y simples a la vez, usamos *Matter.js* y creamos algunos objetos más simples


