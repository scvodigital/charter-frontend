import { Injectable, Type, Inject } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Observable, Subject, Subscription, Observer } from 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AppComponent } from '../app.component';

declare function loaded();

@Injectable()
export class AppService {
    constructor() {
        this.loadSiteData();
    }

    private loadSiteData(){
        loaded();
    }

    private _searchFields: ISearchFields = {};
    public get searchFields(): ISearchFields {
        return this._searchFields;
    }
    public set searchFields(value: ISearchFields) {
        this._searchFields = value;
    }

    public getTerms(field: string): ISearchTerm[] {
        if (this.searchFields.hasOwnProperty(field)) {
            return this.searchFields[field];
        } else {
            return [];
        }
    }
}

export interface ISearchFields {
    [field: string]: ISearchTerm[];
}

export interface ISearchTerm {
    term: string;
    count: number;
}
