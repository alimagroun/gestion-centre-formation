import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authTeacherGuard } from './auth-teacher.guard';

describe('authTeacherGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authTeacherGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
