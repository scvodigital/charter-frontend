import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ContentChild, QueryList, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppService } from '../../services/app.service';

@Component({
  selector: 'document-view',
  templateUrl: './document-view.component.html'
})
export class DocumentViewComponent implements OnInit {
    @Input('document') document: IDocument = null;
    @Input('viewPrefs') viewPrefs: string[] = ['details'];
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
        var html = '';
        for(var v = 0; v < this.viewPrefs.length; v++){
            var found = this.document.views.filter((view) => { return view.name === this.viewPrefs[v]; });
            if(Array.isArray(found) && found.length > 0){
                html = found[0].html;
                break;
            }
        }

        html = html.replace(/(href=\"|\')(\/.*?)(\"|\')/gi, '[routerLink]="[\'$2\']"');

        this.html = html;
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
