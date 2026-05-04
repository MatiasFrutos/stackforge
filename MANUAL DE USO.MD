============================================================
 STACKFORGE - MANUAL DE USO
============================================================

IDE visual, moderno e interactivo para programar en Forth.

Desarrollado por:
Matías Isaac Frutos Gonzales

Para:
ZERNYX Tech Studio

Sitio web:
https://www.zernyxtechstudio.xyz/

Versión:
1.0.0

Año:
2026

============================================================
 1. INTRODUCCIÓN
============================================================

StackForge es una aplicación visual para escribir, ejecutar y analizar código Forth.

Su objetivo es ayudar al usuario a entender cómo funciona un lenguaje basado en pila, mostrando en tiempo real qué valores entran, qué valores salen y cómo cambia el estado interno del programa.

A diferencia de una consola tradicional, StackForge permite ver visualmente la pila de datos, ejecutar comandos rápidos, revisar palabras disponibles, analizar el comportamiento del código y reconstruir la ejecución paso a paso.

En términos simples:

StackForge permite ver lo que normalmente queda oculto dentro del intérprete.

============================================================
 2. ¿PARA QUÉ SIRVE STACKFORGE?
============================================================

StackForge sirve para:

- Aprender programación en Forth.
- Probar instrucciones Forth de forma visual.
- Entender cómo funciona una pila de datos.
- Ver el resultado de cada operación.
- Ejecutar pequeños programas educativos.
- Analizar el comportamiento del código.
- Revisar errores básicos de ejecución.
- Practicar lógica stack-based.
- Enseñar conceptos de programación de bajo nivel.

Está pensado para estudiantes, docentes, programadores técnicos, makers, desarrolladores de sistemas embebidos e interesados en lenguajes clásicos.

============================================================
 3. CONCEPTOS BÁSICOS
============================================================

Forth es un lenguaje basado en pila.

Esto significa que los valores se guardan en una estructura llamada stack o pila.

La pila funciona con una lógica simple:

Último valor en entrar, primer valor en salir.

Ejemplo:

Código:

2 3 +

Funcionamiento:

1. Entra el número 2 a la pila.
2. Entra el número 3 a la pila.
3. El operador + toma 2 y 3.
4. Suma ambos valores.
5. Devuelve 5 a la pila.

Resultado final:

5

============================================================
 4. PANTALLA PRINCIPAL
============================================================

La pantalla principal de StackForge está dividida en varios paneles funcionales.

Los principales son:

- Editor de código.
- Toolbar o barra de acciones.
- Visualizador de pila.
- Diccionario de palabras.
- REPL integrado.
- Stack Replay.
- Stack DNA.
- Barra de estado.

Cada panel cumple una función específica dentro del flujo de trabajo.

============================================================
 5. EDITOR DE CÓDIGO
============================================================

El editor es el espacio principal donde se escribe el código Forth.

Desde ahí el usuario puede escribir instrucciones como:

2 3 +
10 5 -
4 6 *
20 4 /
1 2 3 dup
5 8 swap

Funciones principales del editor:

- Escribir código Forth.
- Ejecutar el programa completo.
- Ver tokens o instrucciones interpretadas.
- Probar ejemplos.
- Preparar código para análisis.

Uso recomendado:

1. Escribir el código en el editor.
2. Presionar el botón de ejecutar.
3. Revisar la pila visual.
4. Revisar errores si aparecen.
5. Usar Stack Replay o Stack DNA para análisis avanzado.

============================================================
 6. BOTÓN EJECUTAR
============================================================

El botón Ejecutar procesa el código escrito en el editor.

Cuando se presiona:

- El intérprete lee el código.
- Divide el texto en tokens.
- Ejecuta cada token en orden.
- Actualiza la pila.
- Muestra el resultado final.
- Actualiza la barra de estado.

Ejemplo:

Código:

2 3 + 4 *

Resultado:

20

Explicación:

2 3 + genera 5.
Luego 5 4 * genera 20.

