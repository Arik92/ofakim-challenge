import { Component, OnInit } from '@angular/core';
import { TodoService, ToDo } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  todoList: ToDo[] = [];
  displayList: ToDo[] = [];

  displayOptions: number[] = [5, 10, 20, 50, 100, 200];
  filterOptions: string[] = ['All', 'Pending', 'Completed', 'New'];
  pendingFlag: boolean = false;
  completedFlag: boolean = false;
  newFlag: boolean = false;
  sliceIndex: number = this.displayOptions[0]; // number of todos to be displayed

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.todoSubscription.subscribe(newList => {
      this.todoList = newList;
      this.updateDisplay();
    });
  }

  updateDisplay() {
    if (this.pendingFlag) {// pending
      const pendingList = this.todoList.filter(todo => !todo.completed);
      this.displayList = pendingList.slice(0, this.sliceIndex);
    } else if (this.completedFlag) {// completed
      const completedList = this.todoList.filter(todo => todo.completed);
      this.displayList = completedList.slice(0, this.sliceIndex);
    } else if (this.newFlag) {// new
      const newList = this.todoList.filter(todo => todo.isNew);
      this.displayList = newList.slice(0, this.sliceIndex);
    }
    else {//all
      this.displayList = this.todoList.slice(0, this.sliceIndex);
    }

  }

  changeSliceIndex(amuont: number) {
    this.sliceIndex = amuont;
    this.updateDisplay();
  }

  changeFilter(mode) {
    switch (mode) {
      case this.filterOptions[0]: // all
        this.pendingFlag = false;
        this.completedFlag = false;
        this.newFlag = false;
        break;
      case this.filterOptions[1]: // pending
        this.pendingFlag = true;
        this.completedFlag = false;
        this.newFlag = false;
        break;
      case this.filterOptions[2]: // completed
        this.pendingFlag = false;
        this.completedFlag = true;
        this.newFlag = false;
        break;
      case this.filterOptions[3]: // new
        this.pendingFlag = false;
        this.completedFlag = false;
        this.newFlag = true;
        break;
      default: break;
    }
    this.updateDisplay();
  }

}
