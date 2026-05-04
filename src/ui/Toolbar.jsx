import { useState } from "react";
import {
  BookOpen,
  Braces,
  Bug,
  ChevronDown,
  Cpu,
  Database,
  Dna,
  Eraser,
  History,
  ListChecks,
  Moon,
  Play,
  RotateCcw,
  Sparkles,
  Sun,
} from "lucide-react";

function getWordType(word) {
  if (["+", "-", "*", "/", "mod"].includes(word)) return "Aritmetica";
  if (["=", ">", "<", ">=", "<="].includes(word)) return "Comparacion";
  if (["dup", "drop", "swap", "over", "rot", "nip", "clear"].includes(word)) return "Stack";
  if ([".", ".s", "cr"].includes(word)) return "Salida";
  return "Usuario";
}

export default function Toolbar({
  dictionaryWords = [],
  examples = [],
  onRun,
  onRunLines,
  onReplay,
  onAnalyzeDna,
  onClearStack,
  onReset,
  onLoadExample,
  isMemoryVisible,
  onToggleMemory,
  themeMode = "white",
  onToggleTheme,
}) {
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);

  const words = Array.isArray(dictionaryWords) ? dictionaryWords : [];
  const availableExamples = Array.isArray(examples) ? examples : [];
  const isBlackTheme = themeMode === "black";

  function closeMenus() {
    setIsDictionaryOpen(false);
    setIsExamplesOpen(false);
  }

  function toggleDictionary() {
    setIsDictionaryOpen((value) => !value);
    setIsExamplesOpen(false);
  }

  function toggleExamples() {
    setIsExamplesOpen((value) => !value);
    setIsDictionaryOpen(false);
  }

  function handleLoadExample(example) {
    if (typeof onLoadExample === "function") {
      onLoadExample(example);
    }

    closeMenus();
  }

  return (
    <header className="sf-toolbar">
      <div className="sf-toolbar-brand">
        <div className="sf-brand-icon">
          <Braces size={22} />
        </div>

        <div>
          <h1>StackForge</h1>
          <p>IDE visual para Forth · Stack-based programming</p>
        </div>
      </div>

      <div className="sf-toolbar-actions">
        <button className="sf-button" type="button" onClick={onRun}>
          <Play size={15} />
          Ejecutar
        </button>

        <button className="sf-button sf-button-secondary" type="button" onClick={onRunLines}>
          <ListChecks size={15} />
          Línea por línea
        </button>

        <button className="sf-button sf-button-secondary" type="button" onClick={onReplay}>
          <History size={15} />
          Stack Replay
        </button>

        <button className="sf-button sf-button-secondary" type="button" onClick={onAnalyzeDna}>
          <Dna size={15} />
          Stack DNA
        </button>

        <button className="sf-button sf-button-secondary" type="button" onClick={onToggleTheme}>
          {isBlackTheme ? <Sun size={15} /> : <Moon size={15} />}
          {isBlackTheme ? "Tema blanco" : "Tema negro"}
        </button>

        <div className="sf-nav-dropdown">
          <button
            className={
              isExamplesOpen
                ? "sf-button sf-button-secondary sf-nav-dropdown-button is-open"
                : "sf-button sf-button-secondary sf-nav-dropdown-button"
            }
            type="button"
            onClick={toggleExamples}
          >
            <Sparkles size={15} />
            Ejemplos
            <span className="sf-nav-count">{availableExamples.length}</span>
            <ChevronDown size={14} />
          </button>

          {isExamplesOpen ? (
            <>
              <button
                className="sf-dropdown-backdrop"
                type="button"
                aria-label="Cerrar ejemplos"
                onClick={closeMenus}
              />

              <div className="sf-dictionary-dropdown sf-examples-dropdown">
                <div className="sf-dictionary-dropdown-header">
                  <div>
                    <strong>Ejemplos cargables</strong>
                    <span>Cargan código directo en el editor</span>
                  </div>

                  <span>{availableExamples.length}</span>
                </div>

                <div className="sf-dictionary-dropdown-list sf-examples-dropdown-list sf-scrollbar">
                  {availableExamples.map((example) => (
                    <button
                      className="sf-dictionary-option sf-example-option"
                      type="button"
                      key={example.id}
                      onClick={() => handleLoadExample(example)}
                    >
                      <span className="sf-dictionary-option-icon">
                        <Sparkles size={14} />
                      </span>

                      <span className="sf-dictionary-option-text">
                        <strong>{example.name}</strong>
                        <small>{example.description}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="sf-nav-dropdown">
          <button
            className={
              isDictionaryOpen
                ? "sf-button sf-button-secondary sf-nav-dropdown-button is-open"
                : "sf-button sf-button-secondary sf-nav-dropdown-button"
            }
            type="button"
            onClick={toggleDictionary}
          >
            <BookOpen size={15} />
            Diccionario
            <span className="sf-nav-count">{words.length}</span>
            <ChevronDown size={14} />
          </button>

          {isDictionaryOpen ? (
            <>
              <button
                className="sf-dropdown-backdrop"
                type="button"
                aria-label="Cerrar diccionario"
                onClick={closeMenus}
              />

              <div className="sf-dictionary-dropdown">
                <div className="sf-dictionary-dropdown-header">
                  <div>
                    <strong>Diccionario Forth</strong>
                    <span>Palabras operativas del interprete</span>
                  </div>

                  <span>{words.length}</span>
                </div>

                <div className="sf-dictionary-dropdown-list sf-scrollbar">
                  {words.length === 0 ? (
                    <div className="sf-dictionary-empty">
                      No hay palabras registradas.
                    </div>
                  ) : (
                    words.map((word) => (
                      <button
                        className="sf-dictionary-option"
                        type="button"
                        key={word}
                        onClick={closeMenus}
                      >
                        <span className="sf-dictionary-option-icon">
                          <Cpu size={14} />
                        </span>

                        <span className="sf-dictionary-option-text">
                          <strong>{word}</strong>
                          <small>{getWordType(word)}</small>
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>

        <button className="sf-button sf-button-secondary" type="button" onClick={onClearStack}>
          <Eraser size={15} />
          Limpiar pila
        </button>

        <button className="sf-button sf-button-secondary" type="button" onClick={onToggleMemory}>
          <Database size={15} />
          {isMemoryVisible ? "Ocultar memoria" : "Ver memoria"}
        </button>

        <button className="sf-button sf-button-secondary" type="button" onClick={onReset}>
          <RotateCcw size={15} />
          Reset
        </button>

       
      </div>
    </header>
  );
}