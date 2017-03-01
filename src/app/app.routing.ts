import { Routes } from '@angular/router';

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

export const rootRouterConfig: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'sign-up/form', component: SignUpFormComponent },
    { path: 'sign-up/complete', component: SignUpCompleteComponent },
    { path: 'skill-up', component: SkillUpComponent },
    { path: 'skill-up/:slug', component: SkillUpDetailComponent },
    { path: 'the-charter', component: CharterComponent },
    { path: 'stories', component: StoriesComponent },
    { path: 'stories/:slug', component: StoriesDetailComponent },
    { path: 'signatories', component: SignatoriesComponent },
    { path: 'signatories/:slug', component: SignatoriesDetailComponent },
    { path: 'resources', component: ResourcesComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'accessibility', component: AccessibilityComponent },
    { path: 'privacy-and-cookies', component: PrivacyComponent },
    { path: 'terms-and-conditions', component: TermsConditionsComponent },
    { path: '**', component: HomeComponent }
];
