import { Injectable, Type, Inject } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Observable, Subject, Subscription, Observer } from 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AppComponent } from '../app.component';

declare function loaded();

@Injectable()
export class AppService {
    constructor() {}
}
