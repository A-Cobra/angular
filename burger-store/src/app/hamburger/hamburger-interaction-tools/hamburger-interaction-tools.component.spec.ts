import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerInteractionToolsComponent } from './hamburger-interaction-tools.component';

describe('HamburgerInteractionToolsComponent', () => {
  let component: HamburgerInteractionToolsComponent;
  let fixture: ComponentFixture<HamburgerInteractionToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HamburgerInteractionToolsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HamburgerInteractionToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
