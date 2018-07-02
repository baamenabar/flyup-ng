import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
