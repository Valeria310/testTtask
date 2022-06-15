import { Component, Input, OnInit } from '@angular/core';
import { INote } from '../shared/models/note';

@Component({
    selector: 'app-note-item',
    templateUrl: './note-item.component.html',
    styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent implements OnInit {
    @Input() note?: INote;

    tags?: string[];
    text?: string;

    constructor() {}

    ngOnInit(): void {
        this.tags = this.note?.tags;
        this.text = this.note?.text;
    }
}
