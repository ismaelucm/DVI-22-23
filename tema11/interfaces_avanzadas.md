---
title: Interfaces de usuario web avanzadas
---

# Librerías para interfaz web

---

Modificar el DOM directamente es tedioso

---

Hay modelos de ingeniería software que han demostrado ser muy útiles para gestionar interfaces

El API del DOM no es, precisamente, uno de ellos

---

Por eso, y gracias a la evolución de los navegadores, la máquina virtual JS y el lenguaje en sí, existen librerías que nos permiten hacer interfaces

---


## Alternativas para interfaces web

[`Angular`](https://angular.io/) (de Google), [`React`](https://reactjs.org/) (de Facebook) y [`Vue.js`](https://vuejs.org/) son algunas de las más usadas

---

Vamos a ver una introducción a los principios básicos de una versión ligera de `React` (`Preact`)


# React


---

React es una librería creada por Facebook en 2013, y mantenida desde entonces por Facebook y la comunidad (se publica como código abierto)

---

El desarrollo está muy activo, y es uno de los proyecto más usados para crear interfaces

En particular, <https://facebook.com> usa React

---

## DOM Virtual

Veremos que React construye un árbol DOM cuando creamos componentes

Sin embargo, React hace uso del *DOM virtual*

---

El DOM virtual es una representación interna de la librería en la que se almacena el estado actual del DOM (la estructura de la página), independientemente de cómo lo almacene el navegador

---

Esto permite mucha *flexibilidad* en la librería, y una mejora del *rendimiento*

Aunque aparentemente modifiquemos mucha parte del DOM en nuestros componentes, React sólo aplicará las diferencias entre el estado anterior y el nuevo

---

## JSX

Para representar los cambios en el DOM que modifican los componentes de la página, podemos usar llamadas al API

Pero también podemos usar algo muy parecido a HTML

---

JSX es una extensión sintáctica de JavaScript, que permite poner etiquetas HTML dentro del mismo código:

```jsx
const parrafo = <p>Esto es un párrafo de verdad</p>
```

---

JSX permite interpolar contenido de JavaScript dentro de las etiquetas:


```jsx
const nombre = 'Juan'
const parrafo = <p>Creo que el señor se llamaba {nombre}</p>
```

---

Pero la máquina virtual de los navegadores no entiende JSX

Necesitamos un proceso que transforme un archivo con extensión `.jsx` a otro `.js`, y que transforme las etiquetas HTML a código JavaScript normal

---

## Babel

[Babel](https://babeljs.io/) es una herramienta que procesa JavaScript y lo transforma (lo que se llama, en la jerga, un "transpilador")

---

En particular (y con algo de configuración), Babel puede transformar JSX en JS

Y hacer muchas cosas más, como transformar JavaScript moderno en JavaScript más antiguo, para que funcione en navegadores sin compatibilidad




# `Preact`

---

Usar JSX con Babel y React funciona muy bien (y tiene buen apoyo de editores como VSCode), pero requiere desplegar bastante "tooling"

---

Vamos a usar Preact (una alternativa ligera a React, con un API muy parecido), y vamos a usar una alternativa a JSX que no necesita Babel

---

Para empezar, sólo necesitamos un `index.html` normal y corriente, que tenga un `<script>`{.html}

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Preact</title>
</head>
<body>
  <script src="gui.js" type="module"></script>
</body>
</html>
```

---

En nuestro `gui.js`, tenemos que importar la librería:

```js
import { html, render, Component } 
   from 'https://unpkg.com/htm/preact/standalone.module.js'
```

---

Estamos usando [`unpkg`](https://unpkg.com/)

`unpkg` es un proyecto que sirve paquetes de `npm` para que se puedan usar directamente desde JavaScript en una web (¡sin necesidad de herramientas!)

---

Con el `import`{.js} anterior, estamos usando directamente Preact y `htm`, una librería que nos permite usar etiquetas HTML en el código

---

Después, sólo tenemos que crear llamar a `render`{.js}, que sustituirá un nodo del DOM (en este caso `document.body`{.js}, la raíz):

```js
render(html`<p>Esto es un párrafo</p>`, document.body)
```

<small>Ahora veremos lo de `` html`...` ``{.js}</small>

---

## Componentes

Esto no tendría mucho uso por sí mismo, pero Preact nos permite definir **componentes**

---

Un *componente* es un objeto JavaScript que representa un nodo complejo en el DOM:

```js
class Parrafo extends Component {
  render() {
    return html`<p>Esto sigue siendo un párrafo</p>`
  }
}
```

---

Así, tendríamos una manera un poco más potente de crear interfaces de usuario:


```js
render(html`<${Parrafo} />`, document.body)
```

---

Pero, antes, veamos cómo estamos construyendo el HTML dentro de JavaScript




# htm

---

[`htm`](https://github.com/developit/htm) es una librería que procesa cadenas JavaScript (`string`{.js}) y las usa como llamadas a funciones de construir el DOM

Como lo que hace Babel, pero sólo desde código, sin herramienta adicional

---

## Plantillas de cadena de texto

`htm` usa "plantillas de cadena de texto" para conseguir esto (["template literals"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals))

Estas cadenas son especiales, y se denotan con `` `...` ``{.js}

---

### Cadenas multilínea

```js
`hola
qué
tal
estamos`
```

---

### Interpolar código

Antes:

```js
const a = 5
console.log('"a" vale', a) // "a" vale 5
```

Después:

```js
const a = 5
console.log(`"a" vale ${a}`) // "a" vale 5

```

---

### Postprocesado de cadenas

```js
html`Cadena JS` // === html('Cadena JS')---más o menos
```

---

Esto quiere decir que hay una función `html`{.js} que transforma la cadena en algo más interesante

---

Es lo que hace la librería `htm`

Define una función especial, `html()`{.js}, que transforma nuestro string con HTML a una estructura que se usará en el DOM virtual

---

En VSCode, por ejemplo, si instalamos la extensión [`lit-html`](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html), veremos los templates que empiezan con `` html`...` ``{.js} con resaltado de sintaxis HTML

---

Con esto, podemos usar `Preact` y `htm` para hacer nuestra interfaz web


# Componentes Preact (o React...)

---

Los componentes son las unidades en Preact

Crearemos componentes que representes nuestros objetos de interfaz

---

Empezamos (como antes) importando `Preact` y `htm`:

```js
import { html, render, Component } from 'https://unpkg.com/htm/preact/standalone.module.js'
```

---

Para crear un componente, podemos extender la clase `Component`{.js} de `Preact`:

```js
class Aviso extends Component {
  render() {
    return html`<b>¡Hola!</b>`
  }
}
```

---

El componente `Aviso`{.js} corresponderá a lo que devuelva la función `render()`{.js}, que en este caso es sólo una cadena en negrita

---

Para que se vea en la página, usamos plantillas de cadena con el nombre de la clase:

```js
render(html`<${Aviso} />`, document.body)
```

---

## Estado en las clases

También podemos usar la clase para guardar el estado de un componente:

```js
class Aviso extends Component {
  constructor(props) {
    super(props)
    this.valor = props.valor
  }
  render() {
    return html`<b>¡mi valor es ${this.valor}!</b>`
  }
}
```

---

Es fundamental llamar al costructor padre de `Component`{.js} con `props`{.js}, para que funcione:

```js
 constructor(props) {
  super(props)
}
```

---

Si queremos pasarle argumentos propios al constructor, seguimos usando HTML:

```js
class Aviso extends Component {
  constructor(props) {
    super(props)
    // ¡props.tamano viene del HTML!
    this.tamano = props.tamano
  }
}

render(html`<${Aviso} tamano=6 />`, document.body)
```

---

La función `render()`{.js} puede devolver diferentes `` html`...` ``{.js}, según el estado de la clase

Con esto, podemos cambiar lo que se muestra por pantalla en nuestra interfaz de usuario

---

## Combinar componentes

Para combinar componentes, simplemente los usamos como HTML

---

Componente base:

```js
class Aviso extends Component {
  constructor(props) {
    super(props)
    this.valor = props.valor
  }
  render() {
    return html`<b>¡mi valor es ${this.valor}!</b>`
  }
}
```

---

Componente que usa `Aviso`{.js}:

```js
class Parrafo extends Component {
  render() {
    return html`<p>Un componente con 
       un aviso (<${Aviso} valor=15 />) </p>`
  }
}
```

---

## Componentes como funciones

Si el componente es sencillo y no tiene que gestionar estado, puede ser una función y no una clase entera:

```js
function Nota(props) {
  return html`<em>frase con énfasis</em>`
}
```

---

## Eventos

También tenemos que programar la funcionalidad de responder a eventos

---

Para esto, en el "HTML", vamos a registrar eventos JavaScript, igual que lo haríamos en etiquetas en un archivo `.html`

Usaremos interpolación de cadenas para poner nuestro código JavaScript

---

```js
function Nota(props) {
  return html`<em onclick=${(e) => {
    e.stopPropagation()
    console.log('Este evento no se progaga')
  }}>¡Pincha aquí para ver lo que imprimo!</em>`
}
```


---

## Métodos para callbacks

Es posible que queramos, en un componente descrito como clase, usar métodos para los callbacks

---

Para ello, tenemos que usar `bind`{.js}, para que cuando se llame al método, `this`{.js} apunte a la instancia del objeto

---


```js
class ComponenteMetodoCallback extends Component {
  render() {
    return html`<p 
      onclick=${this.handleClick.bind(this)}>Prueba</p>`
  }

  handleClick(e) {
    // `this` funciona si hemos hecho `bind`
    e.preventDefault()
    console.log('Se ha hecho clic.')
  }
}
```


---

## Mucho más

React/Preact y todas estas librerías hacen *muchas más cosas*

Podéis mirar la [documentación de Preact](https://preactjs.com/guide/v10/getting-started), pero con estos pasos ya se puede montar una funcionalidad básica