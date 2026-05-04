import { useMemo, useState } from "react";
import { AlertTriangle, ChevronRight, History, Terminal } from "lucide-react";
import { createHistory } from "./history.js";

export default function Repl({
  onExecute,
  stack = [],
  lastError = "",
  lastOutput = [],
}) {
  const history = useMemo(() => createHistory(), []);
  const [command, setCommand] = useState("");
  const [logs, setLogs] = useState([
    {
      type: "system",
      text: "StackForge REPL listo. Probá: 2 3 +",
    },
  ]);

  function submitCommand() {
    const normalized = command.trim();

    if (!normalized) {
      return;
    }

    history.add(normalized);

    setLogs((current) => [
      ...current,
      {
        type: "input",
        text: `> ${normalized}`,
      },
    ]);

    const result =
      typeof onExecute === "function"
        ? onExecute(normalized)
        : {
            ok: false,
            error: "No hay manejador de ejecucion conectado.",
            output: [],
          };

    if (!result?.ok) {
      setLogs((current) => [
        ...current,
        {
          type: "error",
          text: result?.error || "Error desconocido",
        },
      ]);

      setCommand("");
      return;
    }

    const outputLines = Array.isArray(result.output) ? result.output : [];

    setLogs((current) => [
      ...current,
      ...(outputLines.length > 0
        ? outputLines.map((item) => ({
            type: "output",
            text: String(item),
          }))
        : [
            {
              type: "output",
              text: "ok",
            },
          ]),
    ]);

    setCommand("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitCommand();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setCommand(history.previous());
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCommand(history.next());
    }
  }

  return (
    <section className="sf-glass-panel sf-repl-panel">
      <div className="sf-panel-header">
        <div>
          <h2 className="sf-panel-title">REPL</h2>
          <p className="sf-panel-subtitle">Forth postfijo: escribí 2 3 +</p>
        </div>

        <span className="sf-chip">
          <Terminal size={13} />
          live
        </span>
      </div>

      <div className="sf-repl-output sf-code sf-scrollbar">
        {logs.map((log, index) => (
          <div className={`sf-repl-line sf-repl-${log.type}`} key={`${log.text}-${index}`}>
            {log.type === "error" ? <AlertTriangle size={13} /> : null}
            <span>{log.text}</span>
          </div>
        ))}

        {lastError ? (
          <div className="sf-repl-line sf-repl-error">
            <AlertTriangle size={13} />
            <span>Error: {lastError}</span>
          </div>
        ) : null}

        {Array.isArray(lastOutput) && lastOutput.length > 0 ? (
          <div className="sf-repl-last-output">
            {lastOutput.map((item, index) => (
              <span key={`${item}-${index}`}>{String(item)}</span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="sf-repl-stack-preview">
        <History size={14} />
        <span>Stack actual:</span>
        <strong>{stack.length ? stack.join(" · ") : "vacío"}</strong>
      </div>

      <div className="sf-repl-input-row">
        <ChevronRight size={18} />

        <input
          className="sf-repl-input sf-code"
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="2 3 +"
          spellCheck="false"
          autoCapitalize="off"
          autoCorrect="off"
        />

        <button className="sf-button" type="button" onClick={submitCommand}>
          Ejecutar
        </button>
      </div>
    </section>
  );
}