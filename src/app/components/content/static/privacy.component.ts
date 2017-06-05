import { Component, Output, EventEmitter } from '@angular/core';

import { SiteComponent } from '../../../common/base.component';

import { AppService } from '../../../services/app.service';

@Component({
    selector: 'main-container.content',
    templateUrl: './privacy.component.html'
})
export class PrivacyComponent {
    constructor() {}
}
