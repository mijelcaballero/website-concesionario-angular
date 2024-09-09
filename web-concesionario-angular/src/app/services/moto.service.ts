import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, docData, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Moto {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MotoService {
  constructor(private firestore: Firestore) {}

  getMotos(): Observable<Moto[]> {
    const motoCollection = collection(this.firestore, 'motos');
    return collectionData(motoCollection, { idField: 'id' }) as Observable<Moto[]>;
  }

  getMotoById(id: string): Observable<Moto | null> {
    const motoDoc = doc(this.firestore, `motos/${id}`);
    return docData(motoDoc, { idField: 'id' }) as Observable<Moto | null>;
  }

  createMoto(moto: Moto): Promise<void> {
    const motoDoc = doc(this.firestore, `motos/${moto.id}`);
    return setDoc(motoDoc, moto);
  }

  updateMoto(id: string, moto: Partial<Moto>): Promise<void> {
    const motoDoc = doc(this.firestore, `motos/${id}`);
    return updateDoc(motoDoc, moto);
  }

  deleteMoto(id: string): Promise<void> {
    const motoDoc = doc(this.firestore, `motos/${id}`);
    return deleteDoc(motoDoc);
  }
}
