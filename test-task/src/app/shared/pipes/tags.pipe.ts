import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tags',
})
export class TagsPipe implements PipeTransform {
    transform(value: string = ''): string {
        let res: string[] = [];
        const chunks = value.split(' ');
        chunks.forEach((chunk) => {
            if (chunk.startsWith('#')) {
                const newChunk = `<span class="tag">${chunk.slice(1)}</span>`;
                chunk = newChunk;
            }
            res.push(chunk);
        });
        return res.join(' ');
    }
}
