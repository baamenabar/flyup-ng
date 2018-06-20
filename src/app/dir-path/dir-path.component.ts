import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dir-path',
    templateUrl: './dir-path.component.html',
    styleUrls: ['./dir-path.component.scss'],
})
export class DirPathComponent implements OnInit {
    public currentPath = 'hello/worlds/of/paths';
    constructor() {}

    ngOnInit() {}
}
