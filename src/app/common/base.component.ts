// Experimental base component class to allow for an ngOnConfigLoaded event in all child components
import { Inject, Component } from '@angular/core';
import { AppService } from '../services/app.service';
import { Subscription } from 'rxjs/Rx';

@Component({
    template: ''
})
export class SiteComponent {
    private sub: Subscription = null;

    protected get af(){
        return this.appService.af;
    }

    protected get es(){
        return this.appService.es;
    }

    constructor(@Inject(AppService) protected appService: AppService) {
        var that = this;
        if (this.appService.ready) {
            console.log('Site Already Ready');
            setTimeout(() => {
                this.onSiteLoaded();
            }, 0);
        } else {
            this.sub = this.appService.readySub.subscribe(() => {
                console.log('Site Ready');
                that.onSiteLoaded();
            });
        }
    }

    onSiteLoaded() {}

    ngOnDestroy() {
        if (this.sub !== null) {
            this.sub.unsubscribe();
        }
    }
}