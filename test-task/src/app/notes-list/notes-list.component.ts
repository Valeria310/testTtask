import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { INote } from '../shared/models/note';
import { IResponse } from '../shared/models/response';
import { GetNotesService } from '../shared/services/get-notes.service';

@Component({
    selector: 'app-notes-list',
    templateUrl: './notes-list.component.html',
    styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit, OnDestroy {
    notesList: INote[] = [];
    subscr?: Subscription;
    filterForm: FormGroup;
    keyTags: string[] = [];

    constructor(private getNotesService: GetNotesService) {
        this.filterForm = new FormGroup({ keyWord: new FormControl('', Validators.required) });
    }

    ngOnInit(): void {
        this.subscr = this.getNotesService.search().subscribe((data: IResponse) => {
            this.notesList = data.items;
        });
    }

    submit() {
        if (!this.keyTags.includes(this.filterForm.controls['keyWord'].value)) {
            this.keyTags = [...this.keyTags, this.filterForm.controls['keyWord'].value];
        }
        this.filterForm.controls['keyWord'].setValue('');
    }

    handleDeleteClick(tag: string) {
        const tagIndex = this.keyTags.indexOf(tag);
        this.keyTags = [...this.keyTags.slice(0, tagIndex), ...this.keyTags.slice(tagIndex + 1)];
    }

    ngOnDestroy(): void {
        this.subscr?.unsubscribe();
    }
}
