import { logic, currentList, lists} from './Logic';

class DomController {

    constructor()  {
        this.oldName = null;
        this.listCurrentlyBeingEdited = false;
        this.taskCurrentlyBeingEdited = false;
    }

    initializeClickEventListeners() {
        document.addEventListener('click', this.handleClick.bind(this));
    }
    
    handleClick(e) {
        /* writing this application was a learning process.  I attempted and
            succeeded in using one event listener with delegation for every
            click on the DOM.  doing so required a complex set of conditionals.*/ 
        
        // the following variable is declared for use in conditional statements
        let target;        
        if(e.target.closest('div[class="task-date-btns"]') && e.target.className !== 'fas fa-edit') {
            //strikes thru the name of the task and the due date if either one clicked on
            const taskTarget = e.target.closest('div[class="task-date-btns"]').firstElementChild;
            const dateTarget = e.target.closest('div[class="task-date-btns"]').children[1].firstElementChild;
            this.toggleStrikethruTask(taskTarget, dateTarget);
        } else if(e.target.closest('i')) {
            e.preventDefault();
            target = e.target.closest('i');
            if(target.classList.contains('new-list-cancel-btn')) {
                target.parentElement.remove();
            } else if(target.classList.contains('new-list-submit-btn')) {
                const listTextInput = target.previousElementSibling.previousElementSibling;
                const listName = target.previousElementSibling.previousElementSibling.value;
                this.newListSubmitBtnHandler(target, listName, listTextInput);
            } else if(target.classList.contains('edit-list-icon')) {
                const listItem = target.parentElement.parentElement;
                const listName = target.parentElement.parentElement.textContent;
                this.editListIconHandler(listName, listItem); 
            } else if(target.classList.contains('edit-list-submit-btn')) {
                /* this btn is identical to the 'new-list-submit-btn', but 
                substitutes it when an existing list is currently being edited */
                const textInput = target.previousElementSibling.previousElementSibling.previousElementSibling;
                const newName = target.previousElementSibling.previousElementSibling.previousElementSibling.value;
                if(newName === this.oldName) {
                     textInput.focus();
                     return;
                }
                this.editListSubmitBtnHandler(newName, textInput);
            } else if(target.classList.contains('edit-list-cancel-btn')) {
                this.listCurrentlyBeingEdited = false;
                this.renderLists();
            } else if(target.className === 'far fa-trash-alt list') {
                this.deleteList();
            } else if(e.target.closest('button, li')) {
                target = e.target.closest('button, li');
                if(target.className === 'menu-btn') {
                    const menu = document.querySelector('.menu');
                    this.menuBtnHandler(menu);
                } else if(target.className === 'edit-task-btn') {
                    const taskEditor = target.parentElement.parentElement.parentElement.children[1];
                    const taskId = target.parentElement.parentElement.parentElement.dataset.id;         
                    this.renderTaskEditor(taskEditor, taskId);
                } else if(target.className === 'edit-task-submit-btn') {
                    this.editTaskSubmitBtnHandler(target);
                } else if(target.className === 'new-task-btn') {
                    const newTaskEditor = target.previousElementSibling;
                    this.newTaskBtnHandler(newTaskEditor);
                } else if(target.className === 'task-delete-btn') {
                    this.taskDeleteBtnHandler(target);
                } else if(target.className === 'cancel-new-task-btn') {
                    const newTaskEditor = target.parentElement.parentElement.parentElement;
                    this.cancelNewTaskBtnHandler(newTaskEditor);
                } else if(target.classList.contains('add-list-btn')) {
                    this.addListBtnHandler();
                } 
            }
        } else {
            target = e.target.closest('button, li');
            if (target === null) {
                return;
            } else {
                if(target.className === 'new-task-btn') {
                    e.preventDefault();
                    const newTaskEditor = target.previousElementSibling;
                    this.newTaskBtnHandler(newTaskEditor);
                } else if(target.classList.contains('add-list-btn')) {
                    this.addListBtnHandler();
                } else if(target.className === 'list menu-btn' && !target.children[1].matches('input')) {
                    const listName = target.childNodes[1].textContent;
                    this.switchList(listName);
                } else if(target.className === 'menu-btn all') {
                    this.taskCurrentlyBeingEdited = false;
                    this.listCurrentlyBeingEdited = false;
                    this.renderTasks();
                } else if(target.className === 'menu-btn today') {
                    this.viewOnlyToday();
                } else if(target.className === 'menu-btn week') {
                    this.viewOnlyWeek();
                } else if(target.className === 'edit-task-submit-btn') {
                    e.preventDefault();
                    this.editTaskSubmitBtnHandler(target);
                } else if(target.className === 'task-delete-btn') {
                    e.preventDefault();
                    this.taskDeleteBtnHandler(target);
                } else if(target.className === 'cancel-new-task-btn') {
                    e.preventDefault();
                    const newTaskEditor = target.parentElement.parentElement.parentElement;
                    this.cancelNewTaskBtnHandler(newTaskEditor);
                }
            } 
        }
    }

