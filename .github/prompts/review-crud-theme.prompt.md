---
description: "Review code changes for todo CRUD operations and theme/localStorage compatibility. Validates testing practices, architectural patterns, and data persistence."
agent: "agent"
---

# Code Review: Todo CRUD & Theme Changes

You are reviewing code changes in a vanilla JavaScript todo app. Follow the testing and architectural guidelines to verify the changes are production-ready.

## Review Checklist

### 1. **Architecture & Patterns**
- [ ] Code follows the TodoApp/ThemeManager class structure (see [AGENTS.md](../../../AGENTS.md))
- [ ] New methods are added to appropriate class (TodoApp for CRUD, ThemeManager for themes)
- [ ] Event handlers use inline handlers or proper event listener attachment
- [ ] localStorage keys follow `todo-app-*` naming convention

### 2. **Theme Compatibility**
- [ ] All colors use CSS variables (`--bg-primary`, `--text-primary`, etc.), not hardcoded hex
- [ ] Styles defined in both `:root` (light) and `html.dark-theme` (dark) contexts
- [ ] Transitions are smooth (0.3s ease is standard)
- [ ] Dark theme contrast is sufficient (especially for completed items)

### 3. **Testing Requirements**
Verify against [testing practices](../../instructions/testing.instructions.md):
- [ ] Todo CRUD operations tested (add, toggle, delete, empty state)
- [ ] Filter functionality works across all views
- [ ] Theme persistence verified (localStorage survives reload)
- [ ] Edge cases handled (empty input, whitespace, HTML escaping)
- [ ] Stats counter updates immediately after changes

### 4. **Security**
- [ ] User input is escaped with `escapeHtml()` before rendering (XSS prevention)
- [ ] No `eval()` or dynamic code execution
- [ ] localStorage data validated before JSON.parse()

### 5. **Data Persistence**
- [ ] Todos saved to localStorage after add/edit/delete
- [ ] Theme persists across page reloads
- [ ] Graceful fallback if localStorage is corrupted or unavailable
- [ ] No console errors on load

## Output Format

Provide:
1. **Overall Status**: ✅ Ready to merge / ⚠️ Needs changes / ❌ Blocking issues
2. **Findings**: List any issues by category (Architecture, Theme, Testing, Security, Persistence)
3. **Recommendations**: Specific actions to address each finding
4. **Testing Summary**: Manual test scenarios that should pass
