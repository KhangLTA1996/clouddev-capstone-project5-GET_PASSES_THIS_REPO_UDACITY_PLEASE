import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CartProviderService } from '../services/cart.provider.service';

import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart-update',
  templateUrl: './cart-update.component.html',
  styleUrls: ['./cart-update.component.scss'],
})
export class CartUpdateComponent implements OnInit {
  previewDataUrl: string | ArrayBuffer;
  file: File;
  updateForm: FormGroup;

  constructor(
    private cart: CartProviderService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  setPreviewDataUrl(file: Blob) {
    const reader  = new FileReader();
    reader.onloadend = () => {
      this.previewDataUrl = reader.result;
    };

    reader.readAsDataURL(file);
  }

  selectImage(event) {
    const file = event.srcElement.files;

    if (!file) {
      return;
    }
    this.file = file[0];
    this.setPreviewDataUrl(this.file);

  }

  onSubmit($event) {
    $event.preventDefault();
    this.loadingController.create();

    if (!this.updateForm.valid || !this.file) { return; }

    let idValue = localStorage.getItem('itemId');

    this.cart.updateCartItem(Number(idValue), this.updateForm.controls.name.value, this.file, this.updateForm.controls.price.value, this.updateForm.controls.description.value)
      .then(() => {
        this.modalController.dismiss();
        this.loadingController.dismiss();
      });
  }

  cancel() {
    this.modalController.dismiss();
  }
}
