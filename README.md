# StackForge

StackForge es un IDE visual, moderno e interactivo para programar en Forth, desarrollado por Matias Isaac Frutos Gonzalez para ZERNYX Tech Studio.

El proyecto busca transformar la experiencia clásica de Forth —normalmente asociada a terminales simples— en una herramienta visual, educativa y moderna, donde el usuario pueda escribir código y ver en tiempo real cómo se mueve la pila de datos.

================================================================
INFORMACION DEL PROYECTO
================================================================

Nombre del proyecto: StackForge
Tipo de proyecto: IDE visual / Web App
Lenguaje objetivo: Forth
Desarrollo: Matias Isaac Frutos Gonzalez
Empresa / Marca: ZERNYX Tech Studio
Sitio web: https://www.zernyxtechstudio.xyz/
Version: 1.0.0
Estado: MVP inicial
Backend: No requerido
Base de datos: No requerida

================================================================
DESCRIPCION GENERAL
================================================================

Forth es un lenguaje basado en pila, utilizado históricamente en sistemas embebidos, IoT, educación técnica, astronomía y entornos donde se necesita control directo, bajo consumo y simplicidad operativa.

El problema principal es que la mayoría de los entornos actuales para Forth son muy técnicos, visualmente antiguos o directamente orientados a consola.

StackForge resuelve ese punto crítico:

- Permite escribir código Forth desde un editor moderno.
- Muestra la pila de datos en tiempo real.
- Permite ejecutar código completo o instrucciones individuales.
- Incluye una consola REPL integrada.
- Visualiza el diccionario de palabras disponibles.
- Funciona como una web app liviana.
- No necesita backend para el MVP.
- No necesita base de datos para el MVP.

================================================================
PROPOSITO
================================================================

El propósito de StackForge es crear una herramienta clara, visual y accesible para aprender, probar y enseñar programación en Forth.

Mientras el usuario escribe código, puede ver:

- Qué valores entran a la pila.
- Qué valores salen de la pila.
- Qué operación se está ejecutando.
- Cómo cambia el estado interno del programa.
- Qué palabras están disponibles en el diccionario.

En términos simples: StackForge permite ver lo que normalmente queda oculto dentro del intérprete.

================================================================
PROPUESTA DE VALOR
================================================================

StackForge no busca ser otro editor más. Su diferencial está en que permite visualizar el estado interno del lenguaje mientras el código se ejecuta.

Esto lo convierte en una herramienta ideal para:

- Estudiantes.
- Docentes.
- Programadores técnicos.
- Desarrolladores de sistemas embebidos.
- Entusiastas de lenguajes clásicos.
- Personas que quieren aprender Forth de manera visual.

================================================================
PUBLICO OBJETIVO
================================================================

StackForge está pensado para:

- Estudiantes aprendiendo programación de bajo nivel.
- Desarrolladores de sistemas embebidos e IoT.
- Docentes de arquitectura de computadoras.
- Entusiastas de lenguajes stack-based.
- Makers y perfiles técnicos que trabajan con lógica cercana al hardware.
- Personas que aprenden mejor viendo procesos en tiempo real.

================================================================
FUNCIONALIDADES PRINCIPALES DEL MVP
================================================================

1. EDITOR DE CODIGO

Panel principal donde el usuario escribe programas Forth.

Funciones previstas:

- Escritura de código Forth.
- Syntax highlighting básico.
- Ejecución completa del código.
- Ejecución futura por selección.
- Ejecución futura paso a paso.
- Ejemplos precargados.

------------------------------------------------------------

2. INTERPRETE FORTH

Motor interno desarrollado en JavaScript puro.

Responsabilidades:

- Tokenizar el código ingresado.
- Detectar números.
- Buscar palabras en el diccionario.
- Ejecutar operaciones.
- Manipular la pila.
- Devolver estado actualizado para la interfaz.

Palabras iniciales soportadas:

- +
- -
- *
- /
- dup
- drop
- swap
- over

------------------------------------------------------------

3. STACK VISUALIZER

Panel visual donde se muestra la pila de datos.

Objetivo:

- Ver valores apilados.
- Entender operaciones push.
- Entender operaciones pop.
- Preparar base para animaciones.
- Mostrar el estado interno de forma clara.

------------------------------------------------------------

4. DICCIONARIO DE PALABRAS

Panel donde se listan las palabras disponibles del lenguaje.

Incluye:

- Palabras built-in.
- Futuras palabras definidas por el usuario.
- Estado operativo del intérprete.

------------------------------------------------------------

5. REPL INTEGRADO

Consola interactiva para probar comandos rápidos.

