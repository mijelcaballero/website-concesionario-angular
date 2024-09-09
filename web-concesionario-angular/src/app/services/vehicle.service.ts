import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Vehicle {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string; // auto, moto, pesado
}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private firestore: Firestore) {}

  getVehicles(collectionName: string): Observable<Vehicle[]> {
    const vehicleCollection = collection(this.firestore, collectionName);
    return collectionData(vehicleCollection, { idField: 'id' }) as Observable<Vehicle[]>;
  }
}
