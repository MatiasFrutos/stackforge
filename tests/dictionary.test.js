import { describe, expect, it } from "vitest";
import { Stack } from "../src/core/stack.js";
import { createDictionary } from "../src/core/dictionary.js";

describe("Dictionary", () => {
  it("crea un diccionario valido", () => {
    const stack = new Stack();
    const dictionary = createDictionary(stack);

    expect(dictionary).toBeInstanceOf(Map);
  });

  it("incluye palabras aritmeticas basicas", () => {
    const stack = new Stack();
    const dictionary = createDictionary(stack);

    expect(dictionary.has("+")).toBe(true);
    expect(dictionary.has("-")).toBe(true);
    expect(dictionary.has("*")).toBe(true);
    expect(dictionary.has("/")).toBe(true);
  });

  it("incluye operaciones basicas de pila", () => {
    const stack = new Stack();
    const dictionary = createDictionary(stack);

    expect(dictionary.has("dup")).toBe(true);
    expect(dictionary.has("drop")).toBe(true);
    expect(dictionary.has("swap")).toBe(true);
    expect(dictionary.has("over")).toBe(true);
  });

  it("ejecuta suma correctamente", () => {
    const stack = new Stack();
    const dictionary = createDictionary(stack);

    stack.push(2);
    stack.push(3);

    dictionary.get("+")();

    expect(stack.toArray()).toEqual([5]);
  });

  it("ejecuta resta correctamente", () => {
    const stack = new Stack();
    const dictionary = createDictionary(stack);

    stack.push(10);
    stack.push(4);

    dictionary.get("-")();

    expect(stack.toArray()).toEqual([6]);
  });

  it("ejecuta multiplicacion correctamente", () => {
    const stack = new Stack();
    const dictionary = createDictionary(stack);

    stack.push(6);
    stack.push(7);

    dictionary.get("*")();

    expect(stack.toArray()).toEqual([42]);
  });

  it("ejecuta division correctamente", () => {
    const stack = new Stack();
    const dictionary = createDictionary(stack);

    stack.push(20);
    stack.push(5);

    dictionary.get("/")();

    expect(stack.toArray()).toEqual([4]);
  });

  it("ejecuta dup correctamente", () => {
    const stack = new Stack();
    const dictionary = createDictionary(stack);

    stack.push(9);

    dictionary.get("dup")();

    expect(stack.toArray()).toEqual([9, 9]);
  });

  it("ejecuta drop correctamente", () => {
    const stack = new Stack();
    const dictionary = createDictionary(stack);

    stack.push(1);
    stack.push(2);

    dictionary.get("drop")();

    expect(stack.toArray()).toEqual([1]);
  });

  it("ejecuta swap correctamente", () => {
    const stack = new Stack();
    const dictionary = createDictionary(stack);

    stack.push("A");
    stack.push("B");

    dictionary.get("swap")();

    expect(stack.toArray()).toEqual(["B", "A"]);
  });

  it("ejecuta over correctamente", () => {
    const stack = new Stack();
    const dictionary = createDictionary(stack);

    stack.push("A");
    stack.push("B");

    dictionary.get("over")();

    expect(stack.toArray()).toEqual(["A", "B", "A"]);
  });
});