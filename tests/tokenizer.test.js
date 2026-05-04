import { describe, expect, it } from "vitest";
import { tokenize } from "../src/core/tokenizer.js";

describe("Tokenizer", () => {
  it("convierte texto simple en tokens", () => {
    const tokens = tokenize("2 3 +");

    expect(tokens).toEqual(["2", "3", "+"]);
  });

  it("ignora espacios multiples", () => {
    const tokens = tokenize("   2     3      +   ");

    expect(tokens).toEqual(["2", "3", "+"]);
  });

  it("ignora saltos de linea y tabs", () => {
    const tokens = tokenize("2\n3\t+");

    expect(tokens).toEqual(["2", "3", "+"]);
  });

  it("devuelve arreglo vacio si recibe texto vacio", () => {
    const tokens = tokenize("");

    expect(tokens).toEqual([]);
  });

  it("devuelve arreglo vacio si recibe solo espacios", () => {
    const tokens = tokenize("      ");

    expect(tokens).toEqual([]);
  });

  it("convierte valores no string a texto", () => {
    const tokens = tokenize(123);

    expect(tokens).toEqual(["123"]);
  });

  it("mantiene palabras Forth como tokens", () => {
    const tokens = tokenize("10 dup *");

    expect(tokens).toEqual(["10", "dup", "*"]);
  });

  it("tokeniza definiciones basicas de palabras", () => {
    const tokens = tokenize(": square dup * ;");

    expect(tokens).toEqual([":", "square", "dup", "*", ";"]);
  });

  it("tokeniza expresiones con comentarios como texto normal en esta version", () => {
    const tokens = tokenize("\\ comentario");

    expect(tokens).toEqual(["\\", "comentario"]);
  });
});