import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatProgressBarModule } from '@angular/material';

@NgModule({
    imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, MatProgressBarModule],
    declarations: [UploadComponent],
    exports: [UploadComponent],
})
export class UploadModule {}
