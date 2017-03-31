import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { rootRouterConfig } from "./app.routing";

import { AngularFireModule } from 'angularfire2';
import { MaterializeDirective, MaterializeModule } from 'angular2-materialize';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

/* Services */
import { AppService } from './services/app.service';
import { ElasticService } from './services/elastic.service';

/* Components */
import { AppComponent } from './app.component';
import { SiteComponent } from './common/base.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/content/static/home.component';
import { SignUpComponent } from './components/content/signup/signup.component';
import { SignUpFormComponent } from './components/content/signup/signup-form.component';
import { SignUpCompleteComponent } from './components/content/signup/signup-complete.component';
import { SkillUpComponent } from './components/content/skillup/skillup.component';
import { SkillUpDetailComponent } from './components/content/skillup/skillup-detail.component';
import { CharterComponent } from './components/content/static/charter.component';
import { StoriesComponent } from './components/content/stories/stories.component';
import { StoriesDetailComponent } from './components/content/stories/stories-detail.component';
import { SignatoriesComponent } from './components/content/signatories/signatories.component';
import { SignatoriesDetailComponent } from './components/content/signatories/signatories-detail.component';
import { ResourcesComponent } from './components/content/resources/resources.component';
import { ContactUsComponent } from './components/content/static/contact.component';
import { AccessibilityComponent } from './components/content/static/accessibility.component';
import { PrivacyComponent } from './components/content/static/privacy.component';
import { TermsConditionsComponent } from './components/content/static/terms.component';

/* Pipes */
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';
import { SlugifyPipe } from './pipes/slugify.pipe';

/* Directives */
// none

/* Firebase */
export const firebaseConfig = {
  apiKey: "AIzaSyDMb8TAHk494HqI19vXo1M49Gm_t5GNowg",
  authDomain: "digital-participation-charter.firebaseapp.com",
  databaseURL: "https://digital-participation-charter.firebaseio.com",
  storageBucket: "digital-participation-charter.appspot.com"
}

@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    HomeComponent,
    MenuComponent,
    SignUpComponent,
    SignUpFormComponent,
    SignUpCompleteComponent,
    SkillUpComponent,
    SkillUpDetailComponent,
    CharterComponent,
    StoriesComponent,
    StoriesDetailComponent,
    SignatoriesComponent,
    SignatoriesDetailComponent,
    ResourcesComponent,
    ContactUsComponent,
    AccessibilityComponent,
    PrivacyComponent,
    TermsConditionsComponent,
    SlugifyPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    ReactiveFormsModule,
    MarkdownToHtmlModule,
    MaterializeModule
  ],
  providers: [
    FormBuilder,
    Title,
    AppService,
    ElasticService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
