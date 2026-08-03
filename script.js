// Theme Management
const THEME_KEY = 'todo-app-theme';
const TODOS_KEY = 'todo-app-todos';
const DEFAULT_THEME = 'light';

class ThemeManager {
    constructor() {
        this.theme = this.loadTheme();
        this.initializeTheme();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            return savedTheme;
        }
        
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        return DEFAULT_THEME;
    }

    initializeTheme() {
        this.applyTheme(this.theme);
    }

    applyTheme(theme) {
        const html = document.documentElement;
        if (theme === 'dark') {
            html.classList.add('dark-theme');
        } else {
            html.classList.remove('dark-theme');
        }
        this.theme = theme;
        localStorage.setItem(THEME_KEY, theme);
        this.updateToggleIcon();
    }

    toggle() {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }

    updateToggleIcon() {
        const toggleBtn = document.getElementById('themeToggle');
        const icon = toggleBtn.querySelector('.theme-icon');
        icon.textContent = this.theme === 'dark' ? '☀️' : '🌙';
    }

    getCurrentTheme() {
        return this.theme;
    }
}

// Todo App
class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.initializeElements();
        this.attachEventListeners();
        this.render();
    }

    initializeElements() {
        this.todoInput = document.getElementById('todoInput');
        this.dueDateInput = document.getElementById('dueDateInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.todoCount = document.getElementById('todoCount');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        
        // Set default due date to today
        const today = new Date().toISOString().split('T')[0];
        this.dueDateInput.value = today;
    }

    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        const dueDate = this.dueDateInput.value;
        
        if (text === '') {
            alert('Please enter a task');
            return;
        }
        
        if (!dueDate) {
            alert('Please select a due date');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            dueDate: dueDate,
            createdAt: new Date().toISOString()
        };

        this.todos.push(todo);
        this.saveTodos();
        this.todoInput.value = '';
        const today = new Date().toISOString().split('T')[0];
        this.dueDateInput.value = today;
        this.todoInput.focus();
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    formatDueDate(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    getDueDateStatus(dateString) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const dueDate = new Date(dateString + 'T00:00:00');
        const timeDiff = dueDate - today;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 0) {
            return 'overdue';
        } else if (daysDiff === 0) {
            return 'today';
        } else if (daysDiff <= 3) {
            return 'due-soon';
        }
        return 'normal';
    }

    render() {
        const filtered = this.getFilteredTodos();
        
        if (filtered.length === 0) {
            this.todoList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📭</div>
                    <p>${this.currentFilter === 'all' ? 'No tasks yet. Add one to get started!' : `No ${this.currentFilter} tasks`}</p>
                </div>
            `;
        } else {
            this.todoList.innerHTML = filtered.map(todo => {
                const dueDateStatus = this.getDueDateStatus(todo.dueDate);
                const formattedDate = this.formatDueDate(todo.dueDate);
                const dueDateClass = dueDateStatus === 'normal' ? '' : dueDateStatus;
                
                return `
                <li class="todo-item ${todo.completed ? 'completed' : ''}">
                    <input 
                        type="checkbox" 
                        ${todo.completed ? 'checked' : ''} 
                        onchange="app.toggleTodo(${todo.id})"
                    >
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <span class="due-date-display ${dueDateClass}">${formattedDate}</span>
                    <button class="delete-btn" onclick="app.deleteTodo(${todo.id})" title="Delete task">
                        ✕
                    </button>
                </li>
            `;
            }).join('');
        }

        this.updateStats();
    }

    updateStats() {
        const activeTodos = this.todos.filter(t => !t.completed).length;
        const totalTodos = this.todos.length;
        
        if (totalTodos === 0) {
            this.todoCount.textContent = '0 tasks';
        } else if (activeTodos === 0) {
            this.todoCount.textContent = `All ${totalTodos} task${totalTodos !== 1 ? 's' : ''} completed! 🎉`;
        } else {
            this.todoCount.textContent = `${activeTodos} of ${totalTodos} task${totalTodos !== 1 ? 's' : ''} remaining`;
        }
    }

    saveTodos() {
        localStorage.setItem(TODOS_KEY, JSON.stringify(this.todos));
    }

    loadTodos() {
        const saved = localStorage.getItem(TODOS_KEY);
        const todos = saved ? JSON.parse(saved) : [];
        
        // Add default due date to todos that don't have one (backward compatibility)
        const today = new Date().toISOString().split('T')[0];
        return todos.map(todo => ({
            ...todo,
            dueDate: todo.dueDate || today
        }));
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Initialize app when DOM is ready
let themeManager;
let app;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme manager
    themeManager = new ThemeManager();
    
    // Setup theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        themeManager.toggle();
    });

    // Initialize todo app
    app = new TodoApp();
});
