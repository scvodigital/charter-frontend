import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import * as elasticsearch from 'elasticsearch';

@Injectable()
export class ElasticService {
    public searchFilters: any = [];

    constructor() {
        console.log('ELASTIC SERVICE CONSTRUCTOR');
    }

    static searchCompleted: Subject<ISearchParameters> = Subject.create();

    public getClient() {
        return new Promise((resolve, reject) => {
            try {
                var connectionString = 'https://readonly:onlyread@4c19757a0460c764d6e4712b0190cc21.eu-west-1.aws.found.io:9243/';
                // console.log(connectionString);

                var client = new elasticsearch.Client({
                    host: connectionString
                });

                resolve(client);
            } catch (err) {
                reject(err);
            }
        });
    }

    public getTermCounts() {
        return new Promise((resolve, reject) => {
            this.getClient().then((client: any) => {
                var payload = {
                    "size": 0,
                    "aggs": {
                        "sectors": {
                            "terms": {
                                "field": "sectors",
                                "size": 0
                            }
                        },
                        "categories": {
                            "terms": {
                                "field": "categories",
                                "size": 0
                            }
                        },
                    }
                };

                this.search(payload, { size: 0 }).then(response => {
                    resolve(response);
                });
            });
        });
    }

    search(body: any, overrides: any = {}): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getClient().then((client: any) => {
                var payload = {
                    index: 'digitalcharter',
                    type: 'signatory',
                    size: 12,
                    body: body
                };

                for (var p in overrides) {
                    if (overrides.hasOwnProperty(p)) {
                        payload[p] = overrides[p];
                    }
                }

                client.search(payload).then(response => {
                    // console.log(response);
                    resolve(response);
                }).catch(err => {
                    console.error('Error searching', payload, err);
                    reject(err);
                });
            });
        });
    }

    public doSearch(parameters: ISearchParameters): Promise<IHits<ISignatory>> {
        return new Promise((resolve, reject) => {
            var body: any = {
                query: {
                    bool: {
                        must: []
                    }
                }
            };

            if (parameters.query) { body.query.bool.must.push({ "simple_query_string": { "query": parameters.query } }) }
            if (parameters.sectors) { body.query.bool.must.push({ "term": { "sectors_slugs": parameters.sectors } }); }
            if (parameters.categories) { body.query.bool.must.push({ "term": { "categories_slug": parameters.categories } }); }

            var overrides: any = {
                from: (parameters.page - 1) * 10
            }

            if (parameters.sort) {
                body.sort = [parameters.sort];
            }

            this.search(body, overrides).then(response => {
                // console.log(response.hits);
                resolve(response.hits);
            }).catch(reject);
        });
    }

    public getSignatory(slug: String, parameters: ISearchParameters): Promise<IHits<ISignatory>> {
        return new Promise((resolve, reject) => {
            var body: any = {
                query: {
                    bool: {
                        must: []
                    }
                }
            };

            body.query.bool.must.push({
                "query_string": {
                    "default_field": 'Organisation_Name__r.Name',
                    "query": slug
                }
            });

            var overrides: any = {
                size: 1
            }

            this.search(body, overrides).then(results => {
                // console.log(results);
                if (results.hits.total < 1) {
                    return reject(new Error('Signatory not found'));
                }
                resolve(results.hits);
            }).catch(reject);
        });
    }

    public getSignatories<T>(): Promise<IHits<ISignatory>> {
        return new Promise((resolve, reject) => {
            var body: any = {
                query: {
                    bool: {
                        must: []
                    }
                }
            };

            var overrides = {
                size: 1000,
            }

            this.search(body, overrides).then(response => {
                while (response.hits.hits.length > 12) {
                    var i = Math.floor(Math.random() * response.hits.hits.length);
                    response.hits.hits.splice(i, 1);
                }
                resolve(response.hits);
            }).catch(reject);
        });
    }
}

export interface ITerm {
    term: string;
    count: number;
}

export interface IHits<T> {
    total: number;
    max_score: number;
    hits: IHit<T>[];
}

export interface IHit<T> {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: T[];
}

export interface ISignatory {
    id: string;
    title: string;
    slug: string;
    description: string;
}

// export interface IAsset {
//     id: number,
//     title: string,
//     filename: string,
//     content_type: string
// }

export interface ISearchParameters {
    query: string,
    sectors: string,
    categories: string,
    page: number;
    sortKey: string;
    sort: { [key: string]: string };
}

export class SearchParameters implements ISearchParameters {
    query: string;
    sectors: string;
    categories: string;
    page: number;
    sortKey: string;

    get sort(): { [key: string]: string } {
        if (this.sortKey === null) {
            return null;
        }
        var field = this.sortKey.replace(/(\-)(desc|asc)$/ig, '');
        var direction = this.sortKey.indexOf('-asc') > -1 ? 'asc' : 'desc';
        return { [field]: direction };
    };

    constructor(params: any) {
        if (!params) return;
        this.query = params.query || null;
        this.sectors = params.sectors || null;
        this.categories = params.categories || null;
        this.page = params.page || 1;
        this.sortKey = params.sortKey || null;
    }

    get stateless(): any {
        var params: any = {};

        if (this.query) { params.query = this.query; }
        if (this.sectors) { params.sectors = this.sectors; }
        if (this.categories) { params.categories = this.categories; }

        return params;
    }

    get forSearch(): any {
        var params: any = this.stateless;
        if (this.page) { params.page = this.page; }
        if (this.sortKey) { params.sortKey = this.sortKey; }
        return params;
    }
}

// export interface IOrganisationLogo {
//     id: number;
//     name: string;
//     slug: string;
//     count: number;
//     website: string;
// }
//
// interface IOrganisationLogoBucket {
//     key: number;
//     doc_count: number;
//     name: { buckets: { key: string, doc_count: number }[] };
//     slug: { buckets: { key: string, doc_count: number }[] };
//     website: { buckets: { key: string, doc_count: number }[] };
// }
//
// export class OrganisationLogo implements IOrganisationLogo {
//     id: number;
//     name: string;
//     slug: string;
//     count: number;
//     website: string;
//
//     get azureUrl(): string {
//         return "http://goodmoves.blob.core.windows.net/logos/" + this.id + "-logo-thumb.png";
//     }
//
//     get clearbitUrl(): string {
//         if (this.website === null) {
//             return null;
//         }
//         var url = 'http://logo.clearbit.com/' + this.website;
//         return url;
//     }
//
//     constructor(bucket: IOrganisationLogoBucket) {
//         this.id = bucket.key;
//         this.count = bucket.doc_count;
//         this.slug = bucket.slug.buckets[0].key;
//         this.name = bucket.name.buckets[0].key;
//         if (bucket.website.hasOwnProperty('buckets') && Array.isArray(bucket.website.buckets) && bucket.website.buckets.length > 0) {
//             this.website = bucket.website.buckets[0].key;
//         } else {
//             this.website = 'https://goodmoves.org.uk';
//         }
//     }
// }
