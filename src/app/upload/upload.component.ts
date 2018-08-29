import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FileUploadInterface } from './file-upload.interface';
import { UploadService } from './service/upload.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FilesService } from '../file-list/service/files.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    animations: [
        trigger('slideInOut', [
            state(
                'in',
                style({
                    opacity: 1,
                    transform: 'translateX(0)',
                })
            ),
            transition('void => *', [style({ opacity: 0, transform: 'translatex(-100%)' }), animate('400ms ease-out')]),
            transition('* => void', [animate('500ms ease-in'), style({ opacity: 0, transform: 'translateX(100%)' })]),
        ]),
    ],
})
export class UploadComponent {
    @Input()
    accept = 'image/*';

    @ViewChild('fileInput')
    fileInput: ElementRef;

    files: FileUploadInterface[];

    /**
     * Creates an instance of UploadComponent.
     * @param  uploadService: We inyect the upload service to hold the list of files to be uploaded
     *                        and handle the http connections for each
     * @todo: find a better way to expose the cancel and retry methods to the template. For now this will do.
     */
    constructor(
        public uploadService: UploadService,
        private fileService: FilesService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        // not happy about this pattern. Looks sketchy... if I only knew more about obserbables.
        this.files = uploadService.files;
    }

    onUploadButtonClicked() {
        // ask for files
        this.fileInput.nativeElement.click();
    }

    fileInputChanged(event) {
        const selectedFiles: FileList = event.target.files;
        this.uploadService.addFiles(selectedFiles);

        // resets the input so Filelist is empty for the next time.
        event.target.value = null;
    }

    /**
     * Handles click events from the add folder button.
     * TODO: emmit from here
     * TODO: move this out of this component.
     */
    addFolderButtonClicked() {
        this.fileService
            .createFolder(this.route.snapshot.url.join('/'), window.prompt('Folder name', ''))
            .subscribe(data => {
                console.log('the data back', data);
            });
    }

    /**
     * TODO: use a service to deal with routing
     */
    upOneLevelButtonClicked() {
        const urlParts = this.route.snapshot.url;
        const pathEndIndex = urlParts.length - 1;
        if (pathEndIndex < 0) {
            return;
        }
        let newPath = urlParts.slice(0, pathEndIndex).join('/');
        newPath = newPath ? newPath : '/';
        const path = this.router.navigate([newPath]);
    }
}
