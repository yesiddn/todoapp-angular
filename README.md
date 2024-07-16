# Todoapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Errors

### *ngFor directive not working

Si creaste el proyecto con angular y al momento de usar `*ngFor` no te lo reconoce, esta es la solución.

Sucede que en casos el proyecto se crea sin algunas importaciones como el de "CommonModule", solo agregar a tu archivo app.component.ts en la parte superior de los imports:

`import { CommonModule } from '@angular/common';`

Y en la seccion de decorador del `@Component`:

`imports : [RouterOutlet, CommonModule];`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Create components

```bash
ng g component folder/name-file
```

`g` is the abbreviation of `generate`.

For example, to create a home component:

```bash
ng g c pages/home
```

With `c` being the abbreviation of `component` and `pages/home` the path where the component will be created.

```bash
ng g c components/form --dry-run
```

Con el flag --dry-run te ejecuta el comando pero no crea el componente. Es útil cuando quieres verificar que la ruta donde se va a crear el componente sea correcta

## String interpolation

¿Qué puedes hacer con String Interpolation?
Puedes tener condiciones, como `{{ isDisabled ? 'Verdadero' : 'Falso' }}`
Ejecutar funciones, como `{{ saludar() }}`
Acceder a propiedades de objetos `{{ person.name }}`

## Property binding

Property binding es una forma de enlazar propiedades de un elemento HTML con propiedades de una clase de TypeScript. Se hace con corchetes `[]`.

Es la manera que dispone Angular para controlar y modificar las propiedades de los distintos elementos de HTML. Para esto, simplemente utiliza los corchetes [] para poder modificar dinámicamente ese atributo desde el controlador.

### Utilidades

- El atributo src de la etiqueta `<img>` para modificar dinámicamente una imagen.
- El atributo href de un `<a>` para modificar un enlace.
- El atributo value de un `<input>` para autocompletar un valor de un formulario.
- El atributo disable de un `<input>` para habilitar/deshabilitar un campo de un formulario.

## Event binding

Event binding te permite escuchar y responder las acciones del usuario, como pulsaciones de teclas, movimientos del ratón, clics y toques. Permite controlar los eventos que suceden en estos elementos. Por ejemplo, el clic de un botón, detectar cambios en un campo, el envío de un formulario, entre otros eventos. Para esto utiliza los paréntesis () para el bindeo de la propiedad del elemento.

- click: Se activa cuando se hace clic en un elemento. Por ejemplo: `<button (click)="onSave()">Guardar</button>`
- dblclick: Se activa cuando se hace doble clic en un elemento. Por ejemplo: `<div (dblclick)="onDoubleClick()">Haz doble clic aquí</div>`
- input: Se activa cuando se introduce texto en un campo de entrada (como un input o textarea). Útil para detectar cambios en el contenido. `<input (input)="onInput($event.target.value)" />`
- change: Se activa cuando cambia el valor de un elemento de entrada (por ejemplo, un select).

```html
<select (change)="onSelectionChange($event.target.value)">
  <option value="option1">Opción 1</option>
  <option value="option2">Opción 2</option>
</select>
```

- keydown: Se activa cuando se presiona una tecla. Puedes especificar la tecla o el código que deseas enlazar. Por ejemplo: `<input (keydown.enter)="onKeydown($event)" />`
- keyup: Similar a keydown, pero se activa cuando se suelta una tecla.
- mouseover: Se activa cuando el puntero del ratón entra en un elemento.
- mouseout: Similar a mouseover, pero se activa cuando el puntero del ratón sale de un elemento.
- mouseleave: Se activa cuando el puntero del ratón sale de un elemento. Similar a mouseout, pero no se propaga a los elementos secundarios. `<div (mouseleave)="onMouseLeave()">El ratón se fue</div>`
- focus: Se activa cuando un elemento obtiene el foco.
- blur: Similar a `focus`, pero se activa cuando un elemento pierde el foco.

## Signals: Reactive model

Angular Signals es un sistema que rastrea de forma granular cómo y dónde se usa su estado en una aplicación, lo que permite que el marco optimice las actualizaciones de renderizado.

¿Qué son las signals? Una signal es un envoltorio alrededor de un valor que notifica a los consumidores interesados ​​cuando ese valor cambia. Las signals pueden contener cualquier valor, desde primitivas simples hasta estructuras de datos complejas.

El valor de una signal se lee llamando a su función getter, que permite a Angular rastrear dónde se utiliza la signal.

Las signals pueden ser de escritura o de sólo lectura.

### Reactive forms

Los formularios reactivos son una forma de construir formularios en Angular utilizando programación reactiva.

Se importan los módulos `ReactiveFormsModule` y `FormsModule`.

```typescript
import { FormControl, ReactiveFormsModule } from '@angular/forms';
```

Usando `FormControl` se puede crear un control de formulario para un input.

```typescript
export class LabsComponent {
  colorCtrl = new FormControl();
}
```

```html
<input type="color" [formControl]="colorCtrl">
```

En el HTML se puede usar el valor del input asi:

```html
<p>Color: {{ colorCtrl.value }}</p>
```

Para acceder al valor desde la clase se puede hacer asi:

```typescript
export class LabsComponent {
  colorCtrl = new FormControl();

  constructor() {
    this.colorCtrl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
```

Siempre que se haya creado una subscripción a un formulario, hay que asegurarnos de destruir la subscripción cuando ya no se necesite; evitar memory leaks.

Fácilmente se podría guardar esa sub en una variabel de tipo Subscription. Y cuando se ejecute el ciclo de vida onDestroy, ejecutar una desuscripción

```typescript
export class LabsComponent implements OnDestroy {
  form = new FormControl();

  sub: Subscription | null = null;

  ngOnDestroy(): void {
    if (this.sub !== null) {
      this.sub.unsubscribe();
    }
  }

  constructor() {
    this.handleFormSubscription();
  }

  handleFormSubscription() {
    this.sub = this.form.valueChanges.subscribe(x => console.log(x))
  }

  name = signal('Daniel');
}
```
