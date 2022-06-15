import { Injectable } from '@angular/core';
import { INote } from '../models/note';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../models/response';

@Injectable({
    providedIn: 'root',
})
export class GetNotesService {
    constructor(private httpClient: HttpClient) {}

    search() {
        return this.httpClient.get<IResponse>('assets/notes.json');
    }
}
