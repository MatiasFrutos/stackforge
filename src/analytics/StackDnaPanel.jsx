import {
  Activity,
  AlertTriangle,
  BarChart3,
  Boxes,
  Brain,
  CheckCircle2,
  Gauge,
} from "lucide-react";

export default function StackDnaPanel({ report = null }) {
  if (!report) {
    return (
      <section className="sf-glass-panel sf-dna-panel">
        <div className="sf-panel-header">
          <div>
            <h2 className="sf-panel-title">Stack DNA</h2>
            <p className="sf-panel-subtitle">Análisis operativo del código Forth</p>
          </div>

          <span className="sf-chip">
            <Brain size={13} />
            listo
          </span>
        </div>

        <div className="sf-dna-empty">
          <Brain size={34} />
          <strong>Sin análisis todavía</strong>
          <span>Presioná Stack DNA para generar métricas del programa.</span>
        </div>
      </section>
    );
  }

  const isRiskHigh = report.riskLabel === "alto";
  const isRiskMedium = report.riskLabel === "medio";

  return (
    <section className="sf-glass-panel sf-dna-panel">
      <div className="sf-panel-header">
        <div>
          <h2 className="sf-panel-title">Stack DNA</h2>
          <p className="sf-panel-subtitle">Diagnóstico visual del comportamiento de pila</p>
        </div>

        <span className={`sf-chip sf-dna-risk-${report.riskLabel}`}>
          <Gauge size={13} />
          Riesgo {report.riskLabel}
        </span>
      </div>

      <div className="sf-dna-risk-card">
        {isRiskHigh || isRiskMedium ? (
          <AlertTriangle size={18} />
        ) : (
          <CheckCircle2 size={18} />
        )}

        <div>
          <strong>{report.riskScore}/100</strong>
          <span>{report.riskMessage}</span>
        </div>
      </div>

      <div className="sf-dna-metrics">
        <article>
          <Boxes size={15} />
          <strong>{report.tokenCount}</strong>
          <span>tokens</span>
        </article>

        <article>
          <Activity size={15} />
          <strong>{report.maxDepth}</strong>
          <span>profundidad máxima</span>
        </article>

        <article>
          <BarChart3 size={15} />
          <strong>{report.arithmeticOps}</strong>
          <span>ops aritméticas</span>
        </article>

        <article>
          <Brain size={15} />
          <strong>{report.stackOps}</strong>
          <span>ops de pila</span>
        </article>
      </div>

      <div className="sf-dna-section">
        <strong>Palabras más usadas</strong>

        <div className="sf-dna-words">
          {report.topWords.length ? (
            report.topWords.map((item) => (
              <span key={item.word}>
                {item.word} <b>{item.count}</b>
              </span>
            ))
          ) : (
            <small>Sin tokens relevantes.</small>
          )}
        </div>
      </div>

      <div className="sf-dna-section">
        <strong>Resultado final</strong>

        <p>
          Stack final:{" "}
          <b>{report.finalStack.length ? report.finalStack.join(" · ") : "vacío"}</b>
        </p>

        {report.errors.length ? (
          <p className="sf-dna-error">
            Error detectado: {report.errors[0].error}
          </p>
        ) : (
          <p>Sin errores críticos detectados.</p>
        )}
      </div>
    </section>
  );
}