import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsPipe } from './pipes/tags.pipe';
import { RemoveHashPipe } from './pipes/remove-hash.pipe';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
    declarations: [TagsPipe, RemoveHashPipe, FilterPipe],
    imports: [CommonModule],
    exports: [TagsPipe, RemoveHashPipe, FilterPipe],
})
export class SharedModule {}
