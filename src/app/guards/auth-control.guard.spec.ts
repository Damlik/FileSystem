import { TestBed } from '@angular/core/testing';

import { AuthControlGuard } from './auth-control.guard';

describe('AuthControlGuard', () => {
  let guard: AuthControlGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthControlGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
