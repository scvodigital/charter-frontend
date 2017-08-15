import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AppService } from '../../../services/app.service';

@Component({
    selector: 'main-container.content',
    templateUrl: './signup-form.component.html'
})
export class SignUpFormComponent {
    constructor() {
        window.addEventListener("message", (event) => {
            if (event.data.hasOwnProperty('event')) {
                // console.log('Post Message Event', event.data);
                switch (event.data.event) {
                    case ('resize'):
                        $('iframe[src*="' + event.origin + '"]').css('height', event.data.height+5);
                        break;
                }
            }
        }, false);
    }
}
