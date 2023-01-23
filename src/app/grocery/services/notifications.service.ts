import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private possibleNotifications: string[] = [
    'Item added to the cart correctly',
    'Item already in the cart, if you want to update the quantity, please go there',
    'Not enough stock for the selected item and quantity, please reduce the quantity or add another item to the cart',
    'Something went wrong with the petition, please try it again or refresh the window',
    'Login Success',
    'Login Failure',
  ];

  constructor(private matSnackBar: MatSnackBar) {}

  notifySuccessfulCartAddition() {
    this.useSnackBar(0, true);
  }

  notifyItemAlreadyInCart() {
    this.useSnackBar(1, false);
  }

  notifyNotEnoughStock() {
    this.useSnackBar(2, false);
  }

  notifyQueryError() {
    this.useSnackBar(3, false);
  }

  notifyLoginSuccess() {
    this.useSnackBar(4, true);
  }

  notifyLoginFailure() {
    this.useSnackBar(5, false);
  }

  private useSnackBar(
    notificationId: number,
    success: boolean,
    duration: number = 2000
  ) {
    const panelClass = success ? ['blue-snackbar'] : ['red-snackbar'];
    this.matSnackBar.open(this.possibleNotifications[notificationId], '', {
      duration: duration,
      panelClass,
    });
  }
}
