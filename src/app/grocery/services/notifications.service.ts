import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  possibleNotifications: string[] = [
    'Item added to the cart correctly',
    'Item already in the cart, if you want to update the quantity, go there',
    'Not enough stock for the selected item and quantity, please try it again',
  ];
  constructor() {}
}
