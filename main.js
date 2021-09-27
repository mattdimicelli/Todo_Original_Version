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
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var DomController = /*#__PURE__*/function () {
  function DomController() {
    _classCallCheck(this, DomController);

    this.oldName = null;
    this.listCurrentlyBeingEdited = false;
    this.taskCurrentlyBeingEdited = false;
  }

  _createClass(DomController, [{
    key: "initializeClickEventListeners",
    value: function initializeClickEventListeners() {
      document.addEventListener('click', this.handleClick.bind(this));
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      /* writing this application was a learning process.  I attempted and
          succeeded in using one event listener with delegation for every
          click on the DOM.  doing so required a complex set of conditionals.*/
      // the following variable is declared for use in conditional statements
      var target;

      if (e.target.closest('div[class="task-date-btns"]') && e.target.className !== 'fas fa-edit') {
        //strikes thru the name of the task and the due date if either one clicked on
        var taskTarget = e.target.closest('div[class="task-date-btns"]').firstElementChild;
        var dateTarget = e.target.closest('div[class="task-date-btns"]').children[1].firstElementChild;
        this.toggleStrikethruTask(taskTarget, dateTarget);
      } else if (e.target.closest('i')) {
        e.preventDefault();
        target = e.target.closest('i');

        if (target.classList.contains('new-list-cancel-btn')) {
          target.parentElement.remove();
        } else if (target.classList.contains('new-list-submit-btn')) {
          var listTextInput = target.previousElementSibling.previousElementSibling;
          var listName = target.previousElementSibling.previousElementSibling.value;
          this.newListSubmitBtnHandler(target, listName, listTextInput);
        } else if (target.classList.contains('edit-list-icon')) {
          var listItem = target.parentElement.parentElement;
          var _listName = target.parentElement.parentElement.textContent;
          this.editListIconHandler(_listName, listItem);
        } else if (target.classList.contains('edit-list-submit-btn')) {
          /* this btn is identical to the 'new-list-submit-btn', but 
          substitutes it when an existing list is currently being edited */
          var textInput = target.previousElementSibling.previousElementSibling.previousElementSibling;
          var newName = target.previousElementSibling.previousElementSibling.previousElementSibling.value;

          if (newName === this.oldName) {
            textInput.focus();
            return;
          }

          this.editListSubmitBtnHandler(newName, textInput);
        } else if (target.classList.contains('edit-list-cancel-btn')) {
          this.listCurrentlyBeingEdited = false;
          this.renderLists();
        } else if (target.className === 'far fa-trash-alt list') {
          this.deleteList();
        } else if (e.target.closest('button, li')) {
          target = e.target.closest('button, li');

          if (target.className === 'menu-btn') {
            var menu = document.querySelector('.menu');
            this.menuBtnHandler(menu);
          } else if (target.className === 'edit-task-btn') {
            var taskEditor = target.parentElement.parentElement.parentElement.children[1];
            var taskId = target.parentElement.parentElement.parentElement.dataset.id;
            this.renderTaskEditor(taskEditor, taskId);
          } else if (target.className === 'edit-task-submit-btn') {
            this.editTaskSubmitBtnHandler(target);
          } else if (target.className === 'new-task-btn') {
            var newTaskEditor = target.previousElementSibling;
            this.newTaskBtnHandler(newTaskEditor);
          } else if (target.className === 'task-delete-btn') {
            this.taskDeleteBtnHandler(target);
          } else if (target.className === 'cancel-new-task-btn') {
            var _newTaskEditor = target.parentElement.parentElement.parentElement;
            this.cancelNewTaskBtnHandler(_newTaskEditor);
          } else if (target.classList.contains('add-list-btn')) {
            this.addListBtnHandler();
          }
        }
      } else {
        target = e.target.closest('button, li');

        if (target === null) {
          return;
        } else {
          if (target.className === 'new-task-btn') {
            e.preventDefault();
            var _newTaskEditor2 = target.previousElementSibling;
            this.newTaskBtnHandler(_newTaskEditor2);
          } else if (target.classList.contains('add-list-btn')) {
            this.addListBtnHandler();
          } else if (target.className === 'list menu-btn' && !target.children[1].matches('input')) {
            var _listName2 = target.childNodes[1].textContent;
            this.switchList(_listName2);
          } else if (target.className === 'menu-btn all') {
            this.taskCurrentlyBeingEdited = false;
            this.listCurrentlyBeingEdited = false;
            this.renderTasks();
          } else if (target.className === 'menu-btn today') {
            this.viewOnlyToday();
          } else if (target.className === 'menu-btn week') {
            this.viewOnlyWeek();
          } else if (target.className === 'edit-task-submit-btn') {
            e.preventDefault();
            this.editTaskSubmitBtnHandler(target);
          } else if (target.className === 'task-delete-btn') {
            e.preventDefault();
            this.taskDeleteBtnHandler(target);
          } else if (target.className === 'cancel-new-task-btn') {
            e.preventDefault();
            var _newTaskEditor3 = target.parentElement.parentElement.parentElement;
            this.cancelNewTaskBtnHandler(_newTaskEditor3);
          }
        }
      }
    }
  }, {
    key: "toggleStrikethruTask",
    value: function toggleStrikethruTask(taskTarget, dateTarget) {
      taskTarget.classList.toggle('strikethru');
      dateTarget.classList.toggle('strikethru');
    }
  }, {
    key: "viewOnlyWeek",
    value: function viewOnlyWeek() {
      this.taskCurrentlyBeingEdited = false;
      this.listCurrentlyBeingEdited = false;
      var ulForTasks = document.querySelector('.the-task-items');
      ulForTasks.innerHTML = '';
      var tasksOfWeek = Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks).filter(function (task) {
        var dueDateObj = new Date(task.dueDate);

        if (Math.abs(Date.now() - dueDateObj) <= 6.048e8) {
          return true;
        } else return false;
      });

      var _iterator = _createForOfIteratorHelper(tasksOfWeek),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var task = _step.value;
          var html = this.createTaskHTML(task.taskId, task.name, task.dueDate);
          ulForTasks.innerHTML += html;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "createTaskHTML",
    value: function createTaskHTML(taskId, name, dueDate) {
      var html = "<li class=\"todo-item\" data-id=\"".concat(taskId, "\">\n        <div class=\"task-date-btns\">\n            <span class=\"task\">").concat(name, "</span>\n            <div class=\"date-and-btns\">\n                <span class=\"due-date\">").concat(this.createReadableDate(dueDate), "</span>\n                <button class=\"edit-task-btn\"><i class=\"fas fa-edit\"></i></button>\n\n            </div>\n        </div>\n    <div class=\"task-editor hidden\">\n                    <form action=\"\" method=\"get\" class=\"task-editor-form\">\n                        <input class=\"task-field\" name=\"task\" type=\"text\" placeholder=\"Task\" />\n                        <textarea class=\"description-field\" name=\"description\" placeholder=\"Details\"></textarea>\n                        <div class=\"datepicker-addbutton\">\n                            <input class=\"date-picker\" name=\"due-date\" type=\"date\" required />\n                            <button class=\"task-delete-btn\"><i class=\"far fa-trash-alt\"></i></button>\n                            <button class=\"edit-task-submit-btn\"><i class=\"far fa-check-circle\"></i></button>\n                        </div>\n                    </form>\n                </div>\n            </li>");
      return html;
    }
  }, {
    key: "viewOnlyToday",
    value: function viewOnlyToday() {
      this.taskCurrentlyBeingEdited = false;
      this.listCurrentlyBeingEdited = false;
      var ulForTasks = document.querySelector('.the-task-items');
      ulForTasks.innerHTML = '';
      var tasksOfToday = Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks).filter(function (task) {
        var dueDateObj = new Date(task.dueDate);
        var dueDateDay = dueDateObj.getUTCDate();
        var dueDateMonth = dueDateObj.getUTCMonth();
        var dueDateYear = dueDateObj.getUTCFullYear();
        var currentDay = new Date().getUTCDate();
        var currentMonth = new Date().getUTCMonth();
        var currentYear = new Date().getUTCFullYear();

        if (dueDateDay === currentDay && dueDateMonth === currentMonth && dueDateYear === currentYear) {
          return true;
        } else return false;
      });

      var _iterator2 = _createForOfIteratorHelper(tasksOfToday),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var task = _step2.value;
          var html = this.createTaskHTML(task.taskId, task.name, task.dueDate);
          ulForTasks.innerHTML += html;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "updateColumnName",
    value: function updateColumnName() {
      var columnName = document.querySelector('.list-column-name');
      columnName.textContent = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.name;
    }
  }, {
    key: "deleteList",
    value: function deleteList() {
      this.listCurrentlyBeingEdited = false;
      this.taskCurrentlyBeingEdited = false;
      var reallyDelete = confirm("Are you sure that you want to delete the ".concat(this.oldName, " list and all associated tasks?"));

      if (reallyDelete) {
        if (Object.keys(_Logic__WEBPACK_IMPORTED_MODULE_0__.lists).length > 1) {
          _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.deleteList(this.oldName);
          _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.setCurrentListToBeOneOfTheRemainingLists();
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
  }, {
    key: "editListSubmitBtnHandler",
    value: function editListSubmitBtnHandler(newName, textInput) {
      if (newName === '') {
        // don't allow user to save list without name
        textInput.focus();
        return;
      }

      this.listCurrentlyBeingEdited = false;
      _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.modifyListName(this.oldName, newName);
      this.renderLists();
      this.switchList(newName);
    }
  }, {
    key: "editListIconHandler",
    value: function editListIconHandler(listName, listItem) {
      /* if another list is being edited, won't allow another to be edited
      until the first one is finished */
      if (this.listCurrentlyBeingEdited) return;
      this.listCurrentlyBeingEdited = true;
      this.oldName = listName;
      var html = "<i class=\"fas fa-list-alt\"></i><input class=\"new-list-text-input\" type=\"text\" value=\"".concat(listName, "\" /><i class=\"far fa-trash-alt list\"></i><i class=\"far fa-times-circle edit-list-cancel-btn\"></i><i class=\"far fa-check-circle edit-list-submit-btn\"></i>");
      listItem.innerHTML = html;
    }
  }, {
    key: "switchList",
    value: function switchList(listName) {
      this.taskCurrentlyBeingEdited = false;
      this.listCurrentlyBeingEdited = false;
      _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.makeCurrentList(listName);
      this.renderTasks();
      var columnName = document.querySelector('.list-column-name');
      columnName.textContent = listName;
    }
  }, {
    key: "newListSubmitBtnHandler",
    value: function newListSubmitBtnHandler(target, listName, listTextInput) {
      if (listName === '') {
        // don't allow user to save list without name
        listTextInput.focus();
        return;
      }

      _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.createNewList(listName);
      target.parentElement.remove();
      this.renderLists();
      this.switchList(listName);
    }
  }, {
    key: "renderLists",
    value: function renderLists() {
      var ul = document.querySelector('.ul-list-of-lists');
      var html = '';
      var sortedLists = Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.lists).sort(function (list1, list2) {
        if (list1.id > list2.id) return 1;
        if (list1.id === list2.id) return 0;
        if (list1.id < list2.id) return -1;
      });

      var _iterator3 = _createForOfIteratorHelper(sortedLists),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var list = _step3.value;
          html += "<li class=\"list menu-btn\"><i class=\"fas fa-list-alt\"></i>".concat(list.name, "<span class=\"edit-list-icon\"><i class=\"fas fa-edit edit-list-icon\"></i></span></li>");
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      ul.innerHTML = html;
    }
  }, {
    key: "menuBtnHandler",
    value: function menuBtnHandler(menu) {
      if (window.getComputedStyle(menu).display === 'none') {
        menu.style.display = 'block';
      } else menu.style.display = 'none';
    }
  }, {
    key: "addListBtnHandler",
    value: function addListBtnHandler() {
      var ul = document.querySelector('.ul-list-of-lists');
      var li = document.createElement('li');
      li.classList.add('list', 'menu-btn');
      var i = document.createElement('i');
      i.classList.add('fas', 'fa-list-alt');
      li.append(i);
      var textInput = "<input class=\"new-list-text-input\" type=\"text\" /><i class=\"far fa-times-circle new-list-cancel-btn\"></i><i class=\"far fa-check-circle new-list-submit-btn\"></i>";
      li.insertAdjacentHTML('beforeend', textInput);
      ul.append(li);
    }
  }, {
    key: "taskDeleteBtnHandler",
    value: function taskDeleteBtnHandler(target) {
      this.taskCurrentlyBeingEdited = false;
      var taskId = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
      _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.deleteTask(taskId);
      this.renderTasks();
    }
  }, {
    key: "renderTaskEditor",
    value: function renderTaskEditor(taskEditor, taskId) {
      // if a task editor window is already open, do nothing 
      if (this.taskCurrentlyBeingEdited) return;
      this.taskCurrentlyBeingEdited = true;
      taskEditor.classList.toggle('hidden');
      var taskTextInput = taskEditor.firstElementChild.firstElementChild;
      var detailsTextarea = taskEditor.firstElementChild.firstElementChild.nextElementSibling;
      var datepicker = taskEditor.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild;
      taskTextInput.value = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks[taskId].name;
      detailsTextarea.value = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks[taskId].details;

      if (_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks[taskId].dueDate) {
        datepicker.valueAsNumber = _Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks[taskId].dueDate;
      }
    }
  }, {
    key: "editTaskSubmitBtnHandler",
    value: function editTaskSubmitBtnHandler(target) {
      var taskName = target.parentElement.parentElement.children[0].value;
      var details = target.parentElement.parentElement.children[1].value;
      var dueDate = target.parentElement.parentElement.children[2].firstElementChild.valueAsDate;

      if (!this.dueDateIsValid(dueDate)) {
        // if the date is not valid, bring the date picker into focus
        target.parentElement.parentElement.children[2].firstElementChild.focus();
      } else if (!taskName) {
        // don't allow user to save task without name
        target.parentElement.parentElement.children[0].focus();
      } else if (taskName && this.dueDateIsValid(dueDate)) {
        var taskEditor = target.parentElement.parentElement.parentElement;
        var taskIsNew = taskEditor.className === 'new-task-editor' ? true : false;
        var currentTime = Date.now(); //will use currentTime as a unique identifier for each task

        if (taskIsNew) {
          var task = _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.createNewTask(taskName, dueDate, details, currentTime);
          _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.addTaskToCurrentList(task);
          this.renderTasks();
          taskEditor.firstElementChild.firstElementChild.value = '';
          taskEditor.firstElementChild.children[1].value = '';
          taskEditor.firstElementChild.children[2].firstElementChild.value = '';
          taskEditor.classList.toggle('hidden');
        } else if (!taskIsNew) {
          var taskId = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
          _Logic__WEBPACK_IMPORTED_MODULE_0__.logic.modifyTask(taskName, dueDate, details, taskId);
          this.renderTasks();
        }
      }

      this.taskCurrentlyBeingEdited = false;
    }
  }, {
    key: "dueDateIsValid",
    value: function dueDateIsValid(dueDateValueAsNumber) {
      if (isNaN(dueDateValueAsNumber)) {
        return false;
      } else return true;
    }
  }, {
    key: "cancelNewTaskBtnHandler",
    value: function cancelNewTaskBtnHandler(newTaskEditor) {
      newTaskEditor.classList.add('hidden');
    }
  }, {
    key: "newTaskBtnHandler",
    value: function newTaskBtnHandler(newTaskEditor) {
      newTaskEditor.classList.remove('hidden');
    }
  }, {
    key: "renderTasks",
    value: function renderTasks() {
      var ulForTasks = document.querySelector('.the-task-items');
      ulForTasks.innerHTML = '';
      if (_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList === null) ulForTasks.innerHTML = '';

      for (var _i = 0, _Object$values = Object.values(_Logic__WEBPACK_IMPORTED_MODULE_0__.currentList.tasks); _i < _Object$values.length; _i++) {
        var task = _Object$values[_i];
        var html = this.createTaskHTML(task.taskId, task.name, task.dueDate);
        ulForTasks.innerHTML += html;
      }
    }
  }, {
    key: "createReadableDate",
    value: function createReadableDate(dateValueAsNumber) {
      // if the user didn't put a due date, just return an empty str
      if (dateValueAsNumber === null) return '';
      var date = new Date(dateValueAsNumber);
      var month = date.getUTCMonth() + 1;
      var day = date.getUTCDate();
      var year = date.getUTCFullYear();
      return "".concat(month, "/").concat(day, "/").concat(year);
    }
  }]);

  return DomController;
}();

var domController = new DomController(); //issues.  can't get task name to wrap at 50%;

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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List = function List(name, id) {
  _classCallCheck(this, List);

  this.name = name;
  this.tasks = {};
  this.id = id;
};



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
/* harmony export */   "logic": () => (/* binding */ logic),
/* harmony export */   "nextListId": () => (/* binding */ nextListId)
/* harmony export */ });
/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ "./src/modules/Task.js");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./List */ "./src/modules/List.js");
/* harmony import */ var _DomController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DomController */ "./src/modules/DomController.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var currentList;
var nextListId = 0;
var lists = {};

