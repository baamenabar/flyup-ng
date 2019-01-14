import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import { FileWindowComponent } from './file-window.component';
import { FileListComponent } from '../file-list/file-list.component';
import { SampleComponent } from '../nav-action-bar/sample.component';
import { UploadComponent } from '../upload/upload.component';

describe('FileWindowComponent', () => {
    let component: FileWindowComponent;
    let fixture: ComponentFixture<FileWindowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FileWindowComponent,
                MockComponent(SampleComponent),
                MockComponent(FileListComponent),
                MockComponent(UploadComponent),
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
