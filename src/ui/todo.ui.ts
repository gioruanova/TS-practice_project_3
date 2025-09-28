import type { Todo } from "../interfaces/todo.interfaces";
import { todoService } from "../services/todo.service";

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


// Get motivational message based on progress
const getMotivationalMessage = (percentage: number): string => {
    if (percentage === 0) return "Time to get started!";
    if (percentage === 100) return "Amazing job! All tasks completed! 🎉";
    if (percentage >= 75) return "Almost there! You're crushing it! 💪";
    if (percentage >= 50) return "Halfway there! Keep up the great work! 🚀";
    if (percentage >= 25) return "Great progress! Keep going! 🌟";
    return "You're making progress! Keep it up! 💫";
};

// Update task statistics
const updateTaskStats = () => {
    // Get statistics from service
    const { total: totalTasks, completed: completedTasks, pending: pendingTasks } = todoService.getTaskStats();

    // Get UI elements
    const $statsCards = document.querySelector<HTMLDivElement>('#stats-cards');
    const $emptyState = document.querySelector<HTMLDivElement>('#empty-state');
    const $progressSection = document.querySelector<HTMLDivElement>('#progress-section');
    const $totalTasks = document.querySelector<HTMLDivElement>('#total-tasks');
    const $completedTasks = document.querySelector<HTMLDivElement>('#completed-tasks');
    const $pendingTasks = document.querySelector<HTMLDivElement>('#pending-tasks');

    // Progress elements
    const $progressBar = document.querySelector<HTMLDivElement>('#progress-bar');
    const $progressPercentage = document.querySelector<HTMLSpanElement>('#progress-percentage');
    const $motivationMessage = document.querySelector<HTMLSpanElement>('#motivation-message');

    // Toggle visibility based on tasks existence
    if ($statsCards && $emptyState && $progressSection) {
        if (totalTasks === 0) {
            $statsCards.classList.add('d-none');
            $progressSection.classList.add('d-none');
            $emptyState.classList.remove('d-none');
        } else {
            $statsCards.classList.remove('d-none');
            $progressSection.classList.remove('d-none');
            $emptyState.classList.add('d-none');

            // Calculate progress percentage
            const progressPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

            // Update progress bar and percentage
            if ($progressBar && $progressPercentage) {
                $progressBar.style.width = `${progressPercentage}%`;
                $progressBar.setAttribute('aria-valuenow', progressPercentage.toString());
                $progressPercentage.textContent = `${progressPercentage}%`;
            }

            // Update motivation message
            if ($motivationMessage) {
                $motivationMessage.textContent = getMotivationalMessage(progressPercentage);
            }

            // Update statistics in the UI
            if ($totalTasks) $totalTasks.textContent = totalTasks.toString();
            if ($completedTasks) $completedTasks.textContent = completedTasks.toString();
            if ($pendingTasks) $pendingTasks.textContent = pendingTasks.toString();
        }
    }
};

// render todo list
export const renderTodoList = ($todoList: HTMLUListElement, todos: Todo[]) => {
    // update statistics
    updateTaskStats();

    // clean current list
    $todoList.innerHTML = '';


    // create and add todo to list
    todos.forEach((todo) => {
        const $todoItem = createItemHtml(todo);
        $todoList.appendChild($todoItem);
    })
};

