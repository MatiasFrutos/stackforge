# StackForge — Roadmap

Este documento define el plan de evolución de StackForge desde el MVP inicial hasta una plataforma visual completa para programar, enseñar y depurar Forth.

================================================================
VISION GENERAL
================================================================

StackForge busca convertirse en un IDE visual moderno para Forth, con foco en:

- Visualización de pila en tiempo real.
- Editor moderno.
- REPL integrado.
- Diccionario visible.
- Debugger paso a paso.
- Experiencia educativa.
- Futuro empaquetado desktop.

================================================================
ESTADO ACTUAL
================================================================

Versión actual:

StackForge v1.0.0

Estado:

MVP base

Tecnologías:

React
Vite
JavaScript
Vitest
Lucide React

Backend:

No requerido

Base de datos:

No requerida

================================================================
FASE 1 — MVP FUNCIONAL
================================================================

Objetivo:

Construir una versión funcional mínima que permita escribir código Forth, ejecutarlo y visualizar el estado de la pila.

----------------------------------------------------------------
Incluido
----------------------------------------------------------------

[x] Estructura base del proyecto.
[x] Configuración de React + Vite.
[x] Intérprete Forth básico.
[x] Tokenizer.
[x] Stack de datos.
[x] Diccionario de palabras built-in.
[x] Editor inicial.
[x] REPL inicial.
[x] Stack Visualizer.
[x] Dict Panel.
[x] Memory Map conceptual.
[x] Status Bar.
[x] Toolbar.
[x] Ejemplos .forth.
[x] Tests unitarios iniciales.

----------------------------------------------------------------
Palabras Forth iniciales
----------------------------------------------------------------

[x] +
[x] -
[x] *
[x] /
[x] mod
[x] =
[x] >
[x] <
[x] >=
[x] <=
[x] dup
[x] drop
[x] swap
[x] over
[x] rot
[x] nip
[x] clear
[x] .
[x] .s
[x] cr

----------------------------------------------------------------
Resultado esperado
----------------------------------------------------------------

El usuario puede:

- Escribir instrucciones.
- Ejecutar código.
- Ver la pila.
- Usar el REPL.
- Ver palabras disponibles.
- Ejecutar ejemplos simples.
- Crear palabras básicas con : nombre ... ;

================================================================
FASE 2 — PULIDO TECNICO
================================================================

Objetivo:

Mejorar estabilidad, experiencia de usuario y compatibilidad con patrones más reales de Forth.

----------------------------------------------------------------
Intérprete
----------------------------------------------------------------

[ ] Mejorar manejo de errores.
[ ] Agregar tipos de error más claros.
[ ] Agregar snapshots de ejecución.
[ ] Mejorar definiciones de usuario.
[ ] Prevenir recursión infinita.
[ ] Mejorar soporte para strings.
[ ] Mejorar parser de comentarios.
[ ] Agregar soporte inicial para booleanos estilo Forth.
[ ] Agregar palabras adicionales.

----------------------------------------------------------------
Control de flujo
----------------------------------------------------------------

[ ] if
[ ] else
[ ] then
[ ] begin
[ ] until
[ ] do
[ ] loop

----------------------------------------------------------------
Editor
----------------------------------------------------------------

[ ] Integrar CodeMirror 6.
[ ] Syntax highlighting real para Forth.
[ ] Numeración de líneas avanzada.
[ ] Selección de código y ejecución parcial.
[ ] Autocompletado de palabras.
[ ] Atajos configurables.
[ ] Detección visual de errores.

----------------------------------------------------------------
UI
----------------------------------------------------------------

[ ] Tema claro/oscuro.
[ ] Paneles redimensionables.
[ ] Mejor responsive mobile.
[ ] Mejor estado vacío.
[ ] Modal de ayuda rápida.
[ ] Panel de configuración.
[ ] Indicadores de ejecución.

----------------------------------------------------------------
Testing
----------------------------------------------------------------

[ ] Más tests para dictionary.
[ ] Tests para user words.
[ ] Tests para tokenizer con strings complejos.
[ ] Tests para errores.
[ ] Tests de integración del intérprete.

================================================================
FASE 3 — DEBUGGER VISUAL
================================================================

Objetivo:

Crear el diferencial fuerte del producto: ejecutar código paso a paso y ver cómo cambia la pila en cada instrucción.

----------------------------------------------------------------
Debugger
----------------------------------------------------------------

[ ] Ejecutar token por token.
[ ] Resaltar instrucción actual.
[ ] Mostrar stack antes.
[ ] Mostrar stack después.
[ ] Mostrar operación realizada.
[ ] Botón siguiente paso.
[ ] Botón paso anterior.
[ ] Historial de snapshots.
[ ] Reiniciar ejecución.
[ ] Ejecutar hasta el final.

----------------------------------------------------------------
Visualización
----------------------------------------------------------------

[ ] Animación push.
[ ] Animación pop.
[ ] Animación swap.
[ ] Animación drop.
[ ] Timeline de ejecución.
[ ] Panel de eventos.
[ ] Indicador de TOP.
[ ] Indicador de BOTTOM.

----------------------------------------------------------------
Resultado esperado
----------------------------------------------------------------

