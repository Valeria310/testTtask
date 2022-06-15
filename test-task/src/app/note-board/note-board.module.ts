import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteBoardComponent } from './components/note-board/note-board.component';
import { NoteBoardRoutingModule } from './note-board-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [NoteBoardComponent],
    imports: [CommonModule, NoteBoardRoutingModule, MaterialModule, ReactiveFormsModule, SharedModule],
})
export class NoteBoardModule {}
