import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as fromTodo from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.sass']
})
export class TodoAddComponent implements OnInit {

  texInput: FormControl;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.texInput = new FormControl('', Validators.required);
  }

  agregarTodo() {
     if (this.texInput.invalid) {
          return;
     }

     const accion = new fromTodo.AgregarTodoAction( this.texInput.value );
     this.store.dispatch ( accion );
     this.texInput.setValue('');
  }

}
