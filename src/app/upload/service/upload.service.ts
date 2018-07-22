import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUploadInterface } from '../file-upload.interface';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    files: FileUploadInterface[] = mockedFileList;

    constructor(private http: HttpClient) {}

    addFiles(selectedFiles: FileList) {
        // Why on earth do we keep getting these array like things back from the DOM?
        const filesCount = selectedFiles.length;
        for (let i = 0; i < filesCount; i++) {
            const file = selectedFiles[i];
            this.files.push({
                data: file,
                status: 'in',
                inProgress: false,
                progress: 0,
                canRetry: false,
                canCancel: true,
            });
        }
        this.uploadFiles();
    }

    private uploadFiles() {
        // will iterate and upload here
    }
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
