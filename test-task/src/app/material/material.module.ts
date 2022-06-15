import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const MaterialComponents = [MatToolbarModule, MatCardModule, MatChipsModule, MatButtonModule, MatIconModule];

@NgModule({
    declarations: [],
    imports: [MaterialComponents],
    exports: [MaterialComponents],
})
export class MaterialModule {}
