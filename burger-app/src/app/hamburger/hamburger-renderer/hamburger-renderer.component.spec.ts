import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerRendererComponent } from './hamburger-renderer.component';

describe('HamburgerRendererComponent', () => {
  let component: HamburgerRendererComponent;
  let fixture: ComponentFixture<HamburgerRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HamburgerRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HamburgerRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
