// src/utils.js
// Small utility functions for date calculations and parsing todos from a saved string.

/**
 * Convert a YYYY-MM-DD string or Date object into a Date at local midnight.
 * This avoids using string-based parsing like "YYYY-MM-DDT00:00:00" which can
 * be interpreted differently in some environments/timezones.
 */
function toLocalMidnight(d) {
  if (d instanceof Date) {
    // Normalize to local midnight for Date objects
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
  if (typeof d === 'string') {
    // Expect format YYYY-MM-DD (ISO date without time).
    const parts = d.split('-');
    if (parts.length === 3) {
      const year = Number(parts[0]);
      const monthIndex = Number(parts[1]) - 1; // JS month is 0-based
      const day = Number(parts[2]);
      if (!Number.isNaN(year) && !Number.isNaN(monthIndex) && !Number.isNaN(day)) {
        return new Date(year, monthIndex, day);
      }
    }
    // Fallback to Date constructor as last resort
    return new Date(d + 'T00:00:00');
  }
  // Unknown input; attempt Date conversion
  return new Date(d);
}

/**
 * Calculate whole-day difference between two dates.
 * Accepts Date objects or ISO date strings (YYYY-MM-DD).
 * Returns integer number of days (end - begin).
 */
function calculateDaysBetweenDates(begin, end) {
  const b = toLocalMidnight(begin);
  const e = toLocalMidnight(end);
  const msPerDay = 24 * 60 * 60 * 1000;
  // Use rounding to get whole-day differences
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
  toLocalMidnight, // exported for testability if needed
};
