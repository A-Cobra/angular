import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private possibleNotifications: string[] = [
    'Item added to the cart correctly',
    'Item already in the cart, if you want to update the quantity, go there',
    'Not enough stock for the selected item and quantity, please try it again',
  ];

  constructor(private matSnackBar: MatSnackBar) {}

  anyFunc() {
    console.log('ANYFUNC');
  }

  notifySuccessfulCartAddition() {
    console.log('NOTIFYING SUCCESSFUL CREATION');
    // this.matSnackBar.open('Cart successful addition', '', { duration: 1500 });
    this.useSnackBar(2, 1500, true);
  }

  private useSnackBar(
    notificationId: number,
    duration: number = 1500,
    success: boolean
  ) {
    const panelClass = success ? ['blue-snackbar'] : ['red-snackbar'];
    this.matSnackBar.open(this.possibleNotifications[notificationId], '', {
      duration: duration,
      panelClass,
    });
  }
}
