import { Injectable } from '@angular/core';
import { UploadModule } from '../upload.module';

@Injectable({
    providedIn: UploadModule,
})
export class UploadService {
    constructor() {}
}
