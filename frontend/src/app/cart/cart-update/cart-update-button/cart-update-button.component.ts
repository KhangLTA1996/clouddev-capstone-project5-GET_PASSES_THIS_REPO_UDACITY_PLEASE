import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartUpdateComponent } from '../cart-update.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-update-button',
  templateUrl: './cart-update-button.component.html',
  styleUrls: ['./cart-update-button.component.scss'],
})
export class CartUpdateButtonComponent implements OnInit, OnDestroy {

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

  async updateSelectedForm(event, id) {
    // let target = event.target || event.srcElement || event.currentTarget;
    // let idAttr = target.id;

    console.log(event);

    const modal = await this.modalController.create({
      component: CartUpdateComponent,
    });
    return await modal.present();
  }

}
