import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AppService } from '../../../services/app.service';

@Component({
    selector: 'main-container.content',
    templateUrl: './signup-complete.component.html'
})
export class SignUpCompleteComponent {
    constructor() {}
}
