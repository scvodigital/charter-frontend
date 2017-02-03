import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AppService } from '../../../services/app.service';

@Component({
    selector: 'main-container.content',
    templateUrl: './skillup-detail.component.html'
})
export class SkillUpDetailComponent {
    public number: number;
    public title: string;
    public content_organisations: string;
    public content_individuals: string;
    public content_safety: string;

    constructor (router: Router) {
        router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                if (event.url == '/skill-up/managing-info') {
                    this.number = 1;
                    this.title = 'Managing Info';
                    this.content_organisations = 'Managing Info - organisations content';
                    this.content_individuals = 'Managing Info - individuals content';
                    this.content_safety = 'Managing Info - safety & security content';

                } else if (event.url == '/skill-up/communicating') {
                    this.number = 2;
                    this.title = 'Communicating';
                    this.content_organisations = 'Communicating - organisations content';
                    this.content_individuals = 'Communicating - individuals content';
                    this.content_safety = 'Communicating - safety & security content';

                } else if (event.url == '/skill-up/transacting') {
                    this.number = 3;
                    this.title = 'Transacting';
                    this.content_organisations = 'Transacting - organisations content';
                    this.content_individuals = 'Transacting - individuals content';
                    this.content_safety = 'Transacting - safety & security content';

                } else if (event.url == '/skill-up/problem-solving') {
                    this.number = 4;
                    this.title = 'Problem Solving';
                    this.content_organisations = 'Problem Solving - organisations content';
                    this.content_individuals = 'Problem Solving - individuals content';
                    this.content_safety = 'Problem Solving - safety & security content';

                } else if (event.url == '/skill-up/creating') {
                    this.number = 5;
                    this.title = 'Creating';
                    this.content_organisations = 'Creating - organisations content';
                    this.content_individuals = 'Creating - individuals content';
                    this.content_safety = 'Creating - safety & security content';
                }
            }
        });
    }
}
