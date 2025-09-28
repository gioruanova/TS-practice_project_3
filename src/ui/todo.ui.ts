import type { Todo } from "../interfaces/todo.interfaces";

const $todoItemTemplate = document.querySelector<HTMLTemplateElement>("#todo-item-template");

// create todo ui using template
const createItemHtml = (todo: Todo) => {

    if (!$todoItemTemplate) {
        throw new Error('Template not found');
    }


    const $todoItem = $todoItemTemplate.content.cloneNode(true) as HTMLElement;

    const $li = $todoItem.querySelector<HTMLLIElement>('li');
    const $span = $todoItem.querySelector<HTMLSpanElement>('span');



    if (!$li || !$span) {
        throw new Error('Template elements not found');
    }

    // add data attribute to li

    $li.setAttribute('data-id', todo.id);
    $span.textContent = todo.description;


    if (todo.done) {
        $span.classList.add('text-decoration-line-through')
    }
    return $li;

}


// render todo list

export const renderTodoList = ($todoList: HTMLUListElement, todos: Todo[]) => {

    // clean current list
    $todoList.innerHTML = '';


    // create and add todo to list
    todos.forEach((todo) => {
        const $todoItem = createItemHtml(todo);
        $todoList.appendChild($todoItem);
    })
};

