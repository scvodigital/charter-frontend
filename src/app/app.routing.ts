import { Routes } from '@angular/router';

import { HomeComponent } from './components/content/home/home.component';
import { SignUpComponent } from './components/content/signup/signup.component';
import { SignUpCompleteComponent } from './components/content/signup/signup-complete.component';
import { SkillUpComponent } from './components/content/skillup/skillup.component';
import { SkillUpDetailComponent } from './components/content/skillup/skillup-detail.component';
import { CharterComponent } from './components/content/charter/charter.component';
import { CharterDetailComponent } from './components/content/charter/charter-detail.component';
import { SignatoriesComponent } from './components/content/signatories/signatories.component';
import { SignatoryDetailComponent } from './components/content/signatories/signatory-detail.component';
import { ResourcesComponent } from './components/content/resources/resources.component';
//import { MenuEditorIndexComponent } from './admin/menu-editor/menu-editor-index.component';
//import { MenuEditorComponent } from './admin/menu-editor/menu-editor.component';
//import { PageEditorIndexComponent } from './admin/page-editor/page-editor-index.component';
//import { PageEditorComponent } from './admin/page-editor/page-editor.component';
//import { UserManagerComponent } from './admin/user-manager/user-manager.component';
//import { TranslationsComponent } from './admin/translations/translations.component';
//import { AdminComponent } from './admin/admin.component';
//import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

export const rootRouterConfig: Routes = [
    { path: '',                         component: HomeComponent,           pathMatch: 'full'   },
    { path: 'sign-up',                  component: SignUpComponent          },
    { path: 'sign-up/complete',         component: SignUpCompleteComponent  },
    { path: 'skill-up',                 component: SkillUpComponent         },
    { path: 'skill-up/:slug',           component: SkillUpDetailComponent   },
    { path: 'the-charter',              component: CharterComponent         },
    { path: 'the-charter/:slug',        component: CharterDetailComponent   },
    { path: 'signatories',              component: SignatoriesComponent     },
    { path: 'signatory/:slug',          component: SignatoryDetailComponent },
    { path: 'resources',                component: ResourcesComponent       },
    // { path: 'organisation/:slug',       component: OrganisationComponent    },
    // {
    //     path: 'admin',
    //     component: AdminComponent,
    //     children: [
    //         { path: '',                     component: AdminHomeComponent,      pathMatch: 'full'   },
    //         { path: 'menu-editor',          component: MenuEditorIndexComponent },
    //         { path: 'menu-editor/:id',      component: MenuEditorComponent      },
    //         { path: 'page-editor',          component: PageEditorIndexComponent },
    //         { path: 'page-editor/:id',      component: PageEditorComponent      },
    //         { path: 'user-manager',         component: UserManagerComponent     },
    //         { path: 'translations',         component: TranslationsComponent    }
    //     ]
    // },
    { path: '**',                       component: HomeComponent            }
];
