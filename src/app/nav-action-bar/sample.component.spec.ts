import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleComponent } from './sample.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { ThingsService } from '../service/things.service';

describe('NavActionBarComponent', () => {
    let component: SampleComponent;
    let fixture: ComponentFixture<SampleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SampleComponent, ThingsListComponent],
            imports: [MatToolbarModule, RouterTestingModule, HttpClientModule],
            providers: [ThingsService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SampleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
