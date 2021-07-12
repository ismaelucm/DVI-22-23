---
title:  El modelo de datos de JavaScript (2)
---

# Objetos y paso de mensajes

--- 

Los objetos de JavaScript y el poder usar código como un valor más permite codificar los conceptos de objeto y paso de mensajes de la programación orientada a objetos


## Codificando el estado


Con lo que se ha visto hasta ahora se tiene suficiente conocimiento para codificar el estado

El **conjunto de atributos** del objeto del modelado orientado a objetos se traduce al **conjunto de propiedades** de los objetos JavaScript

---


En el ejemplo de Space Invaders, el estado de los enemigos formado por:

![Estado del enemigo en el modelado de Space Invaders](space-invaders-enemy-state.svg){width=60%}

---


Se puede codificar mediante:
```js
let enemy = {
  graphic: 'specie01.png',
  currentDirection: 'right',
  position: { x: 10, y: 10 },
  score: 40
};
```

---


La primera limitación en JavaScript es que **no se puede restringir el acceso a las propiedades de un objeto**

Así, nada nos impide poder modificar la posición directamente


```js
enemy.position.x = 100; // perfectamente válido
```

---

Lo único que podemos hacer es desaconsejar al usuario que utilice las propiedades que determinemos como atributos


Una práctica muy común es añadir un guíon bajo `_`{.js} a los atributos como indicando que son **privados**

```js
let enemy = {
  _graphic: 'specie01.png',
  _currentDirection: 'right',
  _position: { x: 10, y: 10 },
  _score: 40
};
```

---


Pero esto es un convenio, y podemos seguir accediendo a los atributos

```js
enemy._position.x = 100; // perfectamente válido también
```


## Codificando la API


Los **métodos** pueden implementarse como **funciones** en propiedades de un objeto:


![API del enemigo en el modelado de Space Invaders](space-invaders-enemy-state.svg){width=60%}

---

```js
let enemy = {
  _graphic: 'specie01.png',
  _currentDirection: 'right',
  _position: { x: 10, y: 10 },
  _score: 40,

  moveLeft: function () { console.log('Going left!'); },
  moveRight: function () { console.log('Going right!'); },
  advance: function () { console.log('Marching forward!'); },
  shoot: function () { console.log('PICHIUM!'); } // (es un láser)
};
```

---


Enviar un mensaje a un objeto consiste sencillamente **acceder a una función propiedad del destinatario y llamarla**


```js
enemy.shoot(); // primero accedemos con punto, luego llamamos con ()
enemy.moveLeft();
enemy.moveLeft();
enemy.advance();
enemy['shoot'](); // es lo mismo, acceder con corchetes y llamar con ()
```

---

Cualquier función puede actuar como método. Y como cualquier propiedad de un objeto, podemos cambiarla en cualquier momento:


```js
enemy.shoot(); // PICHIUM!
enemy.shoot = function () { console.log('PAÑUM!'); };
enemy.shoot(); // PAÑUM!
```

---

Ahora bien, observa el siguiente comportamiento:

```js
enemy; // fíjate en la posición
enemy.moveLeft();
enemy; // fíjate en la posición otra vez
```

---

Obviamente, echando un vistazo a lo que hace `moveLeft()`{.js} no podríamos decir que cambia el estado del objeto destinatario del mensaje

---


Como cualquier función puede actuar como método, necesitamos una forma de **referirnos al destinatario del mensaje**, si existe

Este se guarda en la letiable **`this`{.js}**


[Ojo con `this`{.js}... =)]{.fragment}


# `this`{.js}

---

Con `this`{.js}, vamos a implementar los métodos de movimiento:

```js
enemy.moveLeft = function () { this._position.x -= 2; };
enemy.moveRight = function () { this._position.x += 2; };
enemy.advance = function () { this._position.y += 2; };
```

---


Ahora puedes probar el mismo experimento de antes y ver cómo efectivamente alteramos el estado del objeto:

```js
enemy; // fíjate en la posición
enemy.moveLeft();
enemy; // fíjate en la posición otra vez
```

## El valor de `this`{.js}


