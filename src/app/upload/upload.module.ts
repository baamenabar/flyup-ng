import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { MatIconModule, MatButtonModule, MatProgressBarModule } from '@angular/material';
import { UploadService } from './service/upload.service';
import { FilesService } from '../service/files.service';

@NgModule({
    imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressBarModule],
    declarations: [UploadComponent],
    providers: [UploadService, FilesService],
    exports: [UploadComponent],
})
export class UploadModule {}
