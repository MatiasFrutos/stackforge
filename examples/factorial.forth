\ ============================================================
\ StackForge Example
\ Archivo: factorial.forth
\ Descripcion:
\   Ejemplo conceptual de factorial en Forth.
\
\ Nota:
\   La version MVP de StackForge todavia no implementa if/else/then
\   completo ni recursion real avanzada.
\   Este archivo sirve como ejemplo objetivo para fases futuras.
\ ============================================================

\ Factorial esperado:
\ 5! = 5 * 4 * 3 * 2 * 1 = 120

\ Version futura esperada:
\ : factorial dup 1 > if dup 1 - factorial * else drop 1 then ;
\ 5 factorial

\ Version compatible con MVP usando operaciones directas:

5 4 * 3 * 2 * 1 *

.s

\ Resultado esperado en la pila:
\ 120