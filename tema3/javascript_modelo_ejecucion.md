---
title: El modelo de ejecución de JavaScript
---

# Ejecución asíncrona

---

JavaScript se caracteriza por facilitar (que no forzar) un modelo de ejecución asíncrono donde los resultados **no se encuentran disponibles inmediatamente**, sino que lo estarán en un futuro

---

Esto quiere decir que el lenguaje está diseñado para responder bien a resultados que llegan cuando están preparados, mientras que la ejecución sigue su curso

---

Para esto, hay una serie de particularidades del modelo de ejecución que vamos a ver en este tema



# Ámbito y _hoisting_

---


Como en muchos lenguajes, los nombres de las variables **pueden reutilizarse** y guardar valores distintos siempre y cuando se encuentren en **ámbitos distintos**

---


El ámbito o _scope_ de una variable es la porción de código donde puede ser utilizada

**Variables con el mismo nombre en ámbitos distintos son variables distintas**

---


El **ámbito en JavaScript es el cuerpo de la función**, delimitado entre el par de llaves `{`{.js} y `}`{.js} que siguen a la lista de parámetros de la función


```js
function introduction() {
  // Esta es la variable text
  var text = 'I\'m Ziltoid, the Omniscient.';
  greetings();
  console.log(text);
}

function greetings(list) {
  // Y esta es OTRA variable text distinta
  var text = 'Greetings humans!';
  console.log(text);
}

introduction();
```

---


En JavaScript, las funciones pueden definirse dentro de otras funciones y de esta forma, anidar ámbitos


El anidamiento de funciones es útil cuando se quieren usar **pequeñas funciones auxiliares**


```js
function getEven(list) {
  function isEven(n) {
    return n % 2 === 0;
  }
  return list.filter(isEven);
}

getEven([1, 2, 3, 4, 5, 6]);
```

---


Como el ámbito es el de la función, el mismo nombre en una función anidada se puede referir a dos cosas

---

**Si se usa con `var`{.js}**, se estará declarando **otra variable distinta**:

```js
function introduction() {
  // Esta es una variable text
  var text = 'I\'m Ziltoid, the Omniscient.';

  function greetings(list) {
    // Y esta es OTRA variable text distinta
    var text = 'Greetings humans!';
    console.log(text);
  }

  greetings();
  console.log(text);
}

introduction();
```

---


En el caso anterior, decimos que la variable `text`{.js} de la función anidada `greetings()`{.js} oculta a la variable `text`{.js} de la función `introduction()`{.js}

---

Recuerda que para introducir una **nueva variable** necesitas declararla con `var`{.js} antes de usarla (o al mismo tiempo que la asignas)


Si omites la palabra `var`{.js}, no estás creando una nueva variable sino **reutilizando** la que ya existía

---

```js
function introduction() {
  // Esta es una variable text
  var text = 'I\'m Ziltoid, the Omniscient.';

  function greetings(list) {
    // Esta es la MISMA variable text que la de afuera
    text = 'Greetings humans!';
    console.log(text);
  }

  greetings();
  console.log(text);
}

introduction();
```


## Hoisting


En JavaScript da igual a qué altura de la función declares una variable JavaScript asumirá cualquier declaración como si ocurriese al comienzo de la función

---


Es decir que esto:

```js
function f() {
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      console.log('i: ', i, ' j: ', j);
    }
  }
}
```

---

Es equivalente a esto:

```js
function f() {
  var i;
  var j;
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      console.log('i: ', i, ' j: ', j);
    }
  }
}
```


---

Esto quiere decir que todo lo que declaremos dentro de una función, aunque esté en otro ámbito, *afectará a toda la función*:

```js
for(var b = 0; b < 10; b++);
console.log(b); // 10
```

---

Además, `var`{.js} a nivel global hace que el objeto `window`{.js} en un navegador almacene el valor:

```html
<script>
  var a = 4;
  console.log(window.a); // imprime "4"
</script>
```

---


Fíjate que JavaScript **_alza_ la declaración de la variable, no la inicialización**

Es por eso que este código no falla pero imprime `undefined`{.js}:

```js
function f() {
  console.log(i);
  var i = 5;
}
f();
```

---

En modo estricto, usar una variable que no ha sido declarada **es un error**

