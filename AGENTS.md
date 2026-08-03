# Todo App - Agent Guidelines

## Quick Overview
A vanilla JavaScript todo application with light/dark theme toggle and localStorage persistence. No external frameworks or build tools.

## Architecture & Code Organization

### Classes
- **ThemeManager**: Handles theme loading, persistence, and toggling
  - `loadTheme()` - Checks localStorage first, then system preference
  - `applyTheme(theme)` - Updates DOM class and localStorage
  - `toggle()` - Switches between 'light' and 'dark'

- **TodoApp**: Manages todo CRUD operations
  - `addTodo()` - Creates todo with ID (timestamp), text, completed flag, createdAt
  - `toggleTodo(id)` - Mark/unmark as complete
  - `deleteTodo(id)` - Remove todo by ID
  - `getFilteredTodos()` - Returns todos based on currentFilter ('all', 'active', 'completed')
  - `render()` - Updates DOM with filtered todos
  - `saveTodos()` / `loadTodos()` - localStorage I/O

### Key Patterns
- **localStorage Keys**: All prefixed with `todo-app-` (e.g., `todo-app-todos`, `todo-app-theme`)
- **CSS Variables**: Theme colors defined in `:root` and `html.dark-theme` selectors in styles.css
- **Event Handling**: Inline `onchange`/`onclick` handlers (not event listeners on dynamic elements)
- **HTML Escaping**: `escapeHtml()` method used in todo rendering for XSS prevention

## Common Development Tasks

### Adding a New Feature
1. **Add UI in HTML** - Update index.html structure
2. **Add Styles** - Use CSS variables (--bg-primary, --text-primary, etc.) for theme compatibility
3. **Update JS Logic** - Add methods to TodoApp or ThemeManager classes
4. **Test Both Themes** - Toggle theme to verify styling works in both light/dark modes
5. **localStorage** - If persisting new data, follow the `todo-app-*` key naming convention

### Fixing Theme Issues
- Ensure all colors use CSS custom properties, not hardcoded hex values
- Test in both `:root` (light) and `html.dark-theme` (dark) contexts
- Check transitions are smooth (0.3s ease is the standard)

### Debugging localStorage
- Open browser DevTools → Application → LocalStorage → file:// (for local testing)
- Look for keys: `todo-app-todos` (JSON array) and `todo-app-theme` (string: 'light'|'dark')

## File Purposes
- **index.html** - DOM structure with semantic markup
- **styles.css** - All styling using CSS variables for theming
- **script.js** - ThemeManager and TodoApp class definitions; instantiated at bottom
- **README.md** - Full feature documentation and theme variable reference

## Browser Support
Modern browsers with localStorage and CSS custom properties support (Chrome 49+, Firefox 31+, Safari 9.1+). See [README.md](README.md#browser-support) for details.

## Initialization
Instances created at bottom of script.js: `new ThemeManager()` and `new TodoApp()` with global `app` variable for onclick handlers.
