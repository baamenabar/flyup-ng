import { Injectable } from '@angular/core';
import { UploadModule } from '../upload.module';
import { HttpClient } from '@angular/common/http';
import { FileUploadInterface } from '../file-upload.interface';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    files: FileUploadInterface[] = mockedFileList;
    constructor(private http: HttpClient) {}
}

export const mockedFileList = [
    {
        data: new File([], 'someTestFilename.jpg'),
        status: 'checking',
        inProgress: false,
        progress: 50,
        canRetry: true,
        canCancel: true,
    },
    {
        data: new File([], 'test2.jpg'),
        status: 'waiting',
        inProgress: false,
        progress: 1,
        canRetry: true,
        canCancel: true,
    },
];
