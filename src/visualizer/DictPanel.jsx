import { BookOpen, Cpu, Search } from "lucide-react";

const DEFAULT_WORDS = ["+", "-", "*", "/", "dup", "drop", "swap", "over"];

function getWordType(word) {
  if (["+", "-", "*", "/"].includes(word)) return "Aritmetica";
  if (["dup", "drop", "swap", "over"].includes(word)) return "Stack";
  return "Usuario";
}

export default function DictPanel({ words = DEFAULT_WORDS }) {
  const normalizedWords = Array.isArray(words) && words.length > 0 ? words : DEFAULT_WORDS;

  return (
    <section className="sf-glass-panel sf-dict-panel">
      <div className="sf-panel-header">
        <div>
          <h2 className="sf-panel-title">Diccionario</h2>
          <p className="sf-panel-subtitle">Palabras disponibles del entorno Forth</p>
        </div>

        <span className="sf-chip">
          <BookOpen size={13} />
          {normalizedWords.length}
        </span>
      </div>

      <div className="sf-dict-search">
        <Search size={15} />
        <span>Built-in words</span>
      </div>

      <div className="sf-dict-list sf-scrollbar">
        {normalizedWords.map((word) => (
          <article className="sf-dict-word" key={word}>
            <div className="sf-dict-word-icon">
              <Cpu size={15} />
            </div>

            <div>
              <strong>{word}</strong>
              <span>{getWordType(word)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}