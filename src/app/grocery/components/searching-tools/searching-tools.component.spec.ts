import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { debounce } from '../../../utils/debounce';

import { SearchingToolsComponent } from './searching-tools.component';
import { defaultCategoriesArray } from './test-utils/default-categories-array';
import { By } from '@angular/platform-browser';

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
    //We must supply a categories array assuming the parent works well
    component.categories = defaultCategoriesArray;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('Typescript Tests', () => {
    test('should create SearchingToolsComponent', () => {
      expect(component).toBeTruthy();
    });
    test('that SearchingToolsComponent should receive the categories array containing 30 items', () => {
      expect(component.categories).not.toBe(undefined);
      expect(component.categories.length).toBe(30);
    });
    test('that changing a category with the selector emits an EventEmitter', () => {
      const selectInput = debugElement.query(By.css('#category-selector'));
      console.log('selectInput.nativeElement.value');
      console.log(
        selectInput.nativeElement.value === ''
          ? 'All'
          : selectInput.nativeElement.value
      );
    });
  });
});
