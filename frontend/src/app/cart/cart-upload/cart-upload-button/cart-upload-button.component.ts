import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { ModalController } from '@ionic/angular';
import { CartUploadComponent } from '../cart-upload.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-upload-button',
  templateUrl: './cart-upload-button.component.html',
  styleUrls: ['./cart-upload-button.component.scss'],
})
export class CartUploadButtonComponent implements OnInit, OnDestroy {
  @Input() cartItems: CartItem[];

  isLoggedIn: boolean;
  loginSub: Subscription;

  constructor(private modalController: ModalController, private auth: AuthService) { }

  ngOnInit() {
    this.auth.currentUser$.subscribe((user) => {
      this.isLoggedIn = user !== null;
    });
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

  async presentUploadForm() {
    const modal = await this.modalController.create({
      component: CartUploadComponent,
    });
    return await modal.present();
  }

}
