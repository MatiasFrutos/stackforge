import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Boxes,
  ChevronsRight,
  History,
  PlayCircle,
} from "lucide-react";

export default function ReplayPanel({
  steps = [],
  currentIndex = 0,
  onPrevious,
  onNext,
  onSelect,
}) {
  const safeSteps = Array.isArray(steps) ? steps : [];
  const currentStep = safeSteps[currentIndex] || null;

  return (
    <section className="sf-glass-panel sf-replay-panel">
      <div className="sf-panel-header">
        <div>
          <h2 className="sf-panel-title">Stack Replay</h2>
          <p className="sf-panel-subtitle">Timeline visual token por token</p>
        </div>

        <span className="sf-chip">
          <History size={13} />
          {safeSteps.length}
        </span>
      </div>

      {currentStep ? (
        <>
          <div className="sf-replay-current">
            <div className={currentStep.error ? "sf-replay-token is-error" : "sf-replay-token"}>
              {currentStep.error ? <AlertTriangle size={14} /> : <PlayCircle size={14} />}
              <strong>{currentStep.token}</strong>
            </div>

            <div>
              <strong>{currentStep.movementLabel}</strong>
              <span>{currentStep.note || currentStep.movement}</span>
            </div>
          </div>

          <div className="sf-replay-compare">
            <article>
              <span>Antes</span>
              <strong>
                {currentStep.beforeStack.length ? currentStep.beforeStack.join(" · ") : "vacío"}
              </strong>
            </article>

            <div className="sf-replay-arrow">
              <ChevronsRight size={18} />
            </div>

            <article>
              <span>Después</span>
              <strong>
                {currentStep.afterStack.length ? currentStep.afterStack.join(" · ") : "vacío"}
              </strong>
            </article>
          </div>

          {currentStep.error ? (
            <div className="sf-replay-error">
              <AlertTriangle size={14} />
              {currentStep.error}
            </div>
          ) : null}

          <div className="sf-replay-controls">
            <button className="sf-button sf-button-secondary" type="button" onClick={onPrevious}>
              <ArrowLeft size={14} />
              Anterior
            </button>

            <span>
              Paso {currentIndex + 1} / {safeSteps.length}
            </span>

            <button className="sf-button" type="button" onClick={onNext}>
              Siguiente
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="sf-replay-timeline sf-scrollbar">
            {safeSteps.map((step, index) => (
              <button
                type="button"
                key={`${step.token}-${index}`}
                className={
                  index === currentIndex
                    ? "sf-replay-step is-active"
                    : step.error
                      ? "sf-replay-step is-error"
                      : "sf-replay-step"
                }
                onClick={() => onSelect(index)}
              >
                <span>{index + 1}</span>
                <strong>{step.token}</strong>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="sf-replay-empty">
          <Boxes size={34} />
          <strong>Sin replay generado</strong>
          <span>Presioná Stack Replay para construir la línea de tiempo.</span>
        </div>
      )}
    </section>
  );
}