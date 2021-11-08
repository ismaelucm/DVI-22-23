---
title: Tweens
---

# Más sobre animación

--- 

Las animaciones que hemos utilizado hasta ahora son _animaciones por frames_, es decir, dibujamos **todas** las imágenes o frames que componen la animación

---

En la animación tradicional existe la figura del _in-between artist_, el artista encargado de dibujar las animaciones entre dos poses de un personaje para hacer que la transición entre dos animaciones sea lo más suave posible

> Hayao Miyazaki comenzó como in-between artist en Toei Animation

---

> Estas animaciones _in between_ también se conocen como **tweens**

<iframe width="560" height="315" src="https://www.youtube.com/embed/sJIeAKwDzSw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

En un motor de videojuegos, un **tween** es una animación procedural sencilla, creada en base a modificar el valor de un atributo a partir de un valor inicial, un valor final, un intervalo de tiempo y una función de interpolación:

- Un powerup que se agranda y se contrae 
- Una plataforma que oscila arriba y abajo
- Una moneda que rota
- Una desaparición de un enemigo muerto
- Un objeto que va cambiando de color
- ...


# Tweens en Phaser

---

Para crear un tween usamos el objeto factoría de Scene

```js
// this es Scene
let image = this.add.image(100, 80, 'fish', 0);

// Animación para mover de lado a lado una imagen
let tween = this.tweens.add({
    targets: [ image ],
    x: 700,
    duration: 4000,
    ease: 'Sine.easeInOut',
    flipX: true,
    yoyo: true,
    repeat: -1,
    delay: 10
});
```

<small>Revisa todas las [propiedades con las que se puede configurar un tween](https://newdocs.phaser.io/docs/3.55.2/Phaser.Types.Tweens.TweenBuilderConfig)</small>

---

Existen una gran variedad de [funciones de interpolación (`ease`) predefinidas](https://github.com/photonstorm/phaser/blob/v3.55.2/src/math/easing/EaseMap.js).

> Puedes hacerte una idea del comportamiento de cada función [en esta página web](https://easings.net/)


---

Podemos suscribirnos a [eventos que generan los Tweens](https://newdocs.phaser.io/docs/3.55.2/events):

```js
let tween = this.tweens.add({
    targets: image,
    x: 500,
    ease: 'Power1',
    duration: 3000
});
tween.on('stop', listener);

function listener() {
    // hacemos algo cuando termina el tween
}

```

---

Podemos encadenar tweens [creando un `timeline`](https://newdocs.phaser.io/docs/3.55.2/Phaser.Types.Tweens.TimelineBuilderConfig):

```js
// this es Scene
var timeline = this.tweens.createTimeline();
// Primer tween 
timeline.add({
    targets: image,
    x: 600,
    ease: 'Power1',
    duration: 3000
});
// Segundo tween; se ejecuta al terminar el primero
timeline.add({
    targets: image,
    y: 500,
    ease: 'Power1',
    duration: 3000
});
...

timeline.play();
```

<small>Tienes un ejemplo de uso [en esta página](https://labs.phaser.io/edit.html?src=src/tweens%5Ctimelines%5Ccreate%20timeline.js)</small>







