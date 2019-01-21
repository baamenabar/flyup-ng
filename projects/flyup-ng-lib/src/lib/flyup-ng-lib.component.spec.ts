import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyupNgLibComponent } from './flyup-ng-lib.component';

describe('FlyupNgLibComponent', () => {
  let component: FlyupNgLibComponent;
  let fixture: ComponentFixture<FlyupNgLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyupNgLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyupNgLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
