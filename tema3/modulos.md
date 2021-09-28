---
title: Módulos
---

# ¿Qué son los módulos?

---

Un mecanismo para dividir un programa grande en elementos más pequeños que podamos ir importando solo cuando lo necesitemos.

# ¿Por qué usar módulos?

---

## Mantenibilidad

Un buen módulo nos permite concentrarnos en su uso y su lógica, y "olvidarnos" del resto del sistema

---

## Espacios de nombres

Un módulo mantiene un conjunto de nombres privado, con lo que no tenemos que preocuparnos de crear muchos nombres de variables y funciones diferentes para no colisionar

---

## Reusabilidad

Un módulo puede ser reusado en varias aplicaciones, posiblemente sin necesidad de trabajo extra









# La historia de los módulos

---

JavaScript, originalmente, no tenía módulos (no estaba pensado para grandes sistemas)

---

Cuando la programación web empezó a ser relevante, se hizo necesario crear un sistema de módulos

---

`node.js` tiene un sistema de módulos por defecto, pero (hasta hace poco) los navegadores no lo tenían

Era necesario usar `node.js` para transformar archivos con módulos **en un solo archivo** JavaScript

---

## [Patrón Módulo](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)

Era la forma en la que se implementaban inicialmente los módulos

Hacen uso de los cierres (_closures_) para decidir qué publica el módulo

---

Observa que la función se ejecuta inmediatamente ([IIFE](https://developer.mozilla.org/es/docs/Glossary/IIFE))

```js
var testModule = (function () {
  var counter = 0; 
  return { 
    incrementCounter: function () {
      return counter++;
    }, 
    resetCounter: function () {
      console.log( "counter value prior to reset: " + counter );
      counter = 0;
    }
  }; 
})();

testModule.incrementCounter();
``` 

## CommonJS

```js
// archivo modulo.js
function funcion() {
  console.log("función");
}
module.exports = funcion;
```

```js
// archivo usuario_modulo.js
const funcionImportada = require('./modulo')

funcionImportada();
```

---

Hay muchos sistemas de módulos es JavaScript, nosotros usaremos sólo el del ES6







# Módulos ES6

---

ECMAScript 6 añade sintaxis y funcionalidad nativa de módulos, tanto para exportar como para importar

---

Lo primero que podemos hacer es exportar, dentro de un archivo concreto `.js`, elementos declarados:

```js
// pi.js
export const pi = 3.141592;

export function sumaPi(x) { return pi + x; }
```

---

Después, en otro archivo, importamos las definiciones:

```js
// matematica.js
import {pi, sumaPi} from './pi.js'

console.log(sumaPi(5));
```

---

Podemos importar *todo lo exportado de un módulo*, como un objeto:

```js
import * as p from './pi.js'

console.log(p.pi)
```

---

## `export default`{.js}

Es posible elegir uno de los valores exportados y hacer que sea el valor por defecto, así:

```js
const PI  = 3.141592;
export default PI;

// También se podría haber hecho:
export { PI as default };
```

---

De esta forma, importarlo se simplifica:

```js
// pi_default.js
import PI_Importado from './pi_default.js';
import { default as Pi_Importado } from './pi_default.js'  // esto es equivalente
```

<small>Notemos que, aquí, el nombre de la importación puede cambiar, aunque no es necesario</small>

---

## Mezclar `default` y exportación normal

```js
// pi.js
const PI  = 3.141592;
export default PI;
export function sumaPi(x) { return pi + x; }
```

```js
// usuario.js
import PI, {sumaPi} from './pi.js' 
```

---

## Clases

Así, podemos importar/exportar clases ES6:

```js
// personaje.js
export default class Personaje {}
```

```js
// juego.js
import Personaje from './personaje.js'

let link = new Personaje();
```


---

Tanto `node` como el navegador soportan módulos, pero para que funcionen en `node`, hay que:

#. Guardar el archivo con la extensión `.mjs`
#. Ejecutar `node` con el parámetro `--experimental-modules`

<small>Esto va cambiando versión a versión, mirad la documentación de node.js</small>

---

```js
// archivo modulo.mjs
const Objeto = {x: 1, y: 2};

export default Objeto;
```

```js
// archivo usar.mjs
import Objeto from './modulo.mjs'

console.log(Objeto);
```

---

```bash
node --experimental-modules usar.mjs
```







# Usando librerías cargadas

---

Si cargamos librerías en la página web (por ejemplo, en el `<head>`{.html} de `index.html`):

```html
<!-- index.html -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/phaser/3.18.1/phaser.min.js"></script>
```

No tendremos que hacer `import`{.js}, ya estarán dentro del espacio de nombres:

```js
// entity.js
export default class Entity extends Phaser.GameObjects.Sprite { }
```






# Usando módulos ES6 en el navegador

---

Cuando se usan módulos ES6 en HTML, hace falta añadir el atributo `type="module"`{.html} a la etiqueta `<script>`{.html}:

```html
<script type="module">
  import Game from './game.js';
  document.game = new Game();
</script>
```
ó 

```html
<script type="module" src="myGame.js"></script> 
<!--  Si myGame.js hace uso de los import y export-->
```


---

Los módulos se diferencian de un "script" normal, además (y entre otras cosas), en:


- Las variables son locales al módulo
- Usan `"strict"`{.js} por defecto
- Se cargan de forma *asíncrona* (¡más velocidad!)


