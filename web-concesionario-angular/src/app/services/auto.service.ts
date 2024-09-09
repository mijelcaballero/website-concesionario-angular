import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, docData, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Auto {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  constructor(private firestore: Firestore) {}

  getAutos(): Observable<Auto[]> {
    const autoCollection = collection(this.firestore, 'autos');
    return collectionData(autoCollection, { idField: 'id' }) as Observable<Auto[]>;
  }

  getAutoById(id: string): Observable<Auto | null> {
    const autoDoc = doc(this.firestore, `autos/${id}`);
    return docData(autoDoc, { idField: 'id' }) as Observable<Auto | null>;
  }

  createAuto(auto: Auto): Promise<void> {
    const autoDoc = doc(this.firestore, `autos/${auto.id}`);
    return setDoc(autoDoc, auto);
  }

  updateAuto(id: string, auto: Partial<Auto>): Promise<void> {
    const autoDoc = doc(this.firestore, `autos/${id}`);
    return updateDoc(autoDoc, auto);
  }

  deleteAuto(id: string): Promise<void> {
    const autoDoc = doc(this.firestore, `autos/${id}`);
    return deleteDoc(autoDoc);
  }
}
