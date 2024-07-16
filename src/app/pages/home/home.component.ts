import { Component, computed, signal } from '@angular/core';
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

  // composite state o computed signals => es un estado que viene de la combinación de otros estados
  filter = signal<'all' | 'pending' | 'completed'>('all'); // entre los signos de menor y mayor se pone el tipo de dato que va a tener el estado, podria se string para que pueda tener cualquier valor o de esta forma para que solo pueda tener uno de los tres valores que se le pasan
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }); // de esta forma se crea un estado que depende de otros estados y cuando alguno de estos estados cambia (en este caso filter o tasks), se vuelve a ejecutar la función que se pasa como argumento a computed

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
      tasks.filter((task) => task.id !== index)
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

  updateEditingTaskMode(index: number) {
    // si la tarea ya está completada, no se puede editar
    if (this.tasks()[index].completed) return;

    this.tasks.update((tasks) =>
      tasks.map((task, position) =>
        position === index ? { ...task, editing: true } : { ...task, editing: false }
      )
    );
  }

  updateTaskTitle(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const newTitle = input.value;

    this.tasks.update((tasks) =>
      tasks.map((task, position) =>
        position === index ? { ...task, title: newTitle, editing: false } : task
      )
    );
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
