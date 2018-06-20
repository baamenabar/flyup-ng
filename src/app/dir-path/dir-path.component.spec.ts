import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirPathComponent } from './dir-path.component';

describe('DirPathComponent', () => {
  let component: DirPathComponent;
  let fixture: ComponentFixture<DirPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
