# Todo App with Dark/Light Theme Toggle

A simple, responsive todo application with dark/light theme support that persists user preferences.

## Features

### ✅ Core Functionality
- Add, complete, and delete todos
- Filter todos by status (All, Active, Completed)
- Task counter showing progress
- Local storage for data persistence

### 🌙 Theme Toggle
- Easy one-click theme switching between light and dark modes
- **Persistence**: Theme preference is saved to localStorage and restored on page reload
- **System Preference Detection**: Automatically detects system dark mode preference on first visit
- **Smooth Transitions**: CSS transitions for theme changes
- **Visual Feedback**: Icon changes (🌙 ☀️) to indicate current theme state

## Files

- **index.html** - Main HTML structure with semantic markup
- **styles.css** - Complete styling with CSS variables for theming
- **script.js** - JavaScript logic for todo management and theme handling
- **README.md** - This file

## How Theme Toggle Works

### Implementation Details

1. **CSS Variables**: The theme system uses CSS custom properties (--bg-primary, --text-primary, etc.) that change based on the `.dark-theme` class on the `<html>` element.

2. **ThemeManager Class**: Handles all theme-related operations:
   - `loadTheme()` - Retrieves saved theme from localStorage or detects system preference
   - `applyTheme(theme)` - Applies the theme to the document and saves it
   - `toggle()` - Switches between light and dark themes
   - `updateToggleIcon()` - Updates the button icon based on current theme

3. **localStorage**: Saves theme preference under the key `todo-app-theme` with values `'light'` or `'dark'`

4. **System Detection**: Uses `window.matchMedia('(prefers-color-scheme: dark)')` to detect OS-level dark mode preference

### User Interactions

- Click the theme toggle button (🌙/☀️) in the top-right corner
- Theme preference is automatically saved
- Preference persists across browser sessions

## Data Persistence

- **Todos**: Saved in localStorage under `todo-app-todos` as JSON array
- **Theme**: Saved in localStorage under `todo-app-theme` as string ('light' or 'dark')

## Getting Started

1. Open `index.html` in a web browser
2. Start adding todos using the input field
3. Toggle between light and dark themes using the button in the header

## Browser Support

- Works in all modern browsers with localStorage and CSS custom properties support
- Chrome/Edge 49+
- Firefox 31+
- Safari 9.1+

## CSS Theme Variables

The application uses these CSS custom properties that change based on theme:

```css
--bg-primary      /* Main background color */
--bg-secondary    /* Secondary background (cards, input) */
--text-primary    /* Main text color */
--text-secondary  /* Secondary text color */
--border-color    /* Border colors */
--input-bg        /* Input background */
--input-border    /* Input border */
--btn-bg          /* Button background */
--btn-hover       /* Button hover state */
--completed-bg    /* Completed item background */
--completed-text  /* Completed item text */
```

Each theme (light/dark) has unique values for all these variables, enabling seamless theme switching.
