import { describe, expect, it } from "vitest";
import { Interpreter } from "../src/core/interpreter.js";

describe("Interpreter", () => {
  it("crea una instancia del interprete", () => {
    const interpreter = new Interpreter();

    expect(interpreter).toBeInstanceOf(Interpreter);
    expect(interpreter.stack).toBeDefined();
    expect(interpreter.dictionary).toBeDefined();
  });

  it("apila numeros correctamente", () => {
    const interpreter = new Interpreter();
    const result = interpreter.execute("1 2 3");

    expect(result.stack).toEqual([1, 2, 3]);
  });

  it("ejecuta suma basica", () => {
    const interpreter = new Interpreter();
    const result = interpreter.execute("2 3 +");

    expect(result.stack).toEqual([5]);
  });

  it("ejecuta resta basica", () => {
    const interpreter = new Interpreter();
    const result = interpreter.execute("10 4 -");

    expect(result.stack).toEqual([6]);
  });

  it("ejecuta multiplicacion basica", () => {
    const interpreter = new Interpreter();
    const result = interpreter.execute("6 7 *");

    expect(result.stack).toEqual([42]);
  });

  it("ejecuta division basica", () => {
    const interpreter = new Interpreter();
    const result = interpreter.execute("20 5 /");

    expect(result.stack).toEqual([4]);
  });

  it("ejecuta una expresion combinada", () => {
    const interpreter = new Interpreter();
    const result = interpreter.execute("2 3 + 4 *");

    expect(result.stack).toEqual([20]);
  });

  it("ejecuta dup", () => {
    const interpreter = new Interpreter();
    const result = interpreter.execute("8 dup");

    expect(result.stack).toEqual([8, 8]);
  });

  it("ejecuta drop", () => {
    const interpreter = new Interpreter();
    const result = interpreter.execute("1 2 drop");

    expect(result.stack).toEqual([1]);
  });

  it("ejecuta swap", () => {
    const interpreter = new Interpreter();
    const result = interpreter.execute("10 20 swap");

    expect(result.stack).toEqual([20, 10]);
  });

  it("ejecuta over", () => {
    const interpreter = new Interpreter();
    const result = interpreter.execute("10 20 over");

    expect(result.stack).toEqual([10, 20, 10]);
  });

  it("mantiene estado entre ejecuciones", () => {
    const interpreter = new Interpreter();

    interpreter.execute("5");
    const result = interpreter.execute("10 +");

    expect(result.stack).toEqual([15]);
  });

  it("acepta numeros decimales", () => {
    const interpreter = new Interpreter();
    const result = interpreter.execute("2.5 1.5 +");

    expect(result.stack).toEqual([4]);
  });

  it("lanza error si la palabra no existe", () => {
    const interpreter = new Interpreter();

    expect(() => interpreter.execute("2 3 palabra_inexistente")).toThrow(
      "Palabra desconocida: palabra_inexistente"
    );
  });

  it("lanza error por stack underflow en suma", () => {
    const interpreter = new Interpreter();

    expect(() => interpreter.execute("+")).toThrow("Stack underflow");
  });
});