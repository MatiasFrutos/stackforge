import { Activity, AlertTriangle, CheckCircle2, Layers, ListTree } from "lucide-react";

export default function StatusBar({
  stackSize = 0,
  wordCount = 0,
  lastCommand = "Sin ejecucion",
  lastError = "",
  executionCount = 0,
}) {
  const hasError = Boolean(lastError);

  return (
    <footer className="sf-statusbar">
      <div className="sf-status-left">
        <span className={hasError ? "sf-status-item sf-status-error" : "sf-status-item"}>
          {hasError ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
          {hasError ? lastError : "Sistema listo"}
        </span>

        <span className="sf-status-item sf-hide-mobile">
          <Activity size={14} />
          Ultimo: {lastCommand}
        </span>
      </div>

      <div className="sf-status-right">
        <span className="sf-status-item">
          <Layers size={14} />
          Stack: {stackSize}
        </span>

        <span className="sf-status-item">
          <ListTree size={14} />
          Words: {wordCount}
        </span>

        <span className="sf-status-item sf-hide-mobile">
          Runs: {executionCount}
        </span>
      </div>
    </footer>
  );
}