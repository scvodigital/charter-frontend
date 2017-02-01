import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, Validator, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { AppService } from '../../../services/app.service';
import { SearchService } from '../../../services/search.service';

@Component({
    selector: 'main-container.content',
    templateUrl: './signatories.component.html'
})
export class SignatoriesComponent {
    searchForm: FormGroup;

    get sectors(): any[]{
        return this.appService.getTerms('sectors');
    };
    get categories(): any[]{
        return this.appService.getTerms('categories');
    };

    constructor(private appService: AppService, private searchService: SearchService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
        this.searchForm = this.searchService.form;
    }

    search(event) {
        var parameters = {};
        for (var key in this.searchForm.controls) {
            if (this.searchForm.controls[key].value) {
                parameters[key] = this.searchForm.controls[key].value;
            }
        }
        parameters['page'] = 1;
        this.router.navigate(['./signatories', parameters]);
    }
}
