---
title: Texto en Phaser
...


# Crear texto usando fuentes del sistema

---

Para crear texto simplemente podemos usar la clase [`Phaser.GameObjects.Text`{.js}](https://newdocs.phaser.io/docs/3.55.2/Phaser.GameObjects.Text) con la factoría de Phaser `add.text`{.js} de `Scene`{.js}

---

Pero podemos modificar los atributos de `text`{.js} para cambiar su aspecto como:

* `setAlign`{.js}: alineación del texto
* `setFont`{.js}: tipo de letra
* `setFontSize`{.js}: tamaño
* `setStroke`{.js}: color del borde y grosor
* `setFill`{.js}: color de relleno

---

```js
// this es una Scene
let text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, '- phaser text stroke -');
text.setOrigin(0.5,0.5);

// alineación del texto
text.setAlign('center');

// Font style
text.setFont('Arial Black');
text.setFontSize(50);

//Color del reborde de la letra y grosor.
text.setStroke('#000000', 6)
text.setFill('#43d637');
text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
```

---

## Texto en UI

Muchas veces, el texto se utiliza como parte de la UI del juego (puntuación, vidas...)

Pero el texto creado tal cual lo hemos hecho tiene una posición en la escena y, por tanto, se queda fijo al mover la cámara y puede desaparecer de la escena.

---

**Solución**: Recordad que algunos GameObject tienen un método [`SetScrollFactor`](https://newdocs.phaser.io/docs/3.52.0/Phaser.GameObjects.Sprite#setScrollFactor) que controla el movimiento de un objeto con respecto al de la cámara

---

## Botones con texto

Se puede crear un botón fácilmente usando un texto interactivo y añadiendo un evento de `onpointerdown`:

```js
let button = this.add.text(...).setInteractive();
button.on('pointerdown', pointer => {
    // hacer algo
});
```













# Problema de las fuentes del sistema


---

Una fuente de nuestra máquina puede no estar disponible en la máquina del usuario.

¿Solución? Usar [fuentes estándar](https://www.w3schools.com/cssref/css_websafe_fonts.asp), crear nuestras propias fuentes de mapa de bits (bitmap fonts) o usar fuentes Web (**webfonts**) como [Google Fonts](https://fonts.google.com/)

---


![Bitmap Fonts](bitmapfont.png)

---

## Texto con fuentes de mapa de bits

Para cargar una fuente de mapa de bits hay que usar [`scene.load.bitmapFont()`{.js}](https://newdocs.phaser.io/docs/3.55.2/Phaser.Loader.LoaderPlugin#bitmapFont) en el `preload`{.js}

Hay que pasarle el bitmap (en [PNG](https://es.wikipedia.org/wiki/Portable_Network_Graphics), por ejemplo) con las fuentes y el XML que las describe

---

```js
// this es scene
preload(){
    this.load.bitmapFont(
        'bitmapFont', 'assets/fonts/bitmapFonts/bitmapFont.png',
        'assets/fonts/bitmapFonts/bitmapFont.xml');
}
create(){
    this.greeting = this.add.bitmapText(200, 100, 'bitmapFont','Bitmap Fonts!', 64);
}
```
---

Para generar el XML y el mapa de bits podemos usar:

- [SnowB BMF](https://snowb.org/) (online)
- [Bmfont](http://www.angelcode.com/products/bmfont/) (Windows) 
- [Glyph Designer](https://www.71squared.com/glyphdesigner)












# Texto con fuentes Web

---

Podemos cargar fuentes desde la web, por ejemplo desde [Google Fonts](https://fonts.google.com/)

Hay que cargar la fuente previamente antes de usarla

---

Cargamos el código para usar webfonts:

```js
preload() {
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
}
```

---

Después, llamamos a `WebFont.load()`{.js}:


```js
// this es Scene
create(){
    let self = this; // Para usarlo en active
    WebFont.load({
        google: {
            families: [ 'Freckle Face', 'Finger Paint', 'Nosifer' ]
        },
        active: function () // se llama a esta función cuando está cargada
        {
            let nuevoTexto = 
                self.add.text(16, 0, 
                    'The face of the\nmoon was in\nshadow.', 
                    { fontFamily: 'Freckle Face', fontSize: 80, color: '#ffffff' })
            nuevoTexto.setShadow(2, 2, "#333333", 2, false, true);
        }
    });
}
```

---

## ¿Problemas de las Google Fonts u otras fuentes Web?

Que dependemos de ellas para que el juego funcione y no tenemos control sobre ellas

## Solución

Almacenar las fuentes de nuestro juego en el servidor y cargarlas.

Las podemos guardar en `/assets/fonts`

---

Creamos una función auxiliar y cargamos la fuente:

```js
loadFont(name, url) {
    let newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}

preload() {
    // Archivo .ttf descargable desde
    // https://www.dafont.com/es/happy-donuts.font
    this.loadFont("Donuts", "/assets/fonts/HAPPY_DONUTS.ttf");
}
```

---

```js
// this es Scene
create() {
    let nuevoTexto = 
        this.add.text(16, 0, 
            'The face of the\nmoon was in\nshadow.', 
            { fontFamily: 'Donuts', fontSize: 80, color: '#ffffff' })
}
```
