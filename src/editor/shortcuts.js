export const shortcuts = {
  run: "Ctrl+Enter",
  clearStack: "Ctrl+Backspace",
  reset: "Ctrl+Shift+R",
  focusRepl: "Ctrl+`",
};

export function isRunShortcut(event) {
  return event.ctrlKey && event.key === "Enter";
}

export function isClearStackShortcut(event) {
  return event.ctrlKey && event.key === "Backspace";
}

export function isResetShortcut(event) {
  return event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "r";
}

export function preventHandledShortcut(event, checker) {
  if (checker(event)) {
    event.preventDefault();
    return true;
  }

  return false;
}

export default shortcuts;