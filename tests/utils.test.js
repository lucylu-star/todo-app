const { calculateDaysBetweenDates, parseTodosFromString } = require('../src/utils');

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

  test('parses object keyed by id', () => {
    const obj = { '1': { id: 1, text: 'taskA' } };
    const result = parseTodosFromString(JSON.stringify(obj));
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].text).toBe('taskA');
  });

  test('parses primitive array (strings) into normalized todos', () => {
    const sample = JSON.stringify(['one', 'two']);
    const result = parseTodosFromString(sample);
    expect(result.length).toBe(2);
    expect(result[0].text).toBe('one');
    expect(typeof result[0].id).toBe('number');
  });

  test('returns null for invalid JSON', () => {
    const result = parseTodosFromString('not-a-json');
    expect(result).toBeNull();
  });

  test('returns empty array for empty input', () => {
    expect(parseTodosFromString('')).toEqual([]);
    expect(parseTodosFromString(null)).toEqual([]);
  });
});
