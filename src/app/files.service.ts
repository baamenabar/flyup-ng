import { Injectable } from '@angular/core';
import { MockFileList } from './mock-file-list';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FilesService {
    constructor() {}

    getFiles(routerUrl: string) {
        console.log('requesting list for URL:', routerUrl);
        return of(MockFileList);
    }
}
