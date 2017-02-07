import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AppService } from '../../../services/app.service';
import { ElasticService, IHits, ISignatory, IHit, SearchParameters, ISearchParameters } from '../../../services/elastic.service';

@Component({
    selector: 'main-container.content',
    templateUrl: './signatories-detail.component.html'
})
export class SignatoriesDetailComponent {
    public hits: IHit<ISignatory>[] = [];
    public parameters: SearchParameters = new SearchParameters({});

    public signatories: IHit<ISignatory>[];

    constructor (router: Router, private appService: AppService) {
        router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                var path = '/signatories/';
                if (event.url.startsWith(path)) {
                    var slug = event.url.substr(path.length);
                    var params;

                    this.parameters = new SearchParameters(params);
                    this.appService.es.getSignatory(slug, this.parameters).then((results) => {
                        this.signatories = results.hits;
                    }).catch(err => {
                        console.error('Error searching', slug, err);
                    });
                }
            }
        });
    }
}