    toggleStrikethruTask(taskTarget, dateTarget) {
        taskTarget.classList.toggle('strikethru');
        dateTarget.classList.toggle('strikethru');
    }

    viewOnlyWeek() {
        this.taskCurrentlyBeingEdited = false;
        this.listCurrentlyBeingEdited = false;
        const ulForTasks = document.querySelector('.the-task-items');
        ulForTasks.innerHTML = '';
        const tasksOfWeek = Object.values(currentList.tasks).filter(task => {
            const dueDateObj = new Date(task.dueDate);
            if (Math.abs(Date.now() - dueDateObj) <= 6.048e8) {
                return true;
            } else return false;
        });
        for (const task of tasksOfWeek) {
            const html = this.createTaskHTML(task.taskId, task.name, task.dueDate);
            ulForTasks.innerHTML += html;
        }
    }

    createTaskHTML(taskId, name, dueDate) {
        const html = `<li class="todo-item" data-id="${taskId}">
        <div class="task-date-btns">
            <span class="task">${name}</span>
            <div class="date-and-btns">
                <span class="due-date">${this.createReadableDate(dueDate)}</span>
                <button class="edit-task-btn"><i class="fas fa-edit"></i></button>

            </div>
        </div>
    <div class="task-editor hidden">
                    <form action="" method="get" class="task-editor-form">
                        <input class="task-field" name="task" type="text" placeholder="Task" />
                        <textarea class="description-field" name="description" placeholder="Details"></textarea>
                        <div class="datepicker-addbutton">
                            <input class="date-picker" name="due-date" type="date" required />
                            <button class="task-delete-btn"><i class="far fa-trash-alt"></i></button>
                            <button class="edit-task-submit-btn"><i class="far fa-check-circle"></i></button>
                        </div>
                    </form>
                </div>
            </li>`;
        return html;
    }

    viewOnlyToday() {
        this.taskCurrentlyBeingEdited = false;
        this.listCurrentlyBeingEdited = false;
        const ulForTasks = document.querySelector('.the-task-items');
        ulForTasks.innerHTML = '';
        const tasksOfToday = Object.values(currentList.tasks).filter(task => {
            const dueDateObj = new Date(task.dueDate);
            const dueDateDay = dueDateObj.getUTCDate();
            const dueDateMonth = dueDateObj.getUTCMonth();
            const dueDateYear = dueDateObj.getUTCFullYear();
            const currentDay = new Date().getUTCDate();
            const currentMonth = new Date().getUTCMonth();
            const currentYear = new Date().getUTCFullYear();
            if (dueDateDay === currentDay && dueDateMonth === currentMonth && dueDateYear === currentYear) {
                return true;
            } else return false;
        });
        for (const task of tasksOfToday) {
            const html = this.createTaskHTML(task.taskId, task.name, task.dueDate);
            ulForTasks.innerHTML += html;
        }
    }

    updateColumnName() {
        const columnName = document.querySelector('.list-column-name');
        columnName.textContent = currentList.name;
    }

    deleteList() {
        this.listCurrentlyBeingEdited = false;
        this.taskCurrentlyBeingEdited = false;
        const reallyDelete = confirm(`Are you sure that you want to delete the ${this.oldName} list and all associated tasks?`);
        if(reallyDelete) {
            if(Object.keys(lists).length > 1) {
                logic.deleteList(this.oldName);
                logic.setCurrentListToBeOneOfTheRemainingLists();
                this.renderLists();
                this.renderTasks();
                this.updateColumnName();
            } else {
                alert('Unable to delete your only list!');
                this.renderLists();
            }
        } else {
            this.renderLists();
        }
    }

    editListSubmitBtnHandler(newName, textInput) {
        if(newName === '') {
            // don't allow user to save list without name
            textInput.focus();
            return;
        }
        this.listCurrentlyBeingEdited = false;
        logic.modifyListName(this.oldName, newName);
        this.renderLists();
        this.switchList(newName);
    }

    editListIconHandler(listName, listItem) {
        /* if another list is being edited, won't allow another to be edited
        until the first one is finished */
        if (this.listCurrentlyBeingEdited) return;
        this.listCurrentlyBeingEdited = true;
        this.oldName = listName;
        const html = `<i class="fas fa-list-alt"></i><input class="new-list-text-input" type="text" value="${listName}" /><i class="far fa-trash-alt list"></i><i class="far fa-times-circle edit-list-cancel-btn"></i><i class="far fa-check-circle edit-list-submit-btn"></i>`;
        listItem.innerHTML = html;
    }

    switchList(listName) {
        this.taskCurrentlyBeingEdited = false;
        this.listCurrentlyBeingEdited = false;
        logic.makeCurrentList(listName);
        this.renderTasks();
        const columnName = document.querySelector('.list-column-name');
        columnName.textContent = listName;
    }

    newListSubmitBtnHandler(target, listName, listTextInput) {
        if(listName === '') {
            // don't allow user to save list without name
            listTextInput.focus();
            return;
        }
        logic.createNewList(listName);
        target.parentElement.remove();
        this.renderLists();
        this.switchList(listName);
    }

