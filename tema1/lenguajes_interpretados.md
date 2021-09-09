---
title: 'Lenguajes interpretados y dinámicos'
...

# Lenguajes interpretados


## Lenguajes compilados a código máquina

![Funcionamiento (Ej. C++)](compilar.dot.svg)

## Lenguajes compilados a código intermedio (bytecode)

![Funcionamiento (Ej. C#, Java)](compilado-bytecode.dot.svg)

## Qué son lenguajes interpretados

---

Los [lenguajes interpretados](https://en.wikipedia.org/wiki/Interpreted_language) son lenguajes diseñados para describir programas que **no** se ejecutan en el procesador, sino en otro programa que emula a un procesador, llamado **intérprete**

![Esquema de lenguaje interpretado](interpretes.dot.svg){height=30%}




## Cómo funcionan

![Funcionamiento de un intérprete](instrucciones.dot.svg)

## En comparación con los compilados


![Funcionamiento de un programa compilado](compilado.dot.svg)


## ECMAScript

ECMAScript/JavaScript es el lenguaje de los navegadores

Comenzó como un pequeño lenguaje que se interpretaba dentro de [Netscape](https://es.wikipedia.org/wiki/Netscape_Navigator), principalmente para incluir efectos y operaciones sencillas

![Logo Netscape](netscape_logo.svg){width=50%}\

# Lenguajes dinámicos

## ¿Qué son los lenguajes dinámicos?

Son lenguajes *diseñados para* hacer durante la ejecución lo que otros hacen cuando compilan

Aunque no es una clasificación perfectamente formal, se esperan ciertos atributos en estos lenguajes

## Evaluación

Los lenguajes dinámicos suelen ser capaces de evaluar código generado dinámicamente, con una función de tipo `eval`{.js}

## Objetos dinámicos

Los lenguajes dinámicos pueden cambiar los campos de sus estructuras de datos en tiempo de ejecución:

```javascript
const a = {};     // se define el objeto sin campos
a.campo = 'hola'; // se añade un campo nuevo
```


## Introspección

Otra característica típica es la *introspección* (*reflection*), o conocer y cambiar las propiedades del programa en sí




# Tipado dinámico y estático


## Tipado estático

Los lenguajes de tipado estático tienen sistemas para declarar y fijar el tipo de las variables, estructuras de datos y funciones

Por ejemplo, a través de la declaración de tipos:

```c
int a = 5;
int suma(int x, int y) { return x + y; }
```


## Compilado de tipos estáticos

El compilador tiene mecanismos para saber si una expresión tiene el tipo correcto, *durante la compilación*:

```cpp
int suma(int x, int y) { return x + y; } 

suma(4, "juan"); // el compilador lanza un error
```

## Tipado dinámico

Los lenguajes de tipado dinámico, por el contrario, no tienen compiladores que comprueben el tipo

Así que la corrección será comprobado más tarde, *durante la ejecución*

```javascript
function resta(x, y) { return x - y; } 

resta(4, "juan"); // el intérprete no da error hasta que esto no se ejecuta
```


# JavaScript

## JavaScript

JavaScript es un dialecto de
[ECMAScript](https://es.wikipedia.org/wiki/ECMAScript)

```javascript
const variable = 6;

if(variable === 5) {
    console.log("Sí, es igual a 5.")
}
else {
    console.log("Pues no, vale " + variable + ".")
}
```

## JavaScript

Su sintaxis es parecida a la de C/C++/Java (intencionadamente)

Cuando JS fue creado, Java estaba muy de moda. Por eso se eligieron el nombre y la sintaxis

> Pero JavaScript tiene **muy poco que ver con Java**


## JavaScript en los navegadores

Casi todos los navegadores "modernos" tienen dentro una máquina virtual que ejecuta JavaScript

Además, tienen un API llamado DOM (*Document Object Model*) que permite acceder a las partes del documento (por ejemplo, acceder a un párrafo o imagen de una página web)

<!-- Prueba con el navegador para ver el acceso al DOM:
document.getElementsByTagName("h2").forEach((item) => item.style.color = "red")
 -->

## JavaScript en el mundo real

JavaScript hoy en día se usa para:

- Videojuegos (Phaser)
- IDEs (Construct, VSCode)
- Gmail, Calendar...
- Herramientas online: [Bitsy](https://ledoux.itch.io/bitsy), [Piskel](https://www.piskelapp.com/p/create/sprite), [Chiptone](https://sfbgames.itch.io/chiptone), [Spritesheet Packer](https://www.codeandweb.com/free-sprite-sheet-packer)...
- Facebook, Instagram
- Scripting
- *Servidores*

# Ejecutando JavaScript

## En el navegador

A lo largo del curso, escribiremos JavaScript que se ejecutará dentro del navegador

Porque **el navegador tiene incluido un intérprete de Javascript**

Pero hay otros intérpretes que son capaces de interpretar JavaScript y **algunos no son parte de un navegador**

## Node.js

[Node.js](https://nodejs.org/) es un *intérprete* de JavaScript:

#. Recibe código JS como entrada 
#. Lo analiza (hace *parsing*) 
#. Crea una representación intermedia → ¡no lo compila!
#. Ejecuta esa representación intermedia

## Node.js como máquina virtual

Por lo tanto, `Node.js` contiene una máquina virtual capaz de leer, entender y ejecutar JS

Una MV es sólo código, un programa que "simula" ser un ordenador

Esta máquina se llama [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine))

[**V8** es el motor de [Chrome](https://www.google.com/chrome/browser/desktop/index.html).]{.fragment}

## Usando Node.js

`Node.js` se puede usar desde línea de comandos:

```bash
node script.js

# Ejecuta el contenido de script.js
```

---

También lo podemos usar como un [REPL](https://es.wikipedia.org/wiki/REPL):

```bash
➜ node
Welcome to Node.js v12.8.1.
Type ".help" for more information.
> console.log("Probando")
Probando
undefined
> 2 + 5
7
```