El valor de `this`{.js} es uno de los aspectos más controvertidos de JavaScript


En otros lenguajes métodos y funciones son cosas distintas y un método **siempre** tiene asociado un y sólo un objeto así que `this`{.js} nunca cambia

---


Pero en JavaScript, `this`{.js} depende de cómo llamemos a la función, si la llamamos como si fuera una función o si la llamamos como si fuera un método


Considera la siguiente función:

```js
function inspect() {
  // sólo inspecciona this
  console.log('Tipo:', typeof this);
  console.log('Valor:', this);
}
```

---

Y prueba lo siguiente:

```js
// Piensa qué puede valer this antes de probar cada ejemplo
let ship1 = { name: 'T-Fighter', method: inspect };
let ship2 = { name: 'X-Wing', method: inspect };
ship1.method();
ship2.method();
inspect();
```

---

En el último caso, el valor de `this`{.js} es **el objeto global** porque la función no se está usando como un método por lo que no hay destinatario


En JavaScript podemos hacer que cualquier objeto sea `this`{.js} en cualquier función

---

Para ello usaremos
[`apply()`{.js}](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/apply) en una función:

```js
let onlyNameShip = { name: 'Death Star' };
inspect.apply(onlyNameShip); // hace que this valga onlyNameShip en inspect
```


