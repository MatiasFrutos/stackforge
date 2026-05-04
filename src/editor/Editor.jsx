import { Code2, Keyboard, ListChecks, Play } from "lucide-react";
import { getHighlightedPreview } from "./highlight.js";
import { isRunShortcut } from "./shortcuts.js";

const DEFAULT_CODE = `\\ StackForge demo
: square dup * ;
5 square
.s
`;

function getLineClass(status) {
  if (status === "ok") return "sf-line-state sf-line-ok";
  if (status === "error") return "sf-line-state sf-line-error";
  if (status === "comment") return "sf-line-state sf-line-comment";
  return "sf-line-state sf-line-empty";
}

export default function Editor({
  value = DEFAULT_CODE,
  lineStates = [],
  onChange,
  onRun,
  onRunLines,
}) {
  const highlightedPreview = getHighlightedPreview(value).slice(0, 18);

  function handleChange(event) {
    if (typeof onChange === "function") {
      onChange(event.target.value);
    }
  }

  function handleKeyDown(event) {
    if (isRunShortcut(event)) {
      event.preventDefault();

      if (typeof onRun === "function") {
        onRun();
      }
    }
  }

  return (
    <section className="sf-glass-panel sf-editor-panel">
      <div className="sf-panel-header">
        <div>
          <h2 className="sf-panel-title">Editor Forth</h2>
          <p className="sf-panel-subtitle">Ctrl + Enter ejecuta todo · modo línea por línea disponible</p>
        </div>

        <div className="sf-editor-actions">
          <span className="sf-chip">
            <Keyboard size={13} />
            Ctrl + Enter
          </span>

          <button className="sf-button sf-button-secondary" type="button" onClick={onRunLines}>
            <ListChecks size={14} />
            Líneas
          </button>

          <button className="sf-button" type="button" onClick={onRun}>
            <Play size={15} />
            Run
          </button>
        </div>
      </div>

      <div className="sf-editor-debug-layout">
        <div className="sf-editor-body">
          <div className="sf-editor-gutter sf-code">
            {value.split("\n").map((_, index) => (
              <span key={`line-${index + 1}`}>{index + 1}</span>
            ))}
          </div>

          <textarea
            className="sf-editor-textarea sf-code sf-scrollbar"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            autoCapitalize="off"
            autoCorrect="off"
            placeholder="Ejemplo: 2 3 +"
          />
        </div>

        <aside className="sf-line-debugger sf-scrollbar">
          <div className="sf-line-debugger-title">Stack por línea</div>

          {lineStates.length === 0 ? (
            <div className="sf-line-empty-state">Sin ejecución todavía.</div>
          ) : (
            lineStates.map((state) => (
              <article className={getLineClass(state.status)} key={state.lineNumber}>
                <div className="sf-line-state-head">
                  <strong>L{state.lineNumber}</strong>
                  <span>{state.status}</span>
                </div>

                <div className="sf-line-state-stack">
                  {state.stack.length ? state.stack.join(" · ") : "vacío"}
                </div>

                {state.error ? (
                  <div className="sf-line-state-error">{state.error}</div>
                ) : null}
              </article>
            ))
          )}
        </aside>
      </div>

      <div className="sf-editor-preview">
        <span className="sf-editor-preview-title">
          <Code2 size={14} />
          Tokens
        </span>

        <div className="sf-editor-token-list">
          {highlightedPreview.length === 0 ? (
            <span className="sf-editor-token sf-token-muted">sin tokens</span>
          ) : (
            highlightedPreview.map((item, index) => (
              <span
                className={`sf-editor-token sf-token-${item.type}`}
                key={`${item.token}-${index}`}
              >
                {item.token}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}