============================================================
 7. VISUALIZADOR DE PILA
============================================================

El visualizador de pila muestra los valores activos después de ejecutar código.

Permite ver:

- Valores almacenados.
- Orden de la pila.
- Valor superior.
- Estado vacío.
- Cambios después de cada ejecución.

Ejemplo:

Código:

10 20 30

Pila resultante:

TOP
30
20
10
BOTTOM

El último valor ingresado queda arriba.

============================================================
 8. DICCIONARIO DE PALABRAS
============================================================

El diccionario muestra las palabras disponibles para usar en StackForge.

Palabras básicas soportadas:

+       Suma dos valores.
-       Resta dos valores.
*       Multiplica dos valores.
/       Divide dos valores.
mod     Devuelve el resto de una división.

dup     Duplica el valor superior.
drop    Elimina el valor superior.
swap    Intercambia los dos valores superiores.
over    Copia el segundo valor y lo coloca arriba.
rot     Rota los tres valores superiores.
nip     Elimina el segundo valor.

clear   Limpia la pila.
.       Muestra o consume el valor superior.
.s      Muestra el estado de la pila.
cr      Inserta salto de línea.

Operadores de comparación:

=       Compara igualdad.
>       Mayor que.
<       Menor que.
>=      Mayor o igual.
<=      Menor o igual.

============================================================
 9. REPL INTEGRADO
============================================================

El REPL es una consola rápida para probar comandos sin modificar el código principal del editor.

Sirve para ejecutar instrucciones cortas.

Ejemplos:

2 2 +
dup
clear
10 5 /

Uso recomendado:

- Probar operaciones rápidas.
- Ver cambios inmediatos en la pila.
- Practicar instrucciones individuales.
- Validar una operación antes de usarla en el editor.

El REPL comparte estado con la aplicación, por lo que puede modificar la pila activa.

============================================================
 10. STACK REPLAY
============================================================

Stack Replay permite reconstruir visualmente la ejecución del código paso a paso.

Es una línea de tiempo token por token.

Muestra:

- Token actual.
- Estado de la pila antes del token.
- Estado de la pila después del token.
- Movimiento generado.
- Error si ocurrió.
- Botón anterior.
- Botón siguiente.
- Timeline de pasos.

Ejemplo:

Código:

2 3 +

Replay:

Paso 1:
Token: 2
Antes: vacío
Después: 2

Paso 2:
Token: 3
Antes: 2
Después: 2 · 3

Paso 3:
Token: +
Antes: 2 · 3
Después: 5

Uso recomendado:

- Entender cómo se llegó al resultado.
- Enseñar operaciones Forth.
- Depurar errores.
- Revisar comportamiento de la pila.
- Analizar programas paso a paso.

============================================================
 11. STACK DNA
============================================================

Stack DNA analiza el código Forth y genera un diagnóstico operativo.

Muestra métricas como:

- Cantidad de tokens.
- Profundidad máxima de pila.
- Cantidad de operaciones aritméticas.
- Cantidad de operaciones de pila.
- Palabras más usadas.
- Resultado final.
- Errores detectados.
- Nivel de riesgo operativo.

El riesgo puede mostrarse como:

- Bajo.
- Medio.
- Alto.

El riesgo no significa que el programa sea peligroso. Indica qué tan complejo o propenso a errores puede ser según su comportamiento.

Uso recomendado:

- Revisar complejidad del código.
- Detectar uso excesivo de operaciones.
- Ver palabras frecuentes.
- Analizar posibles errores.
- Comparar versiones de un mismo programa.

============================================================
 12. BARRA DE ESTADO
============================================================

La barra de estado muestra información rápida del sistema.

Puede incluir:

- Estado operativo.
- Última instrucción ejecutada.
- Tamaño actual de la pila.
- Cantidad de palabras disponibles.
- Cantidad de ejecuciones.
- Errores recientes.

Sirve como tablero de control rápido para saber qué está pasando en la aplicación.

============================================================
 13. EJEMPLOS DE USO
