import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileDisplay } from './file-display';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FilesService {
    private filesApiUrl = 'http://localhost:3000/api/media/';
    private currentUrl: Observable<string>;
    constructor(private http: HttpClient) {}

    getFiles(routerUrl: string) {
        console.log('requesting list for URL:', routerUrl);
        return this.http.get<FileDisplay[]>(this.filesApiUrl + routerUrl);
    }

    createFolder(targetPath: string, folderName: string) {
        // simple replace for non simple folder friendly names.
        const cleanFolderName = folderName.replace(/[^a-zA-Z0-9_-]/gm, '');
        return this.http.post(this.filesApiUrl + targetPath, { name: cleanFolderName });
    }
}
