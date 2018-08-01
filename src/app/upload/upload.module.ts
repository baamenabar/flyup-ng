import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatProgressBarModule } from '@angular/material';
import { UploadService } from './service/upload.service';
import { FilesService } from '../file-list/service/files.service';

@NgModule({
    imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, MatProgressBarModule],
    declarations: [UploadComponent],
    providers: [UploadService, FilesService],
    exports: [UploadComponent],
})
export class UploadModule {}
