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
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/content/home/home.component';
import { SignUpComponent } from './components/content/signup/signup.component';
import { SignUpCompleteComponent } from './components/content/signup/signup-complete.component';
import { SkillUpComponent } from './components/content/skillup/skillup.component';
import { SkillUpDetailComponent } from './components/content/skillup/skillup-detail.component';
import { CharterComponent } from './components/content/charter/charter.component';
import { CharterDetailComponent } from './components/content/charter/charter-detail.component';
import { ResourcesComponent } from './components/content/resources/resources.component';

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
    MenuComponent,
    SignUpComponent,
    SignUpCompleteComponent,
    SkillUpComponent,
    SkillUpDetailComponent,
    CharterComponent,
    CharterDetailComponent,
    ResourcesComponent,
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
