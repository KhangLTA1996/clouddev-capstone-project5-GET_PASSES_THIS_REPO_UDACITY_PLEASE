import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CartListComponent } from './cart-list/cart-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartUploadComponent } from './cart-upload/cart-upload.component';
import { CartDeleteComponent } from './cart-delete/cart-delete.component';
import { CartUpdateComponent } from './cart-update/cart-update.component';
import { CartUploadButtonComponent } from './cart-upload/cart-upload-button/cart-upload-button.component';
import { CartDeleteButtonComponent } from './cart-delete/cart-delete-button/cart-delete-button.component';
import { CartUpdateButtonComponent } from './cart-update/cart-update-button/cart-update-button.component';

import { CartProviderService } from './services/cart.provider.service';

const entryComponents = [CartUploadComponent, CartDeleteComponent, CartUpdateComponent];
const components = [CartListComponent, CartItemComponent, CartUploadComponent, CartDeleteComponent, CartUpdateComponent, CartUploadButtonComponent, CartDeleteButtonComponent, CartUpdateButtonComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: components,
  exports: components,
  entryComponents: entryComponents,
  providers: [CartProviderService]
})
export class CartModule {}
