import {
  createInfixErrorMessage,
  isNumericToken,
  looksLikeInfixToken,
  tokenize,
} from "./tokenizer.js";
import { Stack } from "./stack.js";
import { createDictionary } from "./dictionary.js";

export class Interpreter {
  constructor() {
    this.stack = new Stack();
    this.output = [];
    this.userWords = new Map();
    this.dictionary = createDictionary(this.stack, this.output);
  }

  reset() {
    this.stack.clear();
    this.output = [];
    this.userWords.clear();
    this.dictionary = createDictionary(this.stack, this.output);
  }

  execute(source) {
    const tokens = tokenize(source);

    this.output = [];
    this.dictionary = createDictionary(this.stack, this.output);

    this.executeTokens(tokens);

    return {
      stack: this.stack.toArray(),
      output: [...this.output],
      words: this.getWords(),
    };
  }

  executeTokens(tokens) {
    for (let index = 0; index < tokens.length; index += 1) {
      const token = tokens[index];

      if (token === ":") {
        index = this.defineUserWord(tokens, index);
        continue;
      }

      if (token === '."') {
        const text = tokens[index + 1];

        if (text === undefined) {
          throw new Error('String incompleto despues de ."');
        }

        this.output.push(text);
        index += 1;
        continue;
      }

      this.executeToken(token);
    }
  }

  executeToken(token) {
    if (isNumericToken(token)) {
      this.stack.push(Number(token));
      return;
    }

    if (looksLikeInfixToken(token)) {
      throw new Error(createInfixErrorMessage(token));
    }

    const builtinWord = this.dictionary.get(token);

    if (builtinWord) {
      builtinWord();
      return;
    }

    const userWord = this.userWords.get(token);

    if (userWord) {
      this.executeTokens(userWord);
      return;
    }

    throw new Error(
      `Palabra desconocida: "${token}". Si queres sumar, usa formato Forth: 2 3 +`
    );
  }

  defineUserWord(tokens, startIndex) {
    const wordName = tokens[startIndex + 1];

    if (!wordName) {
      throw new Error("Definicion invalida: falta nombre de palabra");
    }

    if (isNumericToken(wordName)) {
      throw new Error("Definicion invalida: el nombre no puede ser numerico");
    }

    if (looksLikeInfixToken(wordName)) {
      throw new Error(createInfixErrorMessage(wordName));
    }

    const body = [];
    let index = startIndex + 2;

    while (index < tokens.length && tokens[index] !== ";") {
      body.push(tokens[index]);
      index += 1;
    }

    if (tokens[index] !== ";") {
      throw new Error(`Definicion incompleta para: ${wordName}`);
    }

    if (body.length === 0) {
      throw new Error(`La palabra ${wordName} no tiene instrucciones`);
    }

    this.userWords.set(wordName, body);

    return index;
  }

  getWords() {
    return [
      ...Array.from(this.dictionary.keys()),
      ...Array.from(this.userWords.keys()),
    ];
  }

  getState() {
    return {
      stack: this.stack.toArray(),
      output: [...this.output],
      words: this.getWords(),
    };
  }
}

export default Interpreter;