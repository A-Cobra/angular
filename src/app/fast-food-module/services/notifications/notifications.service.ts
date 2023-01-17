import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor() {}
  notifyOrderCreationSuccess() {
    alert('The order was successfully placed. Thanks! Enjoy your meal.');
  }
  notifySameItemsAddedToCart() {
    alert(
      'The items from the selected order have been successfully added to the cart!'
    );
  }
  notifyItemAddedToCart() {
    alert('The item was successfully added to the cart!');
  }
  notifyItemRemovedFromTheCart() {
    alert('The item was successfully removed to the cart!');
  }
  notifyItemUpdatedCorrectly() {
    alert('The item was successfully updated in the cart!');
  }
  notifyEmptyCart() {
    alert('There are no items in the cart. Please ad some!');
  }
}
