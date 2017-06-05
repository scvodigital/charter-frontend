import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'addHttp'
})
export class AddHttpPipe implements PipeTransform {

    transform(value: any): any {
        if (value.indexOf('http://') !== 0 && value.indexOf('https://') !== 0)
            return 'http://'+value;
        else
            return value;
    }

}
