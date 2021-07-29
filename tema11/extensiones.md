---
title: JavaScript como lenguaje de extensión
---

# Lenguajes de scripting

---

## ¿Qué es un lenguaje de scripting?

Los lenguajes de scripting, normalmente interpretados, son lenguajes que son concebidos para ser usados como parte de una herramienta

---

JavaScript fue concebido como una forma de programar sobre el navegador web

Algunos lenguajes de scripting se crearon como lenguajes de propósito general, como Python, pero la mayoría de ellos surgieron como extensiones de herramientas específicas

---

## Ejemplo: Firefox

![Ejemplo: arquitectura Firefox](firefox_architecture.png){width=30%}

---

## Ejemplo: Firefox

- Gecko: Es el núcleo de Firefox y está escrito en C/C++
  	- Tiene un motor Web
  	- Y un engine de renderización
- El motor usa un interprete de JavaScript: Spider-Monkey
- El interprete de JavaScript se comunica con Gecko
- Lo que programas en JavaScript afecta al comportamiento del engine de Firefox

## ¿Cómo se consigue?

---

- Hay que crear una API en C/C++ a la que invocar desde JavaScript
- Hay que crear las llamadas en JavaScript que invocan el API en C/C++











# JavaScript como lenguaje de extensión

---

También JavaScript se usa como lenguaje de extensión de aplicaciones más allá de los navegadores

---

## Usar JavaScript desde C++

---

Como ya has podido deducir, se puede usar JavaScript desde un programa en C++

Tanto [V8](https://github.com/v8/v8/wiki/Getting%20Started%20with%20Embedding) como [SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/How_to_embed_the_JavaScript_engine) pueden ser usados en una aplicación en C++

---

Para hacerlo necesitamos el código fuente de V8 y compilarlo junto con nuestro programa. El código fuente podéis descargarlo aquí [V8 Source Code](https://github.com/v8/v8/wiki/Checking%20out%20source)

Una vez compilado debemos incluir en nuestro programa las cabeceras:

```c
#include "include/libplatform/libplatform.h"
#include "include/v8.h"
```

---

Y crear las estructuras necesarias para cargar el script a ejecutar desde C++ y ejecutarlo

Conseguir que el código JavaScript ejecutado pueda manejar objetos de C++ o que C++ pueda manejar objetos de JavaScript es algo más complicado, pero posible



# Scripting con JavaScript en Tiled

---

A partir de la versión 1.3, Tiled permite crear scripts con JavaScript

<!-- ---

Para hacer scripting, ahora mismo hay que bajarse un *snapshot* de versión beta desde la [página de Tiled](https://thorbjorn.itch.io/tiled) -->

---

![Lo primero es abrir la consola](abrir_consola_tiled.png)

---

![Se abrirá la consola, en cuyo cuadro de texto de abajo podemos ejecutar JavaScript](consola_tiled.png)

---

![Cualquier expresión de JavaScript funciona](js_tiled.png)

---

Se puede pegar un script pequeño de JavaScript en la línea de comandos, o se pueden ejecutar aquellos que está en [la carpeta `extensions`](https://doc.mapeditor.org/en/latest/reference/scripting/#script-extensions)

---

Preguntar algo al usuario:

```js
if(tiled.confirm("¿Quieres borrar todo el mapa?", "Borrado total")) {
	tiled.alert("¡Borrado!");
}
```

---

Recorrer todo el mapa y cambiar una propiedad:

```js
for(let x = 0; x < tiled.activeAsset.width; x++) {
	for(let y = 0; y < tiled.activeAsset.width; y++) {
		tiled.activeAsset.currentLayer.tileAt(x, y).propiedad = valor;
	}
}
```

---

La [API](https://doc.mapeditor.org/en/latest/reference/scripting/) del motor de JavaScript tiene detalles de cómo se puede hacer extensiones a Tiled con JavaScript















# Otros lenguajes de scripting

---

## PHP

PHP es un lenguaje de scripting para permitir expandir la funcionalidad del servidor web Apache

Hoy en día se usa como lenguaje de propósito general para crear aplicaciones web de servidor

---

Su motor, **Zend Engine**, está escrito en C y puede ser usado desde cualquier servidor web como lenguaje de scripting de forma fácil

También se puede extender su funcionalidad escribiendo extensiones en C

---

## Bash

La consola de comandos Bash, consola principal de los sistemas Linux/Unix, tiene un lenguaje de scripting que permite programar sobre ella

---

## Python

Python es un lenguaje de propósito general creado para que fuese fácil de aprender y de usar por usuarios con un nivel de alfabetización básico en lenguajes de programación

Necesita un interprete que debemos instalar en el sistema para poder usarlo (similar a node con JavaScript) y se ha usado mucho como sustituto de los lenguajes de scripting clásicos para sistemas operativos como Bash o la consola de MS-DOS/Windows

---

Actualmente el uso de Python se ha extendido enormemente, no sólo como lenguaje de propósito general, si no como lenguaje de *scripting de propósito general*

Es relativamente fácil usar Python en de una aplicación en otro lenguaje (típicamente C/C++) por lo que se ha usado como lenguaje de scripting en muchas aplicaciones

[Python en una aplicación](https://docs.python.org/3/extending/embedding.html)

---

## Python en Blender

Blender es una herramienta de código libre para crear y renderizar objetos 3D

Blender utiliza Python como lenguaje de extensión de su herramienta. Con Python se pueden crear macros y extender la funcionalidad de Blender

[Python en Blender](https://docs.blender.org/manual/en/latest/advanced/scripting/introduction.html)

---

Internamente Blender utiliza Python para crear su interfaz y algunas de sus herramientas internas

Aunque Blender está escrito en C/C++ usa Python como lenguaje de scripting para facilitar la creación de macros y add-ons por parte de los usuarios

## Lua

[Lua](https://www.lua.org/) es uno de los lenguajes de scripting más usado en motores de juegos

Es relativamente rápido, y es muy fácil conectarlo con en motor en C/C++

---

Lua fue expresamente diseñado para ser usado como lenguaje de scripting en otros lenguajes

Hay una gran [lista de juegos que han utilizado Lua como lenguaje de scripting](https://en.wikipedia.org/wiki/Category:Lua_%28programming_language%29-scripted_video_games)

---

Pero también se usa en aplicaciones

Por ejemplo, el reproductor multimedia VLC utiliza LUA para que los usuarios puedan crear sus propias extensiones

[Scripts para VLC en Lua](https://forum.videolan.org/viewforum.php?f=29)


---

## Luabind

[Luabind](http://www.rasterbar.com/products/luabind.html) es una librería que ayuda a usar Lua desde C++. Simplifica la tarea y permite hacer entre otras cosas:

- Tener clases de C++ en Lua
- Tener funciones y clases de Lua en C++
- Polimorfismo de los métodos de una clase base en C++ desde una clase derivada en Lua

---

## Lua en CryEngine

El motor CryEngine de Crytek utiliza Lua como lenguaje de scripting

Los programadores del engine pueden exponer funciones de sus clases creadas en C++ para que los programadores de scripting en Lua puedan usarlas

[Lua en CryEngine](http://docs.cryengine.com/display/SDKDOC4/Lua+Scripting)







