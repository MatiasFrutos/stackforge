import { Interpreter } from "../core/interpreter.js";
import { tokenize } from "../core/tokenizer.js";
import { getStackMovement, getMovementLabel } from "./replayUtils.js";

function createStep({
  index,
  token,
  beforeStack,
  afterStack,
  output,
  error = "",
  type,
  note = "",
}) {
  const movement = type || getStackMovement(beforeStack, afterStack, token);

  return {
    index,
    token,
    beforeStack,
    afterStack,
    output,
    error,
    movement,
    movementLabel: getMovementLabel(error ? "ERROR" : movement),
    note,
  };
}

export function buildReplay(source) {
  const interpreter = new Interpreter();
  const tokens = tokenize(source);
  const steps = [];

  let index = 0;

  while (index < tokens.length) {
    const token = tokens[index];
    const beforeStack = interpreter.stack.toArray();

    try {
      if (token === ":") {
        const wordName = tokens[index + 1] || "sin_nombre";
        const endIndex = interpreter.defineUserWord(tokens, index);
        const body = tokens.slice(index + 2, endIndex);

        steps.push(
          createStep({
            index: steps.length,
            token: `: ${wordName} ... ;`,
            beforeStack,
            afterStack: interpreter.stack.toArray(),
            output: [],
            type: "DEFINE",
            note: `Define "${wordName}" como ${body.join(" ")}`,
          })
        );

        index = endIndex + 1;
        continue;
      }

      if (token === '."') {
        const text = tokens[index + 1];

        if (text === undefined) {
          throw new Error('String incompleto despues de ."');
        }

        interpreter.output.push(text);

        steps.push(
          createStep({
            index: steps.length,
            token: `." ${text}"`,
            beforeStack,
            afterStack: interpreter.stack.toArray(),
            output: [text],
            type: "STRING",
            note: "Imprime texto",
          })
        );

        index += 2;
        continue;
      }

      interpreter.output = [];
      interpreter.dictionary = interpreter.dictionary || new Map();
      interpreter.executeToken(token);

      steps.push(
        createStep({
          index: steps.length,
          token,
          beforeStack,
          afterStack: interpreter.stack.toArray(),
          output: [...interpreter.output],
        })
      );

      index += 1;
    } catch (error) {
      steps.push(
        createStep({
          index: steps.length,
          token,
          beforeStack,
          afterStack: interpreter.stack.toArray(),
          output: [],
          error: error.message || "Error desconocido",
          type: "ERROR",
          note: "La ejecución se detuvo en este token.",
        })
      );

      break;
    }
  }

  const finalStep = steps[steps.length - 1];

  return {
    ok: !steps.some((step) => step.error),
    source,
    tokens,
    steps,
    finalStack: finalStep ? finalStep.afterStack : [],
    finalOutput: steps.flatMap((step) => step.output || []),
    error: steps.find((step) => step.error)?.error || "",
  };
}

export default buildReplay;