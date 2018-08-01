import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileDisplay } from './file-display';

@Injectable({
    providedIn: 'root',
})
export class FilesService {
    private filesApiUrl = 'http://localhost:3000/api/media/';
    constructor(private http: HttpClient) {}

    getFiles(routerUrl: string) {
        console.log('requesting list for URL:', routerUrl);
        return this.http.get<FileDisplay[]>(this.filesApiUrl + routerUrl);
    }

    createFolder(folderName: string) {
        // simple replace for non simple folder friendly names.
        const cleanFolderName = folderName.replace(/[^a-zA-Z0-9_-]/gm, '');
        console.log('requesting to create folder:', cleanFolderName);
        return this.http.post(this.filesApiUrl, { folderName: cleanFolderName });
    }
}
