import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerTableRendererComponent } from './hamburger-table-renderer.component';

describe('HamburgerTableRendererComponent', () => {
  let component: HamburgerTableRendererComponent;
  let fixture: ComponentFixture<HamburgerTableRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HamburgerTableRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HamburgerTableRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
