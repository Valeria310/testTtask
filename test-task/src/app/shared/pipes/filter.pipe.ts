import { Pipe, PipeTransform } from '@angular/core';
import { INote } from '../models/note';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(value: INote[], tags: string[]): INote[] {
        let newValue = value;
        let currentValue;
        if (tags.length) {
            tags.forEach((tag) => {
                currentValue = newValue;
                newValue = currentValue.filter((val) => val.tags.includes(tag));
            });
        }
        return newValue;
    }
}
