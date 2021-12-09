---
title: Extendiendo el editor de Unity con C#
---


# Scripting con C# en Unity

---

C# en Unity se utiliza principalmente para:

- Creación de contenidos de gameplay
- Extender la funcionalidad del editor

---

La primera ya la hemos usado bastante.

Veamos, por tanto, como modificar el editor con C#.

---

## Generalidades

- Se guardan en una carpeta `Editor` dentro de la carpeta `Assets` de Unity
- No heredan de `MonoBahaviour` sino que usan otras clases de Unity como `Editor` o `EditorWindow`
- Estas clases (y otras) están en la librería `UnityEditor`

```csharp
using UnityEditor;
```

## IMGUI

[**I**mmediate **M**ode **GUI**](https://docs.unity3d.com/ScriptReference/UnityEngine.IMGUIModule.html)

- La creación y el comportamiento de la interfaz se implementan a la vez
- Para crear interfaces de juego y modificar el editor
- Usaremos las factorías de [`GUI`](https://docs.unity3d.com/ScriptReference/GUI.html) y de [`GUILayout`](https://docs.unity3d.com/ScriptReference/GUILayout.html)



# Crear ventanas del editor

---

Sirve para crear nuevas ventanas para incorporarlas al editor de Unity. 

Estas nuevas ventanas nos permitirán hacer funciones adicionales que no están definidas en el editor de Unity.

## Ejemplo: Herramienta para colorear objetos seleccionados

![Ventana de la herramienta para colorear objetos](./colorizer.png)

---

```csharp
using UnityEngine;
using UnityEditor;

public class ColorizerWindow : EditorWindow {
    
    Color selectedColor;

    // Creamos una opción de menú para mostrar la ventana
    [MenuItem("Window/Colorizer")]
    public static void ShowWindow() {
    	// Mostramos la ventana
        GetWindow<ColorizerWindow>("Cambiar color");
    }
...
```


---

```csharp
...
void OnGUI() {
	// Etiqueta de la ventana
    GUILayout.Label("Cambia el color de los objetos seleccionados", EditorStyles.boldLabel);

    // Selector de color
    selectedColor = EditorGUILayout.ColorField("Color", selectedColor);
```

---

```csharp
...
// Layout horizontal
GUILayout.BeginHorizontal();
// Primer botón
if (GUILayout.Button("Colorear seleccionados")) {
	// Selection nos da acceso a los objetos seleccionados
    foreach (GameObject obj in Selection.gameObjects) {
        Renderer selectedRenderer = obj.GetComponent<Renderer>();
        if (selectedRenderer != null) {
			// OJO: esto crea una nueva instancia del material
            // Si usamos sharedMaterial cambiamos el compartido por
            // todos los objetos
            selectedRenderer.material.color = selectedColor;
        }
    }
}
```

---

```csharp
...
// Creamos el botón de Reset
if (GUILayout.Button("Reset")) {
    foreach (GameObject obj in Selection.gameObjects) {
        Renderer selectedRenderer = obj.GetComponent<Renderer>();
        if (selectedRenderer != null) {
            // OJO: esto crea una nueva instancia del material
            // Si usamos sharedMaterial cambiamos el compartido por
            // todos los objetos
            selectedRenderer.material.color = Color.white;
        }
    }
}
// Dejamos de usar el layout horizontal
GUILayout.EndHorizontal();
} // OnGUI
}
```

# Personalizar la inspección de componentes

---

No solo podemos modificar los paneles del inspector sino que también podemos mostrar elementos en la escena que nos ayuden a la hora de definir un comportamiento desde el inspector

---

## Ejemplo: Rutas por Waypoints

![Ruta al seleccionar el objeto con el componente `FollowWaypoints`](./waypoints.png)

---

```csharp
public class FollowWaypoints : MonoBehaviour {
    public Transform [] waypoints;
	
	void Update() {
		// Sigue la ruta de waypoints
	}
```

---

```csharp
using UnityEngine;
using UnityEditor;

[CustomEditor(typeof(FollowWaypoints))]
public class FollowWaypointsEditor : Editor {
	...
```

---

```csharp
	...
	// Dibuja una línea entre los puntos de la ruta
    void OnSceneGUI() {
        FollowWaypoints t = (FollowWaypoints)target;

        if (t == null || t.waypoints == null || t.waypoints.Length <=1)
            return;

        // Seleccionamos el primer punto de ruta
        Vector3 first = t.waypoints[0].position;
        Vector3 current = first;
    ...
```

---


```csharp
	...
        // Iteramos entre el resto de puntos de ruta...
        for (int i = 1; i < t.waypoints.Length; i++) {
            // ... dibujamos una línea entre ellos
            if (t.waypoints[i] != null) {
                Handles.DrawLine(current, t.waypoints[i].transform.position);
                current = t.waypoints[i].transform.position;
            }
        }
        // Dibujamos la línea que cierra la ruta
        Handles.DrawLine(current, first);
    } // OnSceneGUI
}
```

# Crear inspectores de componentes personalizados

---

Sirve para crear editores de componentes (_inspectors_) personalizados con el fin de facilitar y acelerar el desarrollo de gameplay.

