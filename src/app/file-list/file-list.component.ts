import { Component, OnInit, ViewChild } from '@angular/core';
import { FileDisplay } from '../file';
import { FilesService } from '../files.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnInit {
    files: FileDisplay[] = [];
    currentUrl = '';
    displayedColumns: string[] = ['name', 'size', 'mtime'];
    dataSource = new MatTableDataSource(this.files);

    @ViewChild(MatSort) sort: MatSort;

    /**
     * Constructor Creates an instance of FileListComponent.
     */
    constructor(private fileService: FilesService, private route: ActivatedRoute, private location: Location) {}

    ngOnInit() {
        // we susbribe to the url changes and try to load the files for current path.
        this.route.url.subscribe(segments => this.getFiles(segments));

        // init the material table sort
        this.dataSource.sort = this.sort;
    }

    getFiles(theSegments: UrlSegment[]): void {
        this.currentUrl = theSegments.join('/');
        this.fileService.getFiles(this.currentUrl).subscribe(files => (this.files = files));
    }
}
