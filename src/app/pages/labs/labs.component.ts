import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  // typescript define estas variables como publicas por defecto y pueden ser accedidas desde el template (labs.component.html)
  welcome = 'Hola!';
  tasks = [
    'Instalar Angular CLI',
    'Crear nuevo proyecto',
    'Crear componentes',
  ];
  name = 'Yesid';
  age = 19;
  img = 'https://w3schools.com/howto/img_avatar.png';
  person = {
    name: 'Yesid',
    age: 19,
    avatar: 'https://w3schools.com/howto/img_avatar.png',
  };
  country = signal('Colombia');

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

  // de esta forma las variables solo pueden ser accedidas desde la clase
  private email = 'my.mail@mail.com';
}
