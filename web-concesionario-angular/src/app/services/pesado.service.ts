import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, docData, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Pesado {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class PesadoService {
  constructor(private firestore: Firestore) {}

  getPesados(): Observable<Pesado[]> {
    const pesadoCollection = collection(this.firestore, 'pesados');
    return collectionData(pesadoCollection, { idField: 'id' }) as Observable<Pesado[]>;
  }

  getPesadoById(id: string): Observable<Pesado | null> {
    const pesadoDoc = doc(this.firestore, `pesados/${id}`);
    return docData(pesadoDoc, { idField: 'id' }) as Observable<Pesado | null>;
  }

  createPesado(pesado: Pesado): Promise<void> {
    const pesadoDoc = doc(this.firestore, `pesados/${pesado.id}`);
    return setDoc(pesadoDoc, pesado);
  }

  updatePesado(id: string, pesado: Partial<Pesado>): Promise<void> {
    const pesadoDoc = doc(this.firestore, `pesados/${id}`);
    return updateDoc(pesadoDoc, pesado);
  }

  deletePesado(id: string): Promise<void> {
    const pesadoDoc = doc(this.firestore, `pesados/${id}`);
    return deleteDoc(pesadoDoc);
  }
}
