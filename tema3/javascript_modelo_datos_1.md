---
title:  El modelo de datos de JavaScript (1)
---

# Fundamentos de los lenguajes

---

Lenguaje de programación = sintaxis + modelo de datos + modelo de ejecución

(+ estilo)

---


- La [sintaxis](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference#Statements)
es vuestra responsabilidad
- El modelo de datos es mía
- El modelo de ejecución también
- Y la jerga es de ambos


# Experimentando con JavaScript


---

Vamos a experimentar con JavaScript así que necesitamos una forma rápida de inspeccionar expresiones y obtener feedback de lo que estamos haciendo

La mejor forma es utilizar la consola de _node_:

```sh
$ node --use_strict
```

---

La opción `--use_strict` activa el modo estricto de JavaScript que simplifica algunos aspectos del lenguaje

Recorta algunas características pero los beneficios son mayores que las pérdidas

---


Ahora puedes probar a introducir algunas expresiones:

```js
> 40 + 2
42
> let point = { x: 1, y: 1 };
undefined
> point
{ x: 1, y: 1 }
> point.x
1
```

---

Para limpiar la pantalla presiona `ctrl+l`

Para salir de _node_, presiona `ctrl+c` dos veces seguidas

---

Si no quieres lidiar con la consola de _node_, siempre puedes escribir un programa y usar `console.log()` para mostrar expresiones por pantalla


```js
// en prueba.js
console.log(40 + 2);
let point = { x: 1, y: 1 };
console.log(point);
console.log('Coordenada X:', point.x);
```

---


Y ahora ejecutar el programa con node:

```bash
$ node prueba.js
42
{ x: 1, y: 1 }
Coordenada X: 1
```

---

El tema asume una única sesión de la consola de _node_ a menos que se indique lo contrario

Esto es importante porque *el estado se guarda entre instrucciones*

---

Para la mayoría de los ejemplos, puedes mantener la misma sesión abierta pero si te encuentras con algo inesperado, antes de nada prueba a reiniciar la consola

Para reiniciar la consola tienes que **salir y volver a entrar**

Lo mejor es que se tenga la presentación abierta a un lado y la consola _node_ en el otro


# Peculiaridades de la sintaxis

---

Las instrucciones acaban en `;`

...pero puedes no usarlo

```js
return     // intérprete añade ; y devuelve undefined
a + b      // Se hace la suma pero se pierde en el limbo

return     // intérprete añade ; y devuelve undefined
{ a: 5 }   // Se crea el objeto pero se pierde en el limbo

return {
  a : 5
}          // Devuelve el objeto creado
```

---

Vamos a declarar las variables con `let` o `const`:

- `let`: Declara una variable de bloque
- `const`: Declara una variable cuyo _valor_ no puede ser cambiado

```js
let b = 5;
b = "Hola";             // Permitido
const a = {};
a.nombre = "mi nombre"; // Permitido
a = {};                 // ERROR: No permitido
```

---

Veréis que también se pueden difinir variables con:

- `var`: Variables globales o de función. Realizan _hoisting_
- Sin ninguna palabra clave delante: variables globales

> **No las usaremos en este curso (salvo que nos lo justifiquéis adecuadamente)**

<small>Cuando veamos el modelo de ejecución, veremos por qué</small>

## Una **letiable es un nombre**

Para el programa, quitando algunas excepciones, los nombres no tienen significado

---


## Un **valor no es un nombre**

De hecho, sólo las funciones pueden tener nombre para poder implementar recursividad

---

Así que no es lo mismo el nombre `uno`{.js} que el valor `1`{.js}, y por supuesto, no es obligatoria ninguna relación coherente entre el nombre y el valor


```js
let uno = 2; // para el programa tiene sentido. Puede que para el programador no
```

---

En general, hablando de booleanos, cadenas y números, decimos que los **nombres guardan valores**

Si hablamos de objetos y funciones decimos que los **nombres apuntan a objetos o funciones** o **son referencias a objetos o funciones**

## Cadenas de caracteres (string)

- Cadenas simples entre `" "` ó `' '`
- [Cadenas de plantilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals%3E) entre \` \`

```js
let s1 = 5;
let s2 = 10;
console.log(`La suma de ${s1} y ${s2} es ${s1 + s2}.`);

// La suma de 5 y 10 es 15.
```

<small>En C# se conoce como cadenas interpoladas</small>

# Tipos primitivos

---

Se llama **tipos primitivos** a aquellos que vienen con el lenguaje y que permiten la creación de nuevos tipos más complejos

---

## Tipos primitivos

- booleanos
- undefined
- números
- cadenas
- enteros grandes
- símbolos

---

## Objetos y `null`{.js}

Los objetos en JS son "no primitivos"

Tienen *datos* y *métodos*

`null`{.js} es un tipo, aunque `typeof null === "object"`{.js}

---

## Funciones

Las funciones se representan por su propio tipo, aunque también son `object`{.js}

`typeof f === "function"`{.js}

Tienen la propiedad de ser "llamables" (_callable_)

---

```js
// En los comentarios hay más valores posibles para cada uno de los tipos
let bool = true; // false
let number = 1234.5; // 42, -Infinity, +Infinity
let text = 'I want to be a pirate!'; // "I want to be a pirate"
let object = {}; // [], null
let code = function () { return 42; };
```

---

Los puedes reconocer porque responden de manera distinta al operador `typeof`:

```js
typeof true;
typeof 1234.5;
typeof 'I want to be a pirate!';
typeof {};
typeof function () { return 42; };
```

---


En JavaScript podemos declarar una letiable y no asignarle ningún valor. En este caso el tipo de la letiable será `undefined`

```js
let x;
typeof x; // undefined
x = 5;    // tan pronto como le demos un valor, el tipo dejará de ser undefined
typeof x; // number
```

# Objetos en JavaScript

---


De entre todos los tipos, vamos a prestar atención a aquel cuyos valores permiten la composición con otros. Es decir, los de tipo `'object'`

---


En JavaScript, los objetos son colecciones de valores etiquetados

Por ejemplo, si queremos representar el punto `(10, 15)` del plano XY podemos etiquetar el valor en el eje X con la cadena `'x'` y el valor en el eje Y con la cadena `'y'`


```js
let point = { 'x': 10, 'y': 15 };
```

---

Cada par etiqueta y valor se llama **propiedad del objeto**

No es algo estricto, pero cuando se habla de las propiedades de un objeto se suele referir a los valores mientras que para hablar de las etiquetas se suele decir **nombre de la propiedad**

---

Si los nombres de las propiedades se escriben siguiendo las [reglas de formación de identificadores](https://developer.mozilla.org/en-US/docs/Glossary/Identifier) en JavaScript, las comillas no son necesarias


```js
let point = { x: 10, y: 10 }; // mucho más conveniente
```

---

Este es el caso **más normal**, **el recomendado** y el que usaremos a los largo del curso pero conviene saber que por detrás, **el nombre de la propiedad es una cadena**


Para acceder a las propiedades de un objeto usamos los corchetes con el nombre de la propiedad en medio:

```js
point['x'];
point['y'];
```

---

De nuevo, si seguimos las reglas de formación de identificadores, podemos usar la notación punto para acceder a la propiedad, mucho más rápida de escribir:

```js
point.x;
point.y;
```

---


Para cambiar el valor de una propiedad usamos el operador de asignación:

```js
point.x = 0;
point.y = 0;
point['x'] = 0;
point['y'] = 0;
```

---

Si accedemos a una **propiedad que no existe**, obtendremos `undefined`:

```js
let label = point.label; // será undefined. Compruébalo con typeof
```

---

También es verdad que en cualquier momento podemos crear propiedades nuevas asignándoles un valor:

```js
point.label = 'origin';
point;
```

---

## `null`{.js}


Existe un último valor muy relacionado con los objetos: `null`{.js}

Tiene su propio tipo (`null`{.js} es de tipo `null`{.js}), pero la máquina virtual dice que el `object`{.js}, por motivos históricos:

```javascript
> typeof null;
'object' 
```


---

Este valor representa la **ausencia de objeto** y se suele utilizar para:

- En funciones en las que se pregunta por un objeto, indicar que no se ha encontrado
- En relaciones de composición, indicar que el objeto compuesto ya no necesita al objeto componente

---

Cuidado con:

`null == undefined`{.js}

`null === undefined`{.js}

---

Por ejemplo, en un RPG, preguntamos por el siguiente enemigo vivo para comprobar si podemos seguir en batalla:

```js
function getNextAliveEnemy() {
  let nextEnemy;
  if (aliveEnemies.length > 0) {
    nextEnemy = aliveEnemies[0];
  }
  else {
    nextEnemy = null;
  }
  return nextEnemy;
}
```

---


O bien, supón la ficha de personaje de un héroe:

```js
let hero = { sword: null, shield: null };
hero.sword = { attack: 20, magic: 5 }; // coge una espada
hero.sword = null; // suelta la espada
```

# Arrays

---



Las **listas** o **arrays** son colecciones de **datos ordenados**

También son `object`{.js}

Tienen una propiedad `length` y se accede a sus propiedades por índice (número entero)

---

Los arrays en JavaScript no se parecen mucho a los arrays de bajo nivel (C/C++), que son *muy eficientes*

Para representar datos de manera eficiente, usamos [vectores tipados](https://developer.mozilla.org/es/docs/Web/JavaScript/Vectores_tipados), que son objetos concretos que provee el API estándar

---

Por ejemplo, la lista de comandos de un menú:

```js
let menu = ['Attack', 'Defense', 'Inventory'];
```

---

En este tipo de objetos, el orden importa

Para acceder a los distintos valores usamos su **índice** en la lista entre corchetes. Los índices **comienzan en 0**

```js
menu[0];
menu[1];
menu[2];
```

---

Se puede consultar la longitud de un array, accediendo a la propiedad `length`{.js}

```js
menu.length;
```



---

Como en el caso de los objetos que no son arrays, podemos cambiar cualquier valor en cualquier momento usando el operador de asignación:

```js
menu[0] = 'Special'; // reemplaza Wait con Special
```

---

También como en el caso de los objetos, podemos acceder a un valor que no existe y recuperarlo o asignarlo en cualquier momento:

```js
menu = ['Attack', 'Defense', 'Inventory'];
menu;
menu.length;
let item = menu[10];
typeof item; // será undefined
menu[10] = 'Secret';
menu;
menu.length;
```

---

Si asignamos a un índice **por encima de la longitud actual, extendemos el array hasta ese índice**

---

Se puede añadir un elemento al final del array, llamando al método [`push()`{.js}](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push):

```js
menu.push('Magic');
```

---

También se puede quitar un elemento por el final usando el método [`pop()`{.js}](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop):

```js
menu.pop();
```
---

Se puede alterar una lista (insertar o borrar elementos) en cualquier lugar usando el método [`splice()`{.js}](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice):

```js
// Inspecciona la lista tras cada operación
menu.splice(2, 0, 'Magic'); // añade Magic antes de Inventory
menu.splice(2, 2, 'Ench. Inventory'); // reemplaza Magic and Inventory with Ench. Inventory
menu.splice(0, 0, 'Wait'); // añade Wait al principio de la lista
```

---

Se puede recorrer con un [`for...of`{.js}](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

```js
for (let item of menu) {
  console.log(item);
}
```

---

Se pueden recorrer con un [`Array.forEach`{.js}](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach):

```js
menu.forEach( 
  (item) => console.log(item)
);

menu.forEach( 
  (item, index) => console.log(`${index}: ${item}`)
);
```

<small>Ya veremos que `=>`{.js} sirve para definir una función</small>

---

Se puede buscar un elemento y su posición en el array con `find` y `findIndex`

Se puede comprobar si todos los elementos cumplen una condición con `every`

Se puede crear un nuevo array con los elementos que cumplen una condición con `filter`

Se puede crear un nuevo array aplicando una función a cada elemento con `map`

... [y mucho más](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)



# Distinguir entre objetos y arrays

---



Arrays y objetos tienen tipo `object` así que usaremos el método [`Array.isArray()`{.js}](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) para distinguirlos

```js
let obj = {}; // el objeto vacío es tan válido como cualquier otro
let arr = []; // una lista sin elementos, como te puedes imaginar
typeof obj; // será object
typeof arr; // será object
Array.isArray(obj); // será false
Array.isArray(arr); // será true
```


---

## Composición de objetos


Objetos y arrays permiten cualquier composición de objetos. Es decir, sus valores pueden ser otros objetos y arrays, números, cadenas o funciones

---

Ficha de personaje:

```js
let hero = {
  name: 'Link',
  life: 100,
  weapon: { kind: 'sword', power: 20, magicPower: 5 },
  defense: { kind: 'shield', power: 5, magicPower: 0 },
  // Inventario por slots. Dos slots vacios y uno con 5 pociones
  inventory: [
    { item: null, count: 0},
    { item: null, count: 0},
    { item: { kind: 'potion', power: 15 }, count: 5}
  ]
};
```

---

Algunas propiedades:

```js
hero.name; // el nombre del héroe
hero.weapon.kind; // el tipo de arma
hero.inventory[0]; // el primer slot del inventario
hero.inventory[0].item; // qué hay en el primer slot del inventario
hero.inventory[2].item.power; // el poder del item del tercer slot del inventario
```

# Identidad de los objetos

---

En JavaScript, el operador de igualdad estricta o identidad es `===`{.js} (el triple igual)

Esto permite comparar dos objetos y decidir si **son iguales**

También existe el operador de desigualdad `!==`{.js} que compara dos objetos y decide si **no son iguales**

---

Para los tipos `bool`{.js}, `string`{.js}, `number`{.js} y `undefined`{.js}, dos valores son iguales si tienen la **misma forma**:


```js
// Todas estas comparaciones son verdaderas
"Hola" === "Hola";
"Hola" !== "hola";
true === true;
123 === 123.0;
123 === 122 + 1; // primero se resuelve la expresión, luego se compara
undefined === undefined;
```
  
---

Para `object` y `symbol`, dos objetos son iguales sólo si se refieren al mismo objeto o símbolo:

```js
({} !== {}); // da igual la forma, esto son dos objetos distintos
({} !== []);
[] !== []; // igual que antes
[1, 2, 3] !== [1, 2, 3]; // la forma da igual, los objetos son distintos
null === null; // pero con null funciona porque sólo hay un valor null
let obj = {};
let sameObj = obj;
let another = {};
sameObj === obj; // funciona porque ambos nombres se refieren al mismo objeto
sameObj !== another; // insisto, distintos, pese a la forma
Symbol() === Symbol(); // false
```

---

El operador `==`{.js} es el operador de igualdad abstracta o débil. Es parecido, pero hace **peligrosas** conversiones de tipo:

```js
3 === '3'; // false
3 == '3';  // true

"24" > "120"; // true
24 > 120;     // false
```

En general, usad siempre `===`{.js}

---

[Comparadores de igualdad en JS](https://developer.mozilla.org/es/docs/Web/JavaScript/Equality_comparisons_and_sameness)

---

[Wat](https://www.destroyallsoftware.com/talks/wat)

---

[JSFuck](http://www.jsfuck.com/)

---

```js
> [10, 10, 10].map(parseInt)
[ 10, NaN, 2 ]
```

([Hay una explicación](https://stackoverflow.com/a/14528430))

# Funciones, referencias a funciones y llamadas a funciones


---


Hay dos formas de definir una función. Una es usando la **declaración de función**:

```js
// Introduce una letiable factorial que apunta a la función factorial
function factorial(number) {
  if (number === 0) {
    return 1;
  }
  return number * factorial(number - 1);
} // no necesitas un ';' en este caso
```

---


En este caso el nombre de la función (antes de los paréntesis) es obligatorio

Esto tiene dos implicaciones:


- Permite implementar **llamadas recursivas** como la del ejemplo
- **Crea un nombre** `factorial` para referirnos a esa función

---

La otra forma es usa una **expresión de función**. Esta se parece más a como creamos un número o una cadena:

```js
// Introduce una letiable recursiveFunction que apunta a OTRA funcion factorial
let recursiveFunction = function factorial(number) {
  if (number === 0) {
    return 1;
  }
  return number * factorial(number - 1);
}; // ahora sí necesitas ';' como lo necesitarias con cualquier asignación
```

---

En este último caso, hay dos nombres:

- Uno es el nombre de la función `factorial`{.js} que existe para poder referirnos a ella dentro del cuerpo de la función
- El otro es la letiable `recursiveFunction`{.js} que referencia a la función

---

Ambos referencian a la misma función (con dos nombres diferentes) y ambos podrían usarse para hacer la llamada recursiva

---


La misma función puede referirse desde múltiples letiables o, dicho de otra manera, tener muchos nombres:

```js
let a = recursiveFunction;
let b = recursiveFunction;
a === b; // es cierto, se refieren a la misma función
a.name; // el nombre de la función no tiene que ver con el de la letiable
b.name; // tres cuartos de lo mismo
recursiveFunction !== factorial; // ¡factorial no está definido!
```

---

Tampoco podemos confundir la referencia a la función `factorial`{.js} y la llamada a la misma función `factorial(10)`{.js}

---


Con la primera forma **nos referimos al objeto** que encapsula el código que hay que ejecutar

No requiere parámetros porque no queremos ejecutar el código sino sólo referirnos a la función

---


Con la segunda estamos **pidiendo a la función que se ejecute** y por tanto tenemos que aportar todos los parámetros necesarios


---

En realidad, existe una tercera forma de definir una función: la función _anónima_:

```js
let f = function( a ) {
  console.log(a);
};
f; 
f(5);
```

---

Se suelen usar cuando es necesario pasar una función como parámetro:

```js
menu.forEach( 
  function (item) {
    console.log(item);
  }
);
```

---

Las [_arrow functions_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) (`=>`{.js}) son una forma más compacta para definir este tipo de funciones:

```js
let f = ( a ) => console.log(a);

menu.forEach( (item) => console.log(item) );
```

<small>Tienen una propiedad muy interesante con respecto al `this` que veremos más adelante</small>





