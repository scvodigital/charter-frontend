import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PageComponent } from './components/page/page.component';
import { SignUpComponent } from './components/signup/signup.component';
import { SkillUpComponent } from './components/static/skillup.component';
import { CharterComponent } from './components/static/charter.component';
import { ResourcesComponent } from './components/resources/resources.component';
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
    { path: 'skill-up',                 component: SkillUpComponent         },
    { path: 'the-charter',              component: CharterComponent         },
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
    { path: '**',                       component: PageComponent            }
];
