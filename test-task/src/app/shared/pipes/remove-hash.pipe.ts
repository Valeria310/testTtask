import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'removeHash',
})
export class RemoveHashPipe implements PipeTransform {
    transform(value: string = ''): string {
        let res: string[] = [];
        const chunks = value.split(' ');
        chunks.forEach((chunk) => {
            if (chunk.startsWith('#')) {
                // const newChunk = `<span class="tag">${chunk.slice(1)}</span>`;
                chunk = chunk.slice(1);
            }
            res.push(chunk);
        });
        return res.join(' ');
    }
}
