import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaypalService } from './paypal.service';
import { Observable, switchMap } from 'rxjs';
import { Item } from '../models/item.interface';


@Injectable({
  providedIn: 'root'
})

export class InvoiceService {

  constructor(private http: HttpClient, private paypalService: PaypalService) {}

  calculateInvoice(cartItems: { item: Item, quantity: number }[]): { total: number, iva: number, finalAmount: number } {
    let total = 0;
    const ivaRate = 0.15;

    cartItems.forEach(item => {
      total += item.item.price * item.quantity; // Multiplicar precio por cantidad
    });

    const iva = total * ivaRate;
    const finalAmount = total + iva;

    return { total, iva, finalAmount };
  }

  pagarConPaypal(cartItems: any[], return_url: string, cancel_url: string): Observable<any> {
    const { finalAmount } = this.calculateInvoice(cartItems);

    return this.paypalService.getAccessToken().pipe(
      switchMap(accessTokenResponse => {
        const accessToken = accessTokenResponse.access_token;

        // Crear perfil de pago en PayPal
        return this.paypalService.createWebProfile(accessToken, 'Perfil de Pago').pipe(
          switchMap(profileResponse => {
            const profileId = profileResponse.id;

            // Crear el pago en PayPal
            return this.paypalService.createPayment(accessToken, profileId, return_url, cancel_url, finalAmount);
          })
        );
      })
    );
  }
}