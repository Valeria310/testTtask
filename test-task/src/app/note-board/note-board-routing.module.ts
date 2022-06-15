import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteBoardComponent } from './components/note-board/note-board.component';

const routes: Routes = [
    { path: '', component: NoteBoardComponent },
    { path: '**', redirectTo: '' },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NoteBoardRoutingModule {}
