import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewerComponent } from './employee-viewer.component';

describe('EmployeeViewerComponent', () => {
  let component: EmployeeViewerComponent;
  let fixture: ComponentFixture<EmployeeViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
