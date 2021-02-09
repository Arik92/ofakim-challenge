import { Component, OnInit, Input } from '@angular/core';
import { TodoService, ToDo } from '../todo.service';
@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css']
})
export class TodoCardComponent implements OnInit {
  @Input() task: ToDo;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  markAsDone() {
    this.todoService.markAsDone(this.task.id);
  }

  markAsPending() {
    this.todoService.markAsPending(this.task.id);
  }

}
