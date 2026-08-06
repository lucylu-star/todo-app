// src/utils.js
// Small utility functions for date calculations and parsing todos from a saved string.

/**
 * Calculate whole-day difference between two dates.
 * Accepts Date objects or ISO date strings (YYYY-MM-DD).
 * Returns integer number of days (end - begin).
 */
function calculateDaysBetweenDates(begin, end) {
  const toDate = (d) => (d instanceof Date ? new Date(d.getFullYear(), d.getMonth(), d.getDate()) : new Date(d + 'T00:00:00'));
  const b = toDate(begin);
  const e = toDate(end);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((e - b) / msPerDay);
}

/**
 * Parse a saved todos JSON string into an array of normalized todo objects.
 * If parsing fails, returns null.
 * If the stored value is an object keyed by id, it converts to array.
 */
function parseTodosFromString(saved) {
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    let todos = [];
    if (Array.isArray(parsed)) {
      todos = parsed;
    } else if (parsed && typeof parsed === 'object') {
      todos = Object.keys(parsed).map((k) => parsed[k]);
    } else {
      return [];
    }

    const today = new Date().toISOString().split('T')[0];

    return todos.map((item) => {
      if (!item || typeof item !== 'object') {
        return {
          id: Date.now(),
          text: String(item || ''),
          completed: false,
          dueDate: today,
          createdAt: new Date().toISOString(),
        };
      }

      return {
        id: typeof item.id === 'number' ? item.id : Number(item.id) || Date.now(),
        text: typeof item.text === 'string' ? item.text : String(item.text || ''),
        completed: !!item.completed,
        dueDate: item.dueDate || today,
        createdAt: item.createdAt || new Date().toISOString(),
      };
    });
  } catch (e) {
    return null;
  }
}

module.exports = {
  calculateDaysBetweenDates,
  parseTodosFromString,
};
