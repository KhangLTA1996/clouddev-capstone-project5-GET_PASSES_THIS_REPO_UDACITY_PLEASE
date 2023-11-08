import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListComponent } from './cart-list.component';
import { CartProviderService } from '../services/cart.provider.service';
import { cartItemMocks } from '../models/cart-item.model';

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;
  let cartProvider: CartProviderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartListComponent);

    // Set up mocks
    cartProvider = fixture.debugElement.injector.get(CartProviderService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch on load', () => {
    expect(cartProvider.getCart).toHaveBeenCalled();
  });

  it('should display all of the fetched items on cart', () => {
    component.cartItems = cartItemMocks;
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const items = app.querySelectorAll('app-cart-item');
    expect(items.length).toEqual(cartItemMocks.length);
  });
});
