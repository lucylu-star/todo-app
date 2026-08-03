#!/usr/bin/env node
/**
 * SessionStart Hook: Inject Project Context
 * Runs at the beginning of every agent session to reinforce best practices.
 */

const fs = require('fs');

// Read hook input from stdin
let inputData = '';
process.stdin.on('data', chunk => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  try {
    const hookInput = JSON.parse(inputData);
    
    // Construct the system message to inject
    const systemMessage = `
=== TODO APP PROJECT STANDARDS ===

You are working with a vanilla JavaScript todo app. Follow these standards:

**ARCHITECTURE** (See AGENTS.md):
- TodoApp class handles CRUD operations (addTodo, toggleTodo, deleteTodo, render)
- ThemeManager class handles theme loading, persistence, and toggling
- localStorage keys must start with 'todo-app-' (e.g., 'todo-app-todos', 'todo-app-theme')

**CSS & THEMING**:
- NEVER hardcode colors—use CSS variables (--bg-primary, --text-primary, etc.)
- Define styles in both :root (light) and html.dark-theme (dark) contexts
- Transitions should use 0.3s ease as standard
- Test in BOTH light and dark themes before finishing

**JAVASCRIPT & SECURITY**:
- User input must be escaped with escapeHtml() before rendering (XSS prevention)
- Verify localStorage data with JSON.parse() error handling
- New todo data structures must include: id (timestamp), text, completed, createdAt

**TESTING** (See testing.instructions.md):
- Test CRUD ops: add, toggle, delete, empty state
- Test filters: All, Active, Completed work correctly
- Test persistence: reload page, verify todos and theme restored
- Test edge cases: empty input, whitespace, HTML tags, special characters
- Test stats counter: updates immediately after operations

**PROTECTED FILES** (Do NOT modify without strong reason):
- .github/instructions/testing.instructions.md
- .github/agents/todo-developer.agent.md
- .github/prompts/review-crud-theme.prompt.md
- .github/skills/add-feature/SKILL.md
- AGENTS.md

**HELPFUL COMMANDS**:
- /add-feature — Use for step-by-step feature implementation
- /review-crud-theme — Use to validate code quality before finishing

When making changes, always verify the checklist above and test thoroughly.
`;

    // Output hook result with system message
    const result = {
      continue: true,
      systemMessage: systemMessage
    };

    console.log(JSON.stringify(result));
    process.exit(0);
  } catch (error) {
    console.error(JSON.stringify({
      continue: false,
      error: error.message
    }));
    process.exit(2);
  }
});
