import { Routes } from '@angular/router';

import { HomeComponent } from './components/content/home/home.component';
import { SignUpComponent } from './components/content/signup/signup.component';
import { SignUpCompleteComponent } from './components/content/signup/signup-complete.component';
import { SkillUpComponent } from './components/content/skillup/skillup.component';
import { SkillUpDetailComponent } from './components/content/skillup/skillup-detail.component';
import { CharterComponent } from './components/content/charter/charter.component';
import { CharterDetailComponent } from './components/content/charter/charter-detail.component';
import { SignatoriesComponent } from './components/content/signatories/signatories.component';
import { SignatoriesDetailComponent } from './components/content/signatories/signatories-detail.component';
import { ResourcesComponent } from './components/content/resources/resources.component';

export const rootRouterConfig: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'sign-up/complete', component: SignUpCompleteComponent },
    { path: 'skill-up', component: SkillUpComponent },
    { path: 'skill-up/:slug', component: SkillUpDetailComponent },
    { path: 'the-charter', component: CharterComponent },
    { path: 'the-charter/:slug', component: CharterDetailComponent },
    { path: 'signatories', component: SignatoriesComponent },
    { path: 'signatories/:slug', component: SignatoriesDetailComponent },
    { path: 'resources', component: ResourcesComponent },
    { path: '**', component: HomeComponent }
];
