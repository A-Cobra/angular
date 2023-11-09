import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private possibleNotifications: string[] = [
    'Login Success',
    'Login Failure',
    'Please enter a valid email and password',
    'Something went wrong with the petition, please try it again or refresh the window',
    'Item added to the cart correctly',
    'Item already in the cart, if you want to update the quantity, please go there',
    'Not enough stock for the selected item and quantity, please reduce the quantity or add another item to the cart',
    'Item Removed Successfully',
    'Item Updated "Successfully"',
    'You can not add 0 or less units of a certain product',
    'You can not update to the same quantity',
    'All cart items removed successfully',
    "All cart items weren't removed successfully",
    'The cart is empty, try adding some products',
  ];

  constructor(private matSnackBar: MatSnackBar) {}

  notifyLoginSuccess() {
    this.useSnackBar(0, true);
  }

  notifyLoginFailure() {
    this.useSnackBar(1, false);
  }

  notifyWrongFormData() {
    this.useSnackBar(2, false);
  }

  notifyQueryError() {
    this.useSnackBar(3, false);
  }

  notifySuccessfulCartAddition() {
    this.useSnackBar(4, true);
  }

  notifyItemAlreadyInCart() {
    this.useSnackBar(5, false);
  }

  notifyNotEnoughStock() {
    this.useSnackBar(6, false);
  }

  notifyItemRemovedSuccessfully() {
    this.useSnackBar(7, true);
  }

  notifyItemUpdatedSuccessfully() {
    this.useSnackBar(8, true);
  }

  notifyNonNegativeQuantity() {
    this.useSnackBar(9, false);
  }

  notifyNonEqualUpdate() {
    this.useSnackBar(10, false);
  }

  notifyCartEmptiedSuccess() {
    this.useSnackBar(11, true);
  }

  notifyCartEmptiedFailure() {
    this.useSnackBar(12, false);
  }

  notifyCartEmpty() {
    this.useSnackBar(13, false);
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
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
