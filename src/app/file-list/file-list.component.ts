import { Component, OnInit } from '@angular/core';
import { FileDisplay } from '../file';
import { FilesService } from '../files.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Location } from '../../../node_modules/@angular/common';
import { CompileNgModuleMetadata, preserveWhitespacesDefault } from '../../../node_modules/@angular/compiler';

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnInit {
    files: FileDisplay[] = [];
    currentUrl = '';

    /**
     * Constructor Creates an instance of FileListComponent.
     */
    constructor(private fileService: FilesService, private route: ActivatedRoute, private location: Location) {}

    ngOnInit() {
        this.currentUrl = this.route.snapshot.url.join('/');
        this.getFiles();
    }

    getFiles(): void {
        this.fileService.getFiles(this.currentUrl).subscribe(files => (this.files = files));
    }
}
