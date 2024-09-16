// services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item.interface'; // Importa la interfaz base

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cartItemsSubject = new BehaviorSubject<{ item: Item, quantity: number }[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  // Método para agregar un ítem al carrito
  addToCart(item: Item, quantity: number) {
    let currentCart = this.cartItemsSubject.value;
    const itemInCart = currentCart.find(cartItem => cartItem.item.id === item.id);

    if (itemInCart) {
      // Si el ítem ya está en el carrito, incrementamos la cantidad
      itemInCart.quantity += quantity; // Usa la cantidad pasada en lugar de siempre sumar 1
    } else {
      // Si el ítem no está en el carrito, lo añadimos con la cantidad especificada
      currentCart.push({ item, quantity });
    }

    this.cartItemsSubject.next(currentCart);
  }

  // Método para eliminar un ítem del carrito
  removeFromCart(item: Item) {
    let currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter(cartItem => cartItem.item.id !== item.id);
    this.cartItemsSubject.next(updatedCart);
  }

  // Método para obtener los artículos en el carrito
  getCartItems(): Observable<{ item: Item, quantity: number }[]> {
    return this.cartItems$;
  }

  // Método para obtener la cantidad total de un ítem en el carrito
  getItemQuantity(itemId: number): number {
    const cartItems = this.cartItemsSubject.value;
    const item = cartItems.find(cartItem => cartItem.item.id === itemId);
    return item ? item.quantity : 0;
  }
}