```js
function f() {
  console.log(i); // comenta esto después de probar f
  i = 5;
}
f();
```

---


Con las declaraciones de funciones esto no pasa: cuando una declaración de función se alza, se alza entera, **definición incluida**

```js
function getEven(list) {
  return list.filter(isEven);

  function isEven(n) {
    return n % 2 === 0;
  }
}

getEven([1, 2, 3, 4, 5, 6]);
```

---


Esto permite una bonita forma de ordenar el código en el que las funciones auxiliares pueden situarse más abajo en las funciones que las utilicen


Así, viendo sólo la línea:

```js
return list.filter(isEven);
```

Ya podemos saber qué significa

---


Y si aun tenemos dudas, podemos bajar e investigar qué es esa función

```js
  function isEven(n) {
    return n % 2 === 0;
  }
```

---

## `let`{.js}

`let`{.js} es una forma de declarar variables que se añadió en [ES6](https://en.wikipedia.org/wiki/ECMAScript#Versions)

---

`let`{.js} y `var`{.js} son muy parecidos, y ambas valen para declarar variables en un ámbito

Pero `let`{.js} sólo crea variables *a partir de su definición*, no antes

---

Además, `let`{.js} existe entre las llaves que lo delimitan `{}`{.js} (por ejemplo, sólo dentro de un `for`{.js}), y no se extiende a toda la función

```js
for(let b = 0; b < 10; b++);
console.log(b); // ReferenceError
```


---

`let`{.js} a nivel global, a diferencia de `var`{.js}, **no** hace que el objeto `window`{.js} en un navegador almacene el valor:

```html
<script>
  let a = 4;
  console.log(window.a); // imprime "undefined"
</script>
```

---

Mucha gente prefiere usar `let`{.js} por defecto, porque una declaración con `let`{.js} tiene reglas de hoisting diferentes:

```js
function let_vs_var() {
  console.log(bien);
  console.log(mal); // como `let` no hace hoisting, falla
  var bien = 5;
  let mal = 5;
}
```

## `const`{.js}

`const`{.js} tiene el mismo comportamiento en ámbito que `let`{.js}, pero impide que la referencia cambie

Pero lo referenciado **sí** puede cambiar (es "mutable")

---

Aquí, lo declarado con `const`{.js} se podría cambiar, pero no el objeto al que apunta la variable:

```js
const objeto = {x: 1, y: 2};
objeto.x = 4; // ¡correcto!
objeto = {no: "funciona"}; // da error
```

---

En general, usemos `let`{.js} y `const`{.js} siempre que no necesitemos nada sofisticado, son más "razonables" que `var`{.js}

# Diferencias entre ámbitos en node y el navegador

---


Hemos dicho que el ámbito en JavaScript es equivalente a la función pero sabemos que podemos abrir una consola o un fichero y empezar a declarar variables sin necesidad de escribir una función


Esto es así porque estamos usando el **ámbito global**

El ámbito global está **disponible en el navegador y en node**

---

```js
// Esta es una variable text en el ámbito GLOBAL
var text = 'I\'m Ziltoid, the Omniscient.';

// Esta es una función en el ámbito GLOBAL
function greetings(list) {
  // Esta es OTRA variable text en el ámbito de la función
  var text = 'Greetings humans!';
  console.log(text);
}

greetings();
console.log(text);
```

---

Sin embargo, existe una peculiaridad en node

El ámbito global es realmente **local al fichero**. Esto quiere decir que:

```js
// En a.js, text es visible únicamente dentro del FICHERO
"use strict";
var text = 'I\'m Ziltoid, the Omniscient.';

// En b.js, text es visible únicamente dentro del FICHERO
"use strict";
var text = 'Greetings humans!';
```

# _Closures_

---


Las funciones son datos y se crean cada vez que se encuentra una instrucción `function`{.js}

---

De esta forma podemos crear una función que devuelva funciones


```js
function buildFunction() {
  return function () { return 42; };
}

var f = buildFunction();
var g = buildFunction();

typeof f === 'function';
typeof g === 'function';

f();
g(); // Las funciones hacen lo mismo..

f !== g; // ...pero NO son la misma función
```

---

Por sí sólo, este no es un mecanismo muy potente pero sabiendo que una función anidada puede acceder a las variables de los ámbitos superiores, podemos hacer algo así:


```js
function newDie(sides) {
  return function () {
    return Math.floor(Math.random() * sides) + 1;
  };
}
var d100 = newDie(100);
var d20 = newDie(20);

d100 !== d20; // distintas, creadas en dos llamadas distintas a newDie

d100();
d20();
```

---


En JavaScript, **las funciones retienen el acceso a las variables en ámbitos superiores**


Una **función que se refiere a alguna de las variables en ámbitos superiores se denomina _closure_**

---

Esto **no afecta al valor de `this`{.js}** que seguirá siendo **el destinatario del mensaje**


## Métodos, closures y `this`{.js}


Considera el siguiente ejemplo:

```js
let diceUtils = {
  history: [], // lleva el histórico de tiradas

  newDie: function (sides) {
    return function die() {
      let result = Math.floor(Math.random() * sides) + 1;
      this.history.push([new Date(), sides, result]);
      return result;
    }
  }
}
```

---

Nuestra intención es poder crear dados y llevar un registro de todas las tiradas que se hagan con estos dados


Pero esto no funciona:

```js
const d10 = diceUtils.newDie(10);
d10(); // ¡error!
```

---

Y es así porque **`this`{.js} siempre es el destinatario del mensaje** y `d10`{.js} se está llamando como si fuera una función y no un método


Recordad que podíamos hacer que cualquier función tomara un valor forzoso como `this`{.js} con `.apply()`{.js} por lo que esto sí funciona pero es un engorro:

```js
d10.apply(diceUtils);
d10.apply(diceUtils);
diceUtils.history;
```

---

Lo que tenemos que hacer es que la función `die`{.js} dentro de `newDie`{.js} se refiera al `this`{.js} del ámbito superior, no al suyo

---

Podemos hacer esto de dos maneras. La primera es un mero juego de variables:


```js
let diceUtils = {
  history: [], // Lleva el histórico de dados

  newDie: function (sides) {
    let self = this; // self es ahora el destinatario de newDie
    return function die() {
      let result = Math.floor(Math.random() * sides) + 1;
      // Usando self nos referimos al destinatario de newDie
      self.history.push([new Date(), sides, result]);
      return result;
    }
  }
}
```

---


Esto sí funciona y es mucho más conveniente:

```js
let d10 = diceUtils.newDie(10);
let d6 = diceUtils.newDie(6);
d10();
d6();
d10();
diceUtils.history;
```

---

La segunda forma es usando el método [`bind()`{.js}](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) de las funciones

---

El método `bind()`{.js} de una función **devuelve otra función cuyo `this`{.js} será
el primer parámetro de `bind()`{.js}**. De este modo:


```js
let diceUtils = {
  history: [], // Lleva el histórico de dados

  newDie: function (sides) {
    return die.bind(this); // una nueva función que llamará a die con su
                           // destinatario establecido al primer parámetro

    function die() {
      let result = Math.floor(Math.random() * sides) + 1;
      this.history.push([new Date(), sides, result]);
      return result;
    }
  }
}
```

---


Las dos formas son **ampliamente utilizadas** pero la segunda se ve escrita muchas veces de este modo:


```js
let diceUtils = {
  history: [], // Lleva el histórico de dados

  newDie: function (sides) {
    return function die() {
      let result = Math.floor(Math.random() * sides) + 1;
      this.history.push([new Date(), sides, result]);
      return result;
    }.bind(this); // el bind sigue a la expresión de función
  }
}
```


---

Pero esto sigue siendo un poco pesado, y en ES6 se crearon las funciónes flecha:

```js
const miFuncion = (x) => x + 2;
console.log(miFuncion(4)); // 6
```

---

Por un lado, son ideales para programación funcional, y necesitan menos texto:

```js
[1, 2, 3].map(x => x * 3);
```

---

Y, por otro lado, *no sobreescriben `this`{.js}*, con lo que se usa el `this`{.js} anterior:

```js
function Clase() {
  this.v = 5;
}

Clase.prototype.mal = function() {
  return [ 1, 2, 3 ].map(function(x) {return x * this.v});
}

Clase.prototype.bien = function() {
  return [ 1, 2, 3 ].map(x => x * this.v);
}

const c = new Clase();
console.log(c.mal()); // NaN, NaN, NaN
console.log(c.bien()); // 5, 10, 15
```






