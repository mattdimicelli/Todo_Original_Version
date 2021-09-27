import {Task} from './Task';
import {List} from './List';
import { domController } from './DomController';

let currentList;
let nextListId = 0;

let lists = {};


class Logic {
    constructor() {}

    createNewTask(name, dueDate, details = "", taskId) {
        return new Task(name, dueDate, details, taskId);
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

    createNewList(name) {
        const newList = new List(name, nextListId++);
        lists[name] = newList;
    }

    modifyListName(oldName, newName) {
        lists[newName] = lists[oldName];
        delete lists[oldName];
        lists[newName].name = newName;
    }

    
    setDefaultList() {
        if (Object.keys(lists).length === 0) {
            const chores = new List('Chores', nextListId++);
            lists.Chores = chores;
            this.makeCurrentList('Chores');
        } 
    }

    makeCurrentList(listName) {
        currentList = lists[listName];
    }

    writeOverCurrentList(dataFromStorage) {
        currentList = dataFromStorage;
    }

    setCurrentListToBeOneOfTheRemainingLists() {
        const firstList = Object.keys(lists)[0];
        this.makeCurrentList(firstList);
    }

    deleteList(listName) {
        delete lists[listName];
    }


   
}

const logic = new Logic();

    


window.addEventListener('beforeunload', function() {
    localStorage.setItem('currentList', JSON.stringify(currentList));
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('nextListId', JSON.stringify(nextListId));
})

document.addEventListener('DOMContentLoaded', function() {
    if(Object.keys(localStorage).length > 0) {
            console.log('theres stuff in local storage');
            logic.writeOverCurrentList(JSON.parse(localStorage.getItem('currentList')));
            lists = JSON.parse(localStorage.getItem('lists'));
            nextListId = JSON.parse(localStorage.getItem('nextListId'));
            domController.renderLists();
            domController.renderTasks();
            domController.updateColumnName();
    } else {
        console.log('nothing in local storage');
        logic.setDefaultList();
    }
})


export {currentList, lists, logic, nextListId};
