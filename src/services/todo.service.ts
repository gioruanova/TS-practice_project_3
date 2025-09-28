
import type { Todo } from "../interfaces/todo.interfaces";


let todos: Todo[] = [];

// start app
const initTodos = () => {
    loadTodoFromLocalStorage();
}

// get todos from local storage
const loadTodoFromLocalStorage = () => {
    const todosJSON = localStorage.getItem('todos');

    if (!todosJSON) {
        todos = [];
        return;
    }

    todos = JSON.parse(todosJSON) as Todo[];
};

// add todo to local storage
const saveTodoToLocalStorage = (): void => {
    localStorage.setItem('todos', JSON.stringify(todos));
};


// get todos
const getTodos = (): Todo[] => {
    return [...todos];
}

// get task statistics
const getTaskStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.done).length;
    const pending = total - completed;
    const completionPercentage = total ? Math.round((completed / total) * 100) : 0;

    return {
        total,
        completed,
        pending,
        completionPercentage
    };
}

// add todo
const addTodo = (description: string): void => {

    if (!description.trim()) {
        throw new Error("Todo description is required");
    }
    const newTodo: Todo = {
        id: crypto.randomUUID(),
        description: description,
        done: false
    };

    todos = [...todos, newTodo];
    saveTodoToLocalStorage();

};


// update toggle todo
const toggleTodo = (id: string) => {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            return { ...todo, done: !todo.done }
        }
        return todo;
    });
    saveTodoToLocalStorage
};


// delete todo
const deleteTodo = (id: string) => {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodoToLocalStorage();
};






export const todoService = {
    getTodos,
    getTaskStats,
    addTodo,
    toggleTodo,
    deleteTodo,
    initTodos
};