============================================================

------------------------------------------------------------
 EJEMPLO 1 - SUMA SIMPLE
------------------------------------------------------------

Código:

2 3 +

Resultado:

5

Explicación:

Se apilan 2 y 3.
El operador + suma ambos valores.
El resultado queda en la pila.

------------------------------------------------------------
 EJEMPLO 2 - MULTIPLICACIÓN
------------------------------------------------------------

Código:

4 5 *

Resultado:

20

------------------------------------------------------------
 EJEMPLO 3 - DUPLICAR VALOR
------------------------------------------------------------

Código:

7 dup

Resultado:

7 7

Explicación:

dup copia el valor superior de la pila.

------------------------------------------------------------
 EJEMPLO 4 - INTERCAMBIAR VALORES
------------------------------------------------------------

Código:

10 20 swap

Resultado:

20 10

Explicación:

swap intercambia los dos valores superiores.

------------------------------------------------------------
 EJEMPLO 5 - USAR OVER
------------------------------------------------------------

Código:

1 2 over

Resultado:

1 2 1

Explicación:

over copia el segundo valor de la pila y lo coloca arriba.

------------------------------------------------------------
 EJEMPLO 6 - OPERACIÓN COMBINADA
------------------------------------------------------------

Código:

2 3 + 4 *

Resultado:

20

Explicación:

2 + 3 = 5
5 * 4 = 20

------------------------------------------------------------
 EJEMPLO 7 - LIMPIAR PILA
------------------------------------------------------------

Código:

clear

Resultado:

Pila vacía.

============================================================
 14. ERRORES COMUNES
============================================================

------------------------------------------------------------
 ERROR: NO HAY SUFICIENTES VALORES
------------------------------------------------------------

Ejemplo:

+

Motivo:

El operador + necesita dos valores en la pila.

Solución:

Usar:

2 3 +

------------------------------------------------------------
 ERROR: PALABRA DESCONOCIDA
------------------------------------------------------------

Ejemplo:

hola

Motivo:

La palabra no existe en el diccionario de StackForge.

Solución:

Usar una palabra soportada o revisar la escritura.

------------------------------------------------------------
 ERROR: DIVISIÓN POR CERO
------------------------------------------------------------

Ejemplo:

10 0 /

Motivo:

No se puede dividir por cero.

Solución:

Cambiar el divisor por un número válido.

------------------------------------------------------------
 ERROR: PILA VACÍA
------------------------------------------------------------

Ejemplo:

drop

Motivo:

drop necesita un valor para eliminar.

Solución:

Agregar un valor antes:

5 drop

============================================================
 15. BUENAS PRÁCTICAS
============================================================

Para usar StackForge de forma eficiente:

- Empezar con operaciones simples.
- Revisar siempre la pila después de ejecutar.
- Usar Stack Replay para entender el flujo.
- Usar Stack DNA para revisar complejidad.
- Limpiar la pila antes de probar otro ejemplo.
- Escribir código en bloques pequeños.
- Verificar que cada operación tenga suficientes valores.
- Usar el REPL para pruebas rápidas.
- Revisar el diccionario antes de usar palabras nuevas.

============================================================
 16. FLUJO RECOMENDADO DE TRABAJO
============================================================

1. Abrir StackForge.
2. Escribir código Forth en el editor.
3. Ejecutar el código.
4. Revisar la pila visual.
5. Ejecutar Stack Replay.
6. Avanzar paso a paso.
7. Ejecutar Stack DNA.
8. Revisar métricas y riesgo.
9. Corregir el código si hace falta.
10. Volver a ejecutar.

Este flujo permite aprender, probar y mejorar el código de forma ordenada.

============================================================
 17. ATAJOS PREVISTOS
============================================================

Algunas versiones pueden incluir atajos de teclado como:

Ctrl + Enter
Ejecutar código.

Ctrl + Backspace
Limpiar pila.

Ctrl + Shift + R
Resetear sesión.

