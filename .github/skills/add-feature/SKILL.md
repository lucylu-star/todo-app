---
name: add-feature
description: 'Add a new feature to the todo app. Use when adding new todo functionality, theme enhancements, filter types, or UI components. Guides you through HTML structure, CSS theming, JavaScript logic, and testing.'
argument-hint: 'Describe the feature: e.g., "add due dates", "add priority levels", "add edit mode"'
---

# Add a New Feature to Todo App

## When to Use
- Adding todo CRUD enhancements (edit, due dates, priority)
- Extending filter options
- Adding new theme capabilities
- Creating new UI components or sections
- Any change affecting multiple files

## Quick Workflow

### 1. **Plan the Feature**
- What HTML structure is needed?
- Will this require new localStorage keys? (follow `todo-app-*` naming)
- What CSS variables or styles are needed for both light/dark themes?
- Which class methods need to be added/modified (TodoApp or ThemeManager)?

### 2. **Add HTML Structure** (index.html)
- Update the semantic markup in index.html
- Use descriptive IDs and classes
- Ensure accessibility (labels, aria attributes)
- Follow existing structure (don't restructure existing elements)

### 3. **Add Styles** (styles.css)
- Define new CSS variables in both `:root` (light) and `html.dark-theme` (dark)
- Use CSS variables for all colors—never hardcode hex values
- Add responsive design considerations
- Include smooth transitions (0.3s ease standard)
- Test computed styles in both themes (DevTools → Elements → Computed)

### 4. **Update JavaScript** (script.js)
- Add new properties to todo objects if needed (update constructor)
- Add methods to TodoApp or ThemeManager class
- Update `render()` method if DOM structure changed
- Update `saveTodos()` / `loadTodos()` if persisting new data
- Use `escapeHtml()` for any user-generated content
- Update filter/stats logic if affected

### 5. **Verify Architecture**
- Does the code follow class patterns in [AGENTS.md](../../../AGENTS.md)?
- Are event handlers attached correctly?
- Do localStorage keys use `todo-app-*` prefix?

### 6. **Test Thoroughly**
Follow [testing practices](../instructions/testing.instructions.md):
- ✅ Test feature in all filter views (All, Active, Completed)
- ✅ Toggle theme and verify styling in both light/dark modes
- ✅ Reload page and verify data persists (check DevTools → Application → LocalStorage)
- ✅ Test edge cases (empty input, special characters, HTML)
- ✅ Verify stats counter and empty state update correctly
- ✅ Check browser console for errors

### 7. **Code Review**
Use the [code review prompt](../prompts/review-crud-theme.prompt.md) to validate:
```
/review-crud-theme
```
Paste your code changes for automated checklist validation.

## Troubleshooting

**Theme not applying?**
- Verify CSS variable names match `:root` and `html.dark-theme`
- Check DevTools → Elements → Computed to see resolved values
- Ensure class is added to `<html>` element, not `<body>`

**Data not persisting?**
- Open DevTools → Application → LocalStorage → file:// 
- Look for `todo-app-todos` and `todo-app-theme` keys
- Verify JSON is valid (check console for parse errors)

**Filter not showing new feature?**
- Check if `getFilteredTodos()` needs updating
- Verify completed/active status affects filter logic correctly

## Related Commands

- `/review-crud-theme` — Validate code changes before committing
- See [AGENTS.md](../../../AGENTS.md) for architecture reference
- See [testing practices](../instructions/testing.instructions.md) for full test checklist
