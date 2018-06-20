import { Component, OnInit } from '@angular/core';

interface fileDisplay {
    name: string;
    mimeType?: string;
    size: number;
    date: string;
}

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnInit {
    files: fileDisplay[] = [
        { name: 'one-file.jpg', size: 5600, date: '2018-06-11' },
        { name: 'one-file (2).jpg', size: 3600, date: '2018-05-01' },
        { name: 'second-file.jpg', size: 15200, date: '2018-06-10' },
        { name: 'one-anim.gif', size: 4750, date: '2018-06-03' },
    ];
    constructor() {}

    ngOnInit() {}
}
