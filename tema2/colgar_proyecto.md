---
title: Publicar proyecto en la web
...

# Cómo empaquetar

---

Hay que alojar el proyecto en un sitio web

Todos, a través del [servicio de páginas públicas en GitHub](https://docs.github.com/en/pages/getting-started-with-github-pages) podéis simplemente hacer un commit del proyecto y servir la URL

---

Alternativas:

1. Sólo tenéis que crear una rama `main` en un repositorio, y tener ahí el archivo `index.html` apropiado (los servidores web usan el documento `index.html` como el servido por defecto)
2. Tener nuestra versión de producción en una carpeta `docs` de `main` (tenéis que configurarlo en "Settings")
3. Tener nuestra versión de producción en una rama `gh-pages` (que podéis/deberíais crear como [orphan branch](https://jiafulow.github.io/blog/2020/07/09/create-gh-pages-branch-in-existing-repo/))

---

Una ventaja de hacerlo desde `main` es que no hay que hacer nada más que desarrollar y hacer `push`, y servimos los mismos archivos de desarrollo

En general *esto no es idóneo*, pero acelera y simplifica el proceso

---

Una ventaja de hacerlo desde `docs` o desde `gh-pages` es que, si el repositorio es privado, sólo se servirá/será público lo de esa carpeta

---

## Rutas

---

<!-- Recordemos que Phaser no usa recursos cargados desde local, hace falta hacerlo a través de un servidor web

--- -->

Tened cuidado con los recursos:

- Referenciadlos con **rutas relativas** a vuestros `.html` y `.js` (`imgs/imagen.png`), en vez de **rutas absolutas** (`http://mi.ruta.cambiante/imgs/imagen.png`)
- Aseguraos de que están cargados antes de iniciar su uso
- Aseguraos de que están siempre disponibles

---

## Página en la que incluir el proyecto

El archivo `index.html` tiene que ser una página presentable y "bonita"

---

Tiene que tener el título del proyecto, un resumen del GDD (una versión en HTML), enlaces pertinentes (como, por ejemplo, al código en `GitHub`), instrucciones y cualquier información adicional relevante

---

Además, hay que poner la licencia del mismo e información de la asignatura

# Desarrollo y despliegue

---

No tenéis que desarrollar con la máquina de GitHub, sino en local

Hacer `push` para probar es lento y es una carga innecesaria

---

Siempre:

- Abrir vuestro editor favorito con los archivos html y js
- Arrancar un servidor con `npx live-server` o similar
- Abrir el navegador con la URL del servidor local
- Abrir las herramientas de desarrollo del navegador

---

> Revisad los recursos del Campus:
> 
> - Depurar con Google Chrome
> - Depurar JavaScript en el navegador

---

Cuando funcione:

- Hacer `push` y publicar `main`
- Publicar sólo carpeta `docs` o rama `gh-pages` y copiar a esta carpeta/rama sólo cuando haya material mejorado

<!-- 
# Makefiles

---

Cuando se crea un proyecto, desplegar o construir siempre es una tarea importante

Pero si es manual, es tediosa y propensa a errores

---

Por eso se suelen crear guiones de construcción que nos sirven para automatizar el proceso:

```bash
# construir.sh
mkdir -p docs
cp *.html docs/
cp -r assets/ docs/
```

---

Un script sencillo funciona cuando hay pocos archivos, pero cuando el proyecto crece, sólo queremos modificar aquello que cambia

Para eso tenemos `make` y sus `Makefiles`

---

```Makefile
all: docs/index.html docs/game.js

docs/%.html: %.html
  cp $< $@

docs/%.js: %.js
  cp $< $@

clean:
  rm -rf docs/

.PHONY: all clean
```

---

Así, podemos construir:

```bash
make # o make all
```

O borrar todo:

```bash
make clean
```

---

De hecho, podemos hacer una regla para que los archivos se copien siempre que cambien:

```Makefile
watch: all
	watchman-make -p *.html *.js --run make

.PHONY: watch
```

---


Para ejecutar un `Makefile` hace falta ejecutar (y tener instalado) `make` en el directorio en el que está el `Makefile`

```bash
-> ls
.
..
Makefile
-> make watch
```

---

Esto hace que publicar en la carpeta `docs` sea mucho más sencillo -->