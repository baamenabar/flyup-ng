import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileDisplay } from './file-display';
import { Observable } from 'rxjs';
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
    fileList: FileDisplay[] = [];
    private filesApiUrl = 'http://localhost:3000/api/media/';

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private uploadService: UploadService
    ) {}

    getFiles(routerUrl: string) {
        console.log('requesting list for URL:', routerUrl);
        return this.http.get<FileDisplay[]>(this.filesApiUrl + routerUrl);
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
     */
    prepend(file: FileDisplay) {
        this.fileList.push(file);
    }
}
