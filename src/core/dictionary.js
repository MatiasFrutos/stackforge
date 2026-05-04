function ensureNumber(value, word) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`La palabra ${word} requiere valores numericos`);
  }

  return value;
}

export function createDictionary(stack, output = []) {
  const dictionary = new Map();

  dictionary.set("+", () => {
    const b = ensureNumber(stack.pop(), "+");
    const a = ensureNumber(stack.pop(), "+");

    stack.push(a + b);
  });

  dictionary.set("-", () => {
    const b = ensureNumber(stack.pop(), "-");
    const a = ensureNumber(stack.pop(), "-");

    stack.push(a - b);
  });

  dictionary.set("*", () => {
    const b = ensureNumber(stack.pop(), "*");
    const a = ensureNumber(stack.pop(), "*");

    stack.push(a * b);
  });

  dictionary.set("/", () => {
    const b = ensureNumber(stack.pop(), "/");
    const a = ensureNumber(stack.pop(), "/");

    if (b === 0) {
      throw new Error("Division por cero");
    }

    stack.push(a / b);
  });

  dictionary.set("mod", () => {
    const b = ensureNumber(stack.pop(), "mod");
    const a = ensureNumber(stack.pop(), "mod");

    if (b === 0) {
      throw new Error("Modulo por cero");
    }

    stack.push(a % b);
  });

  dictionary.set("=", () => {
    const b = stack.pop();
    const a = stack.pop();

    stack.push(a === b ? 1 : 0);
  });

  dictionary.set(">", () => {
    const b = ensureNumber(stack.pop(), ">");
    const a = ensureNumber(stack.pop(), ">");

    stack.push(a > b ? 1 : 0);
  });

  dictionary.set("<", () => {
    const b = ensureNumber(stack.pop(), "<");
    const a = ensureNumber(stack.pop(), "<");

    stack.push(a < b ? 1 : 0);
  });

  dictionary.set(">=", () => {
    const b = ensureNumber(stack.pop(), ">=");
    const a = ensureNumber(stack.pop(), ">=");

    stack.push(a >= b ? 1 : 0);
  });

  dictionary.set("<=", () => {
    const b = ensureNumber(stack.pop(), "<=");
    const a = ensureNumber(stack.pop(), "<=");

    stack.push(a <= b ? 1 : 0);
  });

  dictionary.set("dup", () => {
    if (stack.isEmpty()) {
      throw new Error("Stack underflow");
    }

    stack.push(stack.peek());
  });

  dictionary.set("drop", () => {
    stack.pop();
  });

  dictionary.set("swap", () => {
    const b = stack.pop();
    const a = stack.pop();

    stack.push(b);
    stack.push(a);
  });

  dictionary.set("over", () => {
    const b = stack.pop();
    const a = stack.pop();

    stack.push(a);
    stack.push(b);
    stack.push(a);
  });

  dictionary.set("rot", () => {
    const c = stack.pop();
    const b = stack.pop();
    const a = stack.pop();

    stack.push(b);
    stack.push(c);
    stack.push(a);
  });

  dictionary.set("nip", () => {
    const b = stack.pop();

    stack.pop();
    stack.push(b);
  });

  dictionary.set("clear", () => {
    stack.clear();
  });

  dictionary.set(".", () => {
    output.push(String(stack.pop()));
  });

  dictionary.set(".s", () => {
    output.push(`<${stack.size()}> ${stack.toArray().join(" ")}`);
  });

  dictionary.set("cr", () => {
    output.push("\n");
  });

  return dictionary;
}

export default createDictionary;