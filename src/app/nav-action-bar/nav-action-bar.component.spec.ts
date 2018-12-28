import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavActionBarComponent } from './nav-action-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule, MatToolbarModule } from '@angular/material';

describe('NavActionBarComponent', () => {
    let component: NavActionBarComponent;
    let fixture: ComponentFixture<NavActionBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavActionBarComponent],
            imports: [MatIconModule, MatToolbarModule, RouterTestingModule, HttpClientModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavActionBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
