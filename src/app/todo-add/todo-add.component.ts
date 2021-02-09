import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  validateDescription(description: string): string {
    const patt = new RegExp('[^ a-zA-Z0-9]'); // any character that is not a letter, a number or a whitespace. can be modified
    let msg = 'valid';
    
    if (description.localeCompare('') === 0) {
      msg = 'Please Enter A Description';
    } else if (patt.test(description)) {
      msg = 'Please Enter English characters and numbers only!';
    }
    return msg;
  }

  addToDo(form: NgForm) {
    const description = form.value.userName;
    const msg = this.validateDescription(description);
    if (msg.localeCompare('valid') === 0) {
      alert('Adding ToDo task! You can now see it under "new" filter in View ToDos');
      this.todoService.addToDo(description);
      this.router.navigate(['../todo-list'], {relativeTo: this.route});
    } else {
      alert(msg);
    }
  }
}
