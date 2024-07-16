import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  // typescript define estas variables como publicas por defecto y pueden ser accedidas desde el template (labs.component.html)
  welcome = 'Hola!';
  tasksOne = [
    'Instalar Angular CLI',
    'Crear nuevo proyecto',
    'Crear componentes',
  ];
  tasks = signal([
    'Instalar Angular CLI',
    'Crear nuevo proyecto',
    'Crear componentes',
  ]);
  name = 'Yesid';
  age = 19;
  img = 'https://w3schools.com/howto/img_avatar.png';
  person = {
    name: 'Yesid',
    age: 19,
    avatar: 'https://w3schools.com/howto/img_avatar.png',
  };
  country = signal('Colombia');
  anotherPerson = signal({
    name: 'Juan',
    age: 21,
    avatar: 'https://w3schools.com/howto/img_avatar.png',
  });

  // formularios reactivos -> tiene una abstraccion de los signales
  colorCtrl = new FormControl();

  // tambien se puede acceder a los valores de los signales desde aqui
  constructor() {
    this.colorCtrl.valueChanges.subscribe((value) => {
      console.log(value);
      // ver README.md para mas informacion a tener en cuenta sobre la suscripcion a los signales
    });
  }

  clickHandler() {
    alert('Hola!');
  }

  changeHandler(event: Event) { // hay algunos eventos que pasan argumentos a las funciones
    console.log(event);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement; // se puede hacer un casting para acceder a las propiedades del elemento
    console.log(input.value);
  }

  changeCountry(event: Event) {
    const input = event.target as HTMLInputElement;
    const newCountry = input.value;
    this.country.set(newCountry); // esta es la mejor forma de cambiar el valor de una señal
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newAge = input.value;
    this.anotherPerson.update((prevState) => ({ ...prevState, age: parseInt(newAge) }));
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newName = input.value;
    this.anotherPerson.update((prevState) => ({ ...prevState, name: newName }));
  }

  // de esta forma las variables solo pueden ser accedidas desde la clase
  private email = 'my.mail@mail.com';
}
