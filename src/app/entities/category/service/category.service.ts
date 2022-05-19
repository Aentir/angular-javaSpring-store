import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //Se inyecta en el constructor el módulo HttpClient para poder hacer peticiones al backend
  constructor(private http: HttpClient) { }

  //Se crea un método para obtener todas las categórias, que será un Observable y devolverá una LISTA de Categorías
  public getAllCategories(): Observable<Category[]> {
    const urlEndpoint: string = "http://localhost:8080/store/categories";
    return this.http.get<Category[]>(urlEndpoint);
  }

}
