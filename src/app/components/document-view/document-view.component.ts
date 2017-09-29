import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ContentChild, QueryList, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'document-view',
  templateUrl: './document-view.component.html'
})
export class DocumentViewComponent implements OnInit {
    @Input('document') document: IDocument = null;
    // @Input('viewPrefs') viewPrefs: string[] = ['details'];
    @Input('viewField') viewField: string = 'full';
    @Output() event: EventEmitter<IViewEvent> = new EventEmitter();
    @Output() redrawn: EventEmitter<any> = new EventEmitter();
    html: string = '';
    modules = [RouterModule];

    @ViewChild('contentContainer') public viewChild: ElementRef;
    get element(): HTMLElement {
        return this.viewChild.nativeElement.nextElementSibling;
    }

    constructor(public appService: AppService) { }

    ngAfterViewInit(){
        setTimeout(() => {
            this.redrawn.emit();
        }, 1);
    }

    ngOnInit() {
        this.html = this.document[this.viewField].replace(/(href=\"|\')(\/.*?)(\"|\')/gi, '[routerLink]="[\'$2\']"');
    }

    emitEvent(event: string, ...args: any[]){
        var viewEvent: IViewEvent = {
            event: event,
            args: args
        };
        this.event.emit(viewEvent);
    }
}

interface IDocument{
    views: IView[];
    [attribute: string]: any;
}
interface IView{
    name: string;
    html: string;
}
export interface IViewEvent{
    event: string;
    args: any[];
}
