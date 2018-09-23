import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileDisplay } from './file-display';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UploadService } from '../upload/service/upload.service';

/**
 * Files facade service.
 * Anything fealing with files is handled through here. Uploads? you connect to this service to do that
 * File list? the list is kept here.
 */
@Injectable({
    providedIn: 'root',
})
export class FilesService {
    /**
     * This is what we expose, and observable of our internal subject
     */
    fileList$: Observable<FileDisplay[]>;

    /**
     * Here we keep the url up to date for easy access of all who use this service.
     * Should this be an observable? I guess it would be overkill
     *
     * hummm... but mazbe a getter?
     */
    currentUrl: string;

    /**
     * this is the core data structure of this service,
     * if it's not related to the files list, consider moving it to another service.
     */
    private fileList: BehaviorSubject<FileDisplay[]>;

    /** TODO: move this to an env var @see #6 */
    private filesApiUrl = 'http://localhost:3000/api/media/';

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
        // first of all we need to know where we are and set a "compass" so we can always know
        this.route.url.subscribe(segments => (this.currentUrl = segments.join('/')));
        this.fileList = new BehaviorSubject([]);
        this.fileList$ = this.fileList.asObservable();
    }

    getFiles(routerUrl: string) {
        console.log('requesting list for URL:', routerUrl);
        this.http.get<FileDisplay[]>(this.filesApiUrl + routerUrl).subscribe(list => {
            this.fileList.next(list);
        });
    }

    createFolder(targetPath: string, folderName: string) {
        // simple replace to get simple folder friendly names.
        const cleanFolderName = folderName.replace(/[^a-zA-Z0-9_-]/gm, '');
        return this.http.post(this.filesApiUrl + targetPath, { name: cleanFolderName }).pipe(
            tap(() => {
                console.log('created: refresh the file list');
            })
        );
    }

    delete(targetPath, entityName) {
        console.log('service wants to delete: ', this.filesApiUrl + targetPath + '/' + entityName);
        return this.http.delete(this.filesApiUrl + targetPath + '/' + entityName).pipe(
            tap(() => {
                console.log('deleted: refresh the file list');
            })
        );
    }

    /**
     * This prepends a file to the fileList
     *
     */
    prepend(file: File) {
        const newFileDisplay: FileDisplay = this.mapFileToFileDisplay(file);
        const newFileList: FileDisplay[] = [newFileDisplay].concat(this.fileList.getValue().slice(0));
        this.fileList.next(newFileList);
    }

    /** Manual map from to the browser File to our FileDisplay
     * sadly File does not have own properties,
     * so we have to map it to FileDisplay by hand
     */
    mapFileToFileDisplay(file: File): FileDisplay {
        return {
            name: file.name,
            size: file.size,
            mimetype: file.type,
            mtime: new Date(file.lastModified).toString(),
            lastModified: new Date(file.lastModified),
        };
    }
}
