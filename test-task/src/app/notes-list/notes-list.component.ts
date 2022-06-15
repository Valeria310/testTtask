import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

    constructor(private getNotesService: GetNotesService, private router: Router) {
        this.filterForm = new FormGroup({ keyWord: new FormControl('', Validators.required) });
    }

    ngOnInit(): void {
        if (!this.getNotesService.result.length) {
            this.subscr = this.getNotesService.search().subscribe((data: IResponse) => {
                this.notesList = data.items;
                this.getNotesService.result = data.items;
            });
        } else {
            this.notesList = this.getNotesService.result;
        }
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

    handleCardClick(note: INote) {
        this.getNotesService.currentNote = note;
        this.getNotesService.getIndex();
        this.getNotesService.appointment = 'edit';
        this.router.navigate(['note']);
    }

    ngOnDestroy(): void {
        this.subscr?.unsubscribe();
    }
    handleBackClick() {
        this.getNotesService.currentNote = undefined;
        this.getNotesService.noteIndex = -1;
        this.getNotesService.appointment = 'create';
        this.router.navigate(['note']);
    }
}
