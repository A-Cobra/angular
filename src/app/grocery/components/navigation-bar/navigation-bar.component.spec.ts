import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { NavigationBarComponent } from './navigation-bar.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('NavigationBarComponent Tests', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;
  let debugElement: DebugElement;
  let loginToken: string;
  let mockRouter!: {
    navigate: () => void;
  };
  const localStorageService = new LocalStorageService();

  beforeEach(async () => {
    // To keep the loginToken in the localStorage an not erase it
    loginToken = localStorageService.getLoginToken();
    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        // RouterModule,
        // RouterTestingModule
      ],
      declarations: [NavigationBarComponent],
      providers: [
        LocalStorageService,
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorageService.saveLoginToken(loginToken);
  });

  describe('Typescript Tests', () => {
    test('should create NavigationBarComponent', () => {
      expect(component).toBeTruthy();
    });

    test('that log-out a Tag calls the logOut function', () => {
      jest.spyOn(component, 'logOut');
      const logOutButton = debugElement.query(By.css('.log-out'));
      logOutButton.triggerEventHandler('click', null);
      expect(component.logOut).toHaveBeenCalledTimes(1);
    });

    test('should empty the key loginToken from the local storage', () => {
      // To check that the token was set, because if the token doesn't exist, the service returns an empty string
      const loginTokenString = loginToken === '' ? 'loginToken' : loginToken;
      expect(loginTokenString).not.toBe('');
      const logOutButton = debugElement.query(By.css('.log-out'));
      logOutButton.triggerEventHandler('click', null);
      const loginTokenString2 = localStorageService.getLoginToken();
      expect(loginTokenString2).toBe('');
    });

    test('that router redirects to the route "grocery-store"', () => {
      const logOutButton = debugElement.query(By.css('.log-out'));
      logOutButton.triggerEventHandler('click', null);
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['grocery-store']);
    });
  });

  describe('HTML or UI Tests', () => {
    test('to render 4 a tags', () => {
      const aTags = debugElement.queryAll(By.css('a'));
      expect(aTags.length).toBe(4);
    });
  });
});
