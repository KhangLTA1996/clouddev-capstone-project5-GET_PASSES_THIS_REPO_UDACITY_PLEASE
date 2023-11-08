import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartDeleteComponent } from '../cart-delete.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-delete-button',
  templateUrl: './cart-delete-button.component.html',
  styleUrls: ['./cart-delete-button.component.scss'],
})
export class CartDeleteButtonComponent implements OnInit, OnDestroy {

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

  async presentDeleteForm() {
    const modal = await this.modalController.create({
      component: CartDeleteComponent,
    });
    return await modal.present();
  }

}
