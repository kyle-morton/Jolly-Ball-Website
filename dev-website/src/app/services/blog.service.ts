import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Post } from '../models/post';
import { OperationResult } from '../models/operation-result';
import { CollectionService } from './collection.service';
import { DocumentService } from './document.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private collectionName : string = "Posts";

  constructor(private colService: CollectionService, private docService: DocumentService) { }
  
  /**
   * Get all posts from data source
   */
  public GetPosts() : Observable<Post[]> {

    const collection = this.colService.GetCollection(this.collectionName);

    return this.docService.Get(collection)
    .pipe(map(items => items.map(a => {
      return a as Post
    })));

  }

  /**
   * Get post with given id from data source
   * @param id 
   */
  public GetPost(id: string) : Observable<Post> {
    return this.docService.GetById<Post>(id, this.collectionName);
  }

  /**
   * Creates new post in data source
   * @param post 
   */
  public Create(post: Post) : Promise<OperationResult> {

    const collection = this.colService.GetCollection(this.collectionName);
    post.TimeStamp = new Date().toString();
    return this.docService.Create(post, collection);
  }

  
  /**
   * Updates post with given id
   * @param id 
   * @param updatedPost 
   */
  public Update(id: string, updatedPost: Post) : Promise<OperationResult> {
    return this.docService.Update(id, updatedPost, this.collectionName);
  }

  /**
   * Deletes post with given id
   * @param id 
   */
  public Delete(id: string) : Promise<OperationResult> {
    return this.docService.Delete(id, this.collectionName);
  }
  
}
