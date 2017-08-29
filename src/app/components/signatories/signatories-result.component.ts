import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { AppService } from '../../services/app.service';
import { ElasticService, IHit, ISearchParameters } from '../../services/elastic.service';
import { ISignatory } from '../../services/elastic.service.signatory';

import { SiteComponent } from '../../common/base.component';
import { IViewEvent, DocumentViewComponent } from '../document-view/document-view.component';

@Component({
    selector: 'signatory-result',
    templateUrl: './signatories-result.component.html'
})
export class SignatoriesResultComponent {

    @Input('signatory') document: ISignatory = null;
    @ViewChild('resultElement') resultElement: DocumentViewComponent;

    viewEventHandler(event: IViewEvent) {}

    viewRedrawHandler() {}

    constructor(private appService: AppService, private ref: ChangeDetectorRef) {}

    @Input('signatory') signatory: ISignatory = {
        id: '',
        organisation_name: '',
        slug: '',
        logo: '',
        views: []
    };
}
