import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PageComponent } from './components/page/page.component';
// import { SearchResultsComponent } from './components/search-results/search-results.component';
// import { LoginComponent } from './components/login/login.component';
// import { LogoutComponent } from './components/logout/logout.component';
// import { ProfileComponent } from './components/profile/profile.component';
// import { RegisterComponent } from './components/register/register.component';
// import { ShortlistComponent } from './components/shortlist/shortlist.component';
// import { ChangeCountryComponent } from './components/change-country/change-country.component';
// import { VacancyDetailsComponent } from './components/vacancy-details/vacancy-details.component';
// import { OrganisationsComponent } from './components/organisations/organisations.component';
// import { OrganisationComponent } from './components/organisation/organisation.component';
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
    // { path: 'search',                   component: SearchResultsComponent   },
    // { path: 'login',                    component: LoginComponent           },
    // { path: 'logout',                   component: LogoutComponent          },
    // { path: 'profile',                  component: ProfileComponent         },
    // { path: 'register',                 component: RegisterComponent        },
    // { path: 'shortlist',                component: ShortlistComponent       },
    // { path: 'change-country',           component: ChangeCountryComponent   },
    // { path: 'saved-searches',           component: ShortlistComponent       },
    // { path: 'vacancy/:slug',            component: VacancyDetailsComponent  },
    // { path: 'organisations',            component: OrganisationsComponent    },
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
