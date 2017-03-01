import { Injectable, Type, Inject } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Observable, Subject, Subscription, Observer } from 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AppComponent } from '../app.component';
import { ElasticService } from './elastic.service';

declare function loaded();

@Injectable()
export class AppService {
    constructor(@Inject(AngularFire) public af: AngularFire, @Inject(ElasticService) public es: ElasticService) {
        this.loadSiteData();
    }

    private loadSiteData() {
        this.refreshSearchFields();
        loaded();
    }

    private _searchFields: ISearchFields = {};
    public get searchFields(): ISearchFields {
        return this._searchFields;
    }
    public set searchFields(value: ISearchFields) {
        this._searchFields = value;
    }
    public refreshSearchFields(){
        return new Promise((resolve, reject) => {
            this.es.getTermCounts().then((response: any) => {
                if (!response.aggregations) {
                    resolve({});
                    return;
                }

                var fields = {};
                Object.keys(response.aggregations).forEach((field) => {
                    fields[field] = [];
                    response.aggregations[field].buckets.forEach((bucket) => {
                        fields[field].push({
                            term: bucket.key,
                            count: bucket.doc_count
                        });
                    });
                });

                this.searchFields = fields;
                resolve(fields);
            });
        });
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
