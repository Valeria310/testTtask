import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from './notes-list/notes-list.component';

const routes: Routes = [
    { path: 'notes', component: NotesListComponent },
    { path: 'note', loadChildren: () => import('./note-board/note-board.module').then((_) => _.NoteBoardModule) },
    { path: '**', redirectTo: 'notes' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
