import { TestBed } from '@angular/core/testing';

import { CartProviderService } from './cart.provider.service';

describe('Cart.ProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartProviderService = TestBed.get(CartProviderService);
    expect(service).toBeTruthy();
  });
});
