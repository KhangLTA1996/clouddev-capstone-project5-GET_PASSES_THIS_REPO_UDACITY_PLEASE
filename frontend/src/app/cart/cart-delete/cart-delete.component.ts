import { Component, OnInit } from '@angular/core';

import { CartProviderService } from '../services/cart.provider.service';
import { FormGroup, FormBuilder } from '@angular/forms';

import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart-delete',
  templateUrl: './cart-delete.component.html',
  styleUrls: ['./cart-delete.component.scss'],
})
export class CartDeleteComponent implements OnInit {
  deleteForm: FormGroup;
  
  constructor(
    private cart: CartProviderService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.deleteForm = this.formBuilder.group({ });
  }

  onSubmit($event) {
    $event.preventDefault();
    this.loadingController.create();

    let idValue = localStorage.getItem('itemId');

    this.cart.removeCart(Number(idValue)).then(() => {
      this.modalController.dismiss();
      this.loadingController.dismiss();
    });
  }

  cancel() {
    this.modalController.dismiss();
  }
}
