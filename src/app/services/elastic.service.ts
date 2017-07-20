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
                var connectionString = 'https://readonly:onlyread@4c19757a0460c764d6e4712b0190cc21.eu-west-1.aws.found.io/';
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
                    "aggs": {
                        "sectors": {
                            "terms": {
                                "field": "sector-na",
                                "order" : { "_term" : "desc" },
                                "size": 0
                            },
                            "aggs": {
                                "sector-categories": {
                                    "terms": {
                                        "field": "category-na",
                                        "order" : { "_term" : "asc" },
                                        "size": 0
                                    }
                                }
                            }
                        },
                        "categories": {
                            "terms": {
                                "field": "category-na",
                                "order" : { "_term" : "asc" },
                                "size": 0
                            }
                        }
                    },
                    "size": 0
                };

                this.search(payload, { size: 0 }).then(response => {
                    resolve(response);
                });
            });
        });
    }

    getCount(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.getClient().then((client: any) => {
                client.count({ index: 'charter' }).then((response) => {
                    resolve(response.count);
                }).catch((err) => {
                    console.error('Failed to get signatory count', err);
                    resolve(null);
                })
            });
        });
    }

    search(body: any, overrides: any = {}): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.getClient().then((client: any) => {
                var payload = {
                    index: 'charter',
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

            if (parameters.query) {
                body.query.bool.must.push({ "simple_query_string": {
                    "query": parameters.query,
                    "default_operator": "AND"
                } })
            }
            if (parameters.sector) {
                body.query.bool.must.push({ "term": { "sector-slug": parameters.sector } });
            }
            if (parameters.category) {
                body.query.bool.must.push({ "term": { "category-slug": parameters.category } });
            }

            switch(parameters.sort) {
                case('a-z'):
                    body.sort = { 'organisation-slug': { order: 'asc' } };
                    break;
                case('z-a'):
                    body.sort = { 'organisation-slug': { order: 'desc' } };
                    break;
                default:
                    body.sort = { 'dateSigned': { order: 'desc' } };
                    break;
            }

            var overrides: any = {
                from: (parameters.page - 1) * 12,
                size: 12
            }

            this.search(body, overrides).then(response => {
                resolve(response.hits);
            }).catch(reject);
        });
    }

    public getSignatory(slug: String): Promise<IHits<ISignatory>> {
        return new Promise((resolve, reject) => {
            var body: any = {
                filter: {
                    term: { "organisation-slug": slug }
                }
            };

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

export interface ISearchParameters {
    query?: string,
    sector?: string,
    category?: string,
    page?: number;
    sort?: string;
}
