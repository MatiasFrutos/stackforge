import { Database, GitBranch, HardDrive, Layers3 } from "lucide-react";

export default function MemoryMap({
  stack = [],
  words = [],
  executionCount = 0,
}) {
  const memoryBlocks = [
    {
      id: "stack",
      label: "Data Stack",
      value: stack.length,
      icon: Layers3,
      description: "Valores activos en pila",
    },
    {
      id: "dictionary",
      label: "Dictionary",
      value: words.length,
      icon: GitBranch,
      description: "Palabras registradas",
    },
    {
      id: "runs",
      label: "Executions",
      value: executionCount,
      icon: Database,
      description: "Ejecuciones realizadas",
    },
  ];

  return (
    <section className="sf-glass-panel sf-memory-panel">
      <div className="sf-panel-header">
        <div>
          <h2 className="sf-panel-title">Memory Map</h2>
          <p className="sf-panel-subtitle">Vista conceptual del estado interno</p>
        </div>

        <span className="sf-chip">
          <HardDrive size={13} />
          v2 preview
        </span>
      </div>

      <div className="sf-memory-grid">
        {memoryBlocks.map((block) => {
          const Icon = block.icon;

          return (
            <article className="sf-memory-card" key={block.id}>
              <div className="sf-memory-icon">
                <Icon size={18} />
              </div>

              <div>
                <strong>{block.value}</strong>
                <span>{block.label}</span>
                <small>{block.description}</small>
              </div>
            </article>
          );
        })}
      </div>

      <div className="sf-memory-map">
        <div className="sf-memory-line" />

        <div className="sf-memory-node sf-memory-node-primary">
          Interpreter
        </div>

        <div className="sf-memory-node">
          Stack
        </div>

        <div className="sf-memory-node">
          Dictionary
        </div>

        <div className="sf-memory-node">
          REPL
        </div>
      </div>
    </section>
  );
}