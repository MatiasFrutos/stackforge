import { useEffect, useMemo, useState } from "react";
import { Interpreter } from "../core/interpreter.js";
import Editor from "../editor/Editor.jsx";
import Repl from "../repl/Repl.jsx";
import Toolbar from "./Toolbar.jsx";
import StatusBar from "./StatusBar.jsx";
import StackVisualizer from "../visualizer/StackVisualizer.jsx";
import MemoryMap from "../visualizer/MemoryMap.jsx";
import ReplayPanel from "../replay/ReplayPanel.jsx";
import { buildReplay } from "../replay/replayEngine.js";
import StackDnaPanel from "../analytics/StackDnaPanel.jsx";
import { analyzeStackDna } from "../analytics/stackDna.js";

const THEME_STORAGE_KEY = "stackforge_theme_v1";

const EXAMPLES = [
  {
    id: "stack",
    name: "Stack básico",
    description: "Push, suma, dup, swap y estado de pila",
    code: `\\ Stack básico
2 3 +
10 dup *
swap
.s`,
  },
  {
    id: "square",
    name: "Square",
    description: "Crear una palabra nueva",
    code: `\\ Definicion de palabra
: square dup * ;

5 square
.s`,
  },
  {
    id: "math",
    name: "Aritmética",
    description: "Forth postfijo real",
    code: `\\ Forth usa postfijo
2 3 +
8 4 -
6 7 *
20 5 /
.s`,
  },
  {
    id: "compare",
    name: "Comparaciones",
    description: "1 verdadero / 0 falso",
    code: `\\ Comparaciones
10 5 >
3 8 <
5 5 =
.s`,
  },
  {
    id: "error",
    name: "Error educativo",
    description: "Muestra por qué 2+3 no es Forth",
    code: `\\ Esto debe fallar
2+3`,
  },
];

const INITIAL_CODE = EXAMPLES[0].code;

function getInitialTheme() {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (savedTheme === "black" || savedTheme === "white") {
      return savedTheme;
    }
  } catch {
    return "white";
  }

  return "white";
}

function shouldSkipLine(line) {
  const value = String(line ?? "").trim();

  return !value || value.startsWith("\\");
}

function buildLineStates(source) {
  const lines = String(source ?? "").split("\n");
  const tempInterpreter = new Interpreter();
  const states = [];

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      states.push({
        lineNumber: index + 1,
        source: rawLine,
        status: "empty",
        stack: tempInterpreter.stack.toArray(),
        output: [],
        error: "",
      });

      continue;
    }

    if (line.startsWith("\\")) {
      states.push({
        lineNumber: index + 1,
        source: rawLine,
        status: "comment",
        stack: tempInterpreter.stack.toArray(),
        output: [],
        error: "",
      });

      continue;
    }

    try {
      const result = tempInterpreter.execute(line);

      states.push({
        lineNumber: index + 1,
        source: rawLine,
        status: "ok",
        stack: result.stack,
        output: result.output ?? [],
        error: "",
      });
    } catch (error) {
      states.push({
        lineNumber: index + 1,
        source: rawLine,
        status: "error",
        stack: tempInterpreter.stack.toArray(),
        output: [],
        error: error.message || "Error desconocido",
      });

      break;
    }
  }

  return states;
}

