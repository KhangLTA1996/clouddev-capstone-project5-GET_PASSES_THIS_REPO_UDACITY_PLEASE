import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { CartProviderService } from '../services/cart.provider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit, OnDestroy {
  @Input() cartItems: CartItem[];
  subscriptions: Subscription[] = [];
  constructor( private cart: CartProviderService ) { }

  async ngOnInit() {
    this.subscriptions.push(
      this.cart.currentCart$.subscribe((items) => {
      this.cartItems = items;
    }));

    await this.cart.getCart();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  async selectedItem(id: number) {
    localStorage.setItem('itemId', id.toString());
  }
}
