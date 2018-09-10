import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavActionBarComponent } from './nav-action-bar.component';

describe('NavActionBarComponent', () => {
  let component: NavActionBarComponent;
  let fixture: ComponentFixture<NavActionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavActionBarComponent ]
    })
    .compileComponents();
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