Objetivo:

- Ejecutar instrucciones cortas.
- Mantener historial.
- Compartir estado con el editor.
- Permitir pruebas rápidas sin modificar todo el archivo.

================================================================
STACK TECNOLOGICO
================================================================

Frontend: React
Bundler: Vite
Lenguaje principal: JavaScript
Testing: Vitest
Editor futuro: CodeMirror 6
Iconos: Lucide React
App desktop futura: Electron
Backend: No requerido en MVP
Base de datos: No requerida en MVP

================================================================
ESTRUCTURA DEL PROYECTO
================================================================

stackforge/
|
|-- index.html
|-- package.json
|-- README.md
|-- .gitignore
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
|   |-- visualizer/
|   |   |-- StackVisualizer.jsx
|   |   |-- DictPanel.jsx
|   |   |-- MemoryMap.jsx
|   |
|   |-- repl/
|   |   |-- Repl.jsx
|   |   |-- history.js
|   |
|   |-- ui/
|       |-- Layout.jsx
|       |-- Toolbar.jsx
|       |-- StatusBar.jsx
|       |-- Theme.js
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
|   |-- FORTH_REFERENCE.md
|   |-- CONTRIBUTING.md
|   |-- ROADMAP.md
|
|-- tests/
    |-- interpreter.test.js
    |-- stack.test.js
    |-- dictionary.test.js
    |-- tokenizer.test.js

================================================================
INSTALACION
================================================================

Desde la carpeta del proyecto ejecutar:

npm install

================================================================
EJECUTAR EN MODO DESARROLLO
================================================================

npm run dev

Luego abrir en el navegador la URL indicada por Vite.

Normalmente será:

http://localhost:5173

================================================================
CREAR BUILD DE PRODUCCION
================================================================

npm run build

El resultado se genera en:

dist/

================================================================
PREVISUALIZAR BUILD
================================================================

npm run preview

================================================================
EJECUTAR TESTS
================================================================

npm test

O también:

npm run test

================================================================
SCRIPTS DISPONIBLES
================================================================

npm run dev
Inicia el servidor local de desarrollo.

npm run start
Alias de desarrollo.

npm run build
Genera la versión final en dist/.

npm run preview
Previsualiza el build de producción.

npm run test
Ejecuta pruebas con Vitest.

npm run test:watch
Ejecuta pruebas en modo observación.

npm run clean
Elimina carpetas generadas.

npm run reinstall
Limpia e instala dependencias nuevamente.

================================================================
FASES DE DESARROLLO
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

FASE 2 - PULIDO TECNICO

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

[ ] Debugger paso a paso.
[ ] Animaciones push/pop.
[ ] Mapa de memoria visual.
[ ] Tutoriales interactivos.
[ ] Compartir snippets.
[ ] Versión desktop con Electron.

================================================================
OBJETIVO TECNICO
================================================================

El proyecto está diseñado con separación clara de responsabilidades:

- core/ contiene la lógica del intérprete.
- editor/ maneja escritura y resaltado.
- visualizer/ muestra estados internos.
- repl/ maneja ejecución interactiva.
- ui/ organiza la experiencia visual.

La idea es que el sistema pueda crecer sin mezclar la lógica del lenguaje con la interfaz.

================================================================
PRINCIPIO DE ARQUITECTURA
================================================================

La regla central del proyecto es:

El intérprete debe funcionar sin la interfaz.
La interfaz solo debe visualizar y controlar el intérprete.

Esto permite testear el núcleo de StackForge como una unidad independiente.

================================================================
DIFERENCIAL DEL PROYECTO
================================================================

StackForge combina:

1. Visualización animada de la pila en tiempo real.
2. Editor moderno para código Forth.
3. REPL integrado.
4. Diccionario de palabras visible.
5. Arquitectura simple y escalable.
6. Experiencia pensada para aprendizaje técnico.

================================================================
ESTADO ACTUAL
================================================================

StackForge v1.0.0
Estado: MVP base
Tipo: Web App
Backend: No requerido
Base de datos: No requerida
Desarrollado por: Matias Isaac Frutos Gonzalez
Marca: ZERNYX Tech Studio

================================================================
CREDITOS
================================================================

Proyecto: StackForge
Desarrollador: Matias Isaac Frutos Gonzalez
Empresa / Marca: ZERNYX Tech Studio
Sitio web: https://www.zernyxtechstudio.xyz/
Año: 2026

================================================================
LICENCIA
================================================================

Este proyecto utiliza licencia MIT como base inicial.

La licencia puede modificarse más adelante si el proyecto pasa a un esquema comercial, privado o de distribución controlada.