    renderLists() {
        const ul = document.querySelector('.ul-list-of-lists');
        let html = '';
        const sortedLists = Object.values(lists).sort((list1, list2) => {
            if(list1.id > list2.id) return 1;
            if (list1.id === list2.id) return 0;
            if (list1.id < list2.id) return -1;
        }); 
        for (const list of sortedLists) {
            html += `<li class="list menu-btn"><i class="fas fa-list-alt"></i>${list.name}<span class="edit-list-icon"><i class="fas fa-edit edit-list-icon"></i></span></li>`;
        }
        ul.innerHTML = html;
    }

    menuBtnHandler(menu) {
        if(window.getComputedStyle(menu).display === 'none'){
            menu.style.display = 'block';
        }
        else menu.style.display = 'none';
    }

    addListBtnHandler() {
        const ul = document.querySelector('.ul-list-of-lists');
        const li = document.createElement('li');
        li.classList.add('list', 'menu-btn');
        const i = document.createElement('i');
        i.classList.add('fas', 'fa-list-alt');
        li.append(i);
        const textInput = `<input class="new-list-text-input" type="text" /><i class="far fa-times-circle new-list-cancel-btn"></i><i class="far fa-check-circle new-list-submit-btn"></i>`;
        li.insertAdjacentHTML('beforeend', textInput);
        ul.append(li);
    }

    taskDeleteBtnHandler(target) {
        this.taskCurrentlyBeingEdited = false;
        const taskId = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        logic.deleteTask(taskId);
        this.renderTasks();
    }

    renderTaskEditor(taskEditor, taskId) {
        // if a task editor window is already open, do nothing 
        if(this.taskCurrentlyBeingEdited) return;
        this.taskCurrentlyBeingEdited = true;
        taskEditor.classList.toggle('hidden');
        const taskTextInput = taskEditor.firstElementChild.firstElementChild;
        const detailsTextarea = taskEditor.firstElementChild.firstElementChild.nextElementSibling;
        const datepicker = taskEditor.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild;
    
        taskTextInput.value = currentList.tasks[taskId].name;
     
        detailsTextarea.value = currentList.tasks[taskId].details;
        if(currentList.tasks[taskId].dueDate) {
            datepicker.valueAsNumber = currentList.tasks[taskId].dueDate;
        }   
    }

    editTaskSubmitBtnHandler(target) {
        
        const taskName = target.parentElement.parentElement.children[0].value;
        const details = target.parentElement.parentElement.children[1].value;
        const dueDate = target.parentElement.parentElement.children[2].firstElementChild.valueAsDate;

        if(!this.dueDateIsValid(dueDate)){
            // if the date is not valid, bring the date picker into focus
            target.parentElement.parentElement.children[2].firstElementChild.focus();
        } else if(!taskName) {
            // don't allow user to save task without name
            target.parentElement.parentElement.children[0].focus();
        } else if(taskName && this.dueDateIsValid(dueDate)) {
            const taskEditor = target.parentElement.parentElement.parentElement;
            const taskIsNew = (taskEditor.className === 'new-task-editor') ? true : false;
            const currentTime = Date.now(); //will use currentTime as a unique identifier for each task

            if(taskIsNew) {
                const task = logic.createNewTask(taskName, dueDate, details, currentTime);
                logic.addTaskToCurrentList(task); 
                this.renderTasks();
                taskEditor.firstElementChild.firstElementChild.value = '';
                taskEditor.firstElementChild.children[1].value = '';
                taskEditor.firstElementChild.children[2].firstElementChild.value = '';
                taskEditor.classList.toggle('hidden');
            } else if(!taskIsNew) {
                const taskId = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
                logic.modifyTask(taskName, dueDate, details, taskId);
                this.renderTasks();
            }
        }
        this.taskCurrentlyBeingEdited = false;
    }

    dueDateIsValid(dueDateValueAsNumber) {
        if(isNaN(dueDateValueAsNumber)) {
            return false;
        } else return true;
    }

    cancelNewTaskBtnHandler(newTaskEditor) {
        newTaskEditor.classList.add('hidden');
    }

    newTaskBtnHandler(newTaskEditor) {
        newTaskEditor.classList.remove('hidden');
    }

    renderTasks() {
        const ulForTasks = document.querySelector('.the-task-items');
        ulForTasks.innerHTML = '';
        if(currentList === null) ulForTasks.innerHTML = '';
        for (const task of Object.values(currentList.tasks)) {
            const html = this.createTaskHTML(task.taskId, task.name, task.dueDate); 
            ulForTasks.innerHTML += html;
        }
    }

    createReadableDate(dateValueAsNumber) {
        // if the user didn't put a due date, just return an empty str
        if(dateValueAsNumber === null) return '';
        const date = new Date(dateValueAsNumber);
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
        return `${month}/${day}/${year}`;
    }
}

export const domController = new DomController();



//issues.  can't get task name to wrap at 50%;