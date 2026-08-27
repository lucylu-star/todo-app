const { calculateDaysBetweenDates, parseTodosFromString, toLocalMidnight } = require('../src/utils');

describe('calculateDaysBetweenDates', () => {
  test('same day returns 0', () => {
    expect(calculateDaysBetweenDates('2026-08-06', '2026-08-06')).toBe(0);
  });

  test('difference across days', () => {
    expect(calculateDaysBetweenDates('2026-08-01', '2026-08-03')).toBe(2);
  });

  test('accepts Date objects', () => {
    expect(calculateDaysBetweenDates(new Date('2026-08-01'), new Date('2026-08-02'))).toBe(1);
  });

  // New edge-case test: day difference across typical DST transition date
  test('day difference across DST boundary is 1 day', () => {
    // Pick a known DST transition date (US example: 2026-03-08 -> 2026-03-09)
    expect(calculateDaysBetweenDates('2026-03-08', '2026-03-09')).toBe(1);
  });
});

describe('parseTodosFromString', () => {
  test('parses array of todos', () => {
    const sample = JSON.stringify([
      { id: 1, text: 'task', completed: false, dueDate: '2026-08-10', createdAt: '2026-08-01T00:00:00Z' },
    ]);
    const result = parseTodosFromString(sample);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].text).toBe('task');
    expect(result[0].id).toBe(1);
  });
});
