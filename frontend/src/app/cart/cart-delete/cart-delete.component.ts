import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CartProviderService } from '../services/cart.provider.service';

import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart-delete',
  templateUrl: './cart-delete.component.html',
  styleUrls: ['./cart-delete.component.scss'],
})
export class CartDeleteComponent implements OnInit {
  previewDataUrl: string | ArrayBuffer;
  file: File;
  deleteForm: FormGroup;

  constructor(
    private cart: CartProviderService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.deleteForm = this.formBuilder.group({
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

    if (!this.deleteForm.valid || !this.file) { return; }

    let idValue = 9;
    console.log('help meeeee', $event);

    this.cart.removeCart(idValue).then(() => {
      this.modalController.dismiss();
      this.loadingController.dismiss();
    });
  }

  cancel() {
    this.modalController.dismiss();
  }
}
