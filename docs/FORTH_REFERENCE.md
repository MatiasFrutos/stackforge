# StackForge — Referencia rápida de Forth

Este documento resume las palabras Forth soportadas inicialmente por StackForge.

StackForge implementa un subconjunto básico de Forth para el MVP. El objetivo inicial no es cubrir todo el estándar, sino construir una base visual, clara y educativa.

================================================================
CONCEPTO PRINCIPAL
================================================================

Forth trabaja con una pila de datos.

Ejemplo:

2 3 +

Flujo:

1. Se apila 2
2. Se apila 3
3. La palabra + toma 2 y 3
4. Suma ambos valores
5. Apila el resultado 5

Resultado:

5

================================================================
NOTACION
================================================================

En esta referencia se usa la siguiente notación:

( antes -- después )

Ejemplo:

+    ( a b -- resultado )

Significa:

Antes de ejecutar +, la pila debe tener dos valores: a y b.
Después de ejecutar +, esos valores se reemplazan por resultado.

================================================================
NUMEROS
================================================================

Los números se apilan directamente.

Ejemplo:

10 20 30

Resultado en pila:

10 20 30

También se soportan decimales:

2.5 1.5 +

Resultado:

4

================================================================
OPERACIONES ARITMETICAS
================================================================

----------------------------------------------------------------
+
----------------------------------------------------------------

Suma dos valores.

Stack effect:

( a b -- a+b )

Ejemplo:

2 3 +

Resultado:

5

----------------------------------------------------------------
-
----------------------------------------------------------------

Resta dos valores.

Stack effect:

( a b -- a-b )

Ejemplo:

10 4 -

Resultado:

6

----------------------------------------------------------------
*
----------------------------------------------------------------

Multiplica dos valores.

Stack effect:

( a b -- a*b )

Ejemplo:

6 7 *

Resultado:

42

----------------------------------------------------------------
/
----------------------------------------------------------------

Divide dos valores.

Stack effect:

( a b -- a/b )

Ejemplo:

20 5 /

Resultado:

4

Nota:

Si el divisor es 0, StackForge devuelve error:

Division por cero

----------------------------------------------------------------
mod
----------------------------------------------------------------

Devuelve el resto de una división.

Stack effect:

( a b -- resto )

Ejemplo:

10 3 mod

Resultado:

1

================================================================
OPERACIONES DE COMPARACION
================================================================

En StackForge, las comparaciones devuelven:

1 = verdadero
0 = falso

----------------------------------------------------------------
=
----------------------------------------------------------------

Compara igualdad estricta.

Stack effect:

( a b -- flag )

Ejemplo:

5 5 =

Resultado:

1

Ejemplo:

5 3 =

Resultado:

0

----------------------------------------------------------------
>
----------------------------------------------------------------

Evalúa si a es mayor que b.

Stack effect:

( a b -- flag )

Ejemplo:

10 4 >

Resultado:

1

----------------------------------------------------------------
<
----------------------------------------------------------------

Evalúa si a es menor que b.

Stack effect:

( a b -- flag )

Ejemplo:

3 8 <

Resultado:

1

----------------------------------------------------------------
>=
----------------------------------------------------------------

Evalúa si a es mayor o igual que b.

Stack effect:

( a b -- flag )

Ejemplo:

5 5 >=

Resultado:

1

----------------------------------------------------------------
<=
----------------------------------------------------------------

Evalúa si a es menor o igual que b.

Stack effect:

( a b -- flag )

Ejemplo:

4 9 <=

Resultado:

1

================================================================
OPERACIONES DE PILA
================================================================

----------------------------------------------------------------
dup
----------------------------------------------------------------

Duplica el valor superior de la pila.

Stack effect:

( a -- a a )

Ejemplo:

5 dup

Resultado:

5 5

----------------------------------------------------------------
drop
----------------------------------------------------------------

Elimina el valor superior de la pila.

Stack effect:

( a -- )

Ejemplo:

10 20 drop

Resultado:

10

----------------------------------------------------------------
swap
----------------------------------------------------------------

Intercambia los dos valores superiores.

Stack effect:

( a b -- b a )

Ejemplo:

10 20 swap

Resultado:

20 10

----------------------------------------------------------------
over
----------------------------------------------------------------

Copia el segundo valor al tope.

Stack effect:

( a b -- a b a )

Ejemplo:

10 20 over

Resultado:

10 20 10

----------------------------------------------------------------
rot
----------------------------------------------------------------

Rota los tres valores superiores.

Stack effect:

( a b c -- b c a )

Ejemplo:

1 2 3 rot

Resultado:

2 3 1

