import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { ISignatory } from './elastic.service.signatory';
import * as elasticsearch from 'elasticsearch';

@Injectable()
export class ElasticService {
    public searchRestriction: any;
    public searchFilters: any = [];
    public esIndex: string = 'web-content-production';
    public esType: string = 'digital-charter-signatory';

    constructor() {}

    static searchCompleted: Subject<ISearchParameters> = Subject.create();

    public getClient() {
        return new Promise((resolve, reject) => {
            try {
                var client = new elasticsearch.Client({
                    host: 'https://readonly:onlyread@50896fdf5c15388f8976945e5582a856.eu-west-1.aws.found.io/'
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
                    "_source": false,
                    "aggs": {
                        "categories": {
                            "terms": {
                                "field": "category",
                                "size": 10000
                            }
                        },
                        "sectors": {
                            "terms": {
                                "field": "sector",
                                "order": { "_term": "asc" },
                                "size": 10000
                            }
                        }
                    }
                };
                this.search(payload, { "size": 0 }).then(response => {
                    resolve(response);
                });
            });
        });
    }

    getCount(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.getClient().then((client: any) => {
                client.count({ index: this.esIndex, type: this.esType }).then((response) => {
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
                    "index": this.esIndex,
                    "type": this.esType,
                    "size": 12,
                    "body": body
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
                "_source": "search_result_logo",
                "query": {
                    "bool": {
                        "must": []
                    }
                }
            };

            if (parameters.query) {
                body.query.bool.must.push({
                    "simple_query_string": {
                        "query": parameters.query,
                        "default_operator": "AND"
                    }
                });
            }
            if (parameters.sector) {
                body.query.bool.must.push({
                    "term": {
                        "sector-slug": parameters.sector
                    }
                });
            }
            if (parameters.category) {
                body.query.bool.must.push({
                    "term": {
                        "category-slug": parameters.category
                    }
                });
            }
            if (parameters.commitment_required) {
                body.query.bool.must.push({
                    "constant_score": {
                        "filter": {
                            "exists": {
                                "field": "description"
                            }
                        }
                    }
                });
            }

            switch(parameters.sort) {
                case('a-z'):
                    body.sort = {
                        'slug': {
                            "order": 'asc'
                        }
                    };
                    break;
                case('z-a'):
                    body.sort = {
                        'slug': {
                            "order": 'desc'
                        }
                    };
                    break;
                case('random'):
                    body.query.bool.must.push({
                        "function_score": {
                            "functions": [
                                {
                                    "random_score": {
                                        "seed": Math.random().toString(36).substring(7)
                                    }
                                }
                            ]
                        }
                    });
                    break;
                default:
                    body.sort = {
                        'date_signed': {
                            "order": 'desc'
                        }
                    };
                    break;
            }

            var overrides: any = {
                "from": (parameters.page - 1) * 12,
                "size": 12
            }

            this.search(body, overrides).then(response => {
                resolve(response.hits);
            }).catch(reject);
        });
    }

    public getSignatory(slug: String): Promise<ISignatory> {
        return new Promise((resolve, reject) => {
            var body = {
                "query": {
                    "bool": {
                        "must": [
                            {
                                "term": {
                                    "slug": slug
                                }
                            }
                        ]
                    }
                }
            };

            var overrides: any = {
                "_source": "full",
                "size": 1
            }

            this.search(body, overrides).then(results => {
                if (results.hits.total < 1) {
                    return reject(new Error('Signatory not found'));
                }

                var signatory: ISignatory = results.hits.hits[0]._source;

                resolve(signatory);
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

export interface ISearchParameters {
    query?: string;
    sector?: string;
    category?: string;
    commitment_required?: boolean;
    page?: number;
    sort?: string;
}
