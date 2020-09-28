---
title: Introducción a los videojuegos en red
---

# Aviso

---

- Este tema no es una introducción a las redes
- Omite casi todo lo importante de su funcionamiento
- Sólo vale para programar algo rápido y sencillo
- Muchos gatitos sufrirán si creéis que sabéis de redes
- Me despedirán si se enteran de que os he contado redes

. . .

**Esto no está ocurriendo en realidad**












# Topologías de red

---

Una red son sólo dos o más ordenadores conectados

---

Para que esto funcione, los nodos de la red tienen conocer *el protocolo de comunicación*

---

![Las redes y los protocolos ocurren según un modelo de capas](osi.svg)


---

## TCP y UPD

En la capa de transporte, en uno de los estándares (*IP*) hay un par de protocolos muy relacionados: *TCP* y *UDP*

---

Son alternativas, con ventajas e inconvenientes, para enviar **paquetes** de datos

- UDP tiene menos sobrecarga
- TCP es más fiable

---

En videojuegos se usan ambos (dependiendo de para qué), pero nosotros **vamos a usar sólo TCP**



















# Redes cliente-servidor

---

Una manera usual y típica de hacer una conexión en red (en nuestro caso, en Internet), es con un modelo *cliente*-*servidor*

---

## El servidor

En un **programa** (no una máquina) que está siempre ejecutando, y recibe peticiones de conexión de los clientes

Si acepta una conexión, se creará un canal de comunicación bidireccional con ese cliente

---

El servidor se ejecuta en algún ordenador conectado a una red, y eso le da una dirección única: **su dirección IP**

---

Hay varias maneras de asignar la dirección IP a un ordenador (interfaz de red, en realidad)

Puede ser que te asignen una cada vez que te conectes a un route (IP dinámica, puede cambiar en cada reconexión) o que el sistema operativo tenga configurada la IP que quiere (IP estática)

---

Obviamente, queremos que el servidor tenga una IP estática para que los clientes sepan a quién conectarse

---

Además, cada programa puede comunicarse, dentro de una misma IP, en un **puerto concreto** (que es sólo un número)

---

Es decir, en una misma máquina (IP: 147.96.92.63), podríamos tener:

- Un programa que sirva páginas web en el puerto 80 (147.96.92.63:80)
- Un programa que sirva la lógica de un videojuego en el puerto 3000 (147.96.92.63:3000)

---

A veces, podemos tener un nombre para ese ordenador (<http://www.ucm.es>), pero estos nombres son sólo un "alias" para la dirección IP

---

## El cliente

Es un programa que:

- Conoce la dirección IP de un servidor (para poder "llamar")
- Le solicita conectarse
- Una vez conectado, puede enviar y recibir mensajes *sólo al servidor*
- En una arquitectura cliente-servidor pura, *los clientes no hablan entre sí*


---

![Arquitectura cliente-servidor](clienteservidor.svg){width=60%}










# Comunicación simple de nodos

---

Un sistema simple (como los que vamos a usar), tendría un protocolo como:

#. El servidor está arrancado y *escuchando* en un puerto concreto
#. El cliente "llama" a la IP del servidor, a través del puerto concreto
#. El servidor acepta, y añade al cliente a su lista
#. El cliente y el servidor se intercambian mensajes
#. El cliente se desconecta, y el servidor lo saca de su lista