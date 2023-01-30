import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent Tests', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });
  describe('Typescript Tests', () => {
    test('should create HomeComponent', () => {
      expect(component).toBeTruthy();
    });
  });
  describe('HTML or UI Tests', () => {
    test('should display a div', () => {
      const divElement = debugElement.query(By.css('.main'));
      expect(divElement).not.toBe(null);
    });
  });
});
