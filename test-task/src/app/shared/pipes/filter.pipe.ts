import { Pipe, PipeTransform } from '@angular/core';
import { INote } from '../models/note';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(value: INote[], tag: string): INote[] {
        let newValue = value;
        if (tag) {
            newValue = value.filter((val) => val.tags.includes(tag));
        }
        return newValue;
    }
}