A [`this`{.js}](http://dmitrysoshnikov.com/ecmascript/javascript-the-core/#this-value) se le conoce también como **objeto de contexto** y utilizaremos este término de cuando en cuando



# Tipos y constructores de objetos

---

Javascript permite modelar **prototipos de objetos**

JavaScript no permite modelar tipos nuevos y tendremos que dar un rodeo

Esta es una de las principales diferencias con otros lenguajes orientados a objetos

---

Lo que vamos a hacer es saltarnos el concepto de tipo para abordar directamente el de constructor

![Constructores de objetos](space-invaders-constructor-example.svg){width=60%}

---


Vamos a crear dos funciones constructoras, una para puntos y otra para disparos:

```js
function newPoint(x, y) {
  let obj = {};
  obj.x = x;
  obj.y = y;
  return obj;
}

function newShot(position, velocity) {
  let obj = {};
  obj._position = position;
  obj._velocity = velocity;
  obj.advance = function () {
    this._position.y += this._velocity;
  };
  return obj;
}
```

---


La forma de las funciones constructoras es muy similar: crear un objeto vacío, establecer las propiedades del objeto y devolver el nuevo objeto

---


Ahora podemos crear un nuevo disparo con algo así:

```js
// Velocidad positiva para que se mueva hacia abajo
let enemyShot = newShot(newPoint(15, 15), 2);

// Velocidad negativa para que se mueva hacia arriba
let allyShot = newShot(newPoint(15, 585), -2);

enemyShot !== allyShot;
```


## Reaprovechando funcionalidad


El problema con esta aproximación es que estamos creando funciones distintas
para comportamientos idénticos. Una función por objeto


```js
let s1 = newShot(newPoint(15, 15), 2);
let s2 = newShot(newPoint(15, 15), 2);
let s3 = newShot(newPoint(15, 15), 2);
s1.advance !== s2.advance;
s2.advance !== s3.advance;
s3.advance !== s1.advance;
```

---

Esto es altamente ineficiente dado que cada función ocupa un espacio distinto en memoria


No necesitamos distintas funciones sino una solamente actuando sobre distintos objetos

---


Así que vamos a **crear un objeto que contenga sólamente la API**:

```js
let shotAPI = {
  advance: function () {
    this._position.y += this._velocity;
  }
};
```

---

Y a usarlo en la creación del objeto para referenciar la API:

```js
function newShot(position, velocity) {
  let obj = {};
  obj._position = position;
  obj._velocity = velocity;
  obj.advance = shotAPI.advance;
  return obj;
}
```

---


Ahora todas las instancias comparten la misma función pero cada función actúa sobre el objeto correspondiente gracias al uso de `this`{.js}:

```js
let s1 = newShot(newPoint(15, 15), 2);
let s2 = newShot(newPoint(15, 15), 2);
let s3 = newShot(newPoint(15, 15), 2);
s1.advance === s2.advance; // ahora SÍ son iguales
s2.advance === s3.advance;
s3.advance === s1.advance;
```

---

Para hacer todavía más fuerte la asociación entre el constructor y la API, modificamos el **objeto con la API como una propiedad de la función constructora**


```js
function newShot(position, velocity) {
  let obj = {};
  obj._position = position;
  obj._velocity = velocity;
  obj.advance = newShot.api.advance;
  return obj;
}

// Recuerda, una función es un objeto, así que le podemos añadir una propiedad
newShot.api = {
  advance: function () {
    this._position.y += this._velocity;
  }
};
```



# La cadena de prototipos

---


JavaScript posee una característica muy representativa y única del lenguaje: **la cadena de prototipos**


Puedes experimentar con ella en [Object Playground](http://www.objectplayground.com/), una excelente herramienta que te ayudará a visualizarla

---

La idea no es complicada. La cadena de prototipos **es una lista de búsqueda para las propiedades**

Cada elemento de la cadena es **prototipo** del objeto anterior

---


Cuando accedemos a la propiedad de un objeto, esta propiedad se busca en el objeto y si no se encuentra, se busca en el prototipo del objeto, y así sucesivamente hasta alcanzar la propiedad o el final de esta cadena

---


Por ejemplo:

```
obj1                    obj2               obj3
{ a: 1, b: 2, c: 3} --> { d: 4, e: 5 } --> { f: 6 }
obj1.c -------↑           ↑                  ↑
obj1.d -------------------|                  |
obj1.f --------------------------------------|
obj1.z ------------------------------------------------X
```

---


Crear esta jerarquía en JavaScript requiere el uso de [`Object.create()`{.js}](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/create):


```js
// La cadena se monta de atrás hacia adelante
let obj3 = { f: 6 };
// Encadenamos obj2 a obj3
let obj2 = Object.create(obj3);
obj2.d = 4;
obj2.e = 5;
// Encadenamos obj1 a obj2
let obj1 = Object.create(obj2);
obj1.a = 1;
obj1.b = 2;
obj1.c = 3;

obj1.c;
obj1.d;
obj1.f;
obj1.z; // undefined
```

---


El método `Object.create()`{.js} crea un nuevo objeto vacío (como `{}`{.js}) cuyo prototipo es el objeto pasado como parámetro

---


Se puede usar el método [`hasOwnProperty()`{.js}](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) para determinar si una propiedad pertenece a un objeto sin atravesar la cadena de prototipos:


```js
obj1.hasOwnProperty('c');
obj1.hasOwnProperty('d');
obj1.hasOwnProperty('f');
obj1.hasOwnProperty('z');

obj2.hasOwnProperty('c');
obj2.hasOwnProperty('d');
obj2.hasOwnProperty('f');
obj2.hasOwnProperty('z');

obj3.hasOwnProperty('c');
obj3.hasOwnProperty('d');
obj3.hasOwnProperty('f');
obj3.hasOwnProperty('z');
```

---

Se puede usar el método [`Object.getPrototypeOf`{.js}](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) para obtener el prototipo de un objeto:

```js
Object.getPrototypeOf(obj1) === obj2;
Object.getPrototypeOf(obj2) === obj3;
Object.getPrototypeOf(obj3) === Object.prototype;
Object.getPrototypeOf(Object.prototype) === null;
```


# Constructores y cadenas de prototipos

---


Los prototipos se prestan a ser el lugar ideal para contener la API que es el comportamiento común de todos los objetos de un tipo


```
let obj = newShot()                   newShot.api
{_position: {x: 10...}...} --> {advance: function...};

obj._position.y ----↑                       ↑
obj.advance --------------------------------|
obj.goBack ----------------------------------------------X
```

---

Para crear este enlace modificaremos el constructor:

```js
function newShot(position, velocity) {
  // Con esto la API es el prototipo del objeto
  let obj = Object.create(newShot.api);
  obj._position = position;
  obj._velocity = velocity;
  return obj;
}

newShot.api = {
  advance: function () {
    this._position.y += this._velocity;
  }
};
```

---


Y ahora probamos a crear un nuevo disparo:

```js
let shot = newShot(newPoint(0,0), 2);
shot; // al inspeccionar shot sólo se muestran las propiedades del objeto
shot.advance; // pero advance existe en su prototipo
shot.hasOwnProperty('advance');
Object.getPrototypeOf(shot).hasOwnProperty('advance');
```

---


Si hiciéramos esto con todos los constructores, cláramente encontraríamos un
patrón:


 1. Crea un objeto para contener la API
 2. Implementa la API como propiedades de este objeto
 3. En el constructor haz que este objeto sea el prototipo de un nuevo objeto
 4. Establece las propiedades del nuevo objeto con el estado
 5. Devuelve el nuevo objeto

---


Sólo los pasos 2 y 4 involucran diferencias de un constructor a otro. Todo lo
demás es exactamente igual. Tanto es así que JavaScript lo tiene en cuenta
y viene con los mecanismos para automatizar los pasos 1, 3 y 5

---


Primero, JavaScript permite que cualquier función pueda usarse como constructor

---


Cada vez que escribimos una función, JavaScript **crea una propiedad de la función llamada `prototype`** que es un objeto con una única propiedad `constructor` que apunta a la función


```js
function anyFunction() {}
anyFunction.prototype;
anyFunction.prototype.constructor === anyFunction;
```

---

Esto automatiza el paso 1. Ya no es necesario el objeto `api`{.js} que preparábamos nosotros manualmente

---

Ahora, al llamar a la función con el operador `new`{.js} delante, se crea un **nuevo objeto cuyo prototipo es precisamente la propiedad `prototype`{.js}** de la función:


```js
let obj = new anyFunction();
let anotherObj = new anyFunction();

// Los objetos son distintos
obj !== anotherObj;

// Pero sus prototipos son iguales
Object.getPrototypeOf(obj) === Object.getPrototypeOf(anotherObj);

// Y además son la propiedad prototype de la función
Object.getPrototypeOf(obj) === anyFunction.prototype;
```

---

Con esto automatizamos el paso 3. Ya no es necesario llamar a `Object.create()`{.js}
para establecer la cadena de prototipos entre objeto y API

---

Finalmente, cuando se llama con `new`{.js}, la **función recibe como objeto de contexto (recuerda, el `this`{.js}) el elemento que está siendo creado** lo que nos permite establecer sus atributos


```js
function Hero(name) {
  this.name = name;
  this.sword = null;
  this.shield = null;
}

let hero = new Hero('Link');
hero;
```

---


Si la **función devuelve nada**, el resultado del operador `new`{.js} será el nuevo objeto. Esto automatiza el paso 5 puesto que no es necesario devolver el nuevo objeto, esta devolución se hace implícita


Veamos como queda el constructor de punto:

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}
```

---

Y el del disparo:

```js
function Shot(position, velocity) {
  this._position = position;
  this._velocity = velocity;
}

// El prototipo ya existe, pero le añadimos el método advance()
Shot.prototype.advance = function () {
  this._position.y += this._velocity;
};
```


--- 

Ahora crear los objetos será cuestión de usar `new`{.js}:

```js
let enemyShot = new Shot(new Point(15, 15), 2);
let allyShot = new Shot(new Point(15, 585), -2);
enemyShot !== allyShot;
```



# Herencia

---


Sabemos como crear objetos con atributos y métodos y sabemos como hacerlo eficazmente usando constructores y la cadena de prototipos


![Relación de herencia entre nave y los enemigos y la nave aliada](space-invaders-hierarchy.svg){width=50%}

---

Falta explicar cómo podemos crear una **relación de herencia**

Usemos el ejemplo de los enemigos y la nave protagonista de la lección anterior

---

Necesitaremos pues nuestros constructores de puntos y disparos:

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Shot(position, velocity) {
  this._position = position;
  this._velocity = velocity;
}

Shot.prototype.advance = function () {
  this._position.y += this._velocity;
};
```

---

El constructor del enemigo podría ser:

```js
function Enemy(graphic, position, score) {
  this._graphic = graphic;
  this._currentDirection = 'right';
  this._position = position;
  this._score = score;
}

Enemy.prototype.moveLeft = function () { this._position.x -= 2; };
Enemy.prototype.moveRight = function () { this._position.x += 2; };
Enemy.prototype.advance = function () { this._position.y += 2; };
Enemy.prototype.shoot = function () {
  let firePosition = new Position(this._position.x, this._position.y + 10);
  let shot = new Shot(firePosition, 2);
  return shot;
};
```

---

Y el de la nave aliada:

```js
function Ally(position) {
  this._graphic = 'ally.png';
  this._position = position;
}

Ally.prototype.moveLeft = function () { this._position.x -= 2; };
Ally.prototype.moveRight = function () { this._position.x += 2; };
Ally.prototype.shoot = function () {
  let firePosition = new Position(this._position.x, this._position.y - 10);
  let shot = new Shot(firePosition, -2);
  return shot;
};
```

---

Podemos pensar en un constructor que capture las propiedades comunes de ambos
tipos:

```js
function Ship(graphic, position) {
  this._graphic = graphic;
  this._position = position;
}

Ship.prototype.moveLeft = function () { this._position.x -= 2; };
Ship.prototype.moveRight = function () { this._position.x += 2; };
```

---

No incluimos disparar porque unos disparan hacia arriba y otros hacia abajo

---


Recordemos que ahora los constructores de la nave aliada y los enemigos pedirán
primero al constructor de nave una nave y luego la personalizarán

![Jerarquía de constructores](space-invaders-hierarchy-constructor.svg){width=50%}



---


```js
function Enemy(graphic, position, score) {
  Ship.apply(this, [graphic, position]);
  this._currentDirection = 'right';
  this._score = score;
}

function Ally(position) {
  Ship.apply(this, ['ally.png', position]);
}
```


Con [`apply()`{.js}](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Function/apply) se puede ejecutar una función indicando cuál será su objeto de contexto y sus parámetros


---


Con la configuración anterior, las nuevas instancias de enemigos y aliados pasarán primero por el constructor de `Ship`{.js} que establecerá los **atributos comunes** y luego serán modificados cada uno por el constructor pertinente para convertirse en enemigos o aliados concretamente


---

En cuanto a la API, lo ideal sería contar con una cadena de prototipos de esta forma:

```
  new Enemy()          Enemy.prototype      Ship.prototype
{ _position: ...} --> { advance: ... } --> { moveLeft: ... }
enemy._score ---↑            ↑                   ↑
enemy.advance ---------------|                   |
enemy.moveLeft ----------------------------------|
```

---


De forma que los atributos del enemigo estén en la instancia, la API específica en la propiedad `prototype`{.js} del constructor `Enemy` y la API común en la propiedad `prototype`{.js} del constructor `Ship`{.js}

---


Como ocurría con el ejemplo en la sección anterior, tendremos que crear la cadena de atrás hacia adelante. El enlace entre las instancias y los constructores nos lo proporciona JavaScript al utilizar `new`{.js} pero el enlace entre la propiedad `prototype`{.js} de `Enemy`{.js} y de `Ship`{.js} **tenemos que establecerlo manualmente**

## Herencia en el tipo `Enemy`{.js}

```js
// Inspecciona la propiedad prototype
Enemy.prototype;

// Enlaza ambas propiedades prototype
Enemy.prototype = Object.create(Ship.prototype);

// Inspecciona la propiedad prototype otra vez y busca diferencias
Enemy.prototype;

// Corrige la propiedad constructor
Enemy.prototype.constructor = Enemy;

// Añade el método específico del tipo Enemy
Enemy.prototype.advance = function () {
  this._position.y += 2;
};

// Otro método específico
Enemy.prototype.shoot = function () {
  let firePosition = new Point(this._position.x, this._position.y + 10);
  let shot = new Shot(firePosition, 2);
  return shot;
};
```

---

## Herencia en el tipo `Ally`{.js}

```js
// Lo mismo para el aliado
Ally.prototype = Object.create(Ship.prototype);
Ally.prototype.constructor = Ally

Ally.prototype.shoot = function () {
  let firePosition = new Point(this._position.x, this._position.y - 10);
  let shot = new Shot(firePosition, -2);
  return shot;
};
```

---

Ahora sí, podemos crear un enemigo y un aliado usando sus constructores:

```js
let enemy = new Enemy('enemy1.png', new Point(10, 10), 40);
let ally = new Ally(new Point(10, 590));

Object.getPrototypeOf(ally) === Ally.prototype;
Object.getPrototypeOf(enemy) === Enemy.prototype;
Ally.prototype !== Enemy.prototype;
Object.getPrototypeOf(Ally.prototype) === Object.getPrototypeOf(Enemy.prototype);
Object.getPrototypeOf(Ally.prototype) === Ship.prototype;
```

---

Y comprobar dónde está cada propiedad

```js
enemy.hasOwnProperty('_score');
enemy.hasOwnProperty('advance');
enemy.hasOwnProperty('moveLeft');

Enemy.prototype.hasOwnProperty('_score');
Enemy.prototype.hasOwnProperty('advance');
Enemy.prototype.hasOwnProperty('moveLeft');

Ship.prototype.hasOwnProperty('_score');
Ship.prototype.hasOwnProperty('advance');
Ship.prototype.hasOwnProperty('moveLeft');
```



# Polimorfismo

---


Las relaciones de herencia que acabamos de establecer nos permiten decir que un enemigo es una instancia del tipo `Enemy`{.js} pero también lo es del tipo `Ship`{.js}

Una misma instancia **tiene múltiples formas** gracias a la herencia En programación orientada a objetos a esto se lo llama **polimorfismo**

---


Alternativamente podemos decir que un enemigo es una instancia de `Enemy`{.js} porque tiene la API de `Enemy`{.js} o que es una instancia de `Ship`{.js} porque tiene la API de `Ship`{.js}

Esto es equivalente a decir que las propiedades `prototype`{.js} de `Enemy`{.js} y `Ship`{.js} están en la cadena de prototipos del objeto

---

El operador `instanceof`{.js} devuelve verdadero si la propiedad `prototype`{.js} de la función de la derecha está en la cadena de prototipos del objeto de la izquierda

```js
enemy instanceof Enemy;  // el primer eslabón
enemy instanceof Ship;   // el segundo
enemy instanceof Object; // el tercero

enemy instanceof Ally;
```

---

En lo referente al estado, resulta conveniente saber qué constructor ha construido el objeto. Esto es como determinar cuál es el **primer eslabón** de la cadena de prototipos

---


Como todos los prototipos tienen una propiedad `constructor`{.js} que referencia al constructor que los tiene, proporcionar esta propiedad siempre recaerá sobre el primer prototipo

```js
enemy.constructor;
enemy.constructor === Enemy; // fue construido por Enemy, no por Ship
enemy.constructor !== Ship; // es cierto que Ship fue utilizado pero nada más
```

---

## Duck typing

> In other words, don't check whether it IS-a duck: check whether it QUACKS-like-a duck, WALKS-like-a duck, etc, etc, depending on exactly what subset of duck-like behaviour you need to play your language-games with

[Alex Martelli sobre polimorfismo](https://groups.google.com/forum/?hl=en#!msg/comp.lang.python/CCs2oJdyuzc/NYjla5HKMOIJ)

---


La frase se refiere a que más que comprobar si algo es una instancia de un tipo, deberíamos comprobar si tiene la funcionalidad que necesitamos

---


JavaScript es tan dinámico que el operador `instanceof`{.js} y la propiedad `constructor`{.js} sólo tienen sentido si seguimos los convenios aprendidos en la lección

---


Nada nos impide borrar la propiedad `constructor`{.js} de un prototipo o sobreescribirla en un objeto determinado. En las nuevas versiones de JavaScript, el prototipo de un objeto puede cambiar después de haber sido construido
