import { Component, OnInit } from '@angular/core';
import { FilesService } from '../service/files.service';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-nav-action-bar',
    templateUrl: './nav-action-bar.component.html',
    styleUrls: ['./nav-action-bar.component.scss'],
})
export class NavActionBarComponent implements OnInit {
    constructor(private fileService: FilesService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {}

    onUploadButtonClicked() {
        // do something here.
    }

    /**
     * Handles click events from the add folder button.
     * TODO: emmit from here
     * TODO: move this out of this component.
     */
    addFolderButtonClicked() {
        this.fileService
            .createFolder(this.route.snapshot.url.join('/'), window.prompt('Folder name', ''))
            .subscribe(data => {
                console.log('the data back', data);
            });
    }

    /**
     * TODO: use a service to deal with routing
     */
    upOneLevelButtonClicked() {
        const urlParts = this.route.snapshot.url;
        const pathEndIndex = urlParts.length - 1;
        if (pathEndIndex < 0) {
            return;
        }
        let newPath = urlParts.slice(0, pathEndIndex).join('/');
        newPath = newPath ? newPath : '/';
        const path = this.router.navigate([newPath]);
    }
}
