import { tokenize } from "../core/tokenizer.js";
import { buildReplay } from "../replay/replayEngine.js";
import { getRiskLabel, getRiskMessage } from "../replay/replayUtils.js";

function countBy(items = []) {
  return items.reduce((acc, item) => {
    const key = String(item || "unknown");
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function getTopWords(tokens = []) {
  const ignored = new Set([":", ";", '."']);
  const counts = countBy(tokens.filter((token) => !ignored.has(token)));

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word, count]) => ({ word, count }));
}

function estimateUnderflowRisk(tokens = []) {
  const stackNeed = {
    "+": 2,
    "-": 2,
    "*": 2,
    "/": 2,
    mod: 2,
    "=": 2,
    ">": 2,
    "<": 2,
    ">=": 2,
    "<=": 2,
    dup: 1,
    drop: 1,
    swap: 2,
    over: 2,
    rot: 3,
    nip: 2,
    ".": 1,
  };

  let depth = 0;
  let risk = 0;

  tokens.forEach((token) => {
    if (/^-?\d+(\.\d+)?$/.test(token)) {
      depth += 1;
      return;
    }

    const need = stackNeed[token];

    if (!need) return;

    if (depth < need) {
      risk += 1;
    }

    if (["+", "-", "*", "/", "mod", "=", ">", "<", ">=", "<="].includes(token)) {
      depth = Math.max(0, depth - 2) + 1;
      return;
    }

    if (token === "dup") depth += 1;
    if (token === "drop") depth = Math.max(0, depth - 1);
    if (token === ".") depth = Math.max(0, depth - 1);
  });

  return risk;
}

export function analyzeStackDna(source) {
  const replay = buildReplay(source);
  const tokens = tokenize(source);
  const movementCounts = countBy(replay.steps.map((step) => step.movement));
  const maxDepth = replay.steps.reduce(
    (max, step) => Math.max(max, step.afterStack.length),
    0
  );

  const arithmeticOps = replay.steps.filter((step) => step.movement === "ARITHMETIC").length;
  const stackOps = replay.steps.filter((step) =>
    ["PUSH", "POP", "DUP", "DROP", "SWAP", "OVER", "ROT", "NIP", "CLEAR"].includes(step.movement)
  ).length;

  const outputOps = replay.steps.filter((step) => step.movement === "OUTPUT").length;
  const errors = replay.steps.filter((step) => step.error);
  const underflowRisk = estimateUnderflowRisk(tokens);

  let riskScore = 0;

  riskScore += errors.length * 55;
  riskScore += underflowRisk * 20;
  riskScore += maxDepth > 8 ? 20 : 0;
  riskScore += tokens.length > 40 ? 10 : 0;

  riskScore = Math.min(100, riskScore);

  return {
    source,
    ok: replay.ok,
    riskScore,
    riskLabel: getRiskLabel(riskScore),
    riskMessage: getRiskMessage(riskScore),
    tokenCount: tokens.length,
    stepCount: replay.steps.length,
    maxDepth,
    finalStack: replay.finalStack,
    finalOutput: replay.finalOutput,
    arithmeticOps,
    stackOps,
    outputOps,
    underflowRisk,
    movementCounts,
    topWords: getTopWords(tokens),
    errors,
    replay,
  };
}

export default analyzeStackDna;