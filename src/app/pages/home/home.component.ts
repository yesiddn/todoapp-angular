import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // con la interface Task hacemos que tasks sea un array de objetos con las propiedades id, title y completed. En caso de que no se cumpla la interface, TypeScript nos mostrará un error
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Instalar Angular CLI',
      completed: false,
    },
    {
      id: Date.now() + 1,
      title: 'Crear nuevo proyecto',
      completed: false,
    },
    {
      id: Date.now() + 2,
      title: 'Crear componentes',
      completed: false,
    },
    // 'Instalar Angular CLI',
    // 'Crear nuevo proyecto',
    // 'Crear componentes',
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;

    // se separan responsabilidades, por lo que esta linea de código se traslada a la función addTask
    // this.tasks.update((tasks) => [...tasks, newTask]); // de esta forma se actualiza el valor de una señal -> update nos da como argumento el valor actual de la señal para que podamos modificarlo -> viene del patron No Mutar, Solo Crear Nuevos Estados

    this.addTask(newTask);
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  updateTask(index: number) {
    // de esta forma se puede cambiar el valor de una propiedad de un objeto dentro de un array sin mutar el estado
    this.tasks.update((tasks) =>
      tasks.map((task, position) =>
        position === index ? { ...task, completed: !task.completed } : task
      )
    );
  }
}
