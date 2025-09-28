import "bootstrap/dist/css/bootstrap.min.css";
import './style.css'
import { todoService } from "./services/todo.service";
import { renderTodoList } from "./ui/todo.ui";

document.addEventListener("DOMContentLoaded", () => {

  const $todoForm = document.querySelector<HTMLFormElement>("#todo-form")!;
  const $todoInput = document.querySelector<HTMLInputElement>("#todo-input")!;
  const $todoList = document.querySelector<HTMLUListElement>("#todo-list")!;

  if (!$todoForm || !$todoInput || !$todoList) {
    console.error('Elements not ready');
    return;
  }

  todoService.initTodos();

  const showTodos = () => {
    const todos = todoService.getTodos();
    renderTodoList($todoList, todos);

  }

  showTodos();

  $todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const todoDescription = $todoInput.value.trim();
    if (!todoDescription.trim()) {
      alert("Description can't be empty");
      return;
    }

    try {
      todoService.addTodo(todoDescription.trim());
      $todoInput.value = '';
      showTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  })


  $todoList.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const todoItem = target.closest('li[data-id]');

    if (!todoItem) return;

    const todoId = todoItem.getAttribute('data-id');

    if (!todoId) return;

    // catch delete button click
    if (target.tagName == 'BUTTON') {
      todoService.deleteTodo(todoId);
      showTodos();
      return;
    }

    todoService.toggleTodo(todoId);
    showTodos();




  })


});