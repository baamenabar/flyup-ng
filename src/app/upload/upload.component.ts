import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FileUploadInterface } from './file-upload.interface';
import { UploadService } from './service/upload.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
    @Input() accept = 'image/*';

    /** The instanciator of this component must pass tha correct url. That should be coming form the env configs */
    @Input() apiTarget = 'http://localhost:3000/api/upload';

    /** This sets the File post field name, it dafults to the default in flyup-back */
    @Input() postFieldName = 'uploaded_file';

    @ViewChild('fileInput') fileInput: ElementRef;

    files: FileUploadInterface[];

    /**
     * Creates an instance of UploadComponent.
     * @param  uploadService: We inyect the upload service to hold the list of files to be uploaded
     *                        and handle the http connections for each
     */
    constructor(private uploadService: UploadService) {
        // not happy about this pattern. Looks sketchy... if I only knew more about obserbables.
        this.files = uploadService.files;
    }

    onUploadButtonClicked() {
        // ask for files
        this.fileInput.nativeElement.click();
    }

    fileInputChanged(event) {
        const selectedFiles: FileList = event.target.files;
        console.log('FI changed', selectedFiles);
        this.uploadService.addFiles(selectedFiles);
    }
}
