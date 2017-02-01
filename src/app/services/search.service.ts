import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, Validator, NG_VALIDATORS } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

import { SearchParameters } from './elastic.service';

@Injectable()
export class SearchService {
    private _form: FormGroup;
    public set form(value: FormGroup) { this._form = value; }
    public get form(): FormGroup { return this._form; }

    get hasSearchParameters(): boolean {
        return this.form.controls['query'].value ||
            this.form.controls['sector'].value ||
            this.form.controls['category'].value;
    }

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            'query': [''],
            'sector': [''],
            'category': [''],
            'sortOrder': [''],
            'page': ['']
        });
    }

    public setParameters(params: SearchParameters) {
        for (var key in this._form.controls) {
            (<FormControl>this._form.controls[key]).setValue(params[key] || '', {
                emitModelToViewChange: true,
                emitEvent: true
            });
        }
    }
}
