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