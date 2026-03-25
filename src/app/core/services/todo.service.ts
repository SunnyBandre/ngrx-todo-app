import { Injectable } from '@angular/core';
import { Todo } from '../../models/todo.model';

const STORAGE_KEY = 'todos';

@Injectable({ providedIn: 'root' })
export class TodoService {
  getTodos(): Todo[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  saveTodos(todos: Todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}
