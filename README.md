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

## Build

Para hacer un build de la aplicación, ejecutar el siguiente comando:

```bash
ng build
```

Pero con el proyecto como esta no generará un error:

```bash
Application bundle generation failed. [8.670 seconds]

▲ [WARNING] src/app/pages/home/home.component.css exceeded maximum budget. Budget 2.05 kB was not met by 2.93 kB with a total of 4.98 kB.


✘ [ERROR] src/app/pages/home/home.component.css exceeded maximum budget. Budget 4.10 kB was not met by 880 bytes with a total of 4.98 kB.
```

Esto se debe a las nuevas practicas de Angular, que ahora tiene un limite de tamaño para los archivos CSS, JS, etc.
Por ahora se omitira está practica ya que para solucionar esto se crean componentes mas pequeños y eso se verá más adelante.

Tambiés en el archivo `angular.json` se puede modificar el tamaño de los archivos permitidos, que es lo que se hará en este caso. En `"type": "anyComponentStyle"` se puede modificar el tamaño permitido en la propiedad `maximumWarning` y `maximumError`.

```json
"production": {
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kB",
      "maximumError": "1MB"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "2kB",
      "maximumError": "6kB" <--- Modificar estos valores
    }
  ],
  "outputHashing": "all"
},
```

> ❌ Esta es una mala practica, pero como estamos haciendo de forma consciente se puede hacer.

### Fix build directory

Si al hacer build de la aplicación se genero una carpeta `browser`, es decir `dist/todoapp/browser/` se puede hacer otra configuración en el archivo `angular.json` para que se genere en la carpeta `dist/todoapp/`.

- Paso 1:
Archivo de configuración `angular.json` cambiar la linea `"architect.build.builder"`:

```json
"builder": "@angular-devkit/build-angular:application",
```

Por la siguiente linea:

```json
"builder": "@angular-devkit/build-angular:browser",
```

Si se dan cuenta el objetivo es cambiar `:application` por `:browser`.

- Paso 2:
Cambiar de nombre la propiedad `"architect.builder.options.browser"` por `"architect.builder.options.main"` Dejare la comparativa: La linea verde es como debe quedar.
![Comparativa](https://static.platzi.com/media/user_upload/image-1f86dc4b-5e9a-446c-abb7-da147429764d.jpg)

> 💡Pd: la propiedad deleteOutputPath es opcional.

## Deploy in Firebase

Para hacer deploy de la aplicación en Firebase, primero se debe ingresar a la [consola de Firebase](https://console.firebase.google.com/?hl=es&pli=1) y crear un nuevo proyecto.

Luego, al ingresar al proyecto, se debe ir a la sección `Build` y seleccionar la opción `Hosting`.
Nos pedirá instalar Firebase CLI, para eso se debe ejecutar el siguiente comando:

```bash
npm install -g firebase-tools
```

Luego de instalar Firebase CLI, se debe ejecutar el siguiente comando para iniciar sesión en Firebase:

```bash
firebase login
```

Y otro comando para inicializar el proyecto:

```bash
firebase init
```

Nos pedirá seleccionar las opciones que queremos, en este caso seleccionaremos `Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys`.

```bash
 ( ) Firestore: Configure security rules and indexes files for Firestore
 ( ) Functions: Configure a Cloud Functions directory and its files
>( ) Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
 ( ) Hosting: Set up GitHub Action deploys
 ( ) Storage: Configure a security rules file for Cloud Storage
 ( ) Emulators: Set up local emulators for Firebase products
 ( ) Remote Config: Configure a template file for Remote Config
```

Pasaremos a seleccionar que tenemos un proyecto existente.

```bash
? Please select an option: (Use arrow keys)
> Use an existing project
  Create a new project
  Add Firebase to an existing Google Cloud Platform project
  Don't set up a default project
```

Seleccionaremos el proyecto que creamos en la consola de Firebase y dependerá de los proyectos que tengamos en Firebase.

```bash
? Select a default Firebase project for this directory: (Use arrow keys)
> mydayapp-codigo (mydayapp)
```

Luego seleccionaremos la carpeta donde se encuentra el build del proyecto de Angular.

```bash
? What do you want to use as your public directory? (public) dist/todoapp
```

Como es una single-page application, seleccionaremos `Yes`.

```bash
? Configure as a single-page app (rewrite all urls to /index.html)? (y/N) y
```

No queremos una configuración de GitHub, por lo que seleccionaremos `No`.

```bash
? Set up automatic builds and deploys with GitHub? (y/N) N
```

Y tampoco queremos sobrescribir el archivo `index.html` porque Angular ya lo genera.

```bash
? File dist/todoapp/index.html already exists. Overwrite? N
```

Como último paso haremos el deploy de la aplicación.

```bash
firebase deploy
```

Fibase nos dará una URL donde se encuentra la aplicación:
[mydayapp](https://mydayapp-f0e88.web.app)