----------------------------------------------------------------
nip
----------------------------------------------------------------

Elimina el segundo valor, conservando el superior.

Stack effect:

( a b -- b )

Ejemplo:

10 20 nip

Resultado:

20

----------------------------------------------------------------
clear
----------------------------------------------------------------

Limpia toda la pila.

Stack effect:

( ... -- )

Ejemplo:

1 2 3 clear

Resultado:

pila vacía

================================================================
SALIDA
================================================================

----------------------------------------------------------------
.
----------------------------------------------------------------

Extrae el valor superior y lo envía a la salida textual.

Stack effect:

( a -- )

Ejemplo:

10 .

Salida:

10

Pila:

vacía

----------------------------------------------------------------
.s
----------------------------------------------------------------

Muestra el estado actual de la pila sin modificarla.

Stack effect:

( ... -- ... )

Ejemplo:

1 2 3 .s

Salida:

<3> 1 2 3

Pila:

1 2 3

----------------------------------------------------------------
cr
----------------------------------------------------------------

Agrega un salto de línea a la salida.

Ejemplo:

cr

Resultado:

salto de línea en output

================================================================
STRINGS
================================================================

StackForge soporta salida básica de strings usando:

." texto"

Ejemplo:

." Hola StackForge"

Salida:

Hola StackForge

Nota:

En esta versión MVP, los strings están pensados para salida simple.

================================================================
COMENTARIOS
================================================================

----------------------------------------------------------------
Comentario de línea
----------------------------------------------------------------

Se usa \ para iniciar un comentario hasta el final de la línea.

Ejemplo:

\ Esto es un comentario
2 3 +

Resultado:

5

----------------------------------------------------------------
Comentario de bloque
----------------------------------------------------------------

Se usa paréntesis.

Ejemplo:

( esto es un comentario )
2 3 +

Resultado:

5

================================================================
DEFINICION DE PALABRAS
================================================================

StackForge soporta definiciones básicas con:

: nombre instrucciones ;

Ejemplo:

: square dup * ;
5 square

Resultado:

25

Otro ejemplo:

: double 2 * ;
10 double

Resultado:

20

Reglas:

- El nombre no puede ser numérico.
- La definición debe terminar con ;
- La definición debe tener al menos una instrucción.
- Las palabras definidas por el usuario se guardan en el intérprete.

================================================================
EJEMPLOS RAPIDOS
================================================================

----------------------------------------------------------------
Cuadrado de un número
----------------------------------------------------------------

: square dup * ;
9 square

Resultado:

81

----------------------------------------------------------------
Duplicar y sumar
----------------------------------------------------------------

5 dup +

Resultado:

10

----------------------------------------------------------------
Calcular expresión
----------------------------------------------------------------

2 3 + 4 *

Resultado:

20

----------------------------------------------------------------
Comparación
----------------------------------------------------------------

10 5 >

Resultado:

1

----------------------------------------------------------------
Estado de pila
----------------------------------------------------------------

1 2 3 .s

Salida:

<3> 1 2 3

================================================================
ERRORES COMUNES
================================================================

----------------------------------------------------------------
Stack underflow
----------------------------------------------------------------

Ocurre cuando una palabra necesita valores en la pila y no existen.

Ejemplo:

+

Error:

Stack underflow

----------------------------------------------------------------
Palabra desconocida
----------------------------------------------------------------

Ocurre cuando el intérprete no reconoce una palabra.

Ejemplo:

2 3 sumar

Error:

Palabra desconocida: sumar

----------------------------------------------------------------
División por cero
----------------------------------------------------------------

Ejemplo:

10 0 /

Error:

Division por cero

----------------------------------------------------------------
Definición incompleta
----------------------------------------------------------------

Ejemplo:

: square dup *

Error:

Definicion incompleta para: square

================================================================
LIMITACIONES DEL MVP
================================================================

Todavía no están implementados:

- if / else / then completo
- do / loop
- begin / until
- variables
- constantes
- memoria real
- parser avanzado
- debugger paso a paso
- estándar Forth completo

================================================================
OBJETIVO DE ESTA REFERENCIA
================================================================

Esta guía sirve como base rápida para usar StackForge durante el MVP.

La prioridad inicial es que el usuario pueda:

- Escribir código simple.
- Ver la pila.
- Entender cómo cambian los valores.
- Probar palabras básicas.
- Crear sus primeras definiciones.

================================================================
FIRMA
================================================================

StackForge
IDE Visual para Forth

Desarrollado por Matias Isaac Frutos Gonzales
Para ZERNYX Tech Studio
https://www.zernyxtechstudio.xyz/