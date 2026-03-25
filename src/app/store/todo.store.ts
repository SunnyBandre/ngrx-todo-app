import { Injectable, computed, signal } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoService } from '../core/services/todo.service';

@Injectable({ providedIn: 'root' })
export class TodoStore {
  private todosSignal = signal<Todo[]>([]);

  todos = computed(() => this.todosSignal());
  completedCount = computed(() => this.todos().filter((t) => t.completed).length);

  constructor(private todoService: TodoService) {
    this.loadTodos();
  }

  private loadTodos() {
    const data = this.todoService.getTodos();
    this.todosSignal.set(data);
  }

  private persist() {
    this.todoService.saveTodos(this.todosSignal());
  }

  addTodo(title: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    this.todosSignal.update((todos) => [...todos, newTodo]);
    this.persist();
  }

  toggleTodo(id: string) {
    this.todosSignal.update((todos) =>
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
    this.persist();
  }

  deleteTodo(id: string) {
    this.todosSignal.update((todos) => todos.filter((t) => t.id !== id));
    this.persist();
  }

  updateTodo(id: string, title: string) {
    this.todosSignal.update((todos) => todos.map((t) => (t.id === id ? { ...t, title } : t)));
    this.persist();
  }
}

//ng.getComponent(document.querySelector('app-todo')).store.todos()
