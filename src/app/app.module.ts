import { BrowserModule, Title } from '@angular/platform-browser';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { NgModule, Compiler } from '@angular/core';
import { JitCompiler } from '@angular/compiler';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { rootRouterConfig } from "./app.routing";

/* 3rd-Party Modules */
import { AngularFireModule } from "angularfire2";
import { MaterializeDirective, MaterializeModule } from 'angular2-materialize';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';

/* Services */
import { AppService } from './services/app.service';
import { ElasticService } from './services/elastic.service';

/* Components */
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
import { ResourcesSupportComponent } from './components/content/resources/resources-support.component';
import { ResourcesHelpOthersComponent } from './components/content/resources/resources-help-others.component';
import { ResourcesReportsComponent } from './components/content/resources/resources-reports.component';
import { ResourcesLogosComponent } from './components/content/resources/resources-logos.component';
import { ContactUsComponent } from './components/content/static/contact.component';
import { AccessibilityComponent } from './components/content/static/accessibility.component';
import { PrivacyComponent } from './components/content/static/privacy.component';
import { TermsConditionsComponent } from './components/content/static/terms.component';

/* Pipes */
import { SlugifyPipe } from './pipes/slugify.pipe';
import { AddHttpPipe } from './pipes/add-http.pipe';

/* Directives */
// none

/* Configuration */
import { firebaseConfig } from './configuration/firebase';

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
    ResourcesSupportComponent,
    ResourcesHelpOthersComponent,
    ResourcesReportsComponent,
    ResourcesLogosComponent,
    ContactUsComponent,
    AccessibilityComponent,
    PrivacyComponent,
    TermsConditionsComponent,
    SlugifyPipe,
    AddHttpPipe
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