export default function Layout() {
  const interpreter = useMemo(() => new Interpreter(), []);

  const [themeMode, setThemeMode] = useState(getInitialTheme);
  const [code, setCode] = useState(INITIAL_CODE);
  const [stack, setStack] = useState([]);
  const [previousStack, setPreviousStack] = useState([]);
  const [lastCommand, setLastCommand] = useState("Sistema iniciado");
  const [lastError, setLastError] = useState("");
  const [lastOutput, setLastOutput] = useState([]);
  const [isMemoryVisible, setIsMemoryVisible] = useState(true);
  const [executionCount, setExecutionCount] = useState(0);
  const [lineStates, setLineStates] = useState(() => buildLineStates(INITIAL_CODE));

  const [replaySteps, setReplaySteps] = useState([]);
  const [replayCurrentIndex, setReplayCurrentIndex] = useState(0);
  const [dnaReport, setDnaReport] = useState(null);

  const dictionaryWords = useMemo(() => {
    if (!interpreter?.dictionary) return [];
    return Array.from(interpreter.dictionary.keys());
  }, [interpreter]);

  const replayStep = replaySteps[replayCurrentIndex] || null;

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("sf-theme-white", "sf-theme-black");
    root.classList.add(`sf-theme-${themeMode}`);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      // Sin acción: si localStorage no está disponible, el tema sigue funcionando en memoria.
    }
  }, [themeMode]);

  function toggleTheme() {
    setThemeMode((current) => (current === "black" ? "white" : "black"));
  }

  function syncLineStates(nextCode = code) {
    setLineStates(buildLineStates(nextCode));
  }

  function handleCodeChange(nextCode) {
    setCode(nextCode);
    syncLineStates(nextCode);
  }

  function runCode(source = code) {
    try {
      setLastError("");

      const beforeStack = interpreter.stack.toArray();
      const result = interpreter.execute(source);

      setPreviousStack(beforeStack);
      setStack(result.stack);
      setLastOutput(result.output ?? []);
      setLastCommand(source.trim() || "Sin instrucciones");
      setExecutionCount((current) => current + 1);
      syncLineStates(code);

      return {
        ok: true,
        stack: result.stack,
        output: result.output ?? [],
        error: "",
      };
    } catch (error) {
      const message = error.message || "Error desconocido";

      setLastError(message);
      setLastOutput([]);
      setLastCommand(source.trim() || "Instruccion invalida");
      syncLineStates(code);

      return {
        ok: false,
        stack: interpreter.stack.toArray(),
        output: [],
        error: message,
      };
    }
  }

  function runCurrentEditor() {
    return runCode(code);
  }

  function clearStack() {
    const beforeStack = interpreter.stack.toArray();

    interpreter.stack.clear();

    setPreviousStack(beforeStack);
    setStack([]);
    setLastOutput([]);
    setLastCommand("Pila limpiada");
    setLastError("");
    setReplaySteps([]);
    setReplayCurrentIndex(0);
    syncLineStates(code);
  }

  function resetSession() {
    interpreter.reset();

    setCode(INITIAL_CODE);
    setPreviousStack([]);
    setStack([]);
    setLastCommand("Sesion reiniciada");
    setLastError("");
    setLastOutput([]);
    setExecutionCount(0);
    setLineStates(buildLineStates(INITIAL_CODE));
    setReplaySteps([]);
    setReplayCurrentIndex(0);
    setDnaReport(null);
  }

  function loadExample(example) {
    interpreter.reset();

    setCode(example.code);
    setPreviousStack([]);
    setStack([]);
    setLastCommand(`Ejemplo cargado: ${example.name}`);
    setLastError("");
    setLastOutput([]);
    setExecutionCount(0);
    setLineStates(buildLineStates(example.code));
    setReplaySteps([]);
    setReplayCurrentIndex(0);
    setDnaReport(null);
  }

  function runLineByLine() {
    interpreter.reset();

    const lines = String(code ?? "").split("\n");
    const states = [];
    let lastResult = {
      stack: [],
      output: [],
    };

    try {
      setLastError("");
      setPreviousStack([]);

      for (let index = 0; index < lines.length; index += 1) {
        const rawLine = lines[index];
        const line = rawLine.trim();

        if (shouldSkipLine(line)) {
          states.push({
            lineNumber: index + 1,
            source: rawLine,
            status: line ? "comment" : "empty",
            stack: interpreter.stack.toArray(),
            output: [],
            error: "",
          });

          continue;
        }

        lastResult = interpreter.execute(line);

        states.push({
          lineNumber: index + 1,
          source: rawLine,
          status: "ok",
          stack: lastResult.stack,
          output: lastResult.output ?? [],
          error: "",
        });
      }

      setLineStates(states);
      setStack(lastResult.stack ?? interpreter.stack.toArray());
      setLastOutput(lastResult.output ?? []);
      setLastCommand("Ejecucion linea por linea");
      setExecutionCount((current) => current + 1);

      return {
        ok: true,
        stack: lastResult.stack ?? interpreter.stack.toArray(),
        output: lastResult.output ?? [],
        error: "",
      };
    } catch (error) {
      const message = error.message || "Error desconocido";

      states.push({
        lineNumber: states.length + 1,
        source: lines[states.length] ?? "",
        status: "error",
        stack: interpreter.stack.toArray(),
        output: [],
        error: message,
      });

      setLineStates(states);
      setStack(interpreter.stack.toArray());
      setLastOutput([]);
      setLastCommand("Error en ejecucion por linea");
      setLastError(message);

      return {
        ok: false,
        stack: interpreter.stack.toArray(),
        output: [],
        error: message,
      };
    }
  }

  function buildStackReplay() {
    const replay = buildReplay(code);

    setReplaySteps(replay.steps);
    setReplayCurrentIndex(0);
    setLastError(replay.error || "");
    setLastCommand(replay.error ? "Replay generado con error" : "Stack Replay generado");

    if (replay.steps.length > 0) {
      const firstStep = replay.steps[0];

      setPreviousStack(firstStep.beforeStack);
      setStack(firstStep.afterStack);
    }

    return replay;
  }

  function analyzeDna() {
    const report = analyzeStackDna(code);

    setDnaReport(report);
    setReplaySteps(report.replay.steps);
    setReplayCurrentIndex(0);
    setLastError(report.errors[0]?.error || "");
    setLastCommand(`Stack DNA generado · riesgo ${report.riskLabel}`);

    if (report.replay.steps.length > 0) {
      const firstStep = report.replay.steps[0];

      setPreviousStack(firstStep.beforeStack);
      setStack(firstStep.afterStack);
    }

    return report;
  }

  function previousReplayStep() {
    setReplayCurrentIndex((current) => {
      const nextIndex = Math.max(0, current - 1);
      const step = replaySteps[nextIndex];

      if (step) {
        setPreviousStack(step.beforeStack);
        setStack(step.afterStack);
        setLastCommand(`Replay: ${step.token}`);
      }

      return nextIndex;
    });
  }

  function nextReplayStep() {
    setReplayCurrentIndex((current) => {
      const nextIndex = Math.min(replaySteps.length - 1, current + 1);
      const step = replaySteps[nextIndex];

      if (step) {
        setPreviousStack(step.beforeStack);
        setStack(step.afterStack);
        setLastCommand(`Replay: ${step.token}`);
        setLastError(step.error || "");
      }

      return nextIndex;
    });
  }

  function selectReplayStep(index) {
    const safeIndex = Math.max(0, Math.min(replaySteps.length - 1, index));
    const step = replaySteps[safeIndex];

    setReplayCurrentIndex(safeIndex);

    if (step) {
      setPreviousStack(step.beforeStack);
      setStack(step.afterStack);
      setLastCommand(`Replay: ${step.token}`);
      setLastError(step.error || "");
    }
  }

  return (
    <main className={`sf-shell sf-layout sf-theme-${themeMode}`}>
      <Toolbar
        dictionaryWords={dictionaryWords}
        examples={EXAMPLES}
        onRun={runCurrentEditor}
        onRunLines={runLineByLine}
        onReplay={buildStackReplay}
        onAnalyzeDna={analyzeDna}
        onClearStack={clearStack}
        onReset={resetSession}
        onLoadExample={loadExample}
        isMemoryVisible={isMemoryVisible}
        onToggleMemory={() => setIsMemoryVisible((value) => !value)}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
      />

      <section className={isMemoryVisible ? "sf-ide-grid" : "sf-ide-grid sf-ide-grid-no-memory"}>
        <div className="sf-repl-zone">
          <Repl
            onExecute={(command) => runCode(command)}
            stack={stack}
            lastError={lastError}
            lastOutput={lastOutput}
          />
        </div>

        <aside className="sf-stack-zone">
          <StackVisualizer
            stack={stack}
            previousStack={previousStack}
            lastCommand={lastCommand}
            replayStep={replayStep}
          />
        </aside>

        <div className="sf-editor-zone">
          <Editor
            value={code}
            lineStates={lineStates}
            onChange={handleCodeChange}
            onRun={runCurrentEditor}
            onRunLines={runLineByLine}
          />
        </div>

        {isMemoryVisible ? (
          <aside className="sf-memory-zone">
            <MemoryMap
              stack={stack}
              words={dictionaryWords}
              executionCount={executionCount}
            />
          </aside>
        ) : null}
      </section>

      <section className="sf-insight-grid">
        <ReplayPanel
          steps={replaySteps}
          currentIndex={replayCurrentIndex}
          onPrevious={previousReplayStep}
          onNext={nextReplayStep}
          onSelect={selectReplayStep}
        />

        <StackDnaPanel report={dnaReport} />
      </section>

      <StatusBar
        stackSize={stack.length}
        wordCount={dictionaryWords.length}
        lastCommand={lastCommand}
        lastError={lastError}
        executionCount={executionCount}
      />
    </main>
  );
}