import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryDisplayComponent } from './repository-display.component';

describe('RepositoryDisplayComponent', () => {
  let component: RepositoryDisplayComponent;
  let fixture: ComponentFixture<RepositoryDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepositoryDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
