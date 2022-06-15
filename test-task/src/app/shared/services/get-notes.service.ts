import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../models/response';
import { INote } from '../models/note';

@Injectable({
    providedIn: 'root',
})
export class GetNotesService {
    currentNote?: INote;
    appointment: string = 'create';
    result: INote[] = [];
    noteIndex: number = -1;

    constructor(private httpClient: HttpClient) {}

    search() {
        return this.httpClient.get<IResponse>('assets/notes.json');
    }

    getIndex() {
        if (this.currentNote) {
            this.noteIndex = this.result.indexOf(this.currentNote);
        }
    }

    delete() {
        if (this.noteIndex !== -1) {
            if (this.noteIndex < this.result.length - 1) {
                this.result = [...this.result.slice(0, this.noteIndex), ...this.result.slice(this.noteIndex + 1)];
            } else {
                this.result = [...this.result.slice(0, this.noteIndex)];
            }
        }
    }

    save(note: INote) {
        if (this.noteIndex !== -1) {
            this.result[this.noteIndex] = note;
        } else {
            this.result.push(note);
        }
    }
}
