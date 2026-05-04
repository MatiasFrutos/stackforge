# StackForge — Arquitectura del Proyecto

StackForge es un IDE visual para Forth construido como una Web App moderna con React, Vite y JavaScript.

El objetivo principal de la arquitectura es mantener el núcleo del intérprete separado de la interfaz visual. Esto permite probar la lógica de Forth sin depender de React, escalar el proyecto con menor riesgo técnico y preparar una futura versión desktop con Electron.

================================================================
PRINCIPIO CENTRAL
================================================================

El intérprete debe funcionar sin la interfaz.
La interfaz solo debe visualizar, controlar y representar el estado del intérprete.

================================================================
CAPAS PRINCIPALES
================================================================

src/
|
|-- core/         Motor del intérprete Forth
|-- editor/       Editor de código
|-- visualizer/   Visualización del estado interno
|-- repl/         Consola interactiva
|-- ui/           Layout general y componentes base

================================================================
1. CAPA CORE
================================================================

Ubicación:

src/core/

Responsabilidad:

Ejecutar código Forth y administrar el estado lógico del programa.

Archivos principales:

interpreter.js
stack.js
dictionary.js
tokenizer.js

----------------------------------------------------------------
interpreter.js
----------------------------------------------------------------

Es el coordinador principal del motor Forth.

Responsabilidades:

- Recibir código fuente.
- Tokenizar instrucciones.
- Ejecutar tokens.
- Resolver números.
- Resolver palabras built-in.
- Resolver palabras definidas por el usuario.
- Administrar salida textual.
- Devolver el estado actualizado.

Flujo simplificado:

source code
   |
   v
tokenizer
   |
   v
tokens
   |
   v
interpreter
   |
   +--> stack
   +--> dictionary
   +--> output

----------------------------------------------------------------
stack.js
----------------------------------------------------------------

Representa la pila de datos.

Operaciones principales:

- push
- pop
- peek
- clear
- toArray
- size
- isEmpty

La pila es el corazón operativo de Forth. Todo valor entra y sale por esta estructura.

----------------------------------------------------------------
dictionary.js
----------------------------------------------------------------

Contiene las palabras disponibles del lenguaje.

Palabras iniciales:

+   -   *   /
mod
=   >   <   >=   <=
dup drop swap over rot nip clear
.   .s  cr

Cada palabra es una función JavaScript que opera sobre la pila.

----------------------------------------------------------------
tokenizer.js
----------------------------------------------------------------

Convierte el texto escrito por el usuario en tokens ejecutables.

Responsabilidades:

- Separar instrucciones por espacios.
- Ignorar comentarios de línea con \
- Ignorar comentarios de bloque con ( comentario )
- Detectar strings con ." texto"
- Devolver una lista limpia de tokens.

================================================================
2. CAPA EDITOR
================================================================

Ubicación:

src/editor/

Responsabilidad:

Permitir escribir código Forth desde la interfaz.

Archivos:

Editor.jsx
highlight.js
shortcuts.js

----------------------------------------------------------------
Editor.jsx
----------------------------------------------------------------

Componente visual del editor.

Funciones:

- Mostrar área de escritura.
- Mostrar numeración de líneas.
- Ejecutar código con botón.
- Ejecutar código con Ctrl + Enter.
- Mostrar vista previa de tokens.

----------------------------------------------------------------
highlight.js
----------------------------------------------------------------

Contiene reglas iniciales para clasificar tokens.

Tipos:

- números
- palabras clave
- comentarios
- palabras de usuario

Esta capa queda preparada para migrar luego a CodeMirror 6.

----------------------------------------------------------------
shortcuts.js
----------------------------------------------------------------

Centraliza atajos de teclado.

Atajos iniciales:

