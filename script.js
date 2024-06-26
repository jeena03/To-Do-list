document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const tasksUl = document.getElementById('tasks');
    const filterTasks = document.getElementById('filter-tasks');
    const sortTasks = document.getElementById('sort-tasks');

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    tasksUl.addEventListener('click', handleTaskClick);
    filterTasks.addEventListener('change', filterAndSortTasks);
    sortTasks.addEventListener('change', filterAndSortTasks);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        li.appendChild(deleteBtn);

        tasksUl.appendChild(li);
        taskInput.value = '';

        filterAndSortTasks();
    }

    function handleTaskClick(event) {
        if (event.target.tagName === 'BUTTON') {
            const li = event.target.parentElement;
            tasksUl.removeChild(li);
        } else if (event.target.tagName === 'LI') {
            event.target.classList.toggle('completed');
        }

        filterAndSortTasks();
    }

    function filterAndSortTasks() {
        const filterValue = filterTasks.value;
        const sortValue = sortTasks.value;
        const tasks = Array.from(tasksUl.children);

        tasks.forEach(task => {
            switch (filterValue) {
                case 'all':
                    task.style.display = '';
                    break;
                case 'completed':
                    if (task.classList.contains('completed')) {
                        task.style.display = '';
                    } else {
                        task.style.display = 'none';
                    }
                    break;
                case 'pending':
                    if (task.classList.contains('completed')) {
                        task.style.display = 'none';
                    } else {
                        task.style.display = '';
                    }
                    break;
            }
        });

        if (sortValue === 'added-date') {
            tasks.sort((a, b) => {
                return a.textContent.localeCompare(b.textContent);
            });
        } else if (sortValue === 'due-date') {
            // Assuming tasks have due dates, you can add a due date handling logic here.
        }

        tasks.forEach(task => tasksUl.appendChild(task));
    }
});
