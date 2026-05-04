# Contribuir a StackForge

Gracias por tu interés en contribuir a StackForge.

StackForge es un IDE visual para Forth enfocado en aprendizaje, visualización de pila y ejecución interactiva desde el navegador.

Este documento explica las reglas base para colaborar de forma ordenada y mantener el proyecto limpio.

================================================================
OBJETIVO DEL PROYECTO
================================================================

StackForge busca crear una experiencia moderna para programar y aprender Forth.

El diferencial principal es:

Visualizar en tiempo real cómo cambia la pila de datos.

Toda contribución debe respetar esa visión.

================================================================
PRINCIPIOS DE CONTRIBUCION
================================================================

Antes de modificar el proyecto, tener en cuenta:

- Mantener el core separado de React.
- Evitar dependencias innecesarias.
- Escribir código claro.
- Priorizar legibilidad sobre trucos técnicos.
- Agregar tests cuando se modifique el intérprete.
- No romper el MVP existente.
- Mantener una experiencia visual simple, moderna y rápida.

================================================================
ESTRUCTURA GENERAL
================================================================

src/
|
|-- core/         Motor Forth
|-- editor/       Editor de código
|-- visualizer/   Visualización de pila y diccionario
|-- repl/         Consola interactiva
|-- ui/           Layout general

================================================================
COMO PREPARAR EL ENTORNO
================================================================

Clonar el proyecto:

git clone <url-del-repositorio>

Entrar a la carpeta:

cd stackforge

Instalar dependencias:

npm install

Ejecutar en desarrollo:

npm run dev

Ejecutar tests:

npm run test

================================================================
FLUJO RECOMENDADO DE TRABAJO
================================================================

Crear una rama nueva:

git checkout -b feature/nombre-de-la-mejora

Ejemplos:

git checkout -b feature/step-debugger
git checkout -b feature/code-mirror-editor
git checkout -b fix/stack-underflow-message
git checkout -b docs/forth-reference-update

Hacer cambios pequeños y claros.

Ejecutar tests:

npm run test

Crear commit:

git add .
git commit -m "feat: add basic step debugger"

Subir rama:

git push origin feature/nombre-de-la-mejora

Abrir Pull Request.

================================================================
CONVENCION DE COMMITS
================================================================

Se recomienda usar una convención simple:

feat: nueva funcionalidad
fix: corrección de error
docs: documentación
style: cambios visuales o formato
refactor: mejora interna sin cambiar comportamiento
test: pruebas
chore: tareas menores

Ejemplos:

feat: add user word definitions
fix: handle division by zero
docs: update forth reference
style: improve stack visualizer layout
test: add tokenizer comments tests
chore: update dependencies

================================================================
REGLAS PARA EL CORE
================================================================

El core vive en:

src/core/

Regla principal:

El core no debe importar componentes React.

Permitido:

- Funciones puras.
- Clases simples.
- Estructuras de datos.
- Errores claros.
- Tests unitarios.

No recomendado:

- Manipular DOM.
- Usar estados de React.
- Leer elementos HTML.
- Mezclar estilos CSS.
- Agregar dependencias pesadas.

================================================================
REGLAS PARA EL INTERPRETE
================================================================

Si se agrega una palabra Forth nueva:

1. Agregar la implementación en dictionary.js.
2. Agregar test en dictionary.test.js.
3. Agregar ejemplo si aplica.
4. Actualizar FORTH_REFERENCE.md.

Ejemplo conceptual:

dictionary.set("dup", () => {
  if (stack.isEmpty()) {
    throw new Error("Stack underflow");
  }

  stack.push(stack.peek());
});

================================================================
REGLAS PARA TESTS
================================================================

Los tests están en:

tests/

Cada módulo del core debe tener pruebas.

Archivos actuales:

interpreter.test.js
stack.test.js
dictionary.test.js
tokenizer.test.js

Antes de abrir un Pull Request:

npm run test

================================================================
REGLAS PARA DOCUMENTACION
================================================================

La documentación vive en:

docs/

Archivos principales:

ARCHITECTURE.md
FORTH_REFERENCE.md
CONTRIBUTING.md
ROADMAP.md

Actualizar documentación cuando:

- Se agregan palabras nuevas.
- Cambia la arquitectura.
- Cambia el flujo de instalación.
- Se agregan comandos.
- Se modifica el roadmap.

================================================================
REGLAS PARA UI
================================================================

La UI debe ser:

- Clara.
- Rápida.
- Moderna.
- Responsive.
- Sin sobrecargar visualmente.
- Orientada a aprendizaje.

Evitar:

- Animaciones pesadas.
- Efectos que dificulten lectura.
- Botones sin función.
- Estados visuales confusos.
- Componentes gigantes sin separación.

================================================================
ESTILO VISUAL
================================================================

StackForge usa una estética:

Dark UI
Violeta / Azul
Glassmorphism suave
Paneles tipo IDE
Cards compactas
Tipografía técnica

Colores principales:

Background: #050816
Panel: rgba(15, 23, 42, 0.78)
Primary: #8b5cf6
Secondary: #38bdf8
Text: #f8fafc
Muted: #94a3b8

================================================================
ISSUES RECOMENDADOS
================================================================

Al crear un issue, incluir:

Titulo claro
Descripcion del problema
Pasos para reproducir
Resultado esperado
Resultado actual
Captura si corresponde
Version de Node
Sistema operativo

Ejemplo:

Titulo: Error al ejecutar swap con una pila de un solo valor

Descripcion:
Cuando ejecuto "10 swap", el sistema lanza Stack underflow.

Resultado esperado:
Mostrar error amigable indicando que swap requiere dos valores.

Resultado actual:
Error general Stack underflow.

================================================================
PULL REQUESTS
================================================================

Un Pull Request ideal debe incluir:

- Descripción breve.
- Qué problema resuelve.
- Archivos modificados.
- Cómo se probó.
- Capturas si modifica UI.
- Tests agregados si modifica core.

Plantilla sugerida:

Resumen:
-

Cambios:
-

Pruebas:
-

Notas:
-

================================================================
PRIORIDADES DEL PROYECTO
================================================================

Orden recomendado:

1. Estabilidad del intérprete.
2. Visualización clara de pila.
3. REPL funcional.
4. Editor mejorado.
5. Syntax highlighting real.
6. Debugger paso a paso.
7. Exportar/importar archivos.
8. Versión desktop.

================================================================
QUE EVITAR
================================================================

Evitar contribuciones que:

- Rompan el core.
- Agreguen complejidad innecesaria.
- Cambien muchas capas sin necesidad.
- Introduzcan dependencias pesadas sin justificación.
- Mezclen lógica del intérprete con componentes visuales.
- Agreguen diseño visual que afecte la legibilidad.

================================================================
CREDITOS
================================================================

Proyecto: StackForge
Desarrollador: Matías Isaac Frutos Gonzales
Marca: ZERNYX Tech Studio
Sitio web: https://www.zernyxtechstudio.xyz/

================================================================
CIERRE
================================================================

StackForge está pensado para crecer con una base limpia.

Cada mejora debe sumar claridad, estabilidad o valor visual al aprendizaje de Forth.

Menos humo, más pila.