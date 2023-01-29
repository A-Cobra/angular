import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { debounce } from '../../../utils/debounce';

import { SearchingToolsComponent } from './searching-tools.component';

describe('SearchingToolsComponent Tests', () => {
  let component: SearchingToolsComponent;
  let fixture: ComponentFixture<SearchingToolsComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchingToolsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchingToolsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('Typescript Tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
