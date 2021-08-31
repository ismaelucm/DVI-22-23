---
title: Extendiendo Tiled con Javascript
---


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








