import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  completionDate: Date;
  isNew: boolean;
};

@Injectable({
  providedIn: 'root'
})


export class TodoService {
  todoSubscription: BehaviorSubject<ToDo[]> = new BehaviorSubject([]);
  TodoCollection: ToDo[] = [];

  constructor() {
    this.fetchInitialTodos();
  }

  fetchInitialTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        this.TodoCollection = json;
        this.TodoCollection.map(todo => {
          todo.completionDate = new Date();
          todo.isNew = false;
        });
        this.todoSubscription.next(this.TodoCollection);
      });
  }

  getToDos(amount: number) {
    return this.TodoCollection.slice(0, amount);
  }

  addToDo(description: string): void {
    let newId = this.TodoCollection.length;
    newId++;
    const newToDo = {
      userId: 1, //default
      id: newId,
      title: description,
      completed: false,
      completionDate: null,
      isNew: true
    };
    this.TodoCollection.push(newToDo);
    this.todoSubscription.next(this.TodoCollection);
  }

  markAsDone(id: number): void {
    //TODO
    const taskIndex = this.findIndexById(id);
    this.TodoCollection[taskIndex].completed = true;
    this.TodoCollection[taskIndex].completionDate = new Date();
    this.todoSubscription.next(this.TodoCollection);
  }

  markAsPending(id: number): void {
    const taskIndex = this.findIndexById(id);
    this.TodoCollection[taskIndex].completed = false;
    this.TodoCollection[taskIndex].completionDate = null;
    this.todoSubscription.next(this.TodoCollection);
  }

  findIndexById(id: number): number {
    //find a task by id and return its array index. helper function
    for (let i = 0; i < this.TodoCollection.length; i++) {
      if (this.TodoCollection[i].id === id) {
        return i;
      }
    }
    return -1;
  }

}
