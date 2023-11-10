import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item.component';
import { cartItemMocks } from '../models/cart-item.model';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.cartItem = cartItemMocks[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the image url to the cartItem', () => {
    const app = fixture.nativeElement;
    const img = app.querySelectorAll('ion-img');
    expect(img.length).toEqual(1);
    expect(img[0].src).toEqual(cartItemMocks[0].path);
  });

  it('should display the description', () => {
    const app = fixture.nativeElement;
    const paragraphs = app.querySelectorAll('p');
    expect(([].slice.call(paragraphs)).map((x) => x.innerText)).toContain(cartItemMocks[0].description);
  });
});
