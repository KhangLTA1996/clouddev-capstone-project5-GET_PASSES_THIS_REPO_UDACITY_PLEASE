import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CartProviderService } from '../services/cart.provider.service';

import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart-upload',
  templateUrl: './cart-upload.component.html',
  styleUrls: ['./cart-upload.component.scss'],
})
export class CartUploadComponent implements OnInit {
  previewDataUrl: string | ArrayBuffer;
  file: File;
  uploadForm: FormGroup;

  constructor(
    private cart: CartProviderService,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
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

    if (!this.uploadForm.valid || !this.file) { return; }
    this.cart.uploadCartItem(this.uploadForm.controls.name.value, this.file, this.uploadForm.controls.price.value, this.uploadForm.controls.description.value)
      .then(() => {
        this.modalController.dismiss();
        this.loadingController.dismiss();
      });
  }

  cancel() {
    this.modalController.dismiss();
  }
}
