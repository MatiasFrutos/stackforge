import {
  Activity,
  ArrowDownToLine,
  Boxes,
  History,
  Layers,
  PackageOpen,
  Sparkles,
} from "lucide-react";

function getMovementType(stack = [], previousStack = []) {
  if (stack.length > previousStack.length) return "PUSH";
  if (stack.length < previousStack.length) return "POP";
  if (stack.length === previousStack.length && stack.join("|") !== previousStack.join("|")) {
    return "MOVE";
  }

  return "IDLE";
}

export default function StackVisualizer({
  stack = [],
  previousStack = [],
  lastCommand = "Sin ejecucion",
  replayStep = null,
}) {
  const activeStack = replayStep?.afterStack || stack;
  const activePreviousStack = replayStep?.beforeStack || previousStack;
  const visualStack = [...activeStack].reverse();
  const topValue = activeStack.length > 0 ? activeStack[activeStack.length - 1] : null;
  const movementType = replayStep?.movement || getMovementType(activeStack, activePreviousStack);
  const commandLabel = replayStep
    ? `Replay token: ${replayStep.token}`
    : lastCommand;

  return (
    <section className="sf-glass-panel sf-stack-panel">
      <div className="sf-panel-header">
        <div>
          <h2 className="sf-panel-title">Stack Visualizer</h2>
          <p className="sf-panel-subtitle">Pila visual animada en tiempo real</p>
        </div>

        <span className="sf-chip">
          <Layers size={13} />
          {activeStack.length}
        </span>
      </div>

      <div className="sf-stack-hero">
        <div className="sf-stack-core-orb">
          <span>{topValue === null ? "∅" : String(topValue)}</span>
        </div>

        <div>
          <strong>{topValue === null ? "Pila vacía" : "TOP activo"}</strong>
          <small>{movementType} · {commandLabel}</small>
        </div>
      </div>

      {replayStep ? (
        <div className="sf-stack-replay-badge">
          <History size={13} />
          <span>
            Antes: {replayStep.beforeStack.length ? replayStep.beforeStack.join(" · ") : "vacío"}
          </span>
          <b>→</b>
          <span>
            Después: {replayStep.afterStack.length ? replayStep.afterStack.join(" · ") : "vacío"}
          </span>
        </div>
      ) : null}

      <div className="sf-stack-summary">
        <article className="sf-stack-summary-card">
          <span className="sf-stack-summary-icon">
            <ArrowDownToLine size={15} />
          </span>

          <div>
            <strong>{topValue === null ? "Vacío" : String(topValue)}</strong>
            <small>Valor superior</small>
          </div>
        </article>

        <article className="sf-stack-summary-card">
          <span className="sf-stack-summary-icon">
            <Activity size={15} />
          </span>

          <div>
            <strong>{activeStack.length}</strong>
            <small>Elementos activos</small>
          </div>
        </article>
      </div>

      <div className="sf-stack-meta">
        <span>
          <Sparkles size={13} />
          Movimiento
        </span>

        <p>{movementType}</p>
      </div>

      <div className="sf-stack-list sf-stack-tower sf-scrollbar">
        {visualStack.length === 0 ? (
          <div className="sf-empty-stack">
            <PackageOpen size={32} />
            <strong>Pila vacía</strong>
            <span>Ejecutá 2 3 + para ver cajas apiladas con animación.</span>
          </div>
        ) : (
          visualStack.map((item, index) => {
            const realIndex = visualStack.length - index - 1;
            const isTop = index === 0;

            return (
              <article
                className={isTop ? "sf-stack-item sf-stack-item-top" : "sf-stack-item"}
                key={`${String(item)}-${index}-${activeStack.length}-${movementType}`}
                style={{ "--stack-delay": `${index * 55}ms` }}
              >
                <div className="sf-stack-index">
                  {isTop ? "TOP" : realIndex}
                </div>

                <div className="sf-stack-value">
                  <strong>{String(item)}</strong>
                  <span>{typeof item}</span>
                </div>

                <div className="sf-stack-pill">
                  <Boxes size={12} />
                  slot {realIndex}
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}