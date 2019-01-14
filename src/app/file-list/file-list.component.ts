import { Component, OnInit, ViewChild } from '@angular/core';
import { FileDisplay } from '../service/file-display';
import { ThingsService } from '../service/things.service';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Observable, noop } from 'rxjs';

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
    dataSource: MatTableDataSource<FileDisplay>;

    @ViewChild(MatSort)
    sort: MatSort;

    /**
     * Constructor Creates an instance of FileListComponent.
     */
    constructor(private thingsService: ThingsService, private route: ActivatedRoute, private router: Router) {
        // we connect the thingsService fileList to our list
        this.files$ = this.thingsService.fileList$;
    }

    /**
     * Subscribe to URL changes
     * call to init table data
     */
    ngOnInit() {
        // we susbribe to the url changes and try to load the files for current path.
        this.route.url.subscribe(segments => this.updateViewToUrlChange(segments));

        this.initTableData();
    }

    /**
     * Sets up the data from the data table
     * the data table template could only use the files$ Observable, but I couldn't sort sorting ¬¬
     */
    initTableData(): void {
        this.dataSource = new MatTableDataSource();

        // connect the material table sort, only need to set it once
        this.dataSource.sort = this.sort;

        // init the fileList$ subscription to table data source
        this.files$.subscribe(fileList => {
            this.dataSource.data = fileList;
        });
    }

    /**
     * react to URL changes
     */
    updateViewToUrlChange(theSegments: UrlSegment[]): void {
        this.currentUrl = theSegments.join('/');

        // tell the file service to get the corresponding folder listing
        this.thingsService.getFiles(this.currentUrl);
    }

    /**
     * react to a row click
     *
     * @param {*} entity
     */
    entityClicked(entity): void {
        // for now we just deal with folders
        if (entity.mimetype === DIRECTORY_MIME) {
            this.router.navigate([this.currentUrl, entity.name]);
        }
    }

    deleteFileButtonClicked(entity: FileDisplay) {
        console.log('want to delete ', entity.name);
        if (
            window.confirm(`Do you really want to delete: ${entity.name} ?
This can not be undone.`)
        ) {
            this.thingsService.delete(this.currentUrl, entity.name).subscribe(
                noop, // here we should show a notification
                err => {
                    console.log('COULD NOT DELETE: ', err);
                    alert('Could not delete the file, we have a problem, there´s an error in the console!');
                }
            );
        }
    }
}
