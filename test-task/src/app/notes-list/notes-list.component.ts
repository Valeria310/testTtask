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
    keyTag: string = '';

    constructor(private getNotesService: GetNotesService) {
        this.filterForm = new FormGroup({ keyWord: new FormControl('') });
    }

    ngOnInit(): void {
        this.subscr = this.getNotesService.search().subscribe((data: IResponse) => {
            this.notesList = data.items;
        });
    }

    submit() {
        this.keyTag = this.filterForm.controls['keyWord'].value;
        // this.filterForm.controls['keyWord'].setValue('');
    }

    ngOnDestroy(): void {
        this.subscr?.unsubscribe();
    }
}
