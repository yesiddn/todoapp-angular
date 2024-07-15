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
