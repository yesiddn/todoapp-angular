import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  newTaskCtrl = new FormControl(
    '',
    // se puede pasar un array de validadores al FormControl
    {
      nonNullable: true,
      validators: [
        Validators.required,
        // hay muchos validadores que se pueden usar, como Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z]+$/), etc
      ],
    }
  ); // se inicializa el FormControl con un valor por defecto, en este caso un string vacio

  // antes del uso de FormControl con el signal binding
  // changeHandler(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const newTask = input.value;

  //   // se separan responsabilidades, por lo que esta linea de código se traslada a la función addTask
  //   // this.tasks.update((tasks) => [...tasks, newTask]); // de esta forma se actualiza el valor de una señal -> update nos da como argumento el valor actual de la señal para que podamos modificarlo -> viene del patron No Mutar, Solo Crear Nuevos Estados

  //   this.addTask(newTask);
  // }

  changeHandler(event: Event) {
    if (this.newTaskCtrl.valid && this.newTaskCtrl.value.trim() !== '') {
      const value = this.newTaskCtrl.value;
      this.addTask(value.trim());
      this.newTaskCtrl.setValue('');
    }
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
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
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
