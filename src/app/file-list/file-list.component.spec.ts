import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListComponent } from './file-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule, MatIconModule } from '@angular/material';
import { ThingsService } from '../service/things.service';
import { HttpClientModule } from '@angular/common/http';
import { BytesPipe } from '../pipes/bytes.pipe';

describe('FileListComponent', () => {
    let component: FileListComponent;
    let fixture: ComponentFixture<FileListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FileListComponent, BytesPipe],
            imports: [RouterTestingModule, MatTableModule, HttpClientModule, MatIconModule],
            providers: [ThingsService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FileListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
