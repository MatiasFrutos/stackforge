export const FORTH_KEYWORDS = [
  "+",
  "-",
  "*",
  "/",
  "mod",
  "dup",
  "drop",
  "swap",
  "over",
  "rot",
  "nip",
  "clear",
  ".",
  ".s",
  "cr",
  ":",
  ";",
  "=",
  ">",
  "<",
  ">=",
  "<=",
];

export function classifyForthToken(token) {
  if (/^-?\d+(\.\d+)?$/.test(token)) {
    return "number";
  }

  if (FORTH_KEYWORDS.includes(token)) {
    return "keyword";
  }

  if (token.startsWith("\\")) {
    return "comment";
  }

  return "word";
}

export function getHighlightedPreview(source) {
  return String(source ?? "")
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => ({
      token,
      type: classifyForthToken(token),
    }));
}

export const forthHighlightRules = {
  numbers: /\b-?\d+(\.\d+)?\b/g,
  comments: /\\.*$/gm,
  strings: /\."\s+[^"]*"/g,
  definitions: /:\s+[a-zA-Z_][a-zA-Z0-9_-]*/g,
  words: /\b(dup|drop|swap|over|rot|nip|clear|mod|cr)\b/g,
};

export default forthHighlightRules;