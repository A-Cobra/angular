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
  });

  describe('HTML or UI Tests', () => {
    test('that changing a category with the selector emits an EventEmitter', () => {
      jest.spyOn(component.searchingToolsUsage, 'emit');
      const selectInput = debugElement.query(By.css('#category-selector'));
      selectInput.nativeElement.value = 'computers';
      selectInput.nativeElement.dispatchEvent(new Event('change'));
      expect(component.searchingToolsUsage.emit).toHaveBeenCalledTimes(1);
    });
    test('that making an input an waiting for 1 sec trigger the searching tools EventEmitter', () => {
      jest.useFakeTimers();
      jest.spyOn(component.searchingToolsUsage, 'emit');
      const productNameInput = debugElement.query(By.css('#searchInput'));
      productNameInput.nativeElement.value = 'justin';
      productNameInput.triggerEventHandler('input');
      expect(component.searchingToolsUsage.emit).toHaveBeenCalledTimes(0);
      jest.advanceTimersByTime(1000);
      expect(component.searchingToolsUsage.emit).toHaveBeenCalledTimes(1);
    });
  });
});
