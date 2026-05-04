export function createHistory(initialItems = []) {
  const items = Array.isArray(initialItems) ? [...initialItems] : [];
  let cursor = items.length;

  return {
    add(command) {
      const normalized = String(command ?? "").trim();

      if (!normalized) {
        return;
      }

      items.push(normalized);
      cursor = items.length;
    },

    previous() {
      if (items.length === 0) {
        return "";
      }

      cursor = Math.max(0, cursor - 1);
      return items[cursor] ?? "";
    },

    next() {
      if (items.length === 0) {
        return "";
      }

      cursor = Math.min(items.length, cursor + 1);
      return items[cursor] ?? "";
    },

    all() {
      return [...items];
    },

    clear() {
      items.length = 0;
      cursor = 0;
    },

    size() {
      return items.length;
    },
  };
}

export default createHistory;