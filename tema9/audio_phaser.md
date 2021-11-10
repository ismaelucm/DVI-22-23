---
title: Audio en Phaser
vim: spelllang=en
---

# Motores de audio

---

El sonido, a bajo nivel, es un aspecto complejo y requiere de conocimiento amplio de física y procesamiento de señal

---

En general, cuando estamos haciendo videojuegos, queremos una _capa de abstracción_ sobre la gestión de sonido

---

Es muy normal asumir que el sonido en un videojuego consiste en un conjunto de archivos (sonidos y música) que queremos reproducir (al lanzarse eventos, o de fondo)

---

Aunque, desde luego, esto no sea necesariamente así en todos los juegos, es como vamos a tratarlo en este curso

# Formatos

---

Los sonidos se almacenan en digital de dos formas:

- Guardando la onda (análogo a un mapa de bits)
- Guardando las notas musicales, su duración, etc. (análogo a una imagen vectorial): [MIDI](https://es.wikipedia.org/wiki/MIDI)

---

Nosotros trabajaremos sólo con audio de onda (no MIDI)

# Audio en Phaser

---

Phaser provee, entre otros módulo, uno de gestión de audio de _muy alto nivel_

---

Esto quiere decir que, para gestionar audio, sólo tenemos que preocuparnos de:

#. tener los archivos
#. cargarlos
#. (asegurarnos de que están bien cargados)
#. reproducirlos --de fondo, como eventos, en loop...
#. enterarnos de cuándo han acabado de reproducirse (si queremos)

# Carga de sonidos

---

Cargar el sonido `explosion.mp3` y asignarle un nombre:

```js
scene.load.audio("explosion", "assets/audio/SoundEffects/explosion.mp3");
```

---

También podemos hacer una "lista de prioridad" de carga. El navegador intentará cargar estos archivos (por orden), sólo se quedará con uno

En `preload`{.js} de nuestra escena:

```js
scene.load.audio("boden", [
  "assets/audio/bodenstaendig_2000_in_rock_4bit.mp3",
  "assets/audio/bodenstaendig_2000_in_rock_4bit.ogg",
]);
```

(Por ejemplo, Firefox elegirá el OGG)

---

Añadimos el audio al juego [con una configuración inicial](https://newdocs.phaser.io/docs/3.55.1/Phaser.Types.Sound.SoundConfig) (opcional):

```js
const config = {
  mute: false,
  volume: 1,
  rate: 1,
  detune: 0,
  seek: 0,
  loop: false,
  delay: 0,
}; // config es opcional
this.explosion = scene.sound.add("explosion", config);
```

---

Y, finalmente, reproducimos el sonido:

```js
explosion.play();
```

---

Si queremos parar la reproducción

```js
music.stop();
```

---


Hacer que un sonido se repita

```js
// hace que `explosion` se vuelva a reproducir cuando acabe
// (muy útil para música)
explosion.setLoop(true);
```

---

Si queremos borrarlo en algún momento, destruimos la entidad (con `destroy()`{.js}) y el recurso (con `remove`{.js})

```js
explosion.destroy();
scene.sound.remove("explosion");
```

# Comenzar el sonido

---

Los navegadores no nos permiten empezar a reproducir audio **si no es por un evento lanzado por el usuario**

---

Así que antes de poder reproducir, tendremos que haber hecho clic (por ejemplo) en un botón de nuestro juego

---

Esto se suele conseguir con un botón de _Jugar_, o algo similar

¡Sed creativos!

# Eventos de sonido en Phaser

---

No solemos saber (o no es cómodo saber) cuánto dura un sonido

Así que lo que hacemos es _decirle a Phaser que haga algo cuando el sonido termine de reproducirse_

---

## Evento cuando el sonido termina de reproducirse

```js
function create() {
  explosion.once("stop", (music) => {
    // ...
  });
}
```

---

No es el único evento pero sí suele ser el más comúnmente usado

Phaser proporciona otros muchos [eventos relacionados con la reproducción de sonido](https://newdocs.phaser.io/docs/3.55.1/Phaser.Sound.Events)


# Audio sprites

---

Antes de las tecnologías de audio HTML modernas, los navegadores tenían muchas restricciones y problemas para cargar varios archivos de audio

---

Los [_audio sprites_](https://newdocs.phaser.io/docs/3.55.1/Phaser.Sound.BaseSoundManager#addAudioSprite) son un sistema en el que un solo archivo de audio contiene varios sonidos grabados (uno detrás de otro)

Se acompañan de un archivo con información de dónde empieza y acaba cada uno (JSON)

---

Es decir, algo muy similar a un _atlas de texturas_

---

En general, no son necesarios hoy en día (aunque pueden hacer más eficiente la carga)

[Aquí hay un ejemplo de este tipo de audio](https://phaser.io/examples/v3/view/audio/html5-audio/audiosprite#)

# Recursos de audio

---

- Recursos de audio de Phaser (los **assets**)
- [Free sound](https://www.freesound.org/)
- [SoundBible](https://soundbible.com/)
- [Newgrounds Audio](https://www.newgrounds.com/audio)
- [Free Music Archive](https://freemusicarchive.org/home)
- Generadores
  - [jsfxr](https://sfxr.me/)
  - [Chiptone](https://sfbgames.itch.io/chiptone)
  - [ZzFXM](https://keithclark.github.io/ZzFXM/)
  - [Abundant-music](https://pernyblom.github.io/abundant-music/index.html)
- _Cualquier DAW (Digital Audio Workstation) con un buen sinte_
