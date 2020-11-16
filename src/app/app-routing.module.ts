import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidgetAComponent } from './components/widget-a/widget-a.component';
import { WidgetBComponent } from './components/widget-b/widget-b.component';
import { LandingComponent } from './structure/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent }, // go to landing component if nothing is entered
  { path: 'widgetA', component: WidgetAComponent },
  { path: 'widgetB', component: WidgetBComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
