---
name: testing-practices
description: "Use when: writing or reviewing code that affects todo CRUD operations, theme persistence, or localStorage. Ensures comprehensive test coverage for both light and dark themes, data persistence, and edge cases."
applyTo: "**"
---

# Testing Practices for Todo App

## Core Testing Areas

### 1. **Todo CRUD Operations**
When modifying `TodoApp` methods, verify:
- ✅ **Add Todo**: New todo appears in list, input clears, focus returns to input
- ✅ **Toggle Todo**: Checkbox state matches completed flag, styling updates (strikethrough)
- ✅ **Delete Todo**: Todo removes from DOM and localStorage, list re-renders
- ✅ **Empty State**: Correct message shows when no todos match current filter

**Edge Cases to Test:**
- Empty string input (should show alert)
- Whitespace-only input (should be trimmed and rejected)
- HTML in todo text (must be escaped for XSS prevention)
- Adding todos in different filter views (should work in all)

### 2. **Filter Functionality**
- All / Active / Completed buttons correctly filter todos
- Active filter shows only uncompleted todos
- Completed filter shows only completed todos
- Active button visually highlights current filter
- Filter persists across add/delete operations (stays on same filter)

### 3. **Theme Persistence**
When modifying `ThemeManager`, test **both themes**:

**Light Theme:**
- Default on first visit
- Applied when user selects light theme
- All CSS variables resolve correctly (check DevTools Computed Styles)
- No hardcoded colors visible

**Dark Theme:**
- Loads from localStorage if previously saved
- System preference detected on first visit (if `prefers-color-scheme: dark`)
- All CSS variables resolve correctly in dark context
- Completed todo styling remains distinct from background

**Persistence Check:**
- Set theme → Reload page → Theme persists
- localStorage key `todo-app-theme` contains 'light' or 'dark'

### 4. **localStorage Data Integrity**
- Todos persist across page reloads (key: `todo-app-todos` is valid JSON)
- Theme preference persists (key: `todo-app-theme`)
- Corrupted localStorage data doesn't crash the app
- Clearing localStorage resets todos and theme to defaults

**Debug Approach:**
Open DevTools → Application tab → LocalStorage → file:// to inspect both keys.

### 5. **Stats Counter**
Verify `updateStats()` displays correctly:
- `0 tasks` when no todos exist
- `X of Y tasks remaining` when some are incomplete
- `All Y tasks completed! 🎉` when all are done
- Count updates immediately after toggle/add/delete

## Manual Testing Workflow

1. **Fresh Start**: Clear browser cache/localStorage, open app
2. **Add & Complete**: Create 5 todos, mark 2 as complete
3. **Filter Tests**: Click each filter button, verify correct todos show
4. **Theme Toggle**: Click theme button, verify colors change, icon toggles (🌙 ☀️)
5. **Persistence**: Reload page, verify todos and theme are restored
6. **Both Themes**: Repeat steps 1-5 in dark theme
7. **Edge Cases**: Test empty input, whitespace, HTML in text (`<script>alert('xss')</script>`)

## When Adding New Features

- Add to "Core Testing Areas" above
- Update this checklist for any new localStorage keys or CSS variables
- Test in both light and dark themes
- Verify stats counter and empty state messaging

## Browser DevTools Tips

- **Console**: Check for errors before/after operations
- **Application tab**: Inspect `todo-app-todos` (should be valid JSON array)
- **Elements**: Verify `.dark-theme` class toggles on `<html>` element
- **Computed Styles**: Confirm CSS variables resolve to correct colors
