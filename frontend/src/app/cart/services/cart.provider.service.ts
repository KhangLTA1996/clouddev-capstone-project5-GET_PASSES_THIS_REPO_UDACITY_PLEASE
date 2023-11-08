import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject } from 'rxjs';

import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CartProviderService {
  currentCart$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  constructor(private api: ApiService) { }

  async getCart(): Promise<BehaviorSubject<CartItem[]>> {
    const req = await this.api.get('/cart');
    const items = <CartItem[]> req.rows;
    this.currentCart$.next(items);
    return Promise.resolve(this.currentCart$);
  }

  async uploadCartItem(name: string, file: File, price: Number, description: string): Promise<any> {
    const res = await this.api.upload('/cart', file, {name: name, url: file.name, price: price, description: description});
    const cart = [res, ...this.currentCart$.value];
    this.currentCart$.next(cart);
    return res;
  }

  async updateCartItem(id: number, name: string, file: File, price: Number, description: string): Promise<any> {
    const res = await this.api.update(id, '/cart', file, {name: name, url: file.name, price: price, description: description});
    const cart = [res, ...this.currentCart$.value];
    this.currentCart$.next(cart);
    return res;
  }

  async removeCart(id: number): Promise<any> {
    const res = await this.api.delete(id, '/cart');
    const cart = [res, ...this.currentCart$.value];
    this.currentCart$.next(cart);
    return res;
  }

}