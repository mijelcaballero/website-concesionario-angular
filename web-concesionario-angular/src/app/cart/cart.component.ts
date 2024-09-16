import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { InvoiceService } from '../services/invoice.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cartItems$: Observable<{ item: Item, quantity: number }[]>; // Usa Observable para manejar los datos asíncronos
  total: number = 0;
  iva: number = 0;
  finalAmount: number = 0;

  constructor(
    private cartService: CartService, 
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    this.cartItems$ = this.cartService.getCartItems(); // Obtener los artículos del carrito como Observable
  }

  ngOnInit() {
    this.cartItems$.subscribe(items => {
      this.calculateTotals(items);
    });
  }

  calculateTotals(cartItems: { item: Item, quantity: number }[]) {
    const { total, iva, finalAmount } = this.invoiceService.calculateInvoice(cartItems);
    this.total = total;
    this.iva = iva;
    this.finalAmount = finalAmount;
  }

  removeFromCart(item: Item) {
    this.cartService.removeFromCart(item);
    this.cartItems$.subscribe(items => {
      this.calculateTotals(items);
    });
  }

  generateInvoice() {
    // Navega al componente de la factura
    this.router.navigate(['/invoice']);
  }
}
