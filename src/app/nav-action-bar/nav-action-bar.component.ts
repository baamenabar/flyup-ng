import { Component } from '@angular/core';
import { FilesService } from '../service/files.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-nav-action-bar',
    templateUrl: './nav-action-bar.component.html',
    styleUrls: ['./nav-action-bar.component.scss'],
})
export class NavActionBarComponent {
    constructor(private fileService: FilesService, private router: Router, private route: ActivatedRoute) {}

    /**
     * Handles click events from the add folder button.
     */
    addFolderButtonClicked() {
        this.fileService
            .createFolder(this.route.snapshot.url.join('/'), window.prompt('Folder name', ''))
            .subscribe(data => {
                console.log('the data back', data);
                // FIXME: notify th user that the operation has been done. @see #7
            });
    }

    /**
     * TODO: emmit so the parent component handles the routing, same for other butons.
     * ...or make the button a link with a dynamic URL calculated here, in the component.
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
