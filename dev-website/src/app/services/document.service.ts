import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OperationResult } from '../models/operation-result';
import { IItem } from '../interfaces/item';
import { IIdentifiable } from '../interfaces/iidentifiable';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private afs: AngularFirestore) { }

  public Get(collection: AngularFirestoreCollection) : Observable<IIdentifiable[]> {
    return collection
    .snapshotChanges()
    .pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data() as IItem;
      data.Id = a.payload.doc.id;
      return data;
    })));
  }

  /**
   * Get document by id from given location
   * @param id 
   * @param location 
   */
  public GetById<T>(id: string, location: string) : Observable<T> {
    return this.afs.doc(location + '/' + id)
    .snapshotChanges()
    .pipe(map(result => {
        return result.payload.data() as T;
    }));
  }


  /**
   * create document in given collection
   * @param objectToCreate 
   * @param collection 
   */
  public Create(objectToCreate: any, collection: AngularFirestoreCollection) : Promise<OperationResult> {
    return collection.add(Object.assign({},objectToCreate))
    .then(res => {
      
        //create result to return, assign new id
        const result = new OperationResult();
        result.Status = true;
        result.Id = res.id.toString();
  
        return result;
      })
      .catch(res => {
        const result = new OperationResult();
        return result;
      });
  }

  /**
   * update document by id at given location
   * @param id 
   * @param updatedObject 
   * @param location 
   */
  public Update(id: string, updatedObject: any, location: string) : Promise<OperationResult> {
    return this.afs.doc(location + '/' + id)
    .update(updatedObject)
    .then(function(result) {
      let opResult = new OperationResult();
      opResult.Status = true;
      return opResult;
    })
    .catch(function(result) {
      let opResult = new OperationResult();
      opResult.Message = result;
      return opResult;
    });
  }

  /**
   * Delete document by id at given location
   * @param id 
   * @param location 
   */
  public Delete(id: string, location: string) :Promise<OperationResult> {
    return this.afs.doc(location + '/' + id)
    .delete()
    .then(function(result) {
      let opResult = new OperationResult();
      opResult.Status = true;
      return opResult;
    })
    .catch(function(result) {
      let opResult = new OperationResult();
      opResult.Message = result;
      return opResult;
    });
  }




}
