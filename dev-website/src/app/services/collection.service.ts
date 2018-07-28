import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private afs: AngularFirestore) { }

  
  public GetCollection(collectionLocation : string) {
    return this.afs.collection(collectionLocation);
  }

  public Insert(collection : AngularFirestoreCollection, data: any) {
    return collection.add(Object.assign({},data));
  }
}
