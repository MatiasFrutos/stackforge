\ ============================================================
\ StackForge Example
\ Archivo: stack_demo.forth
\ Descripcion:
\   Demostracion de operaciones basicas de pila.
\ ============================================================

\ Apilar dos valores
10 20

.s

\ Duplicar el valor superior
dup

.s

\ Intercambiar los dos valores superiores
swap

.s

\ Copiar el segundo valor al tope
over

.s

\ Eliminar el valor superior
drop

.s

\ Operacion matematica final
+

.s

\ Este ejemplo permite ver como cambia la pila paso a paso.