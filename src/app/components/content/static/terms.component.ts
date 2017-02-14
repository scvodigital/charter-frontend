import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { SiteComponent } from '../../../common/base.component';

import { AppService } from '../../../services/app.service';

@Component({
    selector: 'main-container.content',
    templateUrl: './terms.component.html'
})
export class TermsConditionsComponent {
    constructor() {}
}
