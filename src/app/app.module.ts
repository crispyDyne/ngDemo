import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StructureComponent } from './structure/structure.component';
import { NavBarComponent } from './structure/nav-bar/nav-bar.component';
import { WidgetAComponent } from './components/widget-a/widget-a.component';
import { WidgetBComponent } from './components/widget-b/widget-b.component';
import { LandingComponent } from './structure/landing/landing.component';

@NgModule({
  declarations: [
    AppComponent,
    StructureComponent,
    NavBarComponent,
    WidgetAComponent,
    WidgetBComponent,
    LandingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