El usuario puede aprender Forth viendo exactamente qué ocurre en cada paso.

================================================================
FASE 4 — EXPERIENCIA EDUCATIVA
================================================================

Objetivo:

Convertir StackForge en una herramienta útil para estudiantes y docentes.

----------------------------------------------------------------
Tutoriales
----------------------------------------------------------------

[ ] Tutorial básico de pila.
[ ] Tutorial de aritmética.
[ ] Tutorial de dup/drop/swap/over.
[ ] Tutorial de definiciones.
[ ] Tutorial de condicionales.
[ ] Tutorial de loops.

----------------------------------------------------------------
Modo aprendizaje
----------------------------------------------------------------

[ ] Explicación automática por instrucción.
[ ] Desafíos interactivos.
[ ] Validación de ejercicios.
[ ] Pistas.
[ ] Soluciones guiadas.
[ ] Modo profesor.

----------------------------------------------------------------
Contenido
----------------------------------------------------------------

[ ] Ejemplos embebidos.
[ ] Guías rápidas.
[ ] Cheatsheet Forth.
[ ] Glosario.
[ ] Diagramas de stack effects.

================================================================
FASE 5 — IMPORTAR / EXPORTAR
================================================================

Objetivo:

Permitir trabajar con archivos reales .forth.

----------------------------------------------------------------
Archivos
----------------------------------------------------------------

[ ] Abrir archivo .forth.
[ ] Guardar archivo .forth.
[ ] Exportar salida.
[ ] Descargar sesión.
[ ] Cargar ejemplos desde carpeta.
[ ] Guardar snippets locales.

----------------------------------------------------------------
Persistencia local
----------------------------------------------------------------

[ ] localStorage para código activo.
[ ] localStorage para tema.
[ ] localStorage para preferencias.
[ ] Historial de sesiones.
[ ] Borradores automáticos.

================================================================
FASE 6 — VERSION DESKTOP
================================================================

Objetivo:

Empaquetar StackForge como aplicación de escritorio.

----------------------------------------------------------------
Electron
----------------------------------------------------------------

[ ] Configurar Electron.
[ ] Ventana principal.
[ ] Menú nativo.
[ ] Abrir archivos locales.
[ ] Guardar archivos locales.
[ ] Exportar logs.
[ ] Build para Windows.
[ ] Build para Linux.
[ ] Build para macOS.

----------------------------------------------------------------
Distribución
----------------------------------------------------------------

[ ] Instalador Windows.
[ ] Versión portable.
[ ] Icono de aplicación.
[ ] Firma futura.
[ ] README para distribución.
[ ] Página comercial.

================================================================
FASE 7 — DIFERENCIACION AVANZADA
================================================================

Objetivo:

Agregar características que vuelvan a StackForge único frente a herramientas clásicas.

----------------------------------------------------------------
Visualización avanzada
----------------------------------------------------------------

[ ] Mapa de memoria real.
[ ] Representación de dictionary internals.
[ ] Call graph de palabras.
[ ] Métricas de ejecución.
[ ] Comparación antes/después.
[ ] Inspector de tokens.
[ ] Inspector de pila histórica.

----------------------------------------------------------------
Compartir
----------------------------------------------------------------

[ ] Compartir snippets por URL.
[ ] Exportar imagen del estado de pila.
[ ] Exportar reporte de ejecución.
[ ] Modo presentación para clases.

----------------------------------------------------------------
Integraciones
----------------------------------------------------------------

[ ] WebAssembly futuro.
[ ] Integración con gforth opcional.
[ ] Modo estándar Forth avanzado.
[ ] Plugins de palabras.

================================================================
PRIORIZACION RECOMENDADA
================================================================

Orden ejecutivo recomendado:

1. Estabilizar intérprete.
2. Mejorar UI responsive.
3. Integrar CodeMirror.
4. Agregar debugger paso a paso.
5. Mejorar tutoriales.
6. Exportar/importar archivos.
7. Empaquetar con Electron.

================================================================
CRITERIOS DE CALIDAD
================================================================

Para considerar una fase terminada:

- El proyecto compila.
- Los tests pasan.
- La UI no rompe responsive.
- Los errores son claros.
- El core sigue separado de React.
- La documentación está actualizada.
- Los ejemplos funcionan.

================================================================
KPIS DEL PROYECTO
================================================================

Indicadores útiles:

- Cantidad de palabras Forth soportadas.
- Cantidad de tests pasando.
- Tiempo de ejecución de ejemplos.
- Cantidad de ejemplos incluidos.
- Claridad del visualizador.
- Cantidad de acciones del debugger.
- Tamaño final del build.

================================================================
VERSIONADO
================================================================

Propuesta:

v1.0.0
MVP base.

v1.1.0
Más palabras Forth y mejores tests.

v1.2.0
CodeMirror y editor mejorado.

v1.3.0
Debugger paso a paso inicial.

v1.4.0
Tutoriales interactivos.

v2.0.0
Versión desktop con Electron.

================================================================
FIRMA
================================================================

StackForge
IDE Visual para Forth

Desarrollado por Matias Isaac Frutos Gonzales
Para ZERNYX Tech Studio
https://www.zernyxtechstudio.xyz/