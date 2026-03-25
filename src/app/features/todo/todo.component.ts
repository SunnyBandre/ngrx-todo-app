import { Component, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoStore } from '../../store/todo.store';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  title = '';
  editingId: string | null = null;
  editText = '';
  confirmDeleteId: string | null = null;

  constructor(public store: TodoStore) {
    effect(() => {
      console.log('Todos Changed:', this.store.todos());
    });
  }

  add() {
    if (!this.title.trim()) return;
    this.store.addTodo(this.title);
    this.title = '';
  }

  startEdit(todo: any) {
    this.editingId = todo.id;
    this.editText = todo.title;
  }

  saveEdit(id: string) {
    this.store.updateTodo(id, this.editText);
    this.editingId = null;
  }

  deleteTodo(id: string) {
    const confirmed = confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    this.store.deleteTodo(id);
  }
}
