import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './features/todo/todo.component';

@Component({
  selector: 'app-root',
  imports: [TodoComponent],
  template: '<app-todo></app-todo>',
  standalone: true,
})
export class App {
  protected readonly title = signal('ngrx-todo-app');
}
