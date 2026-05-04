\ ============================================================
\ StackForge Example
\ Archivo: fibonacci.forth
\ Descripcion:
\   Ejemplo conceptual de Fibonacci en Forth.
\
\ Nota:
\   La version MVP de StackForge todavia no implementa recursion,
\   condicionales completos ni loops.
\   Este ejemplo deja documentado el objetivo para fases futuras.
\ ============================================================

\ Secuencia Fibonacci:
\ 0 1 1 2 3 5 8 13 21

\ Version futura esperada:
\ : fib dup 2 < if drop 1 else dup 1 - fib swap 2 - fib + then ;
\ 8 fib

\ Version compatible con MVP:
\ Calculamos manualmente una suma representativa:
\ 13 + 8 = 21

13 8 +

.s

\ Resultado esperado en la pila:
\ 21