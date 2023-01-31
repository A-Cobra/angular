import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';

describe('HomeComponent Tests', () => {
  let authGuard: AuthGuard;
  let mockLoginService: any;
  let mockRouter: any;
  beforeEach(() => {
    mockLoginService = {
      isLoggedIn$: jest.fn(),
    };
    mockRouter = {
      navigate: jest.fn(),
    };
    authGuard = new AuthGuard(mockLoginService, mockRouter);
  });

  describe('Typescript Tests', () => {
    test('should create AuthGuard', () => {
      expect(authGuard).toBeTruthy();
    });
    test('should navigate to homepage if the credentials are incorrect', () => {
      jest
        .spyOn(mockLoginService, 'isLoggedIn$')
        .mockImplementation(() => of(true));
      authGuard.canActivate();
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['grocery-store']);
    });
  });
});
