import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';

import { Angulartics2GoogleAnalytics } from 'angulartics2';

import { AppService } from '../../services/app.service';
import { ElasticService, IHit, ISearchParameters } from '../../services/elastic.service';
import { ISignatory } from '../../services/elastic.service.signatory';

import { SiteComponent } from '../../common/base.component';
import { DocumentViewComponent, IViewEvent } from '../document-view/document-view.component';

@Component({
    selector: 'main-container.content',
    templateUrl: './signatories-detail.component.html'
})
export class SignatoriesDetailComponent extends SiteComponent {

    @ViewChild('signatoryElement') signatoryElement: DocumentViewComponent;

    viewEventHandler(event: IViewEvent) {}

    viewRedrawHandler() {}

    notFound: boolean = false;

    private signatoryDetails: ISignatory = null;
    public get signatory(): ISignatory {
        return this.signatoryDetails;
    }
    public set signatory(value: ISignatory) {
        this.signatoryDetails = value;
    }

    get url(): string {
        if (!this.signatory || !this.appService) {
            return location.href;
        } else {
            // Use current domain name rather than default so country TLD is used
            return 'https://' + location.hostname + '/signatories/' + this.signatory.slug;
        }
    }

    constructor (appService: AppService, private route: ActivatedRoute, private router: Router, private _location: Location, private ga: Angulartics2GoogleAnalytics) {
        super(appService);
        // router.events.forEach((event) => {
        //     if (event instanceof NavigationEnd) {
        //         var path = '/signatories/';
        //         if (event.url.startsWith(path)) {
        //             var slug = event.url.substr(path.length);
        //             var params;
        //
        //             this.appService.es.getSignatory(slug).then((results) => {
        //                 this.signatories = results.hits;
        //             }).catch(err => {
        //                 console.error('Error searching', slug, err);
        //             });
        //         }
        //     }
        // });
        this.onSiteLoaded();
    }

    onSiteLoaded() {
        var that = this;
        this.route.params.subscribe((params) => {
            this.signatory = null;
            this.es.getSignatory(params['slug']).then((signatory) => {
                this.signatory = signatory;
                // this.appService.ms.setMeta({
                //     title: 'Goodmoves - ' + signatory.title,
                //     description: signatory.organisation_name + ' | ' + signatory.title
                // });
                // this.appService.ms.setJsonLd({
                //     '@type': 'JobPosting',
                //     baseSalary: this.signatory.salary_min,
                //     datePosted: new Date(this.signatory.start_at),
                //     employmentType: this.signatory.status,
                //     hiringOrganisation: this.signatory.organisation_name,
                //     industry: this.signatory.sectors,
                //     jobBenefits: this.signatory.benefits,
                //     title: this.signatory.title,
                //     validThrough: new Date(this.signatory.closing_date),
                //     salaryCurrency: 'GBP',
                //     description: this.signatory.description,
                //     jobLocation: {
                //         '@type': 'Place',
                //         address: this.signatory.region,
                //         description: this.signatory.location
                //     }
                // });
            }).catch((err) => {
                this.notFound = true;
            });
        });
    }

}
