import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal([
    'Instalar Angular CLI',
    'Crear nuevo proyecto',
    'Crear componentes',
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.tasks.update((tasks) => [...tasks, newTask]); // de esta forma se actualiza el valor de una señal -> update nos da como argumento el valor actual de la señal para que podamos modificarlo -> viene del patron No Mutar, Solo Crear Nuevos Estados
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }
}
