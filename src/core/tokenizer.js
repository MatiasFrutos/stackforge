export function tokenize(source) {
  const input = String(source ?? "");
  const tokens = [];

  let current = "";
  let insideString = false;
  let insideLineComment = false;
  let insideBlockComment = false;

  function pushCurrent() {
    const value = current.trim();

    if (value) {
      tokens.push(value);
    }

    current = "";
  }

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (insideLineComment) {
      if (char === "\n") {
        insideLineComment = false;
      }

      continue;
    }

    if (insideBlockComment) {
      if (char === ")") {
        insideBlockComment = false;
      }

      continue;
    }

    if (!insideString && char === "\\") {
      pushCurrent();
      insideLineComment = true;
      continue;
    }

    if (!insideString && char === "(") {
      pushCurrent();
      insideBlockComment = true;
      continue;
    }

    if (!insideString && char === "." && next === "\"") {
      pushCurrent();
      tokens.push('."');
      index += 1;
      insideString = true;
      continue;
    }

    if (insideString) {
      if (char === "\"") {
        tokens.push(current);
        current = "";
        insideString = false;
        continue;
      }

      current += char;
      continue;
    }

    if (/\s/.test(char)) {
      pushCurrent();
      continue;
    }

    current += char;
  }

  pushCurrent();

  return tokens;
}

export function isNumericToken(token) {
  if (token === "" || token === null || token === undefined) {
    return false;
  }

  return /^-?\d+(\.\d+)?$/.test(String(token));
}

export function looksLikeInfixToken(token) {
  const value = String(token ?? "").trim();

  if (!value) return false;

  if (isNumericToken(value)) return false;

  return /^-?\d+(\.\d+)?[+\-*/<>]=?-?\d+(\.\d+)?$/.test(value);
}

export function createInfixErrorMessage(token) {
  const value = String(token ?? "").trim();

  if (value.includes("+")) {
    const parts = value.split("+");

    if (parts.length === 2 && parts[0] && parts[1]) {
      return `Forth usa notacion postfija: escribi "${parts[0]} ${parts[1]} +", no "${value}".`;
    }
  }

  if (value.includes("*")) {
    const parts = value.split("*");

    if (parts.length === 2 && parts[0] && parts[1]) {
      return `Forth usa notacion postfija: escribi "${parts[0]} ${parts[1]} *", no "${value}".`;
    }
  }

  if (value.includes("/")) {
    const parts = value.split("/");

    if (parts.length === 2 && parts[0] && parts[1]) {
      return `Forth usa notacion postfija: escribi "${parts[0]} ${parts[1]} /", no "${value}".`;
    }
  }

  const minusMatch = value.match(/^(-?\d+(?:\.\d+)?)-(-?\d+(?:\.\d+)?)$/);

  if (minusMatch) {
    return `Forth usa notacion postfija: escribi "${minusMatch[1]} ${minusMatch[2]} -", no "${value}".`;
  }

  return `Entrada invalida "${value}". Forth usa notacion postfija, por ejemplo: 2 3 +`;
}

export default tokenize;