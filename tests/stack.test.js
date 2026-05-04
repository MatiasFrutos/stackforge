import { describe, expect, it } from "vitest";
import { Stack } from "../src/core/stack.js";

describe("Stack", () => {
  it("crea una pila vacia", () => {
    const stack = new Stack();

    expect(stack.toArray()).toEqual([]);
  });

  it("agrega valores con push", () => {
    const stack = new Stack();

    stack.push(10);
    stack.push(20);

    expect(stack.toArray()).toEqual([10, 20]);
  });

  it("quita valores con pop", () => {
    const stack = new Stack();

    stack.push(10);
    stack.push(20);

    const value = stack.pop();

    expect(value).toBe(20);
    expect(stack.toArray()).toEqual([10]);
  });

  it("lee el valor superior con peek sin quitarlo", () => {
    const stack = new Stack();

    stack.push("A");
    stack.push("B");

    const value = stack.peek();

    expect(value).toBe("B");
    expect(stack.toArray()).toEqual(["A", "B"]);
  });

  it("limpia la pila con clear", () => {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);
    stack.push(3);

    stack.clear();

    expect(stack.toArray()).toEqual([]);
  });

  it("devuelve una copia de la pila con toArray", () => {
    const stack = new Stack();

    stack.push(100);

    const copy = stack.toArray();
    copy.push(200);

    expect(stack.toArray()).toEqual([100]);
    expect(copy).toEqual([100, 200]);
  });

  it("lanza error cuando se hace pop en pila vacia", () => {
    const stack = new Stack();

    expect(() => stack.pop()).toThrow("Stack underflow");
  });

  it("peek devuelve undefined cuando la pila esta vacia", () => {
    const stack = new Stack();

    expect(stack.peek()).toBeUndefined();
  });

  it("soporta diferentes tipos de valores", () => {
    const stack = new Stack();

    stack.push(123);
    stack.push("forth");
    stack.push(true);

    expect(stack.toArray()).toEqual([123, "forth", true]);
  });
});