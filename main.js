/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DomController.js":
/*!**************************************!*\
  !*** ./src/modules/DomController.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domController": () => (/* binding */ domController)
/* harmony export */ });
/* harmony import */ var _Logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logic */ "./src/modules/Logic.js");


let oldName;


class DomController {

    constructor()  {}

    initializeClickEventListeners() {
        document.addEventListener('click', this.handleClick.bind(this));
    }
    
    handleClick(e) {
        let target;

        if(e.target.closest('i')) {
            target = e.target.closest('i');
            if(target.classList.contains('new-list-cancel-btn')) {
                e.preventDefault();
                target.parentElement.remove();
            }
            if(target.classList.contains('new-list-submit-btn')) {
                e.preventDefault();
                const listTextInput = target.previousElementSibling.previousElementSibling;
                const listName = target.previousElementSibling.previousElementSibling.value;
                this.newListSubmitBtnHandler(target, listName, listTextInput);
            }
            if(target.classList.contains('edit-list-icon')) {
                e.preventDefault();
                const listItem = target.parentElement.parentElement;
                const listName = target.parentElement.parentElement.textContent;
                this.editListIconHandler(listName, listItem); 
            }
            if(target.classList.contains('edit-list-submit-btn')) {
                e.preventDefault();
                const textInput = target.previousElementSibling.previousElementSibling.previousElementSibling;
                const newName = target.previousElementSibling.previousElementSibling.previousElementSibling.value;
                this.editListSubmitBtnHandler(newName, textInput);
            }
        }

        target = e.target.closest('button, li');

        if(target) {
            if(target.className === 'menu-btn') {
                const menu = document.querySelector('.menu');
                this.menuBtnHandler(menu);
            }
            if(target.className === 'edit-task-btn') {
                const taskEditor = target.parentElement.parentElement.parentElement.children[1];
                const taskId = target.parentElement.parentElement.parentElement.dataset.id;
                this.taskEditorHandler(taskEditor, taskId);
            }
            if(target.className === 'edit-task-submit-btn') {
                e.preventDefault();
                this.editTaskSubmitBtnHandler(target);
            }
            if(target.className === 'new-task-btn') {
                const newTaskEditor = target.previousElementSibling;
                this.newTaskBtnHandler(newTaskEditor);
            }
            if(target.className === 'task-delete-btn') {
                e.preventDefault();
                this.taskDeleteBtnHandler(target);
            }
            if(target.className === 'cancel-new-task-btn') {
                e.preventDefault();
                const newTaskEditor = target.parentElement.parentElement.parentElement;
                this.cancelNewTaskBtnHandler(newTaskEditor);
            }
            if(target.classList.contains('add-list-btn')) {
                e.preventDefault();
                this.addListBtnHandler();
            } 
            if(target.className === 'list menu-btn' && !target.children[1].matches('input')) {
                const listName = target.childNodes[1].textContent;
                this.changeListHandler(listName);
            }
        }
    }

    editListSubmitBtnHandler(newName, textInput) {
        if(newName === '') {
            textInput.focus();
            return;
        }
        _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.modifyListName(oldName, newName);
        this.renderLists();
        this.changeListHandler(newName);
    }

    editListIconHandler(listName, listItem) {
        oldName = listName;
        const html = `<i class="fas fa-list-alt"></i><input class="new-list-text-input" type="text" value="${listName}" /><i class="far fa-trash-alt"></i><i class="far fa-times-circle new-list-cancel-btn"></i><i class="far fa-check-circle edit-list-submit-btn"></i>`;
        listItem.innerHTML = html;
    }
    changeListHandler(listName) {
        _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.setCurrentList(listName);
        this.renderTasks();
        const columnName = document.querySelector('.list-column-name');
        columnName.textContent = listName;
    }


    newListSubmitBtnHandler(target, listName, listTextInput) {
        if(listName === '') {
            listTextInput.focus();
            return;
        }
        _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.createNewList(listName);
        target.parentElement.remove();
        this.renderLists();
        this.changeListHandler(listName);
    }

