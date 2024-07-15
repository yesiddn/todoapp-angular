import { Component } from '@angular/core';
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

  // de esta forma las variables solo pueden ser accedidas desde la clase
  private email = 'my.mail@mail.com';
}
