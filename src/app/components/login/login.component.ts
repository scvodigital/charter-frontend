import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AppService } from '../../services/app.service';

@Component({
    selector: 'main-container.content',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    private _content: string = '';
    public get content(): string{
        return this._content;
    }
    public set content(value: string){
        this._content = value;
    }

    constructor(private appService: AppService, private elt: ElementRef, private route: ActivatedRoute){
        this.route.url.subscribe(url => {
            // this.content = this.appService.getPage(url[0].path);
        });
    }
}
