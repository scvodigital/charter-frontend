import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { rootRouterConfig } from "./app.routing";

import { AngularFireModule } from 'angularfire2';
import { MaterializeDirective, MaterializeModule } from 'angular2-materialize';

/* Services */
import { AppService } from './services/app.service';

/* Components */
import { HomeComponent } from './components/home/home.component';
import { PageComponent } from './components/page/page.component';
import { MenuComponent } from './components/menu/menu.component';

/* Pipes */
import { MarkdownToHtmlPipe } from 'markdown-to-html-pipe';

/* Directives */

export const firebaseConfig = {
  apiKey: "AIzaSyDMb8TAHk494HqI19vXo1M49Gm_t5GNowg",
  authDomain: "digital-participation-charter.firebaseapp.com",
  databaseURL: "https://digital-participation-charter.firebaseio.com",
  storageBucket: "digital-participation-charter.appspot.com"
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageComponent,
    MenuComponent,
    MarkdownToHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule,
    MaterializeModule
  ],
  providers: [
    FormBuilder,
    Title,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