var Logic = /*#__PURE__*/function () {
  function Logic() {
    _classCallCheck(this, Logic);
  }

  _createClass(Logic, [{
    key: "createNewTask",
    value: function createNewTask(name, dueDate) {
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var taskId = arguments.length > 3 ? arguments[3] : undefined;
      return new _Task__WEBPACK_IMPORTED_MODULE_0__.Task(name, dueDate, details, taskId);
    }
  }, {
    key: "addTaskToCurrentList",
    value: function addTaskToCurrentList(task) {
      currentList.tasks[task.taskId] = task;
    }
  }, {
    key: "modifyTask",
    value: function modifyTask(name, dueDate) {
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var taskId = arguments.length > 3 ? arguments[3] : undefined;

      for (var _i = 0, _Object$values = Object.values(currentList.tasks); _i < _Object$values.length; _i++) {
        var task = _Object$values[_i];

        if (task.taskId == taskId) {
          task.name = name;
          task.dueDate = dueDate;
          task.details = details;
          break;
        }
      }
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(task) {
      delete currentList.tasks[task];
    }
  }, {
    key: "createNewList",
    value: function createNewList(name) {
      var newList = new _List__WEBPACK_IMPORTED_MODULE_1__.List(name, nextListId++);
      lists[name] = newList;
    }
  }, {
    key: "modifyListName",
    value: function modifyListName(oldName, newName) {
      lists[newName] = lists[oldName];
      delete lists[oldName];
      lists[newName].name = newName;
    }
  }, {
    key: "setDefaultList",
    value: function setDefaultList() {
      if (Object.keys(lists).length === 0) {
        var chores = new _List__WEBPACK_IMPORTED_MODULE_1__.List('Chores', nextListId++);
        lists.Chores = chores;
        this.makeCurrentList('Chores');
      }
    }
  }, {
    key: "makeCurrentList",
    value: function makeCurrentList(listName) {
      currentList = lists[listName];
    }
  }, {
    key: "writeOverCurrentList",
    value: function writeOverCurrentList(dataFromStorage) {
      currentList = dataFromStorage;
    }
  }, {
    key: "setCurrentListToBeOneOfTheRemainingLists",
    value: function setCurrentListToBeOneOfTheRemainingLists() {
      var firstList = Object.keys(lists)[0];
      this.makeCurrentList(firstList);
    }
  }, {
    key: "deleteList",
    value: function deleteList(listName) {
      delete lists[listName];
    }
  }]);

  return Logic;
}();

var logic = new Logic();
window.addEventListener('beforeunload', function () {
  localStorage.setItem('currentList', JSON.stringify(currentList));
  localStorage.setItem('lists', JSON.stringify(lists));
  localStorage.setItem('nextListId', JSON.stringify(nextListId));
});
document.addEventListener('DOMContentLoaded', function () {
  if (Object.keys(localStorage).length > 0) {
    console.log('theres stuff in local storage');
    logic.writeOverCurrentList(JSON.parse(localStorage.getItem('currentList')));
    lists = JSON.parse(localStorage.getItem('lists'));
    nextListId = JSON.parse(localStorage.getItem('nextListId'));
    _DomController__WEBPACK_IMPORTED_MODULE_2__.domController.renderLists();
    _DomController__WEBPACK_IMPORTED_MODULE_2__.domController.renderTasks();
    _DomController__WEBPACK_IMPORTED_MODULE_2__.domController.updateColumnName();
  } else {
    console.log('nothing in local storage');
    logic.setDefaultList();
  }
});


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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function Task(name, dueDate) {
  var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var taskId = arguments.length > 3 ? arguments[3] : undefined;

  _classCallCheck(this, Task);

  this.name = name;
  this.dueDate = dueDate;
  this.details = details;
  this.taskId = taskId;
};



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

_modules_DomController__WEBPACK_IMPORTED_MODULE_0__.domController.initializeClickEventListeners();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy9Eb21Db250cm9sbGVyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL21vZHVsZXMvVGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiRG9tQ29udHJvbGxlciIsIm9sZE5hbWUiLCJsaXN0Q3VycmVudGx5QmVpbmdFZGl0ZWQiLCJ0YXNrQ3VycmVudGx5QmVpbmdFZGl0ZWQiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoYW5kbGVDbGljayIsImJpbmQiLCJlIiwidGFyZ2V0IiwiY2xvc2VzdCIsImNsYXNzTmFtZSIsInRhc2tUYXJnZXQiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImRhdGVUYXJnZXQiLCJjaGlsZHJlbiIsInRvZ2dsZVN0cmlrZXRocnVUYXNrIiwicHJldmVudERlZmF1bHQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmUiLCJsaXN0VGV4dElucHV0IiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImxpc3ROYW1lIiwidmFsdWUiLCJuZXdMaXN0U3VibWl0QnRuSGFuZGxlciIsImxpc3RJdGVtIiwidGV4dENvbnRlbnQiLCJlZGl0TGlzdEljb25IYW5kbGVyIiwidGV4dElucHV0IiwibmV3TmFtZSIsImZvY3VzIiwiZWRpdExpc3RTdWJtaXRCdG5IYW5kbGVyIiwicmVuZGVyTGlzdHMiLCJkZWxldGVMaXN0IiwibWVudSIsInF1ZXJ5U2VsZWN0b3IiLCJtZW51QnRuSGFuZGxlciIsInRhc2tFZGl0b3IiLCJ0YXNrSWQiLCJkYXRhc2V0IiwiaWQiLCJyZW5kZXJUYXNrRWRpdG9yIiwiZWRpdFRhc2tTdWJtaXRCdG5IYW5kbGVyIiwibmV3VGFza0VkaXRvciIsIm5ld1Rhc2tCdG5IYW5kbGVyIiwidGFza0RlbGV0ZUJ0bkhhbmRsZXIiLCJjYW5jZWxOZXdUYXNrQnRuSGFuZGxlciIsImFkZExpc3RCdG5IYW5kbGVyIiwibWF0Y2hlcyIsImNoaWxkTm9kZXMiLCJzd2l0Y2hMaXN0IiwicmVuZGVyVGFza3MiLCJ2aWV3T25seVRvZGF5Iiwidmlld09ubHlXZWVrIiwidG9nZ2xlIiwidWxGb3JUYXNrcyIsImlubmVySFRNTCIsInRhc2tzT2ZXZWVrIiwiT2JqZWN0IiwidmFsdWVzIiwiY3VycmVudExpc3QiLCJmaWx0ZXIiLCJ0YXNrIiwiZHVlRGF0ZU9iaiIsIkRhdGUiLCJkdWVEYXRlIiwiTWF0aCIsImFicyIsIm5vdyIsImh0bWwiLCJjcmVhdGVUYXNrSFRNTCIsIm5hbWUiLCJjcmVhdGVSZWFkYWJsZURhdGUiLCJ0YXNrc09mVG9kYXkiLCJkdWVEYXRlRGF5IiwiZ2V0VVRDRGF0ZSIsImR1ZURhdGVNb250aCIsImdldFVUQ01vbnRoIiwiZHVlRGF0ZVllYXIiLCJnZXRVVENGdWxsWWVhciIsImN1cnJlbnREYXkiLCJjdXJyZW50TW9udGgiLCJjdXJyZW50WWVhciIsImNvbHVtbk5hbWUiLCJyZWFsbHlEZWxldGUiLCJjb25maXJtIiwia2V5cyIsImxpc3RzIiwibGVuZ3RoIiwibG9naWMiLCJ1cGRhdGVDb2x1bW5OYW1lIiwiYWxlcnQiLCJ1bCIsInNvcnRlZExpc3RzIiwic29ydCIsImxpc3QxIiwibGlzdDIiLCJsaXN0Iiwid2luZG93IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImRpc3BsYXkiLCJzdHlsZSIsImxpIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsImkiLCJhcHBlbmQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJ0YXNrVGV4dElucHV0IiwiZGV0YWlsc1RleHRhcmVhIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiZGF0ZXBpY2tlciIsImRldGFpbHMiLCJ2YWx1ZUFzTnVtYmVyIiwidGFza05hbWUiLCJ2YWx1ZUFzRGF0ZSIsImR1ZURhdGVJc1ZhbGlkIiwidGFza0lzTmV3IiwiY3VycmVudFRpbWUiLCJkdWVEYXRlVmFsdWVBc051bWJlciIsImlzTmFOIiwiZGF0ZVZhbHVlQXNOdW1iZXIiLCJkYXRlIiwibW9udGgiLCJkYXkiLCJ5ZWFyIiwiZG9tQ29udHJvbGxlciIsIkxpc3QiLCJ0YXNrcyIsIm5leHRMaXN0SWQiLCJMb2dpYyIsIlRhc2siLCJuZXdMaXN0IiwiY2hvcmVzIiwiQ2hvcmVzIiwibWFrZUN1cnJlbnRMaXN0IiwiZGF0YUZyb21TdG9yYWdlIiwiZmlyc3RMaXN0IiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb25zb2xlIiwibG9nIiwid3JpdGVPdmVyQ3VycmVudExpc3QiLCJwYXJzZSIsImdldEl0ZW0iLCJzZXREZWZhdWx0TGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRU1BLGE7QUFFRiwyQkFBZTtBQUFBOztBQUNYLFNBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0EsU0FBS0Msd0JBQUwsR0FBZ0MsS0FBaEM7QUFDQSxTQUFLQyx3QkFBTCxHQUFnQyxLQUFoQztBQUNIOzs7O1dBRUQseUNBQWdDO0FBQzVCQyxjQUFRLENBQUNDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEtBQUtDLFdBQUwsQ0FBaUJDLElBQWpCLENBQXNCLElBQXRCLENBQW5DO0FBQ0g7OztXQUVELHFCQUFZQyxDQUFaLEVBQWU7QUFDWDtB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O0FBQ0gsQzs7Ozs7Ozs7VUNQTDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05BO0FBT0F3RiwrRkFBQSxHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsb2dpYywgY3VycmVudExpc3QsIGxpc3RzfSBmcm9tICcuL0xvZ2ljJztcblxuY2xhc3MgRG9tQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpICB7XG4gICAgICAgIHRoaXMub2xkTmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGlzdEN1cnJlbnRseUJlaW5nRWRpdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGFza0N1cnJlbnRseUJlaW5nRWRpdGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZUNsaWNrRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgXG4gICAgaGFuZGxlQ2xpY2soZSkge1xuICAgICAgICAvKiB3cml0aW5nIHRoaXMgYXBwbGljYXRpb24gd2FzIGEgbGVhcm5pbmcgcHJvY2Vzcy4gIEkgYXR0ZW1wdGVkIGFuZFxuICAgICAgICAgICAgc3VjY2VlZGVkIGluIHVzaW5nIG9uZSBldmVudCBsaXN0ZW5lciB3aXRoIGRlbGVnYXRpb24gZm9yIGV2ZXJ5XG4gICAgICAgICAgICBjbGljayBvbiB0aGUgRE9NLiAgZG9pbmcgc28gcmVxdWlyZWQgYSBjb21wbGV4IHNldCBvZiBjb25kaXRpb25hbHMuKi8gXG4gICAgICAgIFxuICAgICAgICAvLyB0aGUgZm9sbG93aW5nIHZhcmlhYmxlIGlzIGRlY2xhcmVkIGZvciB1c2UgaW4gY29uZGl0aW9uYWwgc3RhdGVtZW50c1xuICAgICAgICBsZXQgdGFyZ2V0OyAgICAgICAgXG4gICAgICAgIGlmKGUudGFyZ2V0LmNsb3Nlc3QoJ2RpdltjbGFzcz1cInRhc2stZGF0ZS1idG5zXCJdJykgJiYgZS50YXJnZXQuY2xhc3NOYW1lICE9PSAnZmFzIGZhLWVkaXQnKSB7XG4gICAgICAgICAgICAvL3N0cmlrZXMgdGhydSB0aGUgbmFtZSBvZiB0aGUgdGFzayBhbmQgdGhlIGR1ZSBkYXRlIGlmIGVpdGhlciBvbmUgY2xpY2tlZCBvblxuICAgICAgICAgICAgY29uc3QgdGFza1RhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2RpdltjbGFzcz1cInRhc2stZGF0ZS1idG5zXCJdJykuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICBjb25zdCBkYXRlVGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnZGl2W2NsYXNzPVwidGFzay1kYXRlLWJ0bnNcIl0nKS5jaGlsZHJlblsxXS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3RyaWtldGhydVRhc2sodGFza1RhcmdldCwgZGF0ZVRhcmdldCk7XG4gICAgICAgIH0gZWxzZSBpZihlLnRhcmdldC5jbG9zZXN0KCdpJykpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2knKTtcbiAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25ldy1saXN0LWNhbmNlbC1idG4nKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25ldy1saXN0LXN1Ym1pdC1idG4nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RUZXh0SW5wdXQgPSB0YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3ROYW1lID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5ld0xpc3RTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCwgbGlzdE5hbWUsIGxpc3RUZXh0SW5wdXQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2VkaXQtbGlzdC1pY29uJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdExpc3RJY29uSGFuZGxlcihsaXN0TmFtZSwgbGlzdEl0ZW0pOyBcbiAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdlZGl0LWxpc3Qtc3VibWl0LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgLyogdGhpcyBidG4gaXMgaWRlbnRpY2FsIHRvIHRoZSAnbmV3LWxpc3Qtc3VibWl0LWJ0bicsIGJ1dCBcbiAgICAgICAgICAgICAgICBzdWJzdGl0dXRlcyBpdCB3aGVuIGFuIGV4aXN0aW5nIGxpc3QgaXMgY3VycmVudGx5IGJlaW5nIGVkaXRlZCAqL1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRJbnB1dCA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdOYW1lID0gdGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucHJldmlvdXNFbGVtZW50U2libGluZy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmKG5ld05hbWUgPT09IHRoaXMub2xkTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgdGV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdExpc3RTdWJtaXRCdG5IYW5kbGVyKG5ld05hbWUsIHRleHRJbnB1dCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1saXN0LWNhbmNlbC1idG4nKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdEN1cnJlbnRseUJlaW5nRWRpdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJMaXN0cygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdmYXIgZmEtdHJhc2gtYWx0IGxpc3QnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVMaXN0KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoZS50YXJnZXQuY2xvc2VzdCgnYnV0dG9uLCBsaScpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnYnV0dG9uLCBsaScpO1xuICAgICAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdtZW51LWJ0bicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudUJ0bkhhbmRsZXIobWVudSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdlZGl0LXRhc2stYnRuJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrRWRpdG9yID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrSWQgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pZDsgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrRWRpdG9yKHRhc2tFZGl0b3IsIHRhc2tJZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdlZGl0LXRhc2stc3VibWl0LWJ0bicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0VGFza1N1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ25ldy10YXNrLWJ0bicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VGFza0VkaXRvciA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAndGFzay1kZWxldGUtYnRuJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2tEZWxldGVCdG5IYW5kbGVyKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdjYW5jZWwtbmV3LXRhc2stYnRuJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrRWRpdG9yID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtbGlzdC1idG4nKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZExpc3RCdG5IYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJ2J1dHRvbiwgbGknKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICduZXctdGFzay1idG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VGFza0VkaXRvciA9IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtbGlzdC1idG4nKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZExpc3RCdG5IYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICdsaXN0IG1lbnUtYnRuJyAmJiAhdGFyZ2V0LmNoaWxkcmVuWzFdLm1hdGNoZXMoJ2lucHV0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlzdE5hbWUgPSB0YXJnZXQuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hMaXN0KGxpc3ROYW1lKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUtYnRuIGFsbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrQ3VycmVudGx5QmVpbmdFZGl0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Q3VycmVudGx5QmVpbmdFZGl0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbWVudS1idG4gdG9kYXknKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld09ubHlUb2RheSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnbWVudS1idG4gd2VlaycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3T25seVdlZWsoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2VkaXQtdGFzay1zdWJtaXQtYnRuJykge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdFRhc2tTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRhcmdldC5jbGFzc05hbWUgPT09ICd0YXNrLWRlbGV0ZS1idG4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrRGVsZXRlQnRuSGFuZGxlcih0YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0YXJnZXQuY2xhc3NOYW1lID09PSAnY2FuY2VsLW5ldy10YXNrLWJ0bicpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrRWRpdG9yID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVTdHJpa2V0aHJ1VGFzayh0YXNrVGFyZ2V0LCBkYXRlVGFyZ2V0KSB7XG4gICAgICAgIHRhc2tUYXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnc3RyaWtldGhydScpO1xuICAgICAgICBkYXRlVGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3N0cmlrZXRocnUnKTtcbiAgICB9XG5cbiAgICB2aWV3T25seVdlZWsoKSB7XG4gICAgICAgIHRoaXMudGFza0N1cnJlbnRseUJlaW5nRWRpdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGlzdEN1cnJlbnRseUJlaW5nRWRpdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHVsRm9yVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlLXRhc2staXRlbXMnKTtcbiAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgY29uc3QgdGFza3NPZldlZWsgPSBPYmplY3QudmFsdWVzKGN1cnJlbnRMaXN0LnRhc2tzKS5maWx0ZXIodGFzayA9PiB7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlT2JqID0gbmV3IERhdGUodGFzay5kdWVEYXRlKTtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhEYXRlLm5vdygpIC0gZHVlRGF0ZU9iaikgPD0gNi4wNDhlOCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZvciAoY29uc3QgdGFzayBvZiB0YXNrc09mV2Vlaykge1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9IHRoaXMuY3JlYXRlVGFza0hUTUwodGFzay50YXNrSWQsIHRhc2submFtZSwgdGFzay5kdWVEYXRlKTtcbiAgICAgICAgICAgIHVsRm9yVGFza3MuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVUYXNrSFRNTCh0YXNrSWQsIG5hbWUsIGR1ZURhdGUpIHtcbiAgICAgICAgY29uc3QgaHRtbCA9IGA8bGkgY2xhc3M9XCJ0b2RvLWl0ZW1cIiBkYXRhLWlkPVwiJHt0YXNrSWR9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrLWRhdGUtYnRuc1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YXNrXCI+JHtuYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRlLWFuZC1idG5zXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkdWUtZGF0ZVwiPiR7dGhpcy5jcmVhdGVSZWFkYWJsZURhdGUoZHVlRGF0ZSl9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LXRhc2stYnRuXCI+PGkgY2xhc3M9XCJmYXMgZmEtZWRpdFwiPjwvaT48L2J1dHRvbj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0YXNrLWVkaXRvciBoaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gYWN0aW9uPVwiXCIgbWV0aG9kPVwiZ2V0XCIgY2xhc3M9XCJ0YXNrLWVkaXRvci1mb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJ0YXNrLWZpZWxkXCIgbmFtZT1cInRhc2tcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiVGFza1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJkZXNjcmlwdGlvbi1maWVsZFwiIG5hbWU9XCJkZXNjcmlwdGlvblwiIHBsYWNlaG9sZGVyPVwiRGV0YWlsc1wiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0ZXBpY2tlci1hZGRidXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJkYXRlLXBpY2tlclwiIG5hbWU9XCJkdWUtZGF0ZVwiIHR5cGU9XCJkYXRlXCIgcmVxdWlyZWQgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidGFzay1kZWxldGUtYnRuXCI+PGkgY2xhc3M9XCJmYXIgZmEtdHJhc2gtYWx0XCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LXRhc2stc3VibWl0LWJ0blwiPjxpIGNsYXNzPVwiZmFyIGZhLWNoZWNrLWNpcmNsZVwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2xpPmA7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgIH1cblxuICAgIHZpZXdPbmx5VG9kYXkoKSB7XG4gICAgICAgIHRoaXMudGFza0N1cnJlbnRseUJlaW5nRWRpdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGlzdEN1cnJlbnRseUJlaW5nRWRpdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHVsRm9yVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlLXRhc2staXRlbXMnKTtcbiAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgY29uc3QgdGFza3NPZlRvZGF5ID0gT2JqZWN0LnZhbHVlcyhjdXJyZW50TGlzdC50YXNrcykuZmlsdGVyKHRhc2sgPT4ge1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZU9iaiA9IG5ldyBEYXRlKHRhc2suZHVlRGF0ZSk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlRGF5ID0gZHVlRGF0ZU9iai5nZXRVVENEYXRlKCk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlTW9udGggPSBkdWVEYXRlT2JqLmdldFVUQ01vbnRoKCk7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlWWVhciA9IGR1ZURhdGVPYmouZ2V0VVRDRnVsbFllYXIoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXkgPSBuZXcgRGF0ZSgpLmdldFVUQ0RhdGUoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNb250aCA9IG5ldyBEYXRlKCkuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRVVENGdWxsWWVhcigpO1xuICAgICAgICAgICAgaWYgKGR1ZURhdGVEYXkgPT09IGN1cnJlbnREYXkgJiYgZHVlRGF0ZU1vbnRoID09PSBjdXJyZW50TW9udGggJiYgZHVlRGF0ZVllYXIgPT09IGN1cnJlbnRZZWFyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIHRhc2tzT2ZUb2RheSkge1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9IHRoaXMuY3JlYXRlVGFza0hUTUwodGFzay50YXNrSWQsIHRhc2submFtZSwgdGFzay5kdWVEYXRlKTtcbiAgICAgICAgICAgIHVsRm9yVGFza3MuaW5uZXJIVE1MICs9IGh0bWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVDb2x1bW5OYW1lKCkge1xuICAgICAgICBjb25zdCBjb2x1bW5OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QtY29sdW1uLW5hbWUnKTtcbiAgICAgICAgY29sdW1uTmFtZS50ZXh0Q29udGVudCA9IGN1cnJlbnRMaXN0Lm5hbWU7XG4gICAgfVxuXG4gICAgZGVsZXRlTGlzdCgpIHtcbiAgICAgICAgdGhpcy5saXN0Q3VycmVudGx5QmVpbmdFZGl0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50YXNrQ3VycmVudGx5QmVpbmdFZGl0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgcmVhbGx5RGVsZXRlID0gY29uZmlybShgQXJlIHlvdSBzdXJlIHRoYXQgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSAke3RoaXMub2xkTmFtZX0gbGlzdCBhbmQgYWxsIGFzc29jaWF0ZWQgdGFza3M/YCk7XG4gICAgICAgIGlmKHJlYWxseURlbGV0ZSkge1xuICAgICAgICAgICAgaWYoT2JqZWN0LmtleXMobGlzdHMpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBsb2dpYy5kZWxldGVMaXN0KHRoaXMub2xkTmFtZSk7XG4gICAgICAgICAgICAgICAgbG9naWMuc2V0Q3VycmVudExpc3RUb0JlT25lT2ZUaGVSZW1haW5pbmdMaXN0cygpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb2x1bW5OYW1lKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdVbmFibGUgdG8gZGVsZXRlIHlvdXIgb25seSBsaXN0IScpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVkaXRMaXN0U3VibWl0QnRuSGFuZGxlcihuZXdOYW1lLCB0ZXh0SW5wdXQpIHtcbiAgICAgICAgaWYobmV3TmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIC8vIGRvbid0IGFsbG93IHVzZXIgdG8gc2F2ZSBsaXN0IHdpdGhvdXQgbmFtZVxuICAgICAgICAgICAgdGV4dElucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0Q3VycmVudGx5QmVpbmdFZGl0ZWQgPSBmYWxzZTtcbiAgICAgICAgbG9naWMubW9kaWZ5TGlzdE5hbWUodGhpcy5vbGROYW1lLCBuZXdOYW1lKTtcbiAgICAgICAgdGhpcy5yZW5kZXJMaXN0cygpO1xuICAgICAgICB0aGlzLnN3aXRjaExpc3QobmV3TmFtZSk7XG4gICAgfVxuXG4gICAgZWRpdExpc3RJY29uSGFuZGxlcihsaXN0TmFtZSwgbGlzdEl0ZW0pIHtcbiAgICAgICAgLyogaWYgYW5vdGhlciBsaXN0IGlzIGJlaW5nIGVkaXRlZCwgd29uJ3QgYWxsb3cgYW5vdGhlciB0byBiZSBlZGl0ZWRcbiAgICAgICAgdW50aWwgdGhlIGZpcnN0IG9uZSBpcyBmaW5pc2hlZCAqL1xuICAgICAgICBpZiAodGhpcy5saXN0Q3VycmVudGx5QmVpbmdFZGl0ZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5saXN0Q3VycmVudGx5QmVpbmdFZGl0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLm9sZE5hbWUgPSBsaXN0TmFtZTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGA8aSBjbGFzcz1cImZhcyBmYS1saXN0LWFsdFwiPjwvaT48aW5wdXQgY2xhc3M9XCJuZXctbGlzdC10ZXh0LWlucHV0XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7bGlzdE5hbWV9XCIgLz48aSBjbGFzcz1cImZhciBmYS10cmFzaC1hbHQgbGlzdFwiPjwvaT48aSBjbGFzcz1cImZhciBmYS10aW1lcy1jaXJjbGUgZWRpdC1saXN0LWNhbmNlbC1idG5cIj48L2k+PGkgY2xhc3M9XCJmYXIgZmEtY2hlY2stY2lyY2xlIGVkaXQtbGlzdC1zdWJtaXQtYnRuXCI+PC9pPmA7XG4gICAgICAgIGxpc3RJdGVtLmlubmVySFRNTCA9IGh0bWw7XG4gICAgfVxuXG4gICAgc3dpdGNoTGlzdChsaXN0TmFtZSkge1xuICAgICAgICB0aGlzLnRhc2tDdXJyZW50bHlCZWluZ0VkaXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxpc3RDdXJyZW50bHlCZWluZ0VkaXRlZCA9IGZhbHNlO1xuICAgICAgICBsb2dpYy5tYWtlQ3VycmVudExpc3QobGlzdE5hbWUpO1xuICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgIGNvbnN0IGNvbHVtbk5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1jb2x1bW4tbmFtZScpO1xuICAgICAgICBjb2x1bW5OYW1lLnRleHRDb250ZW50ID0gbGlzdE5hbWU7XG4gICAgfVxuXG4gICAgbmV3TGlzdFN1Ym1pdEJ0bkhhbmRsZXIodGFyZ2V0LCBsaXN0TmFtZSwgbGlzdFRleHRJbnB1dCkge1xuICAgICAgICBpZihsaXN0TmFtZSA9PT0gJycpIHtcbiAgICAgICAgICAgIC8vIGRvbid0IGFsbG93IHVzZXIgdG8gc2F2ZSBsaXN0IHdpdGhvdXQgbmFtZVxuICAgICAgICAgICAgbGlzdFRleHRJbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxvZ2ljLmNyZWF0ZU5ld0xpc3QobGlzdE5hbWUpO1xuICAgICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJMaXN0cygpO1xuICAgICAgICB0aGlzLnN3aXRjaExpc3QobGlzdE5hbWUpO1xuICAgIH1cblxuICAgIHJlbmRlckxpc3RzKCkge1xuICAgICAgICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51bC1saXN0LW9mLWxpc3RzJyk7XG4gICAgICAgIGxldCBodG1sID0gJyc7XG4gICAgICAgIGNvbnN0IHNvcnRlZExpc3RzID0gT2JqZWN0LnZhbHVlcyhsaXN0cykuc29ydCgobGlzdDEsIGxpc3QyKSA9PiB7XG4gICAgICAgICAgICBpZihsaXN0MS5pZCA+IGxpc3QyLmlkKSByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmIChsaXN0MS5pZCA9PT0gbGlzdDIuaWQpIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKGxpc3QxLmlkIDwgbGlzdDIuaWQpIHJldHVybiAtMTtcbiAgICAgICAgfSk7IFxuICAgICAgICBmb3IgKGNvbnN0IGxpc3Qgb2Ygc29ydGVkTGlzdHMpIHtcbiAgICAgICAgICAgIGh0bWwgKz0gYDxsaSBjbGFzcz1cImxpc3QgbWVudS1idG5cIj48aSBjbGFzcz1cImZhcyBmYS1saXN0LWFsdFwiPjwvaT4ke2xpc3QubmFtZX08c3BhbiBjbGFzcz1cImVkaXQtbGlzdC1pY29uXCI+PGkgY2xhc3M9XCJmYXMgZmEtZWRpdCBlZGl0LWxpc3QtaWNvblwiPjwvaT48L3NwYW4+PC9saT5gO1xuICAgICAgICB9XG4gICAgICAgIHVsLmlubmVySFRNTCA9IGh0bWw7XG4gICAgfVxuXG4gICAgbWVudUJ0bkhhbmRsZXIobWVudSkge1xuICAgICAgICBpZih3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShtZW51KS5kaXNwbGF5ID09PSAnbm9uZScpe1xuICAgICAgICAgICAgbWVudS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIG1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICBhZGRMaXN0QnRuSGFuZGxlcigpIHtcbiAgICAgICAgY29uc3QgdWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudWwtbGlzdC1vZi1saXN0cycpO1xuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2xpc3QnLCAnbWVudS1idG4nKTtcbiAgICAgICAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgaS5jbGFzc0xpc3QuYWRkKCdmYXMnLCAnZmEtbGlzdC1hbHQnKTtcbiAgICAgICAgbGkuYXBwZW5kKGkpO1xuICAgICAgICBjb25zdCB0ZXh0SW5wdXQgPSBgPGlucHV0IGNsYXNzPVwibmV3LWxpc3QtdGV4dC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgLz48aSBjbGFzcz1cImZhciBmYS10aW1lcy1jaXJjbGUgbmV3LWxpc3QtY2FuY2VsLWJ0blwiPjwvaT48aSBjbGFzcz1cImZhciBmYS1jaGVjay1jaXJjbGUgbmV3LWxpc3Qtc3VibWl0LWJ0blwiPjwvaT5gO1xuICAgICAgICBsaS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRleHRJbnB1dCk7XG4gICAgICAgIHVsLmFwcGVuZChsaSk7XG4gICAgfVxuXG4gICAgdGFza0RlbGV0ZUJ0bkhhbmRsZXIodGFyZ2V0KSB7XG4gICAgICAgIHRoaXMudGFza0N1cnJlbnRseUJlaW5nRWRpdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHRhc2tJZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaWQ7XG4gICAgICAgIGxvZ2ljLmRlbGV0ZVRhc2sodGFza0lkKTtcbiAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgIH1cblxuICAgIHJlbmRlclRhc2tFZGl0b3IodGFza0VkaXRvciwgdGFza0lkKSB7XG4gICAgICAgIC8vIGlmIGEgdGFzayBlZGl0b3Igd2luZG93IGlzIGFscmVhZHkgb3BlbiwgZG8gbm90aGluZyBcbiAgICAgICAgaWYodGhpcy50YXNrQ3VycmVudGx5QmVpbmdFZGl0ZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy50YXNrQ3VycmVudGx5QmVpbmdFZGl0ZWQgPSB0cnVlO1xuICAgICAgICB0YXNrRWRpdG9yLmNsYXNzTGlzdC50b2dnbGUoJ2hpZGRlbicpO1xuICAgICAgICBjb25zdCB0YXNrVGV4dElucHV0ID0gdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgY29uc3QgZGV0YWlsc1RleHRhcmVhID0gdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGNvbnN0IGRhdGVwaWNrZXIgPSB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLm5leHRFbGVtZW50U2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgXG4gICAgICAgIHRhc2tUZXh0SW5wdXQudmFsdWUgPSBjdXJyZW50TGlzdC50YXNrc1t0YXNrSWRdLm5hbWU7XG4gICAgIFxuICAgICAgICBkZXRhaWxzVGV4dGFyZWEudmFsdWUgPSBjdXJyZW50TGlzdC50YXNrc1t0YXNrSWRdLmRldGFpbHM7XG4gICAgICAgIGlmKGN1cnJlbnRMaXN0LnRhc2tzW3Rhc2tJZF0uZHVlRGF0ZSkge1xuICAgICAgICAgICAgZGF0ZXBpY2tlci52YWx1ZUFzTnVtYmVyID0gY3VycmVudExpc3QudGFza3NbdGFza0lkXS5kdWVEYXRlO1xuICAgICAgICB9ICAgXG4gICAgfVxuXG4gICAgZWRpdFRhc2tTdWJtaXRCdG5IYW5kbGVyKHRhcmdldCkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGFza05hbWUgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuWzBdLnZhbHVlO1xuICAgICAgICBjb25zdCBkZXRhaWxzID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsxXS52YWx1ZTtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMl0uZmlyc3RFbGVtZW50Q2hpbGQudmFsdWVBc0RhdGU7XG5cbiAgICAgICAgaWYoIXRoaXMuZHVlRGF0ZUlzVmFsaWQoZHVlRGF0ZSkpe1xuICAgICAgICAgICAgLy8gaWYgdGhlIGRhdGUgaXMgbm90IHZhbGlkLCBicmluZyB0aGUgZGF0ZSBwaWNrZXIgaW50byBmb2N1c1xuICAgICAgICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZHJlblsyXS5maXJzdEVsZW1lbnRDaGlsZC5mb2N1cygpO1xuICAgICAgICB9IGVsc2UgaWYoIXRhc2tOYW1lKSB7XG4gICAgICAgICAgICAvLyBkb24ndCBhbGxvdyB1c2VyIHRvIHNhdmUgdGFzayB3aXRob3V0IG5hbWVcbiAgICAgICAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bMF0uZm9jdXMoKTtcbiAgICAgICAgfSBlbHNlIGlmKHRhc2tOYW1lICYmIHRoaXMuZHVlRGF0ZUlzVmFsaWQoZHVlRGF0ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tFZGl0b3IgPSB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCB0YXNrSXNOZXcgPSAodGFza0VkaXRvci5jbGFzc05hbWUgPT09ICduZXctdGFzay1lZGl0b3InKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTsgLy93aWxsIHVzZSBjdXJyZW50VGltZSBhcyBhIHVuaXF1ZSBpZGVudGlmaWVyIGZvciBlYWNoIHRhc2tcblxuICAgICAgICAgICAgaWYodGFza0lzTmV3KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFzayA9IGxvZ2ljLmNyZWF0ZU5ld1Rhc2sodGFza05hbWUsIGR1ZURhdGUsIGRldGFpbHMsIGN1cnJlbnRUaW1lKTtcbiAgICAgICAgICAgICAgICBsb2dpYy5hZGRUYXNrVG9DdXJyZW50TGlzdCh0YXNrKTsgXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJUYXNrcygpO1xuICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB0YXNrRWRpdG9yLmZpcnN0RWxlbWVudENoaWxkLmNoaWxkcmVuWzFdLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgdGFza0VkaXRvci5maXJzdEVsZW1lbnRDaGlsZC5jaGlsZHJlblsyXS5maXJzdEVsZW1lbnRDaGlsZC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIHRhc2tFZGl0b3IuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoIXRhc2tJc05ldykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tJZCA9IHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaWQ7XG4gICAgICAgICAgICAgICAgbG9naWMubW9kaWZ5VGFzayh0YXNrTmFtZSwgZHVlRGF0ZSwgZGV0YWlscywgdGFza0lkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclRhc2tzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YXNrQ3VycmVudGx5QmVpbmdFZGl0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBkdWVEYXRlSXNWYWxpZChkdWVEYXRlVmFsdWVBc051bWJlcikge1xuICAgICAgICBpZihpc05hTihkdWVEYXRlVmFsdWVBc051bWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNhbmNlbE5ld1Rhc2tCdG5IYW5kbGVyKG5ld1Rhc2tFZGl0b3IpIHtcbiAgICAgICAgbmV3VGFza0VkaXRvci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBuZXdUYXNrQnRuSGFuZGxlcihuZXdUYXNrRWRpdG9yKSB7XG4gICAgICAgIG5ld1Rhc2tFZGl0b3IuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgcmVuZGVyVGFza3MoKSB7XG4gICAgICAgIGNvbnN0IHVsRm9yVGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGhlLXRhc2staXRlbXMnKTtcbiAgICAgICAgdWxGb3JUYXNrcy5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgaWYoY3VycmVudExpc3QgPT09IG51bGwpIHVsRm9yVGFza3MuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGZvciAoY29uc3QgdGFzayBvZiBPYmplY3QudmFsdWVzKGN1cnJlbnRMaXN0LnRhc2tzKSkge1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9IHRoaXMuY3JlYXRlVGFza0hUTUwodGFzay50YXNrSWQsIHRhc2submFtZSwgdGFzay5kdWVEYXRlKTsgXG4gICAgICAgICAgICB1bEZvclRhc2tzLmlubmVySFRNTCArPSBodG1sO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUmVhZGFibGVEYXRlKGRhdGVWYWx1ZUFzTnVtYmVyKSB7XG4gICAgICAgIC8vIGlmIHRoZSB1c2VyIGRpZG4ndCBwdXQgYSBkdWUgZGF0ZSwganVzdCByZXR1cm4gYW4gZW1wdHkgc3RyXG4gICAgICAgIGlmKGRhdGVWYWx1ZUFzTnVtYmVyID09PSBudWxsKSByZXR1cm4gJyc7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlVmFsdWVBc051bWJlcik7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gZGF0ZS5nZXRVVENNb250aCgpICsgMTtcbiAgICAgICAgY29uc3QgZGF5ID0gZGF0ZS5nZXRVVENEYXRlKCk7XG4gICAgICAgIGNvbnN0IHllYXIgPSBkYXRlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgICAgIHJldHVybiBgJHttb250aH0vJHtkYXl9LyR7eWVhcn1gO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRvbUNvbnRyb2xsZXIgPSBuZXcgRG9tQ29udHJvbGxlcigpO1xuXG5cblxuLy9pc3N1ZXMuICBjYW4ndCBnZXQgdGFzayBuYW1lIHRvIHdyYXAgYXQgNTAlOyIsImNsYXNzIExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGlkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudGFza3MgPSB7fTtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgTGlzdCB9OyIsImltcG9ydCB7VGFza30gZnJvbSAnLi9UYXNrJztcbmltcG9ydCB7TGlzdH0gZnJvbSAnLi9MaXN0JztcbmltcG9ydCB7IGRvbUNvbnRyb2xsZXIgfSBmcm9tICcuL0RvbUNvbnRyb2xsZXInO1xuXG5sZXQgY3VycmVudExpc3Q7XG5sZXQgbmV4dExpc3RJZCA9IDA7XG5cbmxldCBsaXN0cyA9IHt9O1xuXG5cbmNsYXNzIExvZ2ljIHtcbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBjcmVhdGVOZXdUYXNrKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMgPSBcIlwiLCB0YXNrSWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUYXNrKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMsIHRhc2tJZCk7XG4gICAgfVxuXG4gICAgYWRkVGFza1RvQ3VycmVudExpc3QodGFzaykge1xuICAgICAgICBjdXJyZW50TGlzdC50YXNrc1t0YXNrLnRhc2tJZF0gPSB0YXNrO1xuICAgIH1cblxuICAgIG1vZGlmeVRhc2sobmFtZSwgZHVlRGF0ZSwgZGV0YWlscyA9ICcnLCB0YXNrSWQpIHtcbiAgICAgICAgZm9yIChjb25zdCB0YXNrIG9mIE9iamVjdC52YWx1ZXMoY3VycmVudExpc3QudGFza3MpKSB7XG4gICAgICAgICAgICBpZih0YXNrLnRhc2tJZCA9PSB0YXNrSWQpIHtcbiAgICAgICAgICAgICAgICB0YXNrLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgICAgIHRhc2suZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgICAgICAgICAgdGFzay5kZXRhaWxzID0gZGV0YWlscztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlbGV0ZVRhc2sodGFzaykge1xuICAgICAgICBkZWxldGUgY3VycmVudExpc3QudGFza3NbdGFza107XG4gICAgfVxuXG4gICAgY3JlYXRlTmV3TGlzdChuYW1lKSB7XG4gICAgICAgIGNvbnN0IG5ld0xpc3QgPSBuZXcgTGlzdChuYW1lLCBuZXh0TGlzdElkKyspO1xuICAgICAgICBsaXN0c1tuYW1lXSA9IG5ld0xpc3Q7XG4gICAgfVxuXG4gICAgbW9kaWZ5TGlzdE5hbWUob2xkTmFtZSwgbmV3TmFtZSkge1xuICAgICAgICBsaXN0c1tuZXdOYW1lXSA9IGxpc3RzW29sZE5hbWVdO1xuICAgICAgICBkZWxldGUgbGlzdHNbb2xkTmFtZV07XG4gICAgICAgIGxpc3RzW25ld05hbWVdLm5hbWUgPSBuZXdOYW1lO1xuICAgIH1cblxuICAgIFxuICAgIHNldERlZmF1bHRMaXN0KCkge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMobGlzdHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3QgY2hvcmVzID0gbmV3IExpc3QoJ0Nob3JlcycsIG5leHRMaXN0SWQrKyk7XG4gICAgICAgICAgICBsaXN0cy5DaG9yZXMgPSBjaG9yZXM7XG4gICAgICAgICAgICB0aGlzLm1ha2VDdXJyZW50TGlzdCgnQ2hvcmVzJyk7XG4gICAgICAgIH0gXG4gICAgfVxuXG4gICAgbWFrZUN1cnJlbnRMaXN0KGxpc3ROYW1lKSB7XG4gICAgICAgIGN1cnJlbnRMaXN0ID0gbGlzdHNbbGlzdE5hbWVdO1xuICAgIH1cblxuICAgIHdyaXRlT3ZlckN1cnJlbnRMaXN0KGRhdGFGcm9tU3RvcmFnZSkge1xuICAgICAgICBjdXJyZW50TGlzdCA9IGRhdGFGcm9tU3RvcmFnZTtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50TGlzdFRvQmVPbmVPZlRoZVJlbWFpbmluZ0xpc3RzKCkge1xuICAgICAgICBjb25zdCBmaXJzdExpc3QgPSBPYmplY3Qua2V5cyhsaXN0cylbMF07XG4gICAgICAgIHRoaXMubWFrZUN1cnJlbnRMaXN0KGZpcnN0TGlzdCk7XG4gICAgfVxuXG4gICAgZGVsZXRlTGlzdChsaXN0TmFtZSkge1xuICAgICAgICBkZWxldGUgbGlzdHNbbGlzdE5hbWVdO1xuICAgIH1cblxuXG4gICBcbn1cblxuY29uc3QgbG9naWMgPSBuZXcgTG9naWMoKTtcblxuICAgIFxuXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbigpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVudExpc3QnLCBKU09OLnN0cmluZ2lmeShjdXJyZW50TGlzdCkpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0cycsIEpTT04uc3RyaW5naWZ5KGxpc3RzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25leHRMaXN0SWQnLCBKU09OLnN0cmluZ2lmeShuZXh0TGlzdElkKSk7XG59KVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgaWYoT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhlcmVzIHN0dWZmIGluIGxvY2FsIHN0b3JhZ2UnKTtcbiAgICAgICAgICAgIGxvZ2ljLndyaXRlT3ZlckN1cnJlbnRMaXN0KEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2N1cnJlbnRMaXN0JykpKTtcbiAgICAgICAgICAgIGxpc3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlzdHMnKSk7XG4gICAgICAgICAgICBuZXh0TGlzdElkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmV4dExpc3RJZCcpKTtcbiAgICAgICAgICAgIGRvbUNvbnRyb2xsZXIucmVuZGVyTGlzdHMoKTtcbiAgICAgICAgICAgIGRvbUNvbnRyb2xsZXIucmVuZGVyVGFza3MoKTtcbiAgICAgICAgICAgIGRvbUNvbnRyb2xsZXIudXBkYXRlQ29sdW1uTmFtZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdub3RoaW5nIGluIGxvY2FsIHN0b3JhZ2UnKTtcbiAgICAgICAgbG9naWMuc2V0RGVmYXVsdExpc3QoKTtcbiAgICB9XG59KVxuXG5cbmV4cG9ydCB7Y3VycmVudExpc3QsIGxpc3RzLCBsb2dpYywgbmV4dExpc3RJZH07XG4iLCJjbGFzcyBUYXNrIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGR1ZURhdGUsIGRldGFpbHMgPSBcIlwiLCB0YXNrSWQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgICAgICAgdGhpcy50YXNrSWQgPSB0YXNrSWQ7XG4gICAgfVxuXG5cblxufVxuXG5leHBvcnQgeyBUYXNrIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2RvbUNvbnRyb2xsZXJ9IGZyb20gJy4vbW9kdWxlcy9Eb21Db250cm9sbGVyJztcblxuXG5cblxuXG5cbmRvbUNvbnRyb2xsZXIuaW5pdGlhbGl6ZUNsaWNrRXZlbnRMaXN0ZW5lcnMoKTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=