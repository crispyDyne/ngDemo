# NgDemo

A demonstration of how angular apps can be structured.

Assumes Node has already been installed, as well as the angular CLI.\
https://cli.angular.io/

## CLI commands to create components

### Create App

To create a new Angular app named "demoApp"\
`ng new demoApp`\
`cd demoApp`

This app can be run using ng serve and opening localhost:4200/ in a browser.

### Generate structure component

Generate a component named "structure". This will be the base of our app where we will display other components. \
`ng generate component structure`

This will create a "structure" folder in the src/app folder, and the files required for the component. The component has also been imported into the app.module.ts file.

Set the structure component as the starting point of our app, by placing its selector in the `app.component.html`

```html
<app-structure></app-structure>
```

### Generate landing page and navigation bar

Generate a landing and navBar components in the structure folder. Shorthands `g` and `c` are used in place of `generate` and `component`.\
`ng g c structure/landing`\
`ng g c structure/navBar`

Add the navbar to the `structure.component.html`. The router outlet is where our components will be displayed when we navigate to them. More on the router below.

```html
<app-nav-bar></app-nav-bar> <router-outlet></router-outlet>
```

### Generate components

Generate a few components to actually show some content.\
`ng g c components/widgetA`\
`ng g c components/widgetB`

### Configure Routing

The "routes" array in `src\app\app-routing.module.ts` maps a url path to a component.

```ts
const routes: Routes = [
  { path: '', component: LandingComponent }, // base route
  { path: 'widgetA', component: WidgetAComponent },
  { path: 'widgetB', component: WidgetBComponent },
];
```

Add buttons in `src\app\structure\nav-bar\nav-bar.component.html` and assign the desired link to the `routerLink` attribute.

```html
<button routerLink="/">Landing</button>
<button routerLink="/widgetA">widgetA</button>
<button routerLink="/widgetB">widgetB</button>
```

### Add a Service
Add a service for sharing data between components
`ng g s data`

Add some simple data to the data service here:
`src\app\data.service.ts`
```ts
  defaultData = [
    'First piece of default Data',
    'Second piece of default data'
    ];
```
### Behavior Subject
Create a private Behavior Subject and a public read only Observable that the components will to receive updated data.
```ts
  private _data: BehaviorSubject<string[]> = new BehaviorSubject(defaultData);
  public readonly data: Observable<string[]> = this._data.asObservable();
```
Create a method for updating the data. When this function is called, it will add the new data to the old data and emit the combined set for the components to display.
```ts
  addData(newData): void {
    const data = this._data.getValue(); // get current value
    // This triggers an update in the other components!!!
    this._data.next([...data, newData]); // update observable.
  }
```

Observables are useful for ensuring a one way flow of data, and dealing with asynchronous tasks. Instead of our components having direct access to the data in the service. They get an Observable that updates whenever the data is changed inside the service.

For more details, check out this [example service](https://blog.angular-university.io/how-to-build-angular2-apps-using-rxjs-observable-data-services-pitfalls-to-avoid/), or more about [RxJS in Angular](https://angular.io/guide/rx-library#naming-conventions-for-observables). 

Observables and asynchronous code is a bit confusing and is certainly overkill for this example, but once the app gets bigger, or have to wait on slow processes (fetching data or long running calculations) they become very important. Observables are not specific to Angular, but Angular is built to take advantage of them.



### Display service data in a component
Inject the data service into our components constructor. For example, in widgetA:
`src\app\components\widget-a\widget-a.component.ts`
```ts
constructor(private dataService: DataService) {}
ngOnInit(): void {
  this.data$ = this.dataService.data;
}
```

Now use this data in widgetA's html template:
`src\app\components\widget-a\widget-a.component.html`
```html
<p *ngFor="let element of data$ | async">{{ element + '!' }}</p>
```
There is a lot going on in this one line.

`data$ | async` this "async pipe" is some Angular magic that takes the Observable provides updated data to the for loop every time data is updated in the data service. It is a style convention to use a `$` do indicate an observable. 

 `*ngFor` is an Angular structural directive, meaning it modifies the structure of the html document. In this case, it is a for loop that loops through the `data` array and creates `<p>` tags filled with the arrays elements.

 The `{{ ... }}` syntax is specific to Angular, and allows us to write code in the `<p>` tag. In the case above, for each `element` in the `data$` array, which is a strings, add an exclamation point!

### Modify the service data in a component
Inject the data service into widgetB in the same way, but we also add an `inputText` property, and the method `addData` that add the inputText to the `data`.\
`src\app\components\widget-b\widget-b.component.ts`

Then add an input tag and button to widgetB's html template.\
`src\app\components\widget-b\widget-b.component.html`
```html
<div>
    <input type="text" [(ngModel)]="inputText" value="inputText" />
    <button (click)="addData()">Add to data service</button>
</div>

<hr />
<p>{{ inputText }}</p>
```
Again, there is a lot going on here:\
`[(ngModel)]="inputText"` creates a two way connection between the component variable `inputText` and the value displayed in the input field. If we change the text in the input field, it will change the component variable, and the other way around. This is "two way binding" in Angular jargon. To use this special syntax, we need to import the `FormsModule` in `src\app\app.module.ts`.

`value="inputText"` sets the initial value of the input field. This is normal html, not Angular specific.

`(click)="addData()"` binds the `addData()` method to the `click` output of the button. Meaning, when we click the button, the `addData` method will be called. This syntax is Angular specific.

`<p>{{ inputText }}</p>` is displaying the current value of the component property `inputText`. This demonstrates that the `inputText` is being update when the text input changes.
## Prettier (optional)

Automating code formatting in vscode.

Basically this article:\
https://medium.com/@victormejia/setting-up-prettier-in-an-angular-cli-project-2f50c3b9a537

`npm install prettier -D`

In `.vscode\settings.json` the set automatic formatting on save, and set the config file for prettier. Add any customization to the `.prettierrc` file. These files may need to be created manually.

```json
{
  "editor.formatOnSave": true,
  "prettier.configPath": ".prettierrc"
}
```

To format all files, run the command:\
 `npx prettier --write .`

## Recommended vsCode extensions
- Angular Language Service
- Code Spell Checker
- GitLens