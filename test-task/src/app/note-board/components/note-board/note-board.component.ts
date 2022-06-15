import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { TagsPipe } from 'src/app/shared/pipes/tags.pipe';
import { GetNotesService } from 'src/app/shared/services/get-notes.service';

@Component({
    selector: 'app-note-board',
    templateUrl: './note-board.component.html',
    styleUrls: ['./note-board.component.scss'],
})
export class NoteBoardComponent implements OnInit {
    text?: string;
    tags: string[] = [];
    appointment: string = 'create';
    noteForm: FormGroup;
    startTags: string[] = [];

    constructor(private getNotesService: GetNotesService, private router: Router) {
        this.noteForm = new FormGroup({
            text: new FormControl('', Validators.required),
            tags: new FormControl(''),
        });
    }

    ngOnInit(): void {
        const currentNote = this.getNotesService.currentNote;
        if (currentNote) {
            // currentNote.text = new TagsPipe().transform(currentNote?.text);
            this.noteForm.patchValue(currentNote);
            this.text = currentNote.text;
            this.tags = currentNote.tags;
        }
        this.noteForm.controls['tags'].setValue('');
        this.text?.split(' ').forEach((chunk) => {
            if (chunk.startsWith('#')) {
                this.startTags?.push(chunk);
            }
        });
        // this.text = this.getNotesService.currentNote?.text;
        this.appointment = this.getNotesService.appointment;
    }

    addTag(tag: string) {
        if (!this.tags.includes(tag)) {
            this.tags = [...this.tags, tag];
        }
        this.noteForm.controls['tags'].setValue('');
    }

    handleBackClick() {
        this.router.navigate(['notes']);
    }

    deleteTag(tag: string) {
        const tagIndex = this.tags.indexOf(tag);
        if (tagIndex < this.tags.length - 1) {
            this.tags = [...this.tags.slice(0, tagIndex), ...this.tags.slice(tagIndex + 1)];
        } else {
            this.tags = [...this.tags.slice(0, tagIndex)];
        }
    }

    handleDeleteClick() {
        this.getNotesService.delete();
        this.router.navigate(['notes']);
    }

    handleInputChange() {
        const chunks: string[] = this.noteForm.controls['text'].value.split(' ');
        const newTags: string[] = [];
        chunks.forEach((chunk) => {
            if (chunk.startsWith('#')) {
                newTags.push(chunk);
            }
        });
        this.startTags.forEach((tag) => {
            if (!newTags.includes(tag)) {
                this.deleteTag(tag);
            }
        });
        newTags.forEach((tag) => {
            this.addTag(tag);
        });
        this.startTags = newTags;
    }

    handleSaveClick() {
        const note = Object.assign(this.noteForm.value);
        note['tags'] = this.tags;
        this.getNotesService.save(note);
        this.router.navigate(['notes']);
    }
}
