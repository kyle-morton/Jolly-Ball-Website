import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/project';
import { OperationResult } from '../models/operation-result';
import { CollectionService } from './collection.service';
import { DocumentService } from './document.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private collectionName : string = "Projects";

  constructor(private colService: CollectionService, private docService: DocumentService) { }  

  /**
   * Get all projects from data source
   */
  public GetProjects() : Observable<Project[]> {
    const collection = this.colService.GetCollection(this.collectionName);

    return this.docService.Get(collection)
    .pipe(map(items => items.map(a => {
      return a as Project
    })));
  }

  /**
   * Get post with given id from data source
   */
  public GetProject(id: string) : Observable<Project> {
    return this.docService.GetById<Project>(id, this.collectionName);
  }

  /**
   * Creates new project in data source
   * @param project 
   */
  public Create(project : Project) : Promise<OperationResult> {
    
    const collection = this.colService.GetCollection(this.collectionName);
    project.TimeStamp = new Date().toString();
    return this.docService.Create(project, collection);

  }

  /**
   * Updates project with given id 
   * @param id 
   * @param updatedProject 
   */
  public Update(id: string, updatedProject: Project) : Promise<OperationResult> {
    return this.docService.Update(id, updatedProject, this.collectionName);
  }

  /**
   * Deletes project with given id
   * @param id 
   */
  public Delete(id: string) : Promise<OperationResult> {
    return this.docService.Delete(id, this.collectionName);
  }

}
