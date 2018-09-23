import { Component, OnInit, ViewChild } from '@angular/core';
import { FileDisplay } from '../service/file-display';
import { FilesService } from '../service/files.service';
import { ActivatedRoute, UrlSegment, RouterEvent, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';

// check material icons list at: https://material.io/tools/icons/?icon=delete_forever&style=baseline

const DIRECTORY_MIME = 'DIRECTORY';

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnInit {
    files$: Observable<FileDisplay[]>;
    currentUrl = '';
    displayedColumns: string[] = ['name', 'size', 'mimetype', 'mtime', 'actions'];
    dataSource = new MatTableDataSource();

    @ViewChild(MatSort)
    sort: MatSort;

    /**
     * Constructor Creates an instance of FileListComponent.
     */
    constructor(private fileService: FilesService, private route: ActivatedRoute, private router: Router) {
        // we connect the fileService fileList to our list
        this.files$ = this.fileService.fileList$;
    }

    ngOnInit() {
        // we susbribe to the url changes and try to load the files for current path.
        this.route.url.subscribe(segments => this.getFiles(segments));

        // init the material table sort
        this.dataSource.sort = this.sort;
    }

    getFiles(theSegments: UrlSegment[]): void {
        this.currentUrl = theSegments.join('/');
        this.fileService.getFiles(this.currentUrl);
        // .subscribe(files => {
        //     this.files$ = files;
        //     this.dataSource.data = this.files$;

        //     // we reasign the sort from the component to the data source
        //     this.dataSource.sort = this.sort;
        // });
    }

    entityClicked(entity): void {
        // for now we just deal with folders
        if (entity.mimetype === DIRECTORY_MIME) {
            this.router.navigate([this.currentUrl, entity.name]);
        }
    }

    deleteFileButtonClicked(entity: FileDisplay) {
        console.log('want to delete ', this.currentUrl, entity.name);
        if (
            window.confirm(`Do you really want to delete: ${entity.name} ?
This can not be undone.`)
        ) {
            this.fileService.delete(this.currentUrl, entity.name).subscribe(response => {
                console.log('deleted', response);
            });
        }
    }
}