Ctrl + Enter       Ejecutar código
Ctrl + Backspace   Limpiar pila
Ctrl + Shift + R   Reset de sesión
Ctrl + `           Foco futuro en REPL

================================================================
3. CAPA VISUALIZER
================================================================

Ubicación:

src/visualizer/

Responsabilidad:

Mostrar visualmente el estado interno del intérprete.

Archivos:

StackVisualizer.jsx
DictPanel.jsx
MemoryMap.jsx

----------------------------------------------------------------
StackVisualizer.jsx
----------------------------------------------------------------

Muestra la pila de datos.

Funciones:

- Renderizar valores activos.
- Marcar el valor superior como TOP.
- Mostrar la base como BOTTOM.
- Preparar animaciones push/pop.
- Mostrar estado vacío cuando no hay valores.

----------------------------------------------------------------
DictPanel.jsx
----------------------------------------------------------------

Muestra el diccionario de palabras.

Funciones:

- Listar palabras built-in.
- Listar futuras palabras de usuario.
- Clasificar por tipo:
  - Aritmética
  - Stack
  - Usuario

----------------------------------------------------------------
MemoryMap.jsx
----------------------------------------------------------------

Vista conceptual del estado interno.

Muestra:

- Cantidad de valores en stack.
- Cantidad de palabras registradas.
- Cantidad de ejecuciones realizadas.
- Mapa conceptual:
  - Interpreter
  - Stack
  - Dictionary
  - REPL

Este módulo está pensado como base para la Fase 3.

================================================================
4. CAPA REPL
================================================================

Ubicación:

src/repl/

Responsabilidad:

Permitir ejecutar comandos rápidos sin modificar el editor principal.

Archivos:

Repl.jsx
history.js

----------------------------------------------------------------
Repl.jsx
----------------------------------------------------------------

Consola interactiva.

Funciones:

- Escribir comandos.
- Ejecutar con Enter.
- Mostrar logs.
- Mostrar errores.
- Mostrar estado actual de pila.
- Navegar historial con flecha arriba y abajo.

----------------------------------------------------------------
history.js
----------------------------------------------------------------

Administra historial de comandos.

Funciones:

- Agregar comandos.
- Recuperar comando anterior.
- Recuperar comando siguiente.
- Limpiar historial.
- Consultar tamaño del historial.

================================================================
5. CAPA UI
================================================================

Ubicación:

src/ui/

Responsabilidad:

Organizar la interfaz general del IDE.

Archivos:

Layout.jsx
Toolbar.jsx
StatusBar.jsx
Theme.js

----------------------------------------------------------------
Layout.jsx
----------------------------------------------------------------

Es el orquestador visual.

Responsabilidades:

- Crear instancia del intérprete.
- Guardar el código activo.
- Guardar estado de la pila.
- Guardar errores.
- Guardar contador de ejecuciones.
- Conectar Editor, REPL, Visualizer y StatusBar.

----------------------------------------------------------------
Toolbar.jsx
----------------------------------------------------------------

Barra superior del IDE.

Acciones:

- Ejecutar código.
- Ejecutar demo.
- Limpiar pila.
- Mostrar u ocultar memory map.
- Resetear sesión.

----------------------------------------------------------------
StatusBar.jsx
----------------------------------------------------------------

Barra inferior de estado.

Muestra:

- Estado operativo.
- Última instrucción.
- Tamaño de la pila.
- Cantidad de palabras.
- Cantidad de ejecuciones.
- Errores.

----------------------------------------------------------------
Theme.js
----------------------------------------------------------------

Centraliza variables visuales.

Incluye:

- Colores.
- Radios.
- Sombras.
- Gradientes.
- Metadatos del producto.

================================================================
FLUJO DE EJECUCION
================================================================

Usuario escribe código
        |
        v
Editor.jsx
        |
        v
Layout.jsx ejecuta runCode()
        |
        v
Interpreter.execute(source)
        |
        v
Tokenizer genera tokens
        |
        v
Interpreter recorre tokens
        |
        +--> Si es número: stack.push()
        |
        +--> Si es palabra built-in: dictionary.get(token)()
        |
        +--> Si es palabra de usuario: executeTokens()
        |
        +--> Si es error: lanza excepción
        |
        v
Devuelve estado
        |
        v
React actualiza visualización
        |
        +--> StackVisualizer
        +--> DictPanel
        +--> MemoryMap
        +--> StatusBar

================================================================
ESTADO COMPARTIDO
================================================================

El estado principal vive en Layout.jsx.

code
stack
lastCommand
lastError
executionCount
isMemoryVisible

El intérprete se mantiene con useMemo para conservar estado entre ejecuciones.

================================================================
DECISIONES TECNICAS
================================================================

React + Vite

Se usa React con Vite porque permite:

- Levantar rápido el proyecto.
- Mantener estructura simple.
- Compilar para producción sin configuración pesada.
- Escalar a Electron en el futuro.

Core separado de React

El motor Forth no importa componentes visuales.

Ventajas:

- Tests más simples.
- Menor acoplamiento.
- Mejor mantenibilidad.
- Reutilización futura en CLI, desktop o backend.

JavaScript puro en MVP

Se usa JavaScript para reducir fricción inicial.

Futuro posible:

- Migrar a TypeScript.
- Tipar tokens.
- Tipar estado de ejecución.
- Tipar errores operativos.

================================================================
ESCALABILIDAD FUTURA
================================================================

StackForge puede evolucionar hacia:

Web App
Desktop App con Electron
Modo educativo
Debugger paso a paso
Visualización de memoria
Importador/exportador .forth
Snippets compartibles

================================================================
RIESGOS TECNICOS
================================================================

Riesgo: Intérprete muy básico
Mitigación: Crear tests por palabra Forth

Riesgo: UI acoplada al core
Mitigación: Mantener core sin React

Riesgo: Syntax highlighting limitado
Mitigación: Migrar a CodeMirror 6

Riesgo: Definiciones Forth complejas
Mitigación: Implementar parser incremental

Riesgo: Debugger paso a paso
Mitigación: Guardar snapshots por token

================================================================
CONCLUSION
================================================================

La arquitectura de StackForge está pensada para arrancar simple, pero con base sólida.

La clave del producto es mantener una frontera clara:

Core = lógica real
UI = representación visual

Eso permite que el proyecto crezca sin que el MVP se convierta en un plato de fideos premium.
Elegante, pero imposible de mantener.



================================================================
ACTUALIZACION DE ESTRUCTURA - ANALYTICS Y REPLAY
================================================================

Se agregan dos nuevas capas funcionales al proyecto:

- analytics/
- replay/

Estas capas amplían StackForge desde un IDE visual básico hacia una herramienta más educativa, diagnóstica e interactiva.

analytics/ permite analizar el comportamiento del código Forth.
replay/ permite reconstruir visualmente la ejecución paso a paso.

================================================================
ESTRUCTURA ACTUALIZADA DEL PROYECTO
================================================================

stackforge/
|
|-- index.html
|-- package.json
|-- README.md
|-- .gitignore
|
|-- dist/
|
|-- public/
|   |-- favicon.ico
|   |-- logo.svg
|
|-- src/
|   |-- main.jsx
|   |-- App.jsx
|   |-- styles.css
|   |
|   |-- analytics/
|   |   |-- stackDna.js
|   |   |-- StackDnaPanel.jsx
|   |
|   |-- core/
|   |   |-- interpreter.js
|   |   |-- stack.js
|   |   |-- dictionary.js
|   |   |-- tokenizer.js
|   |
|   |-- editor/
|   |   |-- Editor.jsx
|   |   |-- highlight.js
|   |   |-- shortcuts.js
|   |
|   |-- repl/
|   |   |-- Repl.jsx
|   |   |-- history.js
|   |
|   |-- replay/
|   |   |-- replayEngine.js
|   |   |-- ReplayPanel.jsx
|   |   |-- replayUtils.js
|   |
|   |-- ui/
|   |   |-- Layout.jsx
|   |   |-- Toolbar.jsx
|   |   |-- StatusBar.jsx
|   |   |-- Theme.js
|   |
|   |-- visualizer/
|       |-- StackVisualizer.jsx
|       |-- DictPanel.jsx
|       |-- MemoryMap.jsx
|
|-- examples/
|   |-- hello_world.forth
|   |-- fibonacci.forth
|   |-- factorial.forth
|   |-- sorting.forth
|   |-- stack_demo.forth
|
|-- docs/
|   |-- ARCHITECTURE.md
|   |-- CONTRIBUTING.md
|   |-- FORTH_REFERENCE.md
|   |-- ROADMAP.md
|
|-- tests/
    |-- interpreter.test.js
    |-- stack.test.js
    |-- dictionary.test.js
    |-- tokenizer.test.js

================================================================
NUEVA CAPA: ANALYTICS
================================================================

Ubicación:

src/analytics/

Responsabilidad:

Analizar el código Forth ejecutado y generar métricas visuales sobre su comportamiento.

Esta capa no ejecuta la interfaz principal ni modifica directamente el editor. Su objetivo es transformar el código y el resultado de ejecución en información útil para el usuario.

Archivos principales:

stackDna.js
StackDnaPanel.jsx

----------------------------------------------------------------
stackDna.js
----------------------------------------------------------------

Responsabilidad:

Generar el análisis operativo del código Forth.

Funciones previstas:

- Contar tokens ejecutados.
- Medir profundidad máxima de la pila.
- Detectar cantidad de operaciones aritméticas.
- Detectar cantidad de operaciones de pila.
- Identificar palabras más usadas.
- Evaluar posibles errores.
- Calcular un nivel de riesgo operativo.
- Generar un reporte final para la interfaz.

El reporte generado puede incluir:

- tokenCount
- maxDepth
- arithmeticOps
- stackOps
- topWords
- finalStack
- errors
- riskScore
- riskLabel
- riskMessage

Objetivo:

Convertir la ejecución del programa en un diagnóstico claro y visual.

En términos simples: Stack DNA permite entender qué tan complejo, riesgoso o estable parece el código ejecutado.

----------------------------------------------------------------
StackDnaPanel.jsx
----------------------------------------------------------------

Responsabilidad:

Mostrar visualmente el reporte generado por Stack DNA.

Funciones principales:

- Mostrar estado vacío cuando todavía no existe análisis.
- Mostrar nivel de riesgo del programa.
- Mostrar score operativo.
- Mostrar métricas del código.
- Mostrar palabras más usadas.
- Mostrar resultado final de la pila.
- Mostrar errores críticos si existen.

Elementos visuales:

- Card de riesgo.
- Métricas resumidas.
- Listado de palabras frecuentes.
- Resultado final.
- Estado de error o ejecución limpia.

Objetivo:

Dar al usuario una lectura rápida del comportamiento del programa sin obligarlo a interpretar todo manualmente.

================================================================
NUEVA CAPA: REPLAY
================================================================

Ubicación:

src/replay/

Responsabilidad:

Construir y mostrar una línea de tiempo visual de ejecución token por token.

Esta capa permite ver cómo cambia la pila antes y después de cada instrucción.

Archivos principales:

replayEngine.js
ReplayPanel.jsx
replayUtils.js

----------------------------------------------------------------
replayEngine.js
----------------------------------------------------------------

Responsabilidad:

Generar los pasos de ejecución del programa Forth.

Funciones previstas:

- Recibir código fuente.
- Procesar los tokens uno por uno.
- Guardar el estado de la pila antes de cada token.
- Guardar el estado de la pila después de cada token.
- Detectar movimiento generado por cada operación.
- Registrar errores por paso.
- Construir una lista de pasos para la interfaz.

Cada paso puede incluir:

- token
- beforeStack
- afterStack
- movement
- movementLabel
- note
- error

Objetivo:

Permitir que StackForge muestre la ejecución como una película técnica del comportamiento de la pila.

----------------------------------------------------------------
ReplayPanel.jsx
----------------------------------------------------------------

Responsabilidad:

Mostrar la línea de tiempo visual de ejecución.

Funciones principales:

- Mostrar el token actual.
- Mostrar el estado de la pila antes del token.
- Mostrar el estado de la pila después del token.
- Permitir avanzar al siguiente paso.
- Permitir volver al paso anterior.
- Permitir seleccionar un paso específico desde la timeline.
- Mostrar errores asociados a un token.
- Mostrar estado vacío cuando no hay replay generado.

Elementos visuales:

- Card del paso actual.
- Comparación Antes / Después.
- Botones Anterior y Siguiente.
- Timeline de tokens.
- Indicador de error por paso.

Objetivo:

Ayudar al usuario a entender exactamente qué hizo cada instrucción Forth sobre la pila.

----------------------------------------------------------------
replayUtils.js
----------------------------------------------------------------

Responsabilidad:

Centralizar utilidades de apoyo para Stack Replay.

Funciones previstas:

- Formatear movimientos de pila.
- Clasificar operaciones.
- Generar etiquetas amigables para cada token.
- Normalizar estados vacíos.
- Preparar textos explicativos para la interfaz.

Objetivo:

Evitar que ReplayPanel.jsx tenga lógica pesada y mantener el componente enfocado en renderizar.

================================================================
FLUJO ACTUALIZADO DE EJECUCION
================================================================

Usuario escribe código
        |
        v
Editor.jsx
        |
        v
Layout.jsx
        |
        +--> Interpreter.execute(source)
        |       |
        |       v
        |    Actualiza stack, errores y salida
        |
        +--> replayEngine genera steps
        |       |
        |       v
        |    ReplayPanel muestra ejecución token por token
        |
        +--> stackDna genera report
                |
                v
             StackDnaPanel muestra métricas y diagnóstico

================================================================
NUEVO FLUJO STACK REPLAY
================================================================

Código Forth
   |
   v
Tokenizer
   |
   v
Tokens
   |
   v
Replay Engine
   |
   +--> Guarda pila antes del token
   +--> Ejecuta o simula movimiento
   +--> Guarda pila después del token
   +--> Registra error si ocurre
   |
   v
Lista de pasos
   |
   v
ReplayPanel.jsx

================================================================
NUEVO FLUJO STACK DNA
================================================================

Código Forth + resultado de ejecución
   |
   v
stackDna.js
   |
   +--> Cuenta tokens
   +--> Clasifica operaciones
   +--> Mide profundidad máxima
   +--> Detecta palabras frecuentes
   +--> Evalúa errores
   +--> Calcula riesgo operativo
   |
   v
Reporte de análisis
   |
   v
StackDnaPanel.jsx

================================================================
OBJETIVO FUNCIONAL DE LAS NUEVAS CAPAS
================================================================

analytics/ y replay/ agregan valor educativo y visual al producto.

Antes, StackForge solo ejecutaba código y mostraba la pila.

Ahora también puede:

- Explicar cómo se llegó al resultado.
- Mostrar paso a paso cada transformación.
- Detectar patrones de uso.
- Mostrar riesgo operativo.
- Resumir el comportamiento del programa.
- Ayudar al usuario a aprender Forth de manera más visual.

================================================================
IMPACTO EN LA PROPUESTA DE VALOR
================================================================

Con Stack Replay y Stack DNA, StackForge deja de ser solamente un editor visual y pasa a ser una herramienta de aprendizaje, análisis y depuración.

Diferenciales nuevos:

1. Replay visual token por token.
2. Diagnóstico automático del código.
3. Métricas de pila.
4. Identificación de palabras más usadas.
5. Detección visual de errores.
6. Lectura operativa del riesgo del programa.

Esto fortalece el objetivo principal del producto:

Ver lo que normalmente queda oculto dentro del intérprete.

================================================================
ACTUALIZACION DE CAPAS PRINCIPALES
================================================================

src/
|
|-- analytics/    Análisis operativo del código Forth
|-- core/         Motor del intérprete Forth
|-- editor/       Editor de código
|-- repl/         Consola interactiva
|-- replay/       Línea de tiempo visual de ejecución
|-- ui/           Layout general y componentes base
|-- visualizer/   Visualización del estado interno

================================================================
RESUMEN DE RESPONSABILIDADES
================================================================

core/
Ejecuta el código Forth y administra la lógica principal.

editor/
Permite escribir y lanzar código desde la interfaz.

visualizer/
Muestra el estado actual de la pila, diccionario y memoria conceptual.

repl/
Permite ejecutar comandos rápidos de forma interactiva.

analytics/
Analiza el comportamiento del código y genera métricas de diagnóstico.

replay/
Reconstruye la ejecución paso a paso para visualizar cambios token por token.

ui/
Organiza la experiencia visual general del IDE.

================================================================
ACTUALIZACION DE FASES DE DESARROLLO
================================================================

FASE 1 - MVP FUNCIONAL

[x] Estructura base del proyecto.
[x] Intérprete Forth inicial.
[x] Stack de datos.
[x] Diccionario de palabras básicas.
[x] Editor visual inicial.
[x] REPL inicial.
[x] Panel de pila.
[x] Panel de diccionario.
[x] Ejemplos .forth.

------------------------------------------------------------

FASE 2 - PULIDO TECNICO Y VISUAL

[x] Agregar Stack Replay.
[x] Agregar timeline visual token por token.
[x] Agregar Stack DNA.
[x] Agregar métricas de análisis del código.
[x] Mostrar palabras más usadas.
[x] Mostrar score de riesgo operativo.
[ ] Mejorar el intérprete.
[ ] Soportar definición de palabras con : nombre ... ;
[ ] Agregar condicionales.
[ ] Agregar loops.
[ ] Mejorar errores.
[ ] Agregar syntax highlighting real con CodeMirror.
[ ] Agregar importación de archivos .forth.
[ ] Agregar exportación de archivos .forth.
[ ] Agregar tema claro/oscuro.

------------------------------------------------------------

FASE 3 - DIFERENCIACION

[ ] Debugger paso a paso avanzado.
[ ] Animaciones push/pop.
[ ] Mapa de memoria visual.
[ ] Tutoriales interactivos.
[ ] Comparador de ejecuciones.
[ ] Exportar reporte Stack DNA.
[ ] Compartir snippets.
[ ] Versión desktop con Electron.

================================================================
CONCLUSION ACTUALIZADA
================================================================

La arquitectura de StackForge crece de forma ordenada incorporando dos módulos clave:

analytics/ para diagnóstico.
replay/ para trazabilidad visual.

La lógica sigue separada por responsabilidad:

Core = ejecuta.
Replay = reconstruye.
Analytics = interpreta.
UI = muestra.