Ctrl + `
Foco futuro en REPL.

Si un atajo no funciona, usar los botones visuales de la interfaz.

============================================================
 18. MODO WEB Y MODO ESCRITORIO
============================================================

StackForge puede usarse como:

- Web App en navegador.
- Aplicación de escritorio para Windows mediante EXE.

En modo desarrollo se ejecuta con:

npm run dev

En modo escritorio de desarrollo:

npm run dev:desktop

En versión final, el usuario solo abre:

StackForge.exe

No necesita instalar Node.js ni ejecutar comandos si usa la versión compilada.

============================================================
 19. INSTALACIÓN DEL EXE
============================================================

Si se entrega como instalador:

1. Abrir StackForge-1.0.0-x64.exe.
2. Seguir los pasos del instalador.
3. Elegir carpeta de instalación si el instalador lo permite.
4. Crear acceso directo si se desea.
5. Abrir StackForge desde el escritorio o menú inicio.

Si Windows muestra advertencia SmartScreen:

1. Presionar Más información.
2. Elegir Ejecutar de todas formas.

Esto puede ocurrir porque el ejecutable no está firmado digitalmente.

============================================================
 20. USO DEL PORTABLE
============================================================

Si se entrega como portable:

1. Copiar el archivo portable a una carpeta.
2. Ejecutarlo con doble clic.
3. No requiere instalación tradicional.

Recomendación:

Guardar el portable en una carpeta propia, por ejemplo:

C:\ZERNYX\StackForge\

============================================================
 21. LIMITACIONES DE LA VERSIÓN 1.0.0
============================================================

La versión MVP inicial puede tener estas limitaciones:

- No soporta todavía todo el estándar completo de Forth.
- No incluye todavía debugger avanzado.
- No incluye todavía importación/exportación completa.
- No incluye todavía definición avanzada de palabras en todos los casos.
- No incluye todavía loops complejos.
- No incluye todavía integración con backend.
- No guarda proyectos en base de datos.

Estas funciones pueden agregarse en futuras versiones.

============================================================
 22. RECOMENDACIONES PARA DOCENTES O DEMOS
============================================================

Para enseñar Forth con StackForge:

1. Empezar con números simples.
2. Mostrar cómo se apilan los valores.
3. Ejecutar una suma.
4. Abrir Stack Replay.
5. Mostrar el antes y después de cada token.
6. Ejecutar Stack DNA.
7. Explicar las métricas.
8. Repetir con dup, swap, over y drop.

StackForge es especialmente útil para explicar visualmente conceptos que en consola quedan ocultos.

============================================================
 23. GLOSARIO RÁPIDO
============================================================

Stack:
Pila de datos donde se guardan valores.

TOP:
Valor superior de la pila.

BOTTOM:
Base de la pila.

Token:
Cada palabra, número u operador que el intérprete procesa.

REPL:
Consola interactiva para ejecutar comandos rápidos.

Diccionario:
Listado de palabras disponibles en Forth.

Stack Replay:
Herramienta para ver la ejecución paso a paso.

Stack DNA:
Herramienta para analizar métricas y comportamiento del código.

Intérprete:
Motor que lee y ejecuta el código Forth.

============================================================
 24. SOPORTE Y CRÉDITOS
============================================================

Proyecto:
StackForge

Tipo:
IDE visual para Forth

Desarrollado por:
Matías Isaac Frutos Gonzales

Para:
ZERNYX Tech Studio

Sitio web:
https://www.zernyxtechstudio.xyz/

Versión:
1.0.0

Año:
2026

============================================================
 25. CIERRE
============================================================

StackForge fue creado para transformar la experiencia clásica de Forth en una herramienta visual, clara y moderna.

Su valor principal está en mostrar el comportamiento interno de la pila, permitiendo que el usuario aprenda, pruebe y entienda el código de forma más simple.

StackForge no solo ejecuta código.

Lo muestra.
Lo explica.
Lo analiza.

============================================================
 FIN DEL MANUAL
============================================================