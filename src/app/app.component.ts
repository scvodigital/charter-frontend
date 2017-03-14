import { Component, Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { AngularFire, FirebaseListObservable, AngularFireAuth, AuthProviders, AuthMethods } from 'angularfire2';

import { AppService } from './services/app.service';

import { MenuComponent } from './components/menu/menu.component';

declare var Headroom: any;
declare var jQuery: any;

@Component({
    selector: 'charter',
    templateUrl: './app.component.html'
})
export class AppComponent {
    appRoutes: string[][];
    date = new Date();
    showCurrentlyRecruiting: boolean;
    contentType: string;

    constructor(private router: Router, private route: ActivatedRoute, private titleService: Title, private angularFire: AngularFire, private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics, private appService: AppService) {
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                // Scroll to top on new route
                window.scrollTo(0, 0);

                // Get page title from Title Service (not yet written)
                this.setTitle("Scotland's Digital Participation Charter ");
                this.slideout();

                if (event.url === '/') {
                    this.contentType = 'primary-gradient';
                } else if (event.url.startsWith('/sign-up')) {
                    if (event.url === '/sign-up') {
                        this.contentType = 'signup-gradient';
                    } else {
                        this.contentType = 'signup-gradient';
                    }
                } else if (event.url.startsWith('/skill-up')) {
                    if (event.url === '/skill-up') {
                        this.contentType = 'skills-gradient';
                    } else {
                        this.contentType = 'detail';
                    }
                } else if (event.url.startsWith('/the-charter')) {
                    this.contentType = 'charter-gradient';
                } else if (event.url.startsWith('/stories')) {
                    if (event.url === '/stories') {
                        this.contentType = 'charter';
                    } else {
                        this.contentType = 'detail';
                    }
                } else if (event.url.startsWith('/resources')) {
                    this.contentType = 'other';
                } else if (event.url.startsWith('/signatories')) {
                    if (event.url.startsWith('/signatories/')) {
                        this.contentType = 'other';
                    } else {
                        this.contentType = 'other-gradient';
                    }
                } else if (event.url.startsWith('/login')) {
                    this.contentType = 'signup-gradient';
                } else {
                    this.contentType = 'primary';
                }
            }
        });
    }

    ngOnInit() {}

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    // HACK! Having to do it this way because Materialize does not play well with
    // our menus. They constantly redraw when I init the sidenav using Materialize
    // and become unoperable. Can't find anyone online with this problem. Hopefully
    // it'll get fixed with an update or when we move over to 'material2' from the
    // Angular team
    public slidein(panel) {
        jQuery('#sidenav-overlay').fadeIn();
        jQuery('#mobile-' + panel).removeClass('slide-out').addClass('slide-in');
    }

    public slideout() {
        jQuery('#sidenav-overlay').fadeOut();
        jQuery('.side-panel').removeClass('slide-in').addClass('slide-out');
    }
}
