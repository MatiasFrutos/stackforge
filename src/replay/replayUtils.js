export function cloneStack(stack = []) {
  return Array.isArray(stack) ? [...stack] : [];
}

export function getStackMovement(beforeStack = [], afterStack = [], token = "") {
  const before = cloneStack(beforeStack);
  const after = cloneStack(afterStack);
  const word = String(token ?? "").toLowerCase();

  if (word === "clear") return "CLEAR";
  if (word === "dup") return "DUP";
  if (word === "drop") return "DROP";
  if (word === "swap") return "SWAP";
  if (word === "over") return "OVER";
  if (word === "rot") return "ROT";
  if (word === "nip") return "NIP";
  if (["+", "-", "*", "/", "mod"].includes(word)) return "ARITHMETIC";
  if (["=", ">", "<", ">=", "<="].includes(word)) return "COMPARE";
  if ([".", ".s", "cr"].includes(word)) return "OUTPUT";

  if (after.length > before.length) return "PUSH";
  if (after.length < before.length) return "POP";

  if (before.join("|") !== after.join("|")) {
    return "MOVE";
  }

  return "IDLE";
}

export function getMovementLabel(type = "IDLE") {
  const labels = {
    PUSH: "Apila valor",
    POP: "Retira valor",
    DUP: "Duplica TOP",
    DROP: "Descarta TOP",
    SWAP: "Intercambia valores",
    OVER: "Copia segundo valor",
    ROT: "Rota la pila",
    NIP: "Elimina segundo valor",
    CLEAR: "Limpia pila",
    ARITHMETIC: "Opera números",
    COMPARE: "Compara valores",
    OUTPUT: "Genera salida",
    MOVE: "Reordena pila",
    ERROR: "Error",
    DEFINE: "Define palabra",
    STRING: "Imprime texto",
    IDLE: "Sin cambio",
  };

  return labels[type] || labels.IDLE;
}

export function getRiskLabel(score = 0) {
  if (score >= 70) return "alto";
  if (score >= 35) return "medio";
  return "bajo";
}

export function getRiskMessage(score = 0) {
  if (score >= 70) {
    return "Riesgo alto: hay errores o posible uso incorrecto de la pila.";
  }

  if (score >= 35) {
    return "Riesgo medio: conviene revisar operaciones de pila y profundidad.";
  }

  return "Riesgo bajo: el flujo parece estable para un programa Forth básico.";
}