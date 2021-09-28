---
title: Clases ES6
---

# Estándares ES

---

JavaScript es un lenguaje relativamente antiguo  y ha sufrido muchas modificaciones

Cada modificación oficial establece un nuevo estándar [ECMAScript](https://es.wikipedia.org/wiki/ECMAScript)


# Nueva sintaxis para clases

---

ES6 es uno de los estándares que más ha cambiado la sintaxis en los últimos años

Uno de las cambios más notables es la nueva sintaxis para **clases**

## Nuevas clases

```js
class Enemigo {
  constructor(nombre) { // `constructor` es una palabra reservada para el constructor
    this._nombre = nombre;
  }  

  mostrarNombre() {
    console.log (`Mi nombre es ${this._nombre}`);
  }
}
```

---

Equivale a:

```js
function Enemigo(nombre) {
    this._nombre = nombre;
}

Enemigo.prototype.mostrarNombre() {
  console.log (`Mi nombre es ${this._nombre}`);
}
```

--- 

En este punto no es una revolución muy notable, pero en cuanto empezamos a usar funcionalidad avanzada, la nueva sintaxis ayuda mucho

---

Como en la herencia:

```js
class Enemigo extends Entidad{
  constructor(nombre) {
    this.nombre = nombre; // este código da un error
  }  
}
```

Equivale a:

```js
function Enemigo(nombre) {
    this.nombre = nombre;
}

Enemigo.prototype = Object.create(Entidad.prototype);
Enemigo.prototype.constructor = Enemigo;

```

---

También para llamar a un método de la clase padre:

```js
class Enemigo extends Entidad{ // ES6
  constructor(name) { super(name); }

  atacar(enemigo) { super.atacar(enemigo); }  
}
```

```js
function Enemigo(nombre) { Entidad.call(this, nombre); } // ES5

Enemigo.prototype = Object.create(Entidad.prototype);
Enemigo.prototype.constructor = Enemigo;

Enemigo.prototype.atacar = function (enemigo) {
  Entidad.prototype.atacar.apply(this, [enemigo]);
}

```

---

La sintaxis de clases de ES6 es sólo [azúcar sintáctico](https://es.wikipedia.org/wiki/Azúcar_sintáctico), por detrás, ambas son exactamente lo mismo

Para instanciarlas, se usa `new`{.js} de la misma forma que hemos visto, y el acceso a métodos y propiedades es igual

---

También podemos hacer, igual que con la sintaxis ES6, *getters* y *setters*

```js
class Personaje {
  constructor() {
    this._fuerza = 0;
  }

  get fuerza() {
    return this._fuerza;
  }

  set fuerza(f) {
    this._fuerza = f;
  }
}
```

---

```js
let hero = new Personaje();
hero.fuerza;
hero.fuerza = 5;
hero.fuerza;
```


---

## Hoisting

JavaScript no hace *hoisting* con la declaración de clases