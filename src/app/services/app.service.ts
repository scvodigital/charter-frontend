import { Injectable, Type, Inject } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Observable, Subject, Subscription, Observer } from 'rxjs/Rx';
import * as _ from 'lodash';
import { AppComponent } from '../app.component';
import { ElasticService } from './elastic.service';
import { SlugifyPipe } from '../pipes/slugify.pipe';

declare function loaded();

@Injectable()
export class AppService {
    public ready: boolean = false;
    public readySub: Subject<void> = new Subject<void>();

    constructor(@Inject(ElasticService) public es: ElasticService) {
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
                var slugify = new SlugifyPipe();

                Object.keys(response.aggregations).forEach((field) => {
                    fields[field] = [];
                    if (response.aggregations[field]) {
                        response.aggregations[field].buckets.forEach((bucket) => {
                            fields[field].push({
                                "term": bucket.key,
                                "count": bucket.doc_count
                            });

                            var subKey = slugify.transform(bucket.key) + '-categories';
                            fields[subKey] = [];

                            // This is broken and I'm not sure why
                            // bucket['sector-categories'].buckets.forEach((subBucket) => {
                            //     fields[subKey].push({
                            //         "term": subBucket.key,
                            //         "count": subBucket.doc_count
                            //     });
                            // });
                        });
                    }
                    this.searchFields = fields;
                    resolve(fields);
                });
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
