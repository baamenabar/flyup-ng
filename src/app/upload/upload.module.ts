import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { MatIconModule, MatButtonModule, MatProgressBarModule } from '@angular/material';
import { UploadService } from './service/upload.service';
import { ThingsService } from '../service/things.service';

@NgModule({
    imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressBarModule],
    declarations: [UploadComponent],
    providers: [UploadService, ThingsService],
    exports: [UploadComponent],
})
export class UploadModule {}