    renderLists() {
        const ul = document.querySelector('.ul-list-of-lists');
        let html = '';
        for (const key in _Logic__WEBPACK_IMPORTED_MODULE_0__.lists) {
            html += `<li class="list menu-btn"><i class="fas fa-list-alt edit-list-icon"></i>${key}<span class="edit-list-icon"><i class="fas fa-edit edit-list-icon"></i></span></li>`;
        }
        ul.innerHTML = html;
    }

    menuBtnHandler(menu) {
        const display = window.getComputedStyle(menu).display;
        if(display === 'none'){
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
        const taskId = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
        _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.deleteTask(taskId);
        this.renderTasks();
    }

    taskEditorHandler(taskEditor, taskId) {
        taskEditor.classList.toggle('hidden');
        const taskTextInput = taskEditor.firstElementChild.firstElementChild;
        const detailsTextarea = taskEditor.firstElementChild.firstElementChild.nextElementSibling;
        const datepicker = taskEditor.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild;

        taskTextInput.value = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks[taskId].name;
        detailsTextarea.value = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks[taskId].details;
        datepicker.valueAsNumber = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks[taskId].dueDate;
    }

    editTaskSubmitBtnHandler(target) {
        
        const taskName = target.parentElement.parentElement.children[0].value;
        const details = target.parentElement.parentElement.children[1].value;
        const dueDate = target.parentElement.parentElement.children[2].firstElementChild.valueAsNumber;

        if(!this.dueDateIsValid(dueDate)){
            target.parentElement.parentElement.children[2].firstElementChild.focus();
        }

        if(!taskName) {
            target.parentElement.parentElement.children[0].focus();
        }

        if(taskName && this.dueDateIsValid(dueDate)) {
            const taskIsNew = (target.parentElement.parentElement.parentElement.className === 'new-task-editor') ? true : false;
            const currentTime = Date.now(); //will use currentTime as a unique identifier for each task

            if(taskIsNew) {
                const task = _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.createNewTask(taskName, dueDate, details, currentTime);
                _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.addTaskToCurrentList(task);
                this.renderTasks();
            }
            if(!taskIsNew) {
                const taskId = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
                _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.modifyTask(taskName, dueDate, details, taskId);
                this.renderTasks();
            }
            const taskEditor = target.parentElement.parentElement.parentElement;
            if(taskEditor.className === 'new-task-editor') {
                    taskEditor.firstElementChild.firstElementChild.value = '';
                    taskEditor.firstElementChild.children[1].value = '';
                    taskEditor.firstElementChild.children[2].firstElementChild.value = '';
                taskEditor.classList.toggle('hidden');
            }
        }
    }

    dueDateIsValid(dueDateValueAsNumber) {
        if(isNaN(dueDateValueAsNumber)) return false;
        return true;
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
        for (const task of Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks)) {
            const html = `<li class="todo-item" data-id="${task.taskId}">
            <div class="task-date-btns">
                <span class="task">${task.name}</span>
                <div class="date-and-btns">
                    <span class="due-date">${this.createReadableDate(task.dueDate)}</span>
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
            ulForTasks.innerHTML += html;
        }
    }

    createReadableDate(dateValueAsNumber) {
        const date = new Date(dateValueAsNumber);
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
        return `${month}/${day}/${year}`;
    }
}

const domController = new DomController();



//issues.  can't get task name to wrap at 50%;

/***/ }),

/***/ "./src/modules/List.js":
/*!*****************************!*\
  !*** ./src/modules/List.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "List": () => (/* binding */ List)
/* harmony export */ });
class List {
    constructor(name) {
        this.name = name;
        this.tasks = {};
    }
}



/***/ }),

/***/ "./src/modules/Logic.js":
/*!******************************!*\
  !*** ./src/modules/Logic.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "currentList": () => (/* binding */ currentList),
/* harmony export */   "lists": () => (/* binding */ lists),
/* harmony export */   "logic": () => (/* binding */ logic)
/* harmony export */ });
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List */ "./src/modules/List.js");



let currentList;

const lists = {};

class Logic {
    constructor() {}

    createNewTask(name, dueDate, details = "", taskId) {
        return new _Task__WEBPACK_IMPORTED_MODULE_0__.Task(name, dueDate, details, taskId);
    }

    addTaskToCurrentList(task) {
        currentList.tasks[task.taskId] = task;
    }

    modifyTask(name, dueDate, details = '', taskId) {
        for (const task of Object.values(currentList.tasks)) {
            if(task.taskId == taskId) {
                task.name = name;
                task.dueDate = dueDate;
                task.details = details;
                break;
            }
        }
    }

    deleteTask(task) {
        delete currentList.tasks[task];
    }

     // getCurrentTask() {
    //     return currentTask;
    // }

    createNewList(name) {
        const newList = new _List__WEBPACK_IMPORTED_MODULE_1__.List(name);
        lists[name] = newList;
    }

    modifyListName(oldName, newName) {
        lists[newName] = lists[oldName];
        delete lists[oldName];
    }

    
    setDefaultList() {
        if (Object.keys(lists).length === 0) {
            const chores = new _List__WEBPACK_IMPORTED_MODULE_1__.List('Chores');
            lists.Chores = chores;
            this.setCurrentList('Chores');
        } 
    }

    setCurrentList(listName) {
        currentList = lists[listName];
    }

    // getCurrentList() {
    //     return currentList;
    // }

   
}

const logic = new Logic();



/***/ }),

/***/ "./src/modules/Task.js":
/*!*****************************!*\
  !*** ./src/modules/Task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Task": () => (/* binding */ Task)
/* harmony export */ });
class Task {

    constructor(name, dueDate, details = "", taskId) {
        this.name = name;
        this.dueDate = dueDate;
        this.details = details;
        this.taskId = taskId;
    }



}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_DomController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/DomController */ "./src/modules/DomController.js");
/* harmony import */ var _modules_Logic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Logic */ "./src/modules/Logic.js");
/* harmony import */ var _modules_List__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/List */ "./src/modules/List.js");






_modules_Logic__WEBPACK_IMPORTED_MODULE_1__.logic.setDefaultList();
_modules_DomController__WEBPACK_IMPORTED_MODULE_0__.domController.initializeClickEventListeners();






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Eb21Db250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQW9EOztBQUVwRDs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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OiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbG9naWMsIGN1cnJlbnRMaXN0LCBsaXN0cyB9IGZyb20gJy4vTG9naWMnO1xuXG5sZXQgb2xkTmFtZTtcblxuXG5jbGFzcyBEb21Db250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkgIHt9XG5cbiAgICBpbml0aWFsaXplQ2xpY2tFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBcbiAgICBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgIGxldCB0YXJnZXQ7XG5cbiAgICAgICAgaWYoZS50YXJnZXQuY2xvc2VzdCgnaScpKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KCdpJyk7XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXctbGlzdC1jYW5jZWwtYnRuJykpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCduZXctbGlzdC1zdWJtaXQtYnRuJykpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdFRleHRJbnB1dCA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3TGlzdFN1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0LCBsaXN0TmFtZSwgbGlzdFRleHRJbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWxpc3QtaWNvbicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0TmFtZSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0TGlzdEljb25IYW5kbGVyKGxpc3ROYW1lLCBsaXN0SXRlbSk7IFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1saXN0LXN1Ym1pdC1idG4nKSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0SW5wdXQgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3TmFtZSA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRMaXN0U3VibWl0QnRuSGFuZGxlcihuZXdOYW1lLCB0ZXh0SW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnYnV0dG9uLCBsaScpO1xuXG4gICAgICAgIGlmKHRhcmdldCkge1xuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUtYnRuJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuICAgICAgICAgICAgICAgIHRoaXMubWVudUJ0bkhhbmRsZXIobWVudSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnZWRpdC10YXNrLWJ0bicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRWRpdG9yID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tJZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmlkO1xuICAgICAgICAgICAgICAgIHRoaXMudGFza0VkaXRvckhhbmRsZXIodGFza0VkaXRvciwgdGFza0lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdlZGl0LXRhc2stc3VibWl0LWJ0bicpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0VGFza1N1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICduZXctdGFzay1idG4nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGFza0VkaXRvciA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIHRoaXMubmV3VGFza0J0bkhhbmRsZXIobmV3VGFza0VkaXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAndGFzay1kZWxldGUtYnRuJykge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tEZWxldGVCdG5IYW5kbGVyKHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnY2FuY2VsLW5ldy10YXNrLWJ0bicpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGFza0VkaXRvciA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYWRkLWxpc3QtYnRuJykpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRMaXN0QnRuSGFuZGxlcigpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdsaXN0IG1lbnUtYnRuJyAmJiAhdGFyZ2V0LmNoaWxkcmVuWzFdLm1hdGNoZXMoJ2lucHV0JykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0TmFtZSA9IHRhcmdldC5jaGlsZE5vZGVzWzFdLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlTGlzdEhhbmRsZXIobGlzdE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZWRpdExpc3RTdWJtaXRCdG5IYW5kbGVyKG5ld05hbWUsIHRleHRJbnB1dCkge1xuICAgICAgICBpZihuZXdOYW1lID09PSAnJykge1xuICAgICAgICAgICAgdGV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbG9naWMubW9kaWZ5TGlzdE5hbWUob2xkTmFtZSwgbmV3TmFtZSk7XG4gICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VMaXN0SGFuZGxlcihuZXdOYW1lKTtcbiAgICB9XG5cbiAgICBlZGl0TGlzdEljb25IYW5kbGVyKGxpc3ROYW1lLCBsaXN0SXRlbSkge1xuICAgICAgICBvbGROYW1lID0gbGlzdE5hbWU7XG4gICAgICAgIGNvbnN0IGh0bWwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtbGlzdC1hbHRcIj48L2k+PGlucHV0IGNsYXNzPVwibmV3LWxpc3QtdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9XCIke2xpc3ROYW1lfVwiIC8+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0XCI+PC9pPjxpIGNsYXNzPVwiZmFyIGZhLXRpbWVzLWNpcmNsZSBuZXctbGlzdC1jYW5jZWwtYnRuXCI+PC9pPjxpIGNsYXNzPVwiZmFyIGZhLWNoZWNrLWNpcmNsZSBlZGl0LWxpc3Qtc3VibWl0LWJ0blwiPjwvaT5gO1xuICAgICAgICBsaXN0SXRlbS5pbm5lckhUTUwgPSBodG1sO1xuICAgIH1cbiAgICBjaGFuZ2VMaXN0SGFuZGxlcihsaXN0TmFtZSkge1xuICAgICAgICBsb2dpYy5zZXRDdXJyZW50TGlzdChsaXN0TmFtZSk7XG4gICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgY29uc3QgY29sdW1uTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0LWNvbHVtbi1uYW1lJyk7XG4gICAgICAgIGNvbHVtbk5hbWUudGV4dENvbnRlbnQgPSBsaXN0TmFtZTtcbiAgICB9XG5cblxuICAgIG5ld0xpc3RTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCwgbGlzdE5hbWUsIGxpc3RUZXh0SW5wdXQpIHtcbiAgICAgICAgaWYobGlzdE5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICBsaXN0VGV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbG9naWMuY3JlYXRlTmV3TGlzdChsaXN0TmFtZSk7XG4gICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLnJlbmRlckxpc3RzKCk7XG4gICAgICAgIHRoaXMuY2hhbmdlTGlzdEhhbmRsZXIobGlzdE5hbWUpO1xuICAgIH1cblxuICAgIHJlbmRlckxpc3RzKCkge1xuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bC1saXN0LW9mLWxpc3RzJyk7XG4gICAgICAgIGxldCBodG1sID0gJyc7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGxpc3RzKSB7XG4gICAgICAgICAgICBodG1sICs9IGA8bGkgY2xhc3M9XCJsaXN0IG1lbnUtYnRuXCI+PGkgY2xhc3M9XCJmYXMgZmEtbGlzdC1hbHQgZWRpdC1saXN0LWljb25cIj48L2k+JHtrZXl9PHNwYW4gY2xhc3M9XCJlZGl0LWxpc3QtaWNvblwiPjxpIGNsYXNzPVwiZmFzIGZhLWVkaXQgZWRpdC1saXN0LWljb25cIj48L2k+PC9zcGFuPjwvbGk+YDtcbiAgICAgICAgfVxuICAgICAgICB1bC5pbm5lckhUTUwgPSBodG1sO1xuICAgIH1cblxuICAgIG1lbnVCdG5IYW5kbGVyKG1lbnUpIHtcbiAgICAgICAgY29uc3QgZGlzcGxheSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG1lbnUpLmRpc3BsYXk7XG4gICAgICAgIGlmKGRpc3BsYXkgPT09ICdub25lJyl7XG4gICAgICAgICAgICBtZW51LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgbWVudS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIGFkZExpc3RCdG5IYW5kbGVyKCkge1xuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bC1saXN0LW9mLWxpc3RzJyk7XG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnbGlzdCcsICdtZW51LWJ0bicpO1xuICAgICAgICBjb25zdCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBpLmNsYXNzTGlzdC5hZGQoJ2ZhcycsICdmYS1saXN0LWFsdCcpO1xuICAgICAgICBsaS5hcHBlbmQoaSk7XG4gICAgICAgIGNvbnN0IHRleHRJbnB1dCA9IGA8aW5wdXQgY2xhc3M9XCJuZXctbGlzdC10ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiAvPjxpIGNsYXNzPVwiZmFyIGZhLXRpbWVzLWNpcmNsZSBuZXctbGlzdC1jYW5jZWwtYnRuXCI+PC9pPjxpIGNsYXNzPVwiZmFyIGZhLWNoZWNrLWNpcmNsZSBuZXctbGlzdC1zdWJtaXQtYnRuXCI+PC9pPmA7XG4gICAgICAgIGxpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdGV4dElucHV0KTtcbiAgICAgICAgdWwuYXBwZW5kKGxpKTtcbiAgICB9XG5cbiAgICB0YXNrRGVsZXRlQnRuSGFuZGxlcih0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgdGFza0lkID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pZDtcbiAgICAgICAgbG9naWMuZGVsZXRlVGFzayh0YXNrSWQpO1xuICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgfVxuXG4gICAgdGFza0VkaXRvckhhbmRsZXIodGFza0VkaXRvciwgdGFza0lkKSB7XG4gICAgICAgIHRhc2tFZGl0b3IuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgIGNvbnN0IHRhc2tUZXh0SW5wdXQgPSB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICBjb25zdCBkZXRhaWxzVGV4dGFyZWEgPSB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgY29uc3QgZGF0ZXBpY2tlciA9IHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZy5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAgICAgICB0YXNrVGV4dElucHV0LnZhbHVlID0gY3VycmVudExpc3QudGFza3NbdGFza0lkXS5uYW1lO1xuICAgICAgICBkZXRhaWxzVGV4dGFyZWEudmFsdWUgPSBjdXJyZW50TGlzdC50YXNrc1t0YXNrSWRdLmRldGFpbHM7XG4gICAgICAgIGRhdGVwaWNrZXIudmFsdWVBc051bWJlciA9IGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2tJZF0uZHVlRGF0ZTtcbiAgICB9XG5cbiAgICBlZGl0VGFza1N1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0KSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0YXNrTmFtZSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMF0udmFsdWU7XG4gICAgICAgIGNvbnN0IGRldGFpbHMgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzFdLnZhbHVlO1xuICAgICAgICBjb25zdCBkdWVEYXRlID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsyXS5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZUFzTnVtYmVyO1xuXG4gICAgICAgIGlmKCF0aGlzLmR1ZURhdGVJc1ZhbGlkKGR1ZURhdGUpKXtcbiAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMl0uZmlyc3RFbGVtZW50Q2hpbGQuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCF0YXNrTmFtZSkge1xuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGFza05hbWUgJiYgdGhpcy5kdWVEYXRlSXNWYWxpZChkdWVEYXRlKSkge1xuICAgICAgICAgICAgY29uc3QgdGFza0lzTmV3ID0gKHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc05hbWUgPT09ICduZXctdGFzay1lZGl0b3InKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTsgLy93aWxsIHVzZSBjdXJyZW50VGltZSBhcyBhIHVuaXF1ZSBpZGVudGlmaWVyIGZvciBlYWNoIHRhc2tcblxuICAgICAgICAgICAgaWYodGFza0lzTmV3KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFzayA9IGxvZ2ljLmNyZWF0ZU5ld1Rhc2sodGFza05hbWUsIGR1ZURhdGUsIGRldGFpbHMsIGN1cnJlbnRUaW1lKTtcbiAgICAgICAgICAgICAgICBsb2dpYy5hZGRUYXNrVG9DdXJyZW50TGlzdCh0YXNrKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighdGFza0lzTmV3KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0lkID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pZDtcbiAgICAgICAgICAgICAgICBsb2dpYy5tb2RpZnlUYXNrKHRhc2tOYW1lLCBkdWVEYXRlLCBkZXRhaWxzLCB0YXNrSWQpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHRhc2tFZGl0b3IgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBpZih0YXNrRWRpdG9yLmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrLWVkaXRvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkcmVuWzFdLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuY2hpbGRyZW5bMl0uZmlyc3RFbGVtZW50Q2hpbGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHVlRGF0ZUlzVmFsaWQoZHVlRGF0ZVZhbHVlQXNOdW1iZXIpIHtcbiAgICAgICAgaWYoaXNOYU4oZHVlRGF0ZVZhbHVlQXNOdW1iZXIpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpIHtcbiAgICAgICAgbmV3VGFza0VkaXRvci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBuZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKSB7XG4gICAgICAgIG5ld1Rhc2tFZGl0b3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgcmVuZGVyVGFza3MoKSB7XG4gICAgICAgIGNvbnN0IHVsRm9yVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlLXRhc2staXRlbXMnKTtcbiAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIE9iamVjdC52YWx1ZXMoY3VycmVudExpc3QudGFza3MpKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gYDxsaSBjbGFzcz1cInRvZG8taXRlbVwiIGRhdGEtaWQ9XCIke3Rhc2sudGFza0lkfVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stZGF0ZS1idG5zXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YXNrXCI+JHt0YXNrLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlLWFuZC1idG5zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZHVlLWRhdGVcIj4ke3RoaXMuY3JlYXRlUmVhZGFibGVEYXRlKHRhc2suZHVlRGF0ZSl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC10YXNrLWJ0blwiPjxpIGNsYXNzPVwiZmFzIGZhLWVkaXRcIj48L2k+PC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1lZGl0b3IgaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBhY3Rpb249XCJcIiBtZXRob2Q9XCJnZXRcIiBjbGFzcz1cInRhc2stZWRpdG9yLWZvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJ0YXNrLWZpZWxkXCIgbmFtZT1cInRhc2tcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVGFza1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZGVzY3JpcHRpb24tZmllbGRcIiBuYW1lPVwiZGVzY3JpcHRpb25cIiBwbGFjZWhvbGRlcj1cIkRldGFpbHNcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlcGlja2VyLWFkZGJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJkYXRlLXBpY2tlclwiIG5hbWU9XCJkdWUtZGF0ZVwiIHR5cGU9XCJkYXRlXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRhc2stZGVsZXRlLWJ0blwiPjxpIGNsYXNzPVwiZmFyIGZhLXRyYXNoLWFsdFwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdGFzay1zdWJtaXQtYnRuXCI+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2xpPmA7XG4gICAgICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCArPSBodG1sO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUmVhZGFibGVEYXRlKGRhdGVWYWx1ZUFzTnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlVmFsdWVBc051bWJlcik7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRVVENNb250aCgpICsgMTtcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXRVVENEYXRlKCk7XG4gICAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgICAgIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn1gO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRvbUNvbnRyb2xsZXIgPSBuZXcgRG9tQ29udHJvbGxlcigpO1xuXG5cblxuLy9pc3N1ZXMuICBjYW4ndCBnZXQgdGFzayBuYW1lIHRvIHdyYXAgYXQgNTAlOyIsImNsYXNzIExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy50YXNrcyA9IHt9O1xuICAgIH1cbn1cblxuZXhwb3J0IHsgTGlzdCB9OyIsImltcG9ydCB7VGFza30gZnJvbSAnLi9UYXNrJztcbmltcG9ydCB7TGlzdH0gZnJvbSAnLi9MaXN0JztcblxubGV0IGN1cnJlbnRMaXN0O1xuXG5jb25zdCBsaXN0cyA9IHt9O1xuXG5jbGFzcyBMb2dpYyB7XG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgY3JlYXRlTmV3VGFzayhuYW1lLCBkdWVEYXRlLCBkZXRhaWxzID0gXCJcIiwgdGFza0lkKSB7XG4gICAgICAgIHJldHVybiBuZXcgVGFzayhuYW1lLCBkdWVEYXRlLCBkZXRhaWxzLCB0YXNrSWQpO1xuICAgIH1cblxuICAgIGFkZFRhc2tUb0N1cnJlbnRMaXN0KHRhc2spIHtcbiAgICAgICAgY3VycmVudExpc3QudGFza3NbdGFzay50YXNrSWRdID0gdGFzaztcbiAgICB9XG5cbiAgICBtb2RpZnlUYXNrKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMgPSAnJywgdGFza0lkKSB7XG4gICAgICAgIGZvciAoY29uc3QgdGFzayBvZiBPYmplY3QudmFsdWVzKGN1cnJlbnRMaXN0LnRhc2tzKSkge1xuICAgICAgICAgICAgaWYodGFzay50YXNrSWQgPT0gdGFza0lkKSB7XG4gICAgICAgICAgICAgICAgdGFzay5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICB0YXNrLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICAgICAgICAgIHRhc2suZGV0YWlscyA9IGRldGFpbHM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWxldGVUYXNrKHRhc2spIHtcbiAgICAgICAgZGVsZXRlIGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2tdO1xuICAgIH1cblxuICAgICAvLyBnZXRDdXJyZW50VGFzaygpIHtcbiAgICAvLyAgICAgcmV0dXJuIGN1cnJlbnRUYXNrO1xuICAgIC8vIH1cblxuICAgIGNyZWF0ZU5ld0xpc3QobmFtZSkge1xuICAgICAgICBjb25zdCBuZXdMaXN0ID0gbmV3IExpc3QobmFtZSk7XG4gICAgICAgIGxpc3RzW25hbWVdID0gbmV3TGlzdDtcbiAgICB9XG5cbiAgICBtb2RpZnlMaXN0TmFtZShvbGROYW1lLCBuZXdOYW1lKSB7XG4gICAgICAgIGxpc3RzW25ld05hbWVdID0gbGlzdHNbb2xkTmFtZV07XG4gICAgICAgIGRlbGV0ZSBsaXN0c1tvbGROYW1lXTtcbiAgICB9XG5cbiAgICBcbiAgICBzZXREZWZhdWx0TGlzdCgpIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGxpc3RzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGNob3JlcyA9IG5ldyBMaXN0KCdDaG9yZXMnKTtcbiAgICAgICAgICAgIGxpc3RzLkNob3JlcyA9IGNob3JlcztcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudExpc3QoJ0Nob3JlcycpO1xuICAgICAgICB9IFxuICAgIH1cblxuICAgIHNldEN1cnJlbnRMaXN0KGxpc3ROYW1lKSB7XG4gICAgICAgIGN1cnJlbnRMaXN0ID0gbGlzdHNbbGlzdE5hbWVdO1xuICAgIH1cblxuICAgIC8vIGdldEN1cnJlbnRMaXN0KCkge1xuICAgIC8vICAgICByZXR1cm4gY3VycmVudExpc3Q7XG4gICAgLy8gfVxuXG4gICBcbn1cblxuY29uc3QgbG9naWMgPSBuZXcgTG9naWMoKTtcblxuZXhwb3J0IHtjdXJyZW50TGlzdCwgbGlzdHMsIGxvZ2ljfTsiLCJjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMgPSBcIlwiLCB0YXNrSWQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICAgICAgdGhpcy50YXNrSWQgPSB0YXNrSWQ7XG4gICAgfVxuXG5cblxufVxuXG5leHBvcnQgeyBUYXNrIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2RvbUNvbnRyb2xsZXJ9IGZyb20gJy4vbW9kdWxlcy9Eb21Db250cm9sbGVyJztcbmltcG9ydCB7Y3VycmVudExpc3QsIGxpc3RzLCBsb2dpY30gZnJvbSAnLi9tb2R1bGVzL0xvZ2ljJztcbmltcG9ydCB7TGlzdH0gZnJvbSAnLi9tb2R1bGVzL0xpc3QnO1xuXG5cblxubG9naWMuc2V0RGVmYXVsdExpc3QoKTtcbmRvbUNvbnRyb2xsZXIuaW5pdGlhbGl6ZUNsaWNrRXZlbnRMaXN0ZW5lcnMoKTtcblxuXG5cblxuXG4iXSwic291cmNlUm9vdCI6IiJ9