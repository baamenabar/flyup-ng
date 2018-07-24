import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FileUploadInterface } from '../file-upload.interface';
import { Subject, of } from 'rxjs';
import { map, tap, last, catchError } from 'rxjs/operators';
import { CloseScrollStrategy } from '@angular/cdk/overlay';

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    files: FileUploadInterface[] = []; // = mockedFileList;

    private fileCompleteSource = new Subject<FileUploadInterface>();

    /** Public interface that will publish when a file is done */
    fileComplete$ = this.fileCompleteSource.asObservable();

    /** Target URL where to post the uploaded files to. This URL should be coming form the env configs */
    private apiTarget = 'http://localhost:3000/api/upload';

    /** This sets the File post field name, it defults to the default in flyup-back. This should be set in the envs */
    private postFieldName = 'uploaded_file';

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
        console.log('trigering upload of files');
        this.files.forEach(file => this.uploadOneFile(file));
    }

    private uploadOneFile(file: FileUploadInterface) {
        const fd = new FormData();
        fd.append(this.postFieldName, file.data);

        const req = new HttpRequest('POST', this.apiTarget, fd, { reportProgress: true });

        file.inProgress = true;
        file.sub = this.http
            .request(req)
            .pipe(
                map(event => {
                    switch (event.type) {
                        case HttpEventType.Sent:
                            // this is type:0 ... Let's atleast aknowledge this has started.
                            file.progress = 0.1;
                            break;
                        case HttpEventType.UploadProgress:
                            // type 1
                            file.progress = Math.round((event.loaded * 100) / event.total);
                            break;
                        case HttpEventType.ResponseHeader:
                            // this is type: 2 ... we got the header of the response
                            // moving along... when we get the response we deal with it.
                            break;
                        case HttpEventType.DownloadProgress:
                            // this is type: 3 ... we are getting some bytes (probably the response)
                            // moving along... when we get the response we deal with it.
                            break;
                        case HttpEventType.Response:
                            // this is type: 4
                            // the transfer is done, we return the event to bea dealt with by the subscriber.
                            return event;
                        default:
                            // no clue yet how can we get this EventType or what to do in that case...
                            // @see https://i.kym-cdn.com/photos/images/newsfeed/000/234/137/5c4.jpg
                            console.log('Hum... guess it can hapen that it gets here', event);
                            break;
                    }
                }),
                tap(message => {
                    // noting to see here.... move along
                }),
                last(),
                catchError((error: HttpErrorResponse) => {
                    file.inProgress = false;
                    file.canRetry = true;
                    console.log('Error:', error);
                    return of(`${file.data.name} upload failed`);
                })
            )
            .subscribe((event: any) => {
                if (typeof event === 'object') {
                    this.removeFileFromArray(file);

                    // communicate to the component that this file is done. We could also sent the event
                    this.fileCompleteSource.next(file);
                } else {
                    // This should not happen, if it does, I want to check what is this event.
                    console.log('Error on http response subcriber: ', event);
                }
            });
    }

    private removeFileFromArray(file: FileUploadInterface) {
        const index = this.files.indexOf(file);
        if (index > -1) {
            this.files.splice(index, 1);
        }
    }
}

export const mockedFileList: FileUploadInterface[] = [
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
