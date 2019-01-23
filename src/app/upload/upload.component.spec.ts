import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';
import { MatToolbarModule, MatProgressBarModule, MatIconModule } from '@angular/material';
import { UploadService } from './service/upload.service';
import { MockUploadService } from './service/upload.service.mock';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('UploadComponent', () => {
    let component: UploadComponent;
    let fixture: ComponentFixture<UploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UploadComponent],
            imports: [MatToolbarModule, MatProgressBarModule, MatIconModule, RouterTestingModule, HttpClientModule],
            providers: [{ provide: UploadService, useValue: MockUploadService }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    test('should create', () => {
        expect(component).toBeTruthy();
    });
});
