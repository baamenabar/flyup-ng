import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FileUploadInterface } from './file-upload.interface';
import { UploadService } from './service/upload.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FilesService } from '../service/files.service';
import { FileDisplay } from '../service/file-display';

/**
 *  UploadComponent handles the uploading of images and their progres state
 */
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
export class UploadComponent implements OnInit {
    /** File-types can be configured from the template instantiation */
    @Input()
    accept = 'image/*';

    /** We get a reference of the powerful file input, tat will do most of the heavy work */
    @ViewChild('fileInput')
    fileInput: ElementRef;

    /** List of active or failed uploads */
    files: FileUploadInterface[];

    /**
     * Creates an instance of UploadComponent.
     * @param  uploadService: We inyect the upload service to hold the list of files to be uploaded
     *                        handle the http connections for each
     *                        and handle any retry or cancel events triggered by the user.
     */
    constructor(private uploadService: UploadService, private fileService: FilesService) {
        // not happy about this pattern. But "it will do for now"
        this.files = uploadService.files;
    }

    /** Initializes the subscription to the fileComplete Subject */
    ngOnInit(): void {
        this.uploadService.fileComplete.subscribe(this.pushCompletedFileToFileServiceList);
    }

    /**
     * Here we map the uploaded file interface to the file view interface
     * and we push it to the file-listing service
     *
     * @param {FileUploadInterface} completedFile
     */
    pushCompletedFileToFileServiceList({ data }) {
        console.log('completed:', data);
        const readyFile: FileDisplay = {
            ...data,
            mimeType: data.type,
            mtime: data.lastModified,
        };
    }

    /** detects when the fileinput element changes and triggers the upload process in the service */
    fileInputChanged(event) {
        const selectedFiles: FileList = event.target.files;
        this.uploadService.addFiles(selectedFiles);

        // resets the input so Filelist is empty for the next time.
        event.target.value = null;
    }

    /** just a forwarder to the upload service */
    cancelUpload(file: FileUploadInterface) {
        this.uploadService.cancelFileUpload(file);
    }

    /** just a forwarder to the upload service */
    retryUpload(file: FileUploadInterface) {
        this.uploadService.retryUpload(file);
    }
}
