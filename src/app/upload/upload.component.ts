import { Component, OnInit, Input } from '@angular/core';
import { FileUploadInterface } from './file-upload.interface';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
    @Input() accept = 'image/*';
    files: FileUploadInterface[] = [
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
    constructor() {}

    ngOnInit() {}